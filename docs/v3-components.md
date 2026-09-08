# V3 — Discord Components V2

`/v3` renders the exact same events as `/v2`, but as a **Components V2** message instead of an embed.
Discord requires such a message to be flagged with `IS_COMPONENTS_V2` (`1 << 15`) and to carry
**no `content` and no `embeds`** — everything is a component.

```
https://schlub.eministar.dev/v3/{webhookId}/{webhookToken}
```

## Layout

Every event becomes one container:

```
┌ Container (accent_color = event color)
│  ## `📤` [Pushed 3 commits to eministar/schlub](compare-url)   ← Section
│  -# [Eministar](profile-url)                                   ← Thumbnail: avatar
│
│  [`abc1234`](commit-url) fix the thing — Eministar             ← description
│  ────────────────────────────────────────────                  ← Separator
│  `📝` **Commits** `3`  ·  `🌿` **Branch** `main`  ·  `📄` **Files Changed** `+3 ~1 -0`
│  ────────────────────────────────────────────
│  -# eministar/schlub • main · <t:1704067200:R>                  ← footer
│  [ Compare ] [ View Branch ]                                    ← ActionRow
└
```

- **Container** — carries the event color as `accent_color`, replacing the embed's colored bar.
- **Section** — title plus author line, with the author's avatar as the thumbnail accessory.
  Without an avatar the header degrades to a plain text display.
- **Separator** — splits header, metadata and footer.
- **ActionRow** — the v2 link buttons, unchanged.

## Backtick styling

v3 leans on inline code to make metadata scannable:

| Element | v2 | v3 |
|---------|----|----|
| Title emoji | `📤 Pushed 3 commits` | ``## `📤` Pushed 3 commits`` |
| Field | **Branch**<br>`main` | ``` `🌿` **Branch** `main` ``` |
| Timestamp | embed footer | `<t:1704067200:R>` (relative, localized) |

A field value is wrapped in backticks when it is a single token (`main`, `success`, `3`), or when
the field is known metadata (`branch`, `status`, `files changed`, `duration`, …). Prose values and
markdown links are left alone, so commit lists and release notes stay readable.

Field names get a leading emoji from a fixed map (`branch` → 🌿, `commits` → 📝, `status` → 📊, …);
unknown field names simply render without one.

## Compatibility

- All 19 events work — v3 re-renders the v2 result, so no event generator is v3-specific.
- The `style_{event}_emoji` / `style_{event}_color` query parameters work exactly as in v2.
- `?thread_id=` works exactly as in v1/v2.
- Discord's limits are enforced: max 10 containers, 4000 characters of text per container
  (long descriptions are truncated from the back).

## Implementation

| File | Role |
|------|------|
| `src/lib/componentsv2.ts` | Components V2 types + `toComponentsV2()` renderer |
| `src/lib/style.ts` | `splitLeadingEmoji()` and `codeValue()` — the backtick rules |
| `src/index.ts` | Routes `/v3`, runs the v2 generators, swaps the body shape |

Tests: `src/lib/componentsv2.test.ts` (`npm test`).
