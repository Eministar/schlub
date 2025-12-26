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
