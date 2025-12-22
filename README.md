# Schlub

A better GitHub webhook for Discord.

Discord's built-in GitHub webhook support (accessible by appending `/github` to a webhook URL) covers [the basics](https://github.com/discord/discord-api-docs/issues/6203#issuecomment-1608151265), but the embeds look basic, [they have no plans to add new events](https://github.com/discord/discord-api-docs/issues/6203#issuecomment-1650544855), and they lack anti-spam measures for events such as `star` and `watch`.

Schlub aims to support more events, provide richer information, and mitigate spam.

## Project status / Continuation

This repository was originally developed as "Schlub" and is now continued and actively maintained by a new maintainer. The goal is to keep the existing API compatible (no breaking changes for current users) while offering a modern, optional embed variant with improved visuals.

In short: `/v1` stays compatible; `/v2` is the new, nicer embed variant that provides the same functionality but with improved layouts, buttons and extra metadata.

- `/v1` — current, backwards-compatible API (existing behavior preserved)
- `/v2` — new, opt-in visually enhanced embeds (same GitHub payloads, nicer output)

Migration: Choose the API version by changing the URL path (e.g. `/v1/:webhookId/:webhookToken` vs `/v2/:webhookId/:webhookToken`). Both endpoints accept the same GitHub webhook payloads.

## Webhook URL and domain

The public endpoint domain used by this project is now:

https://schlub.star-dev.xyz

Webhook URL format (choose v1 or v2):

- v1 (backwards-compatible): `https://schlub.star-dev.xyz/v1/:webhookId/:webhookToken`
- v2 (new visuals): `https://schlub.star-dev.xyz/v2/:webhookId/:webhookToken`
- legacy (no version prefix): `https://schlub.star-dev.xyz/:webhookId/:webhookToken` (defaults to v1)

Replace `:webhookId` and `:webhookToken` with the numeric id and token part from your Discord webhook URL.

## Usage

1. Create a webhook in your Discord server.
2. Copy the webhook URL (Discord gives you `https://discord.com/api/webhooks/:webhookId/:webhookToken`).
3. Take the `:webhookId` and `:webhookToken` parts and use them with the Schlub domain. For example:

- `https://schlub.star-dev.xyz/v2/123456789012345678/AbCdEfGhIjKlMnOpQrStUvWxY`

4. Use that URL in your GitHub repository's webhook settings.
5. Set the webhook's content type to `application/json`.
6. If not already enabled, enable SSL verification.
7. Done — for a new webhook you should see a "Pong!" message from the webhook.

## Feature parity

- [x] `repository` (created, deleted, renamed, archived, unarchived, edited, transferred, publicized, privatized)
- [x] `fork`
- [x] `issues`*
- [ ] `issue_comment`
- [x] `pull_request`*
- [ ] `pull_request_review`
- [ ] `pull_request_review_comment`
- [ ] `member`
- [ ] `public`
- [x] `push`*
- [ ] `commit_comment`
- [ ] `release`
- [x] `watch`
- [x] `star`
- [ ] `check_run`
- [ ] `check_suite`
- [ ] `discussion`
- [ ] `discussion_comment`

\* Not all actions may be implemented.

## Development & tests (short)

- TypeScript typecheck: `npm run typecheck` (if configured in the project)
- Tests: `npm run test` (if test scripts are present)
- Local development: `wrangler dev` or `npm run dev` (depending on your setup). You can then POST to the running worker locally with header `X-GitHub-Event: repository` and a minimal JSON payload to preview embeds.

Example minimal `created` payload (smoke test):

```json
{
  "action": "created",
  "repository": { "full_name": "owner/repo", "html_url": "https://github.com/owner/repo", "name":"repo", "description":"desc" },
  "sender": { "login": "alice", "avatar_url":"...", "html_url":"https://github.com/alice" }
}
```

## V2 visuals and documentation

`/v2` is opt-in and produces visually enhanced embeds (extra fields, buttons and metadata). See `docs/v2-embed-example.md` for a concrete example and notes about buttons and fields.

## Roadmap / Todos

- Tests for all events (Vitest) — TODO
- Optional: dedupe / rate-limit per event using KV for spam-prone events — TODO
- Polish `/v2` embeds: buttons, author avatars, footers, topics/labels — TODO
- Documentation for payload formats and examples under `docs/` — TODO

If you want, I can add a short changelog and a concrete `/v2` embed example (JSON) — I already added `CHANGELOG.md` and `docs/v2-embed-example.md` in the repository.
