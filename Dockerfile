# syntax=docker/dockerfile:1.7

FROM node:22-alpine AS base
RUN corepack enable
WORKDIR /app

FROM base AS deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# better-sqlite3 builds native bindings
RUN apk add --no-cache python3 make g++ \
    && pnpm install --frozen-lockfile

FROM base AS build
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN pnpm build

FROM base AS prod-deps
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN apk add --no-cache python3 make g++ \
    && pnpm install --frozen-lockfile --prod \
    && apk del python3 make g++

FROM node:22-alpine AS runtime
RUN apk add --no-cache libstdc++ sqlite
WORKDIR /app
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0
ENV DATABASE_PATH=/app/data/app.db
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=build /app/build ./build
COPY --from=build /app/package.json ./package.json
COPY docker/entrypoint.sh ./entrypoint.sh
# Convenience wrapper so admin commands look the same in any shell:
#   docker compose exec app wsid migrate
RUN printf '#!/bin/sh\nexec node /app/build/cli.mjs "$@"\n' > /usr/local/bin/wsid \
    && chmod +x /usr/local/bin/wsid
RUN chmod +x ./entrypoint.sh \
    && mkdir -p /app/data
EXPOSE 3000
ENTRYPOINT ["./entrypoint.sh"]
