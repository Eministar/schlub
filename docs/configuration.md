# Configuration Guide

This guide covers all configuration options for Schlub.

## Cloudflare Worker Configuration

### wrangler.toml

```toml
name = "schlub"
main = "src/index.ts"
compatibility_date = "2023-10-30"
account_id = "your-account-id"

# KV Namespaces for rate limiting
[[kv_namespaces]]
binding = "STARS"
id = "your-stars-kv-id"

[[kv_namespaces]]
binding = "WATCHES"
id = "your-watches-kv-id"
```

### Creating KV Namespaces

```powershell
# Create STARS namespace
npx wrangler kv:namespace create STARS

# Create WATCHES namespace
npx wrangler kv:namespace create WATCHES
```

---

## Environment Variables

Currently, Schlub doesn't require environment variables for basic operation. The Discord webhook credentials are passed via the URL path.

### Optional Secrets (Recommended for Production)

```powershell
# Set GitHub webhook secret for signature verification
npx wrangler secret put GITHUB_WEBHOOK_SECRET

# Set a custom footer text
npx wrangler secret put FOOTER_TEXT
```

---

## GitHub Webhook Configuration

### Required Headers

Schlub requires these headers from GitHub:
- `X-GitHub-Hook-ID` — Unique webhook identifier
- `X-GitHub-Event` — Event type (push, pull_request, etc.)

### Recommended Webhook Settings

1. **Payload URL:** `https://schlub.star-dev.xyz/v2/{webhookId}/{webhookToken}`
2. **Content type:** `application/json`
3. **Secret:** (Optional) For signature verification
4. **SSL verification:** Enabled

### Event Selection

#### Minimal Setup
- Push
- Pull requests

#### Recommended Setup
- Push
- Pull requests
- Issues
- Releases
- Stars

#### Full Setup
- Branch or tag creation
- Branch or tag deletion
- Deployments
- Deployment statuses
- Discussions
- Forks
- Issues
- Pull requests
- Pull request reviews
- Pushes
- Releases
- Repositories
- Stars
- Watches
- Workflow runs

---

## Discord Webhook Configuration

### Getting Webhook Credentials

1. Open Discord and go to your server
2. Right-click the channel → Edit Channel
3. Go to Integrations → Webhooks
4. Create a new webhook or use existing
5. Copy the webhook URL

### Webhook URL Format

```
https://discord.com/api/webhooks/123456789012345678/abcdefghijklmnopqrstuvwxyz
                                 ├─────────────────┤ ├────────────────────────┤
                                      Webhook ID            Webhook Token
```

### Thread Support

To post to a specific thread in a forum channel:

```
https://schlub.star-dev.xyz/v2/{webhookId}/{webhookToken}?thread_id={threadId}
```

---

## Rate Limiting

### Built-in Rate Limits

| Event | Cooldown | Scope |
|-------|----------|-------|
| Star | 15 minutes | Per user, per repo, per webhook |
| Watch | 15 minutes | Per user, per repo, per webhook |

### Customizing Cooldowns

Currently, cooldowns are hardcoded. To modify:

```typescript
// src/events/star.ts
const STAR_COOLDOWN = 60 * 15; // 15 minutes in seconds
```

---

## API Versioning

### Available Versions

| Version | Path | Description |
|---------|------|-------------|
| v1 | `/v1/...` | Legacy embeds, minimal formatting |
| v2 | `/v2/...` | Enhanced embeds with emojis, fields, buttons |
| (none) | `/...` | Defaults to v1 for backwards compatibility |

### Version Selection

The API version is determined by the URL path:

```
/v1/{webhookId}/{webhookToken}  → Legacy mode
/v2/{webhookId}/{webhookToken}  → Enhanced mode
/{webhookId}/{webhookToken}     → Legacy mode (default)
```

---

## Custom Domain Setup

### Cloudflare Workers Routes

1. Add your domain to Cloudflare
2. In Workers → Routes, add:
   ```
   schlub.yourdomain.com/*
   ```
3. Select your Worker

### DNS Configuration

Add a CNAME record:
```
schlub.yourdomain.com → your-worker.workers.dev
```

---

## Troubleshooting Configuration

### Common Issues

**"Invalid path" error:**
- Ensure URL format is `/v{n}/{webhookId}/{webhookToken}`
- Check that webhook ID and token are correct

**"Missing X-GitHub-Hook-ID" error:**
- Verify the request is coming from GitHub
- Check webhook settings in GitHub

**No embed appearing in Discord:**
- Event type may not be supported
- Check Discord webhook URL is correct
- Look at GitHub webhook delivery logs

### Debug Mode

For local development:

```powershell
npx wrangler dev --local
```

This enables local KV storage simulation.

