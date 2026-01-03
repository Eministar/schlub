# Schlub Documentation

Welcome to the **Schlub** documentation — your enhanced GitHub → Discord webhook integration.

> 🌐 **Live Demo:** Visit [schlub.star-dev.xyz](https://schlub.star-dev.xyz) for an interactive landing page with quick setup instructions.

## Table of Contents

- [Quick Start](#quick-start)
- [API Versions](#api-versions)
- [Supported Events](#supported-events)
- [Webhook URL Format](#webhook-url-format)
- [Configuration](#configuration)
- [Examples](#examples)
- [Troubleshooting](#troubleshooting)

---

## Overview

**Schlub** transforms GitHub webhook events into beautiful Discord notifications. Instead of raw JSON or plain text, you get:

- 🎨 **Rich Embeds** — Color-coded by event type and status
- 🔘 **Interactive Buttons** — Quick links to PRs, commits, releases
- 📊 **Smart Fields** — Key information at a glance
- ⚡ **Instant Delivery** — Powered by Cloudflare Workers

### Links

- 🌐 [Landing Page](https://schlub.star-dev.xyz)
- 📦 [GitHub Repository](https://github.com/starlightcms/schlub)
- 💬 [Discord Support](https://discord.gg/xbWHcDsZEv)
- 🐛 [Report Issues](https://github.com/starlightcms/schlub/issues)

---

## Quick Start

### 1. Get your Discord Webhook URL

1. Go to your Discord server settings
2. Navigate to **Integrations** → **Webhooks**
3. Click **New Webhook** or select an existing one
4. Copy the webhook URL (e.g., `https://discord.com/api/webhooks/123456789/abcdefg...`)

### 2. Extract Webhook ID and Token

From your Discord webhook URL:
```
https://discord.com/api/webhooks/{webhookId}/{webhookToken}
```

### 3. Configure GitHub Webhook

1. Go to your GitHub repository → **Settings** → **Webhooks**
2. Click **Add webhook**
3. Set the Payload URL to one of:
   - **v2 (recommended):** `https://schlub.star-dev.xyz/v2/{webhookId}/{webhookToken}`
   - **v1 (legacy):** `https://schlub.star-dev.xyz/v1/{webhookId}/{webhookToken}`
4. Set Content type to `application/json`
5. Select the events you want to receive
6. Click **Add webhook**

---

## API Versions

### `/v1` — Legacy Mode
- Basic Discord embeds
- Simple formatting
- Backwards compatible with original Schlub

### `/v2` — Enhanced Mode (Recommended)
- Beautiful rich embeds with emojis
- Detailed metadata fields
- Interactive "Open on GitHub" buttons
- Color-coded by event type and status
- Timestamps on all embeds
- Better truncation and formatting

---

## Supported Events

| Event | Description | v1 | v2 |
|-------|-------------|----|----|
| `push` | Commits pushed to repository | ✅ | ✅ Enhanced |
| `pull_request` | PR opened, closed, merged, etc. | ✅ | ✅ Enhanced |
| `issues` | Issues opened, closed, reopened | ✅ | ✅ Enhanced |
| `star` | Repository starred | ✅ | ✅ Enhanced |
| `watch` | Repository watched | ✅ | ✅ Enhanced |
| `fork` | Repository forked | ✅ | ✅ Enhanced |
| `repository` | Repository created, deleted, etc. | ✅ | ✅ Enhanced |
| `release` | Releases published | ✅ | ✅ Enhanced |
| `workflow_run` | GitHub Actions workflow completed | ✅ | ✅ Enhanced |
| `pull_request_review` | PR reviews submitted | ✅ | ✅ Enhanced |
| `discussion` | Discussions created, answered | ✅ | ✅ Enhanced |
| `deployment_status` | Deployment status updates | ✅ | ✅ Enhanced |
| `ping` | Webhook test ping | ✅ | ✅ |
| `package` | Package published | ✅ | ✅ |

---

## Webhook URL Format

### Basic Format
```
https://schlub.star-dev.xyz/{version}/{webhookId}/{webhookToken}
```

### With Thread ID (for Discord Forum Channels)
```
https://schlub.star-dev.xyz/{version}/{webhookId}/{webhookToken}?thread_id={threadId}
```

### Examples
```bash
# v2 (recommended)
https://schlub.star-dev.xyz/v2/123456789012345678/abcdefghijklmnop

# v1 (legacy)
https://schlub.star-dev.xyz/v1/123456789012345678/abcdefghijklmnop

# With thread
https://schlub.star-dev.xyz/v2/123456789012345678/abcdefghijklmnop?thread_id=987654321
```

---

## Configuration

### GitHub Webhook Settings

**Recommended events to enable:**
- ✅ Push
- ✅ Pull requests
- ✅ Issues
- ✅ Stars
- ✅ Releases
- ✅ Workflow runs (for CI/CD notifications)
- ✅ Discussions

**Content type:** `application/json`

### Rate Limiting

Schlub implements smart rate limiting for certain events:
- **Stars:** 15-minute cooldown per user per repository
- **Watches:** Similar cooldown to prevent spam

---

## Examples

### v2 Push Event
```json
{
  "embeds": [{
    "title": "📤 Pushed 3 commits to owner/repo",
    "description": "[`abc1234`](https://github.com/...) Add new feature — @alice\n...",
    "color": 2325810,
    "author": { "name": "alice", "icon_url": "..." },
    "fields": [
      { "name": "Commits", "value": "3", "inline": true },
      { "name": "Branch", "value": "`main`", "inline": true },
      { "name": "Files Changed", "value": "+5 ~2 -1", "inline": true }
    ],
    "footer": { "text": "owner/repo • main" },
    "timestamp": "2025-01-01T12:00:00.000Z"
  }],
  "components": [{
    "type": 1,
    "components": [
      { "type": 2, "style": 5, "label": "Compare", "url": "..." },
      { "type": 2, "style": 5, "label": "View Branch", "url": "..." }
    ]
  }]
}
```

### v2 Pull Request Event
```json
{
  "embeds": [{
    "title": "🟣 Merged PR #42: Fix critical bug",
    "description": "This PR fixes the critical bug in...",
    "color": 8935909,
    "fields": [
      { "name": "Status", "value": "🟣 Merged", "inline": true },
      { "name": "Branch", "value": "`feature` → `main`", "inline": true },
      { "name": "Changes", "value": "+100 -20 (5 files)", "inline": true }
    ]
  }]
}
```

---

## Troubleshooting

### Webhook not receiving events?
1. Check if the webhook URL is correct
2. Verify the `X-GitHub-Hook-ID` header is present
3. Check GitHub webhook delivery logs for errors

### Embed not showing?
1. Some events are filtered (e.g., draft PR edits)
2. Check if the event type is supported
3. Try using `/v2` for better error handling

### Rate limited?
- Stars and watches have built-in cooldowns
- Check back after 15 minutes

---

## Development

### Local Setup
```powershell
# Install dependencies
npm ci

# Start local development server
npx wrangler dev
```

### Testing
```powershell
# Run tests
npm test

# Type checking
npm run typecheck
```

### Deployment
```powershell
# Deploy to Cloudflare Workers
npm run deploy
```

---

## Credits

**Schlub** was originally created by **jackmthws**.

This version is actively maintained and enhanced by **Eministar** with:
- Enhanced v2 embeds
- Extended event coverage
- API versioning
- Cloudflare Workers deployment

