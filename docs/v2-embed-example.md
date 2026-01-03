# V2 Embed Examples

This document showcases the enhanced `/v2` embeds with detailed examples for each event type.

## Design Philosophy

The v2 embeds follow these principles:
- **Visual clarity**: Emojis and colors make status immediately recognizable
- **Information density**: Fields display key metadata at a glance
- **Actionable**: Buttons provide quick access to GitHub
- **Consistent**: All embeds follow the same layout pattern

---

## Push Event

When commits are pushed to a repository:

```json
{
  "embeds": [{
    "title": "📤 Pushed 3 commits to owner/repo",
    "url": "https://github.com/owner/repo/compare/abc123...def456",
    "description": "[`abc1234`](https://github.com/owner/repo/commit/abc1234) Add new feature — @alice\n[`def5678`](https://github.com/owner/repo/commit/def5678) Fix bug — @alice\n[`ghi9012`](https://github.com/owner/repo/commit/ghi9012) Update docs — @bob",
    "color": 2325810,
    "author": {
      "name": "alice",
      "icon_url": "https://avatars.githubusercontent.com/u/123?v=4",
      "url": "https://github.com/alice"
    },
    "fields": [
      { "name": "Commits", "value": "3", "inline": true },
      { "name": "Branch", "value": "`main`", "inline": true },
      { "name": "Files Changed", "value": "+15 ~8 -3", "inline": true }
    ],
    "footer": { "text": "owner/repo • main" },
    "timestamp": "2025-01-01T12:00:00.000Z"
  }],
  "components": [{
    "type": 1,
    "components": [
      { "type": 2, "style": 5, "label": "Compare", "url": "https://github.com/owner/repo/compare/..." },
      { "type": 2, "style": 5, "label": "View Branch", "url": "https://github.com/owner/repo/tree/main" }
    ]
  }]
}
```

### Force Push Warning
When a force push is detected, an additional warning field is shown:
```json
{
  "fields": [
    { "name": "⚠️ Force Push", "value": "Yes", "inline": true }
  ]
}
```

---

## Pull Request Event

### Opened PR
```json
{
  "embeds": [{
    "title": "🟢 Opened PR #42: Add amazing feature",
    "description": "This PR adds an amazing new feature that does...",
    "color": 2325810,
    "fields": [
      { "name": "Status", "value": "🟢 Open", "inline": true },
      { "name": "Branch", "value": "`feature/amazing` → `main`", "inline": true },
      { "name": "Changes", "value": "+250 -50 (12 files)", "inline": true },
      { "name": "Reviewers", "value": "@bob, @carol", "inline": true },
      { "name": "Labels", "value": "`enhancement`, `needs-review`", "inline": true }
    ],
    "footer": { "text": "owner/repo • Open PR #42" }
  }],
  "components": [{
    "type": 1,
    "components": [
      { "type": 2, "style": 5, "label": "View PR", "url": "..." },
      { "type": 2, "style": 5, "label": "Files Changed", "url": "..." },
      { "type": 2, "style": 5, "label": "Commits", "url": "..." }
    ]
  }]
}
```

### Merged PR
```json
{
  "embeds": [{
    "title": "🟣 Merged PR #42: Add amazing feature",
    "color": 8935909,
    "fields": [
      { "name": "Status", "value": "🟣 Merged", "inline": true },
      { "name": "Branch", "value": "`feature/amazing` → `main`", "inline": true },
      { "name": "Changes", "value": "+250 -50 (12 files)", "inline": true }
    ],
    "footer": { "text": "owner/repo • Merged PR #42" }
  }]
}
```

---

## Issue Event

### Opened Issue
```json
{
  "embeds": [{
    "title": "🟢 Opened issue owner/repo#123",
    "description": "When I try to do X, the application crashes with error Y...",
    "color": 2325810,
    "fields": [
      { "name": "Issue", "value": "[#123](https://...) Bug in feature X", "inline": false },
      { "name": "Status", "value": "🟢 Opened", "inline": true },
      { "name": "Labels", "value": "`bug`, `high-priority`", "inline": true },
      { "name": "Assignees", "value": "@alice", "inline": true }
    ],
    "footer": { "text": "owner/repo • Issue #123" }
  }]
}
```

