# Flatty

A small, data-driven 3D model of the flat for trying room finishes and future furniture layouts.

## Current scope

The first draft uses:

- the HDB floor plan PDF for room topology,
- measured usable dimensions from the annotated measurement image,
- room photos for approximate wall and floor finishes.

Measurements are treated as approximate because they were taken manually with a laser device and may include small error. Existing loose furniture is intentionally omitted; the first priority is floor, wall, room volume, and built-in finish accuracy.

## Run locally

```bash
npm install
npm run dev
```

Then open the URL printed by Vite.

## Build

```bash
npm run build
```

## Data notes

The flat model currently lives in `src/main.ts` as explicit room, wall, measurement, and finish data. That keeps the project minimal while making likely edits easy: update dimensions and material colors in one place without changing rendering code.

Private source files such as the original PDF, photos, and measurement image are ignored by git.
