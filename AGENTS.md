## Development

When starting the dev server, use background mode:

```
astro dev --background
```

Manage the background server with `astro dev stop`, `astro dev status`, and `astro dev logs`.

## Documentation

Before adding or editing posts, read `CONTRIBUTING.md` and `docs/posts.md`.
Use these documents when answering contributors' questions about article folders,
images, thumbnails, year navigation, and publishing. Keep them updated when the
workflow changes. Do not rerun the legacy import for normal article updates.

Full documentation: https://docs.astro.build

Consult these guides before working on related tasks:

- [Adding pages, dynamic routes, or middleware](https://docs.astro.build/en/guides/routing/)
- [Working with Astro components](https://docs.astro.build/en/basics/astro-components/)
- [Using React, Vue, Svelte, or other framework components](https://docs.astro.build/en/guides/framework-components/)
- [Adding or managing content](https://docs.astro.build/en/guides/content-collections/)
- [Adding styles or using Tailwind](https://docs.astro.build/en/guides/styling/)
- [Supporting multiple languages](https://docs.astro.build/en/guides/internationalization/)

## Chat handoff prompts

When preparing a prompt for continuing this project in a new chat, put the
following chat-name marker on the first line:

```text
【大島研ウェブサイト】[YYYY][MMDD]
```

Use the prompt creation date in Japan Standard Time for `YYYY` and `MMDD`.
Include an explicit instruction that this marker should be treated as the chat
name. After the marker, summarize the current project state, uncommitted
changes, latest commits, completed work, and the next tasks or decisions.
