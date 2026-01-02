# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/).

## [2.0.0] - 2026-01-02

### Added
- **New Events:**
  - `release` — Release published, created, pre-released
  - `workflow_run` — GitHub Actions workflow completed (success/failure)
  - `pull_request_review` — PR reviews (approved, changes requested, commented)
  - `discussion` — Discussions created, answered, closed
  - `deployment_status` — Deployment status updates

- **Enhanced v2 Embeds:**
  - Emoji prefixes for all event titles
  - Detailed metadata fields (labels, assignees, reviewers, milestones)
  - Interactive buttons (View on GitHub, Compare, Logs, etc.)
  - Force push warning indicators
  - File change breakdown (+added ~modified -removed)
  - Commit message improvements with truncation
  - PR status colors (Open, Draft, Merged, Closed)
  - Workflow duration display
  - Asset count and size for releases

- **New Embed Utilities:**
  - `withEmoji()` — Add emoji prefix to titles
  - `formatLabels()` — Format label lists
  - `formatFileSize()` — Human-readable file sizes
  - `formatRelativeTime()` — Relative time formatting
  - `formatStats()` — Compact statistics display
  - `buildButtonRow()` — Multi-button row builder
  - `buildEnhancedV2Result()` — Extended v2 embed builder with more options

- **Extended Color Palette:**
  - Release, Discussion, Workflow (success/failure/pending)
  - Deployment, Fork, Watch, Security
  - Review states (approved, changes requested, commented)

- **Emoji Constants:**
  - Full emoji set for all event types

- **Comprehensive Documentation:**
  - `docs/README.md` — Main documentation
  - `docs/events.md` — Detailed event documentation
  - `docs/configuration.md` — Configuration guide
  - `docs/v2-embed-example.md` — Updated with all event examples

### Changed
- Improved `push` event: Better commit formatting, files changed breakdown
- Improved `pull_request` event: More metadata, better status indicators
- Improved `issues` event: Labels, assignees, milestones support
- Updated embed.ts with more utility functions

### Fixed
- Commit message now properly handles multi-line messages
- Better truncation for long descriptions

---

## [1.1.0] - 2025-XX-XX

### Added
- Project takeover: Active maintenance by new maintainer
- New repository events: `created`, `deleted`, `renamed`, `archived`, `unarchived`, `edited`, `transferred`, `publicized`, `privatized`
- API versioning: `/v1` (compatible) and `/v2` (enhanced embeds)
- Custom domain: `schlub.star-dev.xyz`

### Changed
- README updated to English
- Added `/v2` embed examples

---

## [1.0.0] - Initial Release

### Added
- Original project baseline
- Core events: fork, issues, push, pull_request, watch, star
- Discord webhook integration
- Cloudflare Workers deployment
