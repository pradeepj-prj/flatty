---
name: flatty-minimal-code
description: "Flatty coding style. Use during implementation and refactoring to avoid overengineering: prefer fewer cohesive files, simple data shapes, direct solutions, and minimal dependencies."
---

# Flatty Minimal Code

When implementing features in this project:

- Prefer the smallest solution that solves the current requirement well.
- Use fewer, deeper files over many tiny files with cross-file indirection.
- Avoid premature abstractions, generic frameworks, and elaborate patterns until there is a repeated need.
- Keep dependencies minimal; add a package only when it materially reduces complexity.
- Prefer plain data structures and readable functions over clever abstractions.
- Keep feature boundaries obvious, but do not split code just to satisfy a pattern.
- Remove dead code and unused options instead of leaving speculative extension points.

A good default is: one cohesive module per major concept, with helpers kept near the code that uses them until they are reused.
