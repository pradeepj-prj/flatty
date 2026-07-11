---
name: flatty-maintainability
description: Flatty maintainability guidance. Use when designing or editing code so simple implementations remain flexible, readable, configurable, and easy to change without hard-coded shortcuts.
---

# Flatty Maintainability

Maintainability should complement minimal code, not add unnecessary structure.

Guidelines:

- Keep domain data explicit: dimensions, colors, materials, furniture, and units should live in clear data objects, not scattered literals.
- Avoid hard-coding values that are likely to change, especially room measurements, wall heights, floor/wall materials, color palettes, furniture dimensions, and unit conversion factors.
- Name functions and variables after the flat-planning domain so future changes are easy to locate.
- Keep calculations pure where practical: geometry, measurement conversion, placement, snapping, and serialization should be testable without UI state.
- Prefer configuration-driven scene data over editing rendering code for every flat change.
- Validate external/project data at boundaries before rendering or saving.
- Make the common path simple, but leave obvious seams for realistic future changes such as new rooms, different material colors, or imported furniture models.

If simplicity and flexibility conflict, choose the simplest design that makes known likely changes cheap.
