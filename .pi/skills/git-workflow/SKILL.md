---
name: flatty-git-workflow
description: "Project git workflow for Flatty. Use before any code or documentation change: pull/check remote changes, create or switch to a task branch, make changes there, and ask whether a PR should be created after completing changes."
---

# Flatty Git Workflow

Use this workflow before making any project changes.

1. Check the repository and remote state:
   ```bash
   git status --short --branch
   git remote -v
   git fetch origin
   ```
2. Pull remote changes before editing:
   - If the current branch tracks a remote branch, run `git pull --ff-only`.
   - If starting from `main`, run `git pull --ff-only origin main`.
   - If the remote is empty or has no matching branch, note that and continue.
3. Create a focused branch before changing files:
   ```bash
   git checkout -b <type>/<short-task-name>
   ```
   Use clear branch prefixes such as `feature/`, `fix/`, `docs/`, `setup/`, or `research/`.
4. Make changes only on the task branch.
5. Before finishing, show:
   ```bash
   git status --short --branch
   ```
6. Ask the user whether they want a PR created. Do not create a PR unless asked.

Keep commits and PRs focused on a single task.
