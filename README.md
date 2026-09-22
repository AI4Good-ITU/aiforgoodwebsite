# AI for Good Website

[Payload 3](https://payloadcms.com) + [Next.js](https://nextjs.org) + Postgres.

## Setup

```sh
cp .env.example .env          # then set PAYLOAD_SECRET: openssl rand -hex 32
docker-compose up -d postgres
npm install
npm run dev                   # http://localhost:3000/admin
```

Already have Postgres? Skip the `docker-compose` line and point `DATABASE_URL` at any empty database.

## Schema changes

Dev auto-applies schema changes to your local DB on restart (`push` mode). Production does not — it only runs committed migrations. **Before deploying any field/collection change:**

```sh
npm run migrate:create        # generate migration from schema diff -> src/migrations/
npm run migrate:status        # what's applied
```

Commit the generated file. Deploy runs `npm run migrate`.

## Commands

```sh
npm run dev              # dev server
npm run devsafe          # dev server, clean .next
npm run build            # production build
npm run start            # serve production build
npm run migrate          # apply pending migrations
npm run generate:types   # regenerate src/payload-types.ts after schema edits
npm run test:int         # vitest (needs Postgres running)
npm run test:e2e         # playwright
```

## Layout

| Path | What |
|---|---|
| [src/payload.config.ts](src/payload.config.ts) | Payload config, DB adapter |
| [src/collections/](src/collections/) | `Users` (auth), `Media` (uploads) |
| [src/app/(frontend)/](src/app/(frontend)/) | Public site |
| [src/app/(payload)/](src/app/(payload)/) | Admin panel + REST/GraphQL routes |
| [src/migrations/](src/migrations/) | Committed Postgres migrations |

## Docker

`docker-compose up` runs app + DB; `docker-compose up -d postgres` runs just the DB (recommended — keep the dev server on the host). The `payload` service overrides `DATABASE_URL` to reach the DB at host `postgres`, so one `.env` works either way.

Data lives in the `pgdata` volume. `docker-compose down -v` wipes it.

## Deploy (single server)

[docker-compose.prod.yml](docker-compose.prod.yml) runs the production stack on one host: Postgres, a one-shot migration job, and the app built from the [Dockerfile](Dockerfile).

```sh
git clone git@github.com:AI4Good-ITU/aiforgoodwebsite.git && cd aiforgoodwebsite
cp .env.example .env
# In .env set:
#   PAYLOAD_SECRET=$(openssl rand -hex 32)
#   POSTGRES_PASSWORD=<a long random password>
#   APP_HOST=summit.example.org        # public hostname; must resolve to this server
# DATABASE_URL is composed from POSTGRES_PASSWORD by the compose file; leave it as is.
docker compose -f docker-compose.prod.yml up -d --build
```

The app listens on `127.0.0.1:3000` only and carries Traefik labels: with a Traefik that watches Docker and has a `letsencrypt` resolver on a `websecure` entrypoint, `APP_HOST` is routed and gets its certificate automatically. Let's Encrypt does not issue certificates for bare IP addresses, so `APP_HOST` has to be a name. Without Traefik the labels are inert; any reverse proxy can front `127.0.0.1:3000` — with [Caddy](https://caddyserver.com) that is a two-line `Caddyfile`:

```
summit.example.org {
    reverse_proxy 127.0.0.1:3000
}
```

To ship an update: `git pull && docker compose -f docker-compose.prod.yml up -d --build`. Migrations run before the app starts; Postgres data is in the `pgdata` volume and uploads in `media`.

## Gotchas

- Hydration warning about `cz-shortcut-listen` on `<body>`? That's the ColorZilla extension, not the app. Disable it for localhost. The frontend layout already sets `suppressHydrationWarning`; the admin `<body>` is rendered by Payload and takes no props, so it can't be suppressed.
- Dev credentials in [docker-compose.yml](docker-compose.yml) are throwaway. Use real ones in production.
- Migrations are Postgres-specific SQL — generate them against Postgres.
- Uploads go to `./media` on local disk. Add a storage adapter (S3, Vercel Blob) before deploying anywhere with an ephemeral filesystem.
- [Dockerfile](Dockerfile) needs `output: 'standalone'`, already set in [next.config.ts](next.config.ts).
