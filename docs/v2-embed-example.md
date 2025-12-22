# V2 Embed Example

This is an example of how `/v2` embeds can look — visually cleaner, with explicit fields, a prominent author block, and actionable buttons. `/v2` accepts the same GitHub webhook payloads as `/v1`.

Example embed (JSON) for a `repository.created` event:

```json
{
  "content": null,
  "embeds": [
    {
      "title": "Repository created — owner/repo",
      "url": "https://github.com/owner/repo",
      "color": 7506394,
      "author": { "name": "alice", "icon_url": "https://avatars.githubusercontent.com/u/123?v=4", "url": "https://github.com/alice" },
      "description": "A short repository description goes here. Truncated to a reasonable length.",
      "fields": [
        { "name": "Default branch", "value": "main", "inline": true },
        { "name": "Visibility", "value": "public", "inline": true },
        { "name": "Topics", "value": "topic1, topic2", "inline": true }
      ],
      "footer": { "text": "schlub v2 — nicer embeds" },
      "timestamp": "2025-01-01T12:00:00.000Z"
    }
  ],
  "components": [
    {
      "type": 1,
      "components": [
        { "type": 2, "style": 5, "label": "Open on GitHub", "url": "https://github.com/owner/repo" },
        { "type": 2, "style": 2, "label": "Star", "custom_id": "star:owner/repo" }
      ]
    }
  ]
}
```

Design notes:
- Keep the title short and actionable; use fields for additional metadata.
- Use the author block for the GitHub user who triggered the event.
- Use Link buttons (`style: 5`) for external URLs and `custom_id` buttons for interactive actions (requires a separate interaction handler).
- Truncate long text to avoid oversized embeds; for v2 we provide description truncation by default.

Roadmap for v2 visuals:
- Automatically display topics and repository metadata as fields
- Add relative timestamps and localized strings
- Add configuration to opt-in/out of interactive buttons
