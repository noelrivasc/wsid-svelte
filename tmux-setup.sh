#!/usr/bin/env bash
#
# tmux-setup.sh — spin up the wsid-svelte dev environment in tmux.
#
# Usage:
#   ./tmux-setup.sh setup                 Build the session, windows and panes.
#   ./tmux-setup.sh start-dev [vite|docker]  Launch app/mail/docs processes (default: vite).
#   ./tmux-setup.sh stop-dev              Stop the app/mail/docs processes.
#   ./tmux-setup.sh start-tools           Launch nvim + claude in the tools window.
#   ./tmux-setup.sh up [vite|docker]      setup + start-tools + start-dev, then attach.
#   ./tmux-setup.sh attach                Attach to the session.
#
# Layout:
#   window "tools"      editor (nvim) | agent (claude)
#                       editor        / shell
#   window "processes"  app       (vite/docker)
#                       docs      (pnpm serve-docs)
#                       storybook (pnpm storybook)
#                       ops       (mailpit; also runs browser-open commands)

set -euo pipefail

SESSION="wsid-dev"

# Host-side ports (macOS, everything runs locally).
PORT_VITE=5173       # vite dev
PORT_DOCKER=3000     # dockerised app (docker-compose app service: 127.0.0.1:3000:3000)
PORT_STORYBOOK=6006  # storybook dev -p 6006
PORT_MAILPIT=8125    # mailpit web UI (docker-compose maps 8125 -> container 8025)
PORT_DOCS=8081       # pnpm docs

# Resolve a pane id by its title within a window, so the start-* commands can
# target panes created by an earlier `setup` invocation.
pane_id_by_title() {
	local window=$1 title=$2 id
	id=$(tmux list-panes -t "$SESSION:$window" -F '#{pane_title} #{pane_id}' \
		| awk -v t="$title" '$1 == t { print $2; exit }')
	if [[ -z "$id" ]]; then
		echo "Pane '$title' not found in window '$window'. Run 'setup' first." >&2
		exit 1
	fi
	printf '%s' "$id"
}

cmd_setup() {
	tmux kill-session -t "$SESSION" 2>/dev/null || true

	# tools window — first pane becomes the editor.
	local editor agent shell
	editor=$(tmux new-session -d -s "$SESSION" -n tools -P -F '#{pane_id}')
	tmux select-pane -t "$editor" -T editor
	agent=$(tmux split-window -h -t "$editor" -P -F '#{pane_id}')
	tmux select-pane -t "$agent" -T agent
	shell=$(tmux split-window -v -t "$editor" -P -F '#{pane_id}')
	tmux select-pane -t "$shell" -T shell

	# processes window — three stacked panes.
	local app docs ops
	app=$(tmux new-window -t "$SESSION" -n processes -P -F '#{pane_id}')
	tmux select-pane -t "$app" -T app
	docs=$(tmux split-window -v -t "$app" -P -F '#{pane_id}')
	tmux select-pane -t "$docs" -T docs
	local storybook ops
	storybook=$(tmux split-window -v -t "$docs" -P -F '#{pane_id}')
	tmux select-pane -t "$storybook" -T storybook
	ops=$(tmux split-window -v -t "$storybook" -P -F '#{pane_id}')
	tmux select-pane -t "$ops" -T ops
	tmux select-layout -t "$SESSION:processes" even-vertical

	# Show pane titles and keep them from being auto-renamed.
	tmux set-option -t "$SESSION" pane-border-status top
	tmux set-option -t "$SESSION" pane-border-format ' #{pane_title} '
	tmux set-option -t "$SESSION" -w automatic-rename off

	tmux select-window -t "$SESSION:tools"
	tmux select-pane -t "$editor"
	echo "Session '$SESSION' ready."
}

