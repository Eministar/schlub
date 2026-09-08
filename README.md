# Schlub — GitHub → Discord Webhooks (Enhanced)

A better GitHub webhook for Discord: Components V2 layouts, beautiful embeds, and extensive event coverage.

[![Deploy to Cloudflare Workers](https://deploy.workers.cloudflare.com/button)](https://deploy.workers.cloudflare.com/?url=https://github.com/eministar/schlub)

## ✨ Features

- 🧱 **Components V2 (v3)** — Containers, sections and separators with backtick-styled metadata
- 🎨 **Beautiful v2 Embeds** — Emoji-enhanced titles, metadata fields, action buttons
- 📦 **15+ Event Types** — Push, PR, Issues, Releases, Workflows, Deployments, and more
- 🔄 **API Versioning** — `/v1` (legacy), `/v2` (embeds) and `/v3` (Components V2)
- ⚡ **Cloudflare Workers** — Fast, global edge deployment
- 🛡️ **Rate Limiting** — Built-in anti-spam for star/watch events
- 📱 **Thread Support** — Post to Discord forum threads

## 🚀 Quick Start

### 1. Get Your Discord Webhook

Copy your Discord webhook URL:
```
https://discord.com/api/webhooks/{webhookId}/{webhookToken}
```

### 2. Add GitHub Webhook

In your repository settings, add a webhook with:
- **Payload URL:** `https://schlub.eministar.dev/v3/{webhookId}/{webhookToken}`
- **Content type:** `application/json`
- **Events:** Select the events you want

### 3. Done! 🎉

Your GitHub events will now appear as beautiful embeds in Discord.

---

## 📋 Supported Events

| Event | Description | v2 Enhancements |
|-------|-------------|-----------------|
| `push` | Commits pushed | 📤 Files breakdown, force push warning |
| `pull_request` | PRs opened/closed/merged | 🔀 Status colors, reviewers, labels |
| `issues` | Issues opened/closed | 📋 Labels, assignees, milestones |
| `release` | Releases published | 🎉 Assets, download buttons |
| `workflow_run` | CI/CD completed | ✅ Duration, logs link |
| `pull_request_review` | PR reviews | 📝 Approval status |
| `discussion` | Discussions | 💬 Category, answer link |
| `deployment_status` | Deployments | 🚀 Environment, status |
| `star` | Stars | ⭐ Anti-spam cooldown |
| `fork` | Forks | 🍴 Fork link |
| `repository` | Repo events | 📁 Created, renamed, etc. |

[📖 Full event documentation →](docs/events.md)

---

## 🔗 URL Formats

```bash
# v3 (recommended) — Components V2 containers
https://schlub.eministar.dev/v3/{webhookId}/{webhookToken}

# v2 — Enhanced embeds
https://schlub.eministar.dev/v2/{webhookId}/{webhookToken}

# v1 (legacy) — Simple embeds
https://schlub.eministar.dev/v1/{webhookId}/{webhookToken}

# With thread support
https://schlub.eministar.dev/v3/{webhookId}/{webhookToken}?thread_id={threadId}
```

---

## 💻 Local Development

```powershell
# Install dependencies
npm ci

# Start local server
npx wrangler dev

# Run type checking
npm run typecheck

# Run tests
npm test

# Deploy to Cloudflare
npm run deploy
```

---

## 📚 Documentation

- [📖 Main Documentation](docs/README.md)
- [📋 Supported Events](docs/events.md)
- [⚙️ Configuration Guide](docs/configuration.md)
- [🎨 V2 Embed Examples](docs/v2-embed-example.md)
- [🧱 V3 Components V2 Guide](docs/v3-components.md)

---

## 🛠️ Project Status

- ✅ API versioning: `/v1`, `/v2` and `/v3`
- ✅ 15+ event types supported
- ✅ Enhanced v2 embeds with emojis, fields, buttons
- ✅ KV namespaces for rate limiting
- ✅ Deployed: `https://schlub.eministar.dev`
- ✅ Comprehensive documentation

---

## 🤝 Credits & Attribution

**Schlub** was originally created by **[jackmthws](https://github.com/jackmthws)**
Original repository → https://github.com/jackmthws/schlub

This project is now **actively maintained and enhanced by [Eministar](https://github.com/Eministar)**.

### Notable Enhancements
- 🧱 v3 endpoint rendering every event as Discord Components V2
- 🎨 Beautiful v2 embed layouts with emojis and buttons
- 📦 5 new event types (release, workflow_run, PR review, discussion, deployment)
- 📖 Comprehensive documentation
- 🔧 Extended embed utilities
- ⚡ Improved code quality and TypeScript types

---

## 📄 License

[GNU License](LICENSE) — Feel free to use, modify, and distribute.
