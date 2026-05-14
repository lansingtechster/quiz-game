# My AI Builder Quiz App

Welcome! This is your personal copy of the AI Builder starter project. Across
four workshops, you'll grow this into a real quiz app built with AI — and you'll
publish it live on the web for anyone to play.

## What's in this repo

- `index.html` — placeholder home page (you'll replace this with your quiz)
- `.github/codespaces/devcontainer/devcontainer.json` — pre-configured cloud
  dev environment with GitHub Copilot, Copilot Chat, Live Preview, and the
  Playwright MCP server
- `.vscode/mcp.json` — tells Copilot Chat where to find the Playwright MCP
  server so AI can "see" your app in a browser

You don't need to install anything on your computer. Everything runs in
**GitHub Codespaces**.

## Step 1 — Fork this repository

1. Make sure you're signed in to GitHub
2. Click the **Fork** button at the top right of this page
3. Pick your own account as the destination
4. Click **Create fork**

You now have your own copy at `https://github.com/<your-username>/quiz-game`.

## Step 2 — Open it in a Codespace

1. On your fork, click the green **Code** button
2. Switch to the **Codespaces** tab
3. Click **Create codespace on main**
4. Wait 1–2 minutes for the container to build (only the first time)
5. When VS Code opens in your browser, you're ready

The Codespace already has GitHub Copilot, Copilot Chat, and the Playwright MCP
server installed.

## Step 3 — Publish your app with GitHub Pages

GitHub Pages turns your repo into a real website that anyone can visit.

1. On your fork (not the Codespace), go to **Settings** → **Pages**
2. Under **Build and deployment**:
   - **Source**: Deploy from a branch
   - **Branch**: `main` &nbsp; **Folder**: `/ (root)`
3. Click **Save**
4. Wait ~1 minute, then refresh the Pages settings page
5. You'll see: `Your site is live at https://<your-username>.github.io/quiz-game/`

Visit that URL — you should see the placeholder page from this starter. As you
build your quiz app and push commits, the live site will update automatically.

> **Tip:** Pages can take a couple of minutes to update after each push. If you
> don't see changes right away, wait a moment and refresh.

## Step 4 — Start the workshop

Head back to the workshop instructions and start prompting! You'll replace
`index.html` with the quiz app you build, save your work with `git commit`, and
push to GitHub to update your live site.

## Branch convention (for the instructor only)

- `main` — the base starter template (don't change unless you're updating the
  template itself)
- `current` — the instructor's working branch used during live demos in class

Students should work on their own fork's `main` (or any branch they want — they
own their fork).

## Series journey

| Workshop | Skill | Project state at end |
|----------|-------|----------------------|
| 1. Prompt Power-Ups | Communicate with AI | Working quiz, basic styling |
| 2. One Thing at a Time | Organize your work | Code split into data / display / logic / styling |
| 3. Save Points | Protect your progress | New features added with git history + test cases |
| 4. Team Up | Build together | Team-merged version via branches and pull requests |

Have fun, and remember: **say what you mean, check what you get.**