cmd_start_dev() {
	local mode=${1:-vite} app_cmd app_port
	case "$mode" in
		vite) app_cmd="pnpm dev" app_port=$PORT_VITE ;;
		docker) app_cmd="pnpm dev:docker" app_port=$PORT_DOCKER ;;
		*)
			echo "Unknown mode '$mode' (expected: vite | docker)." >&2
			exit 1
			;;
	esac

	tmux send-keys -t "$(pane_id_by_title processes app)" "$app_cmd" Enter
	tmux send-keys -t "$(pane_id_by_title processes ops)" "pnpm mail:docker" Enter
	tmux send-keys -t "$(pane_id_by_title processes docs)" "pnpm serve-docs" Enter
	# Storybook has no docker service, so it runs the same way in both modes.
	tmux send-keys -t "$(pane_id_by_title processes storybook)" "pnpm storybook" Enter
	echo "Started dev processes ($mode)."
}

cmd_stop_dev() {
	# vite/docker (app) and the docs server run in the foreground — C-c stops them.
	tmux send-keys -t "$(pane_id_by_title processes app)" C-c
	tmux send-keys -t "$(pane_id_by_title processes docs)" C-c
	tmux send-keys -t "$(pane_id_by_title processes storybook)" C-c
	# mailpit was started detached, so it needs an explicit down.
	tmux send-keys -t "$(pane_id_by_title processes ops)" "pnpm mail:docker:down" Enter
	echo "Stopped dev processes."
}

# Open dev URLs in the default browser via macOS `open`, run directly from this
# script (not piped through a pane, which races with whatever it's running).
# App port depends on vite vs docker.
cmd_open() {
	local target=${1:-all} mode=${2:-vite} app_port
	case "$mode" in
		vite) app_port=$PORT_VITE ;;
		docker) app_port=$PORT_DOCKER ;;
		*)
			echo "Unknown mode '$mode' (expected: vite | docker)." >&2
			exit 1
			;;
	esac

	# Collect URLs and hand them to a single `open`; firing one `open` per URL
	# races with a cold-starting browser and silently drops some tabs.
	local urls=()
	case "$target" in
		app) urls=("http://localhost:$app_port") ;;
		storybook) urls=("http://localhost:$PORT_STORYBOOK") ;;
		mailpit) urls=("http://localhost:$PORT_MAILPIT") ;;
		docs) urls=("http://localhost:$PORT_DOCS") ;;
		all)
			urls=(
				"http://localhost:$app_port"
				"http://localhost:$PORT_STORYBOOK"
				"http://localhost:$PORT_MAILPIT"
				"http://localhost:$PORT_DOCS"
			)
			;;
		*)
			echo "Unknown target '$target' (expected: app | storybook | mailpit | docs | all)." >&2
			exit 1
			;;
	esac
	open "${urls[@]}"
	echo "Opened '$target' ($mode)."
}

cmd_start_tools() {
	tmux send-keys -t "$(pane_id_by_title tools editor)" "nvim" Enter
	tmux send-keys -t "$(pane_id_by_title tools agent)" "claude" Enter
	echo "Started tools (nvim + claude)."
}

cmd_attach() {
	if [[ -n "${TMUX:-}" ]]; then
		tmux switch-client -t "$SESSION"
	else
		tmux attach-session -t "$SESSION"
	fi
}

case "${1:-}" in
	setup) cmd_setup ;;
	start-dev) cmd_start_dev "${2:-}" ;;
	stop-dev) cmd_stop_dev ;;
	open) cmd_open "${2:-}" "${3:-}" ;;
	start-tools) cmd_start_tools ;;
	up)
		cmd_setup
		cmd_start_tools
		cmd_start_dev "${2:-}"
		cmd_attach
		;;
	attach) cmd_attach ;;
	*)
		cat >&2 <<-EOF
			Usage: $0 <command>

			Commands:
			  setup                          Build the session, windows and panes.
			  start-dev [vite|docker]        Launch app/mail/docs/storybook (default: vite).
			  stop-dev                       Stop the app/mail/docs/storybook processes.
			  start-tools                    Launch nvim + claude in the tools window.
			  up [vite|docker]               setup + start-tools + start-dev, then attach.
			  open [target] [vite|docker]    Open dev URLs (target: app|storybook|mailpit|docs|all).
			  attach                         Attach to the session.
		EOF
		exit 1
		;;
esac
