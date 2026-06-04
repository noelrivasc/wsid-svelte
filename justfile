default:
  just --list

# Run the CLI in vite (tsx)
wsid *args:
	pnpm cli {{args}}

# Run the CLI through docker
wsidd *args:
	pnpm cli:docker {{args}}

# setup + tools + dev (vite), then attach
up:
	./tmux-setup.sh up vite

# setup + tools + dev (docker), then attach
upd:
	./tmux-setup.sh up docker

# Start dev processes (vite)
start:
	./tmux-setup.sh start-dev vite

# Start dev processes (docker)
startd:
	./tmux-setup.sh start-dev docker

# Stop dev processes (vite or docker)
stop:
  ./tmux-setup.sh stop-dev
alias stopd := stop

# Open dev URLs in the browser
open:
	./tmux-setup.sh open