### Closed Issue (Completed)
```json
{
  "embeds": [{
    "title": "✅ Closed issue owner/repo#123 as completed",
    "color": 8935909,
    "fields": [
      { "name": "Status", "value": "✅ Completed", "inline": true },
      { "name": "Comments", "value": "5", "inline": true }
    ]
  }]
}
```

---

## Release Event

```json
{
  "embeds": [{
    "title": "🎉 Released v2.0.0 on owner/repo",
    "description": "## What's New\n- Feature A\n- Feature B\n- Bug fixes...",
    "color": 2063596,
    "fields": [
      { "name": "Tag", "value": "`v2.0.0`", "inline": true },
      { "name": "Type", "value": "🏷️ Stable", "inline": true },
      { "name": "Assets", "value": "3 file(s) (15.2 MB)", "inline": true }
    ],
    "footer": { "text": "owner/repo • 🏷️ Stable" }
  }],
  "components": [{
    "type": 1,
    "components": [
      { "type": 2, "style": 5, "label": "View Release", "url": "..." },
      { "type": 2, "style": 5, "label": "Download", "url": "..." }
    ]
  }]
}
```

---

## Workflow Run Event

### Successful Workflow
```json
{
  "embeds": [{
    "title": "✅ Workflow \"CI\" Success",
    "color": 2325810,
    "fields": [
      { "name": "Workflow", "value": "CI", "inline": true },
      { "name": "Status", "value": "Success", "inline": true },
      { "name": "Branch", "value": "`main`", "inline": true },
      { "name": "Duration", "value": "2m 34s", "inline": true },
      { "name": "Run #", "value": "42", "inline": true },
      { "name": "Commit", "value": "[`abc1234`](https://...) Update dependencies", "inline": false }
    ],
    "footer": { "text": "owner/repo • CI" }
  }],
  "components": [{
    "type": 1,
    "components": [
      { "type": 2, "style": 5, "label": "View Run", "url": "..." },
      { "type": 2, "style": 5, "label": "View Logs", "url": "..." }
    ]
  }]
}
```

### Failed Workflow
```json
{
  "embeds": [{
    "title": "❌ Workflow \"CI\" Failure",
    "color": 14423101,
    "fields": [
      { "name": "Status", "value": "Failure", "inline": true },
      { "name": "Duration", "value": "1m 12s", "inline": true }
    ]
  }]
}
```

---

## Pull Request Review Event

```json
{
  "embeds": [{
    "title": "✅ Review Approved on PR #42",
    "description": "LGTM! Great work on this feature.",
    "color": 2325810,
    "fields": [
      { "name": "Pull Request", "value": "[#42](https://...) Add amazing feature", "inline": false },
      { "name": "Review", "value": "Approved", "inline": true },
      { "name": "Reviewer", "value": "[@bob](https://github.com/bob)", "inline": true },
      { "name": "Branch", "value": "`feature/amazing` → `main`", "inline": true }
    ],
    "footer": { "text": "owner/repo • PR #42" }
  }],
  "components": [{
    "type": 1,
    "components": [
      { "type": 2, "style": 5, "label": "View Review", "url": "..." },
      { "type": 2, "style": 5, "label": "View PR", "url": "..." }
    ]
  }]
}
```

---

## Discussion Event

### New Discussion
```json
{
  "embeds": [{
    "title": "💬 New discussion: How to implement feature X?",
    "url": "https://github.com/owner/repo/discussions/42",
    "description": "I'm trying to implement feature X but I'm not sure about the best approach. Should I use method A or method B?",
    "color": 5545973,
    "author": {
      "name": "alice",
      "icon_url": "https://avatars.githubusercontent.com/u/123?v=4",
      "url": "https://github.com/alice"
    },
    "thumbnail": {
      "url": "https://avatars.githubusercontent.com/u/123?v=4"
    },
    "fields": [
      { "name": "Category", "value": "❓ Q&A", "inline": true },
      { "name": "Status", "value": "🟢 Open", "inline": true },
      { "name": "Comments", "value": "💬 3", "inline": true },
      { "name": "Labels", "value": "`help wanted`, `question`", "inline": true },
      { "name": "Reactions", "value": "👍 5 🚀 2 👀 3", "inline": true },
      { "name": "Upvotes", "value": "⬆️ 12", "inline": true },
      { "name": "Created", "value": "2 hours ago", "inline": true }
    ],
    "footer": { "text": "owner/repo • Q&A" },
    "timestamp": "2025-01-03T12:00:00.000Z"
  }],
  "components": [{
    "type": 1,
    "components": [
      { "type": 2, "style": 5, "label": "View Discussion", "url": "...", "emoji": { "name": "💬" } },
      { "type": 2, "style": 5, "label": "Q&A", "url": "...", "emoji": { "name": "❓" } }
    ]
  }]
}
```

