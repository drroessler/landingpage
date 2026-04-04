# Project: Landing Page Redesign

## Goal
Review and redesign the existing `index.html` into a professional,
deployable React/Vite project for GitHub Pages.

## Design Principles (Frontend Design Skill)
Use the existing skill defined in `SKILL.md`

## Tech Stack
- Vite + React (for GitHub Pages compatibility)
- react-bits components via MCP where they add visual value
- Tailwind CSS for utility styling
- Deploy target: GitHub Pages via `gh-pages` branch or `/docs` folder

## react-bits Usage Rules
- Use MCP to SEARCH available components before implementing anything
- Only use react-bits where it genuinely elevates the design:
  ✅ Hero animations, background effects, text reveals, scroll transitions
  ❌ Basic layout, navigation, simple text blocks
- Always fetch actual component source via MCP (don't guess props/API)
- Adapt colors/fonts to match the chosen design system

## GitHub Pages Requirements
- `vite.config.ts`: set `base` to repo name, e.g. `/my-repo/`
- Build output: `dist/` folder
- All assets must use relative paths
- Add `.nojekyll` file to dist

## Workflow
1. Analyze existing index.html content and structure
2. Define aesthetic direction (document the choice)
3. Search react-bits MCP for suitable components
4. Scaffold Vite+React project
5. Implement design section by section
6. Configure for GitHub Pages
7. Verify build succeeds with `npm run build`