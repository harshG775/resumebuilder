# Resume domain

Everything specific to modeling and building a resume lives under `src/modules/resume/`.

## Schema

`src/modules/resume/schema/resume.zod-schema.ts` defines `ResumeZodSchema`, whose inferred type `ResumeValues` is the single representation of a resume's content used throughout the app:

- `basics` — name, headline, contact fields, a `website` (with a `showLink` toggle), and an arbitrary list of `customFields` (label/URL pairs).
- `sections` — a fixed set of sections, each with a shared shape (`title`, `hidden`, `columns`) plus an `items` array of section-specific entries: `summary` (single text block, no items), `skills`, `experience`, `projects`, `education`, `certifications`.
- `order` — an array used to persist the user's chosen section ordering.

Date fields use `z.iso.date()`, and items with a start/end date pair (`experience`, `projects`, `education`) are refined to require `startDate <= endDate` when an end date is present.

This one schema is reused in three places: as the TanStack Form validator in the builder, as the TypeScript type of the `resume.content` `jsonb` column (`src/lib/db/schema/resume.ts`), and as the input type for template renderers (below). Changing the shape of a resume means updating this schema and everything that reads `ResumeValues` follows from it.

## Defaults

`src/modules/resume/data/resume-default-values.ts` exports `resumeDefaultValues`, a fully-populated `ResumeValues` object. It's used both as the Postgres column default and as the initial form state when `createResumeFn` creates a new resume.

## Builder UI

`src/modules/resume/builder/index.tsx` is the top-level `Builder` component, rendered by the `/builder/resumes/$resume_slug` route once a resume has been loaded. It:

1. Creates a TanStack Form (via `useAppForm`, see [architecture.md](./architecture.md#forms--ui-components)) with `resumeValue` as `defaultValues` and `ResumeZodSchema` as the on-change validator.
2. Looks up the active template (currently hardcoded to `"classic"`) via `getTemplate`.
3. Lays out three panes through `BuilderLayout` (`builder/components/builder-layout.tsx`): an **editor** pane (the section forms, from `builder/Editor/`), a **design** pane (currently a placeholder), and a **preview** pane.
4. The preview pane subscribes to the form's values and passes `template.render(values)` — a Typst source string — into `TypstPreview`, wrapped in `<ClientOnly>` since Typst only runs in the browser (see [typst-rendering.md](./typst-rendering.md)).
5. Download compiles the same Typst source to PDF via `useTypstCompileToPdf` and saves it with `downloadBlob`.

Each resume section (`basics`, `summary`, `skills`, `experience`, `projects`, `education`, `certifications`) has its own editor component in `builder/Editor/`, and reorderable list items use `sortable-item.tsx` (built on `@dnd-kit`).

## Template renderer system

A "template" is a pure function that turns `ResumeValues` into a Typst source string. The contract is defined in `builder/templates/template.type.ts`:

```ts
export type ResumeTemplate = {
    meta: TemplateMeta // id, label, optional thumbnail
    render: (values: ResumeValues) => string
}
```

`builder/templates/classic.ts` is the current (only) implementation: it destructures the fields it needs from `ResumeValues` and interpolates them into a Typst markup string (page setup, headings, a summary section, a skills list), running any user-supplied text through `escapeTypst` first so characters that are meaningful in Typst syntax (``* _ # $ @ ` < > [ ]``) don't corrupt the layout or allow markup injection. `builder/templates/index.ts` is the registry (`getTemplate(id)`) that the builder and any future template picker would use to look up a template by `TemplateId`.

Adding a new template means implementing `ResumeTemplate` in a new file and registering it in `templates/index.ts`; the builder and preview/export pipeline are agnostic to which template is active since they only depend on the `render` function's signature.