### Answered Discussion
```json
{
  "embeds": [{
    "title": "💬 Answered discussion: How to implement feature X?",
    "color": 2325810,
    "fields": [
      { "name": "Category", "value": "❓ Q&A", "inline": true },
      { "name": "Status", "value": "✅ Answered", "inline": true },
      { "name": "Comments", "value": "💬 8", "inline": true },
      { "name": "Reactions", "value": "👍 12 🎉 5 ❤️ 3", "inline": true },
      { "name": "Answered", "value": "5 minutes ago", "inline": true }
    ],
    "footer": { "text": "owner/repo • Q&A" }
  }],
  "components": [{
    "type": 1,
    "components": [
      { "type": 2, "style": 5, "label": "View Discussion", "url": "...", "emoji": { "name": "💬" } },
      { "type": 2, "style": 5, "label": "View Answer", "url": "...", "emoji": { "name": "✅" } }
    ]
  }]
}
```

### Pinned Discussion
```json
{
  "embeds": [{
    "title": "💬 Pinned discussion: Important Announcement",
    "color": 14922561,
    "fields": [
      { "name": "Category", "value": "📢 Announcements", "inline": true },
      { "name": "Status", "value": "📌 Pinned", "inline": true },
      { "name": "Comments", "value": "💬 25", "inline": true }
    ],
    "footer": { "text": "owner/repo • Announcements" }
  }]
}
```

### Locked Discussion
```json
{
  "embeds": [{
    "title": "💬 Locked discussion: Resolved: Bug in v2.0",
    "color": 14292292,
    "fields": [
      { "name": "Category", "value": "🆘 Help", "inline": true },
      { "name": "Status", "value": "🔒 Locked", "inline": true },
      { "name": "Lock Reason", "value": "resolved", "inline": true }
    ],
    "footer": { "text": "owner/repo • Help" }
  }]
}
```

---

## Deployment Status Event

```json
{
  "embeds": [{
    "title": "🚀 Deployment to production",
    "color": 2063596,
    "fields": [
      { "name": "Environment", "value": "production", "inline": true },
      { "name": "Status", "value": "✅ Success", "inline": true },
      { "name": "Ref", "value": "`main`", "inline": true },
      { "name": "Commit", "value": "[`abc1234`](https://...)", "inline": true }
    ],
    "footer": { "text": "owner/repo • production" }
  }],
  "components": [{
    "type": 1,
    "components": [
      { "type": 2, "style": 5, "label": "View Deployment", "url": "..." },
      { "type": 2, "style": 5, "label": "Open Environment", "url": "..." }
    ]
  }]
}
```

---

## Design Notes

### Color Palette
| Purpose | Hex | Usage |
|---------|-----|-------|
| Success/Open | `#238636` | Open PRs, successful workflows |
| Merged | `#8957e5` | Merged PRs, completed issues |
| Closed/Failure | `#da3633` | Closed PRs, failed workflows |
| Draft/Inactive | `#6e7681` | Draft PRs, pending items |
| Star | `#e3b341` | Star events |
| Release | `#1f6feb` | Release events |
| Warning | `#d29922` | Pending workflows |

### Button Guidelines
- Maximum 5 buttons per action row
- Use link buttons (style: 5) for GitHub URLs
- Add relevant emoji to button labels
- Primary action first (View, Open)
- Secondary actions after (Compare, Logs)
