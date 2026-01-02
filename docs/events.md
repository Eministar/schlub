# Supported Events

This document provides detailed information about all GitHub webhook events supported by Schlub.

---

## Push Events

Triggered when commits are pushed to a branch or tag.

### v2 Features
- 📤 Emoji indicator in title
- Commit list with links (max 8 displayed)
- Files changed breakdown (+added ~modified -removed)
- Force push warning indicator
- Branch/tag information
- Quick access buttons: Compare, View Branch

### Example Payload
```json
{
  "title": "📤 Pushed 3 commits to owner/repo",
  "fields": [
    { "name": "Commits", "value": "3", "inline": true },
    { "name": "Branch", "value": "`main`", "inline": true },
    { "name": "Files Changed", "value": "+5 ~2 -1", "inline": true }
  ]
}
```

---

## Pull Request Events

Triggered on PR open, close, merge, ready for review, etc.

### Supported Actions
- `opened` — New PR created
- `closed` — PR closed (merged or not)
- `reopened` — PR reopened
- `ready_for_review` — Draft PR marked ready
- `converted_to_draft` — PR converted to draft

### v2 Features
- Status emoji (🟢 Open, 🔴 Closed, 🟣 Merged, 📝 Draft)
- Branch direction (head → base)
- Line changes (+additions -deletions)
- Reviewers, Labels, Assignees
- Quick access buttons: View PR, Files Changed, Commits

### Color Codes
| Status | Color |
|--------|-------|
| Open | Green (#238636) |
| Draft | Gray (#6e7681) |
| Closed | Red (#da3633) |
| Merged | Purple (#8957e5) |

---

## Issue Events

Triggered when issues are opened, closed, or reopened.

### Supported Actions
- `opened` — New issue created
- `closed` — Issue closed (completed or not planned)
- `reopened` — Issue reopened

### v2 Features
- Status emoji (🟢 Opened, 🔄 Reopened, ✅ Completed, ⏭️ Not Planned)
- Labels display
- Assignees
- Milestone (if set)
- Comment count
- Quick access button: View Issue

---

## Release Events

Triggered when releases are published, created, or edited.

### Supported Actions
- `published` — Release published
- `created` — Release created
- `released` — Release marked as latest
- `prereleased` — Pre-release published

### v2 Features
- 🎉 Release emoji in title
- Tag name
- Release type (Stable, Pre-release, Draft)
- Asset count and total size
- Quick access buttons: View Release, Download

---

## Workflow Run Events

Triggered when GitHub Actions workflows complete.

### Supported Actions
- `completed` — Workflow finished

### v2 Features
- Status emoji (✅ Success, ❌ Failure, ⏳ Pending)
- Workflow name
- Run duration
- Branch and commit info
- Run number and attempt
- Quick access buttons: View Run, View Logs

### Color Codes
| Conclusion | Color |
|------------|-------|
| Success | Green (#238636) |
| Failure | Red (#da3633) |
| Pending | Yellow (#d29922) |

---

## Pull Request Review Events

Triggered when PR reviews are submitted.

### Supported Actions
- `submitted` — Review submitted

### v2 Features
- Review state emoji (✅ Approved, 🔄 Changes Requested, 💬 Commented)
- Reviewer info
- Branch direction
- Quick access buttons: View Review, View PR

---

## Discussion Events

Triggered on repository discussions.

### Supported Actions
- `created` — New discussion
- `answered` — Discussion marked as answered
- `closed` — Discussion closed
- `reopened` — Discussion reopened

### v2 Features
- 💬 Discussion emoji in title
- Category
- Status (Open, Answered, Closed)
- Comment count
- Quick access buttons: View Discussion, View Answer

---

## Deployment Status Events

Triggered when deployment status changes.

### Supported States
- `success` — Deployment successful
- `failure` — Deployment failed
- `error` — Deployment error
- `pending` — Deployment pending
- `in_progress` — Deployment in progress

### v2 Features
- 🚀 Deployment emoji in title
- Environment name
- Status with emoji
- Ref and commit info
- Quick access buttons: View Deployment, View Logs, Open Environment

---

## Star Events

Triggered when repository is starred.

### Features
- ⭐ Star emoji
- Stargazer count
- 15-minute cooldown per user (anti-spam)
- Quick access button: View Stargazers

---

## Watch Events

Triggered when repository is watched.

### Features
- 👀 Watch indicator
- Similar anti-spam cooldown

---

## Fork Events

Triggered when repository is forked.

### Features
- 🍴 Fork indicator
- Link to forked repository

---

## Repository Events

Triggered on repository lifecycle changes.

### Supported Actions
- `created` — Repository created
- `deleted` — Repository deleted
- `renamed` — Repository renamed
- `archived` — Repository archived
- `unarchived` — Repository unarchived
- `edited` — Repository settings edited
- `transferred` — Repository transferred
- `publicized` — Repository made public
- `privatized` — Repository made private

### v2 Features
- 📁 Repository emoji
- Default branch
- Visibility (public/private)
- Description

