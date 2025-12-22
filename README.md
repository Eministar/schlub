# Schlub — GitHub → Discord Webhooks (improved)

A better GitHub webhook for Discord: nicer embeds, more events, and optional visual v2 output.

Status & quick summary

- ✅ Project language: English (docs & README)
- ✅ API versioning implemented: `/v1` (backwards-compatible) and `/v2` (enhanced visuals)
- ✅ Many event generators implemented and updated (repository events, push, pull_request, issues, fork, star, watch)
- ✅ `v2` provides a consistent nicer layout (fields, author block, timestamp, "Open on GitHub" button)
- ✅ KV namespaces created and bound (STARS, WATCHES)
- ✅ Local development: `npx wrangler dev` tested
- ✅ Deployed to Cloudflare Workers (workers.dev): `https://schlub.benounnaelemin.workers.dev`
- ✅ Custom domain prepared: `https://schlub.star-dev.xyz` (route available)
- ⚠️ Secrets: Discord webhook URL and GitHub webhook secret are NOT stored as Cloudflare secrets yet (recommended)

If you just want the short usage — here's how to get started quickly.

Quick usage / webhook URL formats

- v1 (backwards-compatible): `https://schlub.star-dev.xyz/v1/:webhookId/:webhookToken`
- v2 (enhanced visuals): `https://schlub.star-dev.xyz/v2/:webhookId/:webhookToken`
- legacy (no version prefix): `https://schlub.star-dev.xyz/:webhookId/:webhookToken` (defaults to v1)

Replace `:webhookId` and `:webhookToken` with the numeric id and token from your Discord webhook URL.

Local development (fast check)

- Install dependencies:

  ```powershell
  npm ci
  npm install --save-dev wrangler@^4
  ```

- Start local Worker emulation:

  ```powershell
  npx wrangler dev
  # opens local server (default http://127.0.0.1:8787)
  ```

- Send a test payload (PowerShell example):

  ```powershell
  $payload = @{ action='created'; repository=@{ full_name='owner/repo'; html_url='https://github.com/owner/repo'; name='repo'; description='desc' }; sender=@{ login='alice'; avatar_url='https://avatars.githubusercontent.com/u/123?v=4' } } | ConvertTo-Json -Depth 6
  Invoke-RestMethod -Uri 'http://127.0.0.1:8787/v2/123/yourtoken' -Method POST -Body $payload -ContentType 'application/json' -Headers @{ 'X-GitHub-Event'='repository'; 'X-GitHub-Hook-ID'='1' }
  ```

Deploy to Cloudflare (summary)

- Create KV namespaces (if not done already):
  ```powershell
  npx wrangler kv:namespace create "STARS"
  npx wrangler kv:namespace create "WATCHES"
  ```
  Copy the returned IDs into `wrangler.toml` under `[[kv_namespaces]]`.

- Set your Cloudflare API token (or use `npx wrangler login`):
  ```powershell
  setx CF_API_TOKEN "<YOUR_TOKEN>"
  # open a new terminal then:
  npx wrangler whoami
  ```

- Deploy:
  ```powershell
  npx wrangler deploy
  ```
  After deploy you will get a `workers.dev` URL (example from this project):
  `https://schlub.benounnaelemin.workers.dev`

DNS & route (Cloudflare dashboard)

1. Add DNS record (Cloudflare → DNS):
   - Type: CNAME
   - Name: `schlub`
   - Target: `@`
   - Proxy: enabled (orange cloud)
2. Add Worker route (Cloudflare → Workers → Routes):
   - Route: `schlub.star-dev.xyz/*`
   - Assign the deployed Worker (select it from the Worker dropdown)

Secrets (recommended — security)

- You can store sensitive values in Cloudflare using `wrangler secret put`:
  ```powershell
  npx wrangler secret put DISCORD_WEBHOOK_URL
  npx wrangler secret put GITHUB_WEBHOOK_SECRET
  ```
- Why: secrets keep webhook URLs and HMAC secrets out of your repository and make rotation easy.
- Note: the Worker code reads these values from `env.DISCORD_WEBHOOK_URL` and `env.GITHUB_WEBHOOK_SECRET`.

Testing (live + logs)

- After deploy, test the live endpoint:
  ```powershell
  Invoke-RestMethod -Uri 'https://schlub.star-dev.xyz/v2/123/yourtoken' -Method POST -Body $payload -ContentType 'application/json' -Headers @{ 'X-GitHub-Event'='repository' }
  ```
- Tail logs:
  ```powershell
  npx wrangler tail
  ```

What's done vs remaining

- Done: v1/v2 APIs, many event generators, v2 visuals, README in English, local dev + deploy, KV namespaces, workers.dev URL
- Remaining (recommended): store Discord webhook and GitHub webhook secret via `wrangler secret put`, add unit tests (Vitest) for v1 vs v2 outputs, optional CI for deploy and smoke tests

If you want, I can:
- add a `scripts/smoke.ps1` to automate local + live testing (I can create it now),
- add GitHub HMAC verification code into the request handler (I can implement and test locally),
- add minimal Vitest unit tests for repository.created (v1 & v2) — ask and I'll add them.

Thanks — tell me which of the remaining items I should implement next (secrets / HMAC validation / smoke script / tests).
