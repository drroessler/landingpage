# Project: Landing Page Redesign

## Goal
Review and redesign the existing `index.html` into a professional,
deployable React/Vite project, deployed on Vercel.

## Design Principles (Frontend Design Skill)
Use the existing skill defined in `SKILL.md`

## Tech Stack
- Vite + React
- react-bits components via MCP where they add visual value
- Tailwind CSS for utility styling
- Deploy target: Vercel (site + `/api` serverless functions)

## react-bits Usage Rules
- Use MCP to SEARCH available components before implementing anything
- Only use react-bits where it genuinely elevates the design:
  ✅ Hero animations, background effects, text reveals, scroll transitions
  ❌ Basic layout, navigation, simple text blocks
- Always fetch actual component source via MCP (don't guess props/API)
- Adapt colors/fonts to match the chosen design system

## Deployment Requirements (Vercel)
- `vite.config.ts`: `base` stays `/` (custom domain, no sub-path)
- Build output: `dist/`
- `vercel.json` rewrites everything except `/api/*` to `index.html` (BrowserRouter)
- Serverless functions live in `api/`; secrets go in Vercel env vars, never in the repo
- `package.json` has `"type": "module"`, so Vercel compiles `api/` to **ESM**: every
  relative import in `api/` and in the `src/reifecheck/*.ts` files it pulls in needs an
  explicit `.js` extension — even though the file is `.ts`. Without it the function dies
  at load with `ERR_MODULE_NOT_FOUND`, before the handler runs. esbuild and Vite resolve
  extensionless specifiers, so this never shows up locally; `npm run check:esm` guards it
  and runs as part of `npm run build`.

## Hero
- Two columns: copy left, the four-phase method film right (`src/hero/`), ported
  from the Claude Design file "NarraTec Hero Methode.dc.html".
- The stage is a fixed 893×584 coordinate space (visible 893×558 = 16:10) scaled
  with `transform` — never reflow it, the camera path and all positions are
  authored in those coordinates. The world (720×500) sits centred; the stage was
  widened from the design's 760 to reach 16:10, because shortening it would cut
  into the world, which extends to y=556.
- `.hero-col-film` is capped at 465px: that is the measured point where the film
  column becomes as tall as the copy column. Wider and the hero grows, pushing
  the trust bar below the fold and reopening a gap above the buttons.
- Times in `MethodFilm.tsx` are seconds on one 20.5 s axis; phase cues at
  0 / 5 / 10.5 / 15.5. Labels are bilingual in `filmCopy.ts`.
- The clock stops off-screen, in background tabs, and under
  `prefers-reduced-motion` (static poster frame). Keep those guards.

## Reifecheck
- Lives as section 10 of the landing page (`#reifecheck`), not as its own route.
  `ReifecheckSection.tsx` swaps intro → questions → contact → result in place;
  all primary CTAs are anchor jumps to it. Keep the calendar and mail routes intact.
- Questions, statements and document copy: `src/reifecheck/data.ts` + `copy.ts` — single source
  for the web view, the PDF and the Notion entry. Source of truth for the wording is
  `reifecheck_set1_v40.md`.
- **Bilingual.** German lives in `data.ts` / `copy.ts`, English in `data.en.ts` / `copy.en.ts`;
  German stays the source when content changes. The language travels inside the evaluation
  (`evaluation.lang`), so document, email and Notion entry all follow the language the visitor
  filled the form in. `copy.en.ts` is typed against `DocCopy`/`FormCopy`, so a missing passage
  fails the typecheck.
- Both language versions must share identical ids, option keys and levels — the evaluation
  matches on keys, not on wording. `npm run check:i18n` guards this (and flags untranslated
  text); it runs as part of `npm run build`.
- The evaluation is rule-based by design: one statement per chosen option, no scoring,
  no weighting, no language model. That claim is printed in the document — keep it true.
- The PDF must be **exactly three pages**: (1) title, preamble, Diagramm 1;
  (2) F1–F3 *and* R1–R6; (3) Diagramm 2, next step, method note. Page breaks are
  forced via `.nt-page-2` / `.nt-page-3`; overflow silently adds a fourth page.
- The landing section shows a thumbnail of the real page 1
  (`public/reifecheck-auswertung-seite1.jpg`) rendered from the same document.
  Regenerate with `npm run preview:build` after document changes; `pdf:check`
  warns when it is stale. Needs poppler.
- After changing document copy or layout run `npm run pdf:check` — it verifies **four** cases:
  both languages × the design's answers and the measured worst-case answer set. English text
  wraps differently, so it needs its own worst case: `npm run pdf:worst` writes
  `scripts/worst-case.json`, `npm run pdf:worst:en` writes `worst-case.en.json`. Re-run the
  matching one after editing answer or statement texts. Size lever is the type scale `T` at the
  top of `api/_lib/document.ts` (`itemPad` acts nine times over, so 1 pt there is ~18 pt on page 2).

## Workflow
1. Analyze existing index.html content and structure
2. Define aesthetic direction (document the choice)
3. Search react-bits MCP for suitable components
4. Scaffold Vite+React project
5. Implement design section by section
6. Configure for Vercel (vercel.json, env vars)
7. Verify build succeeds with `npm run build`