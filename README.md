# aaronbatchelder.com

A personal website that replicates the look and feel of classic Mac OS System 7 (early 1990s). The site loads directly into a Finder-style desktop environment where visitors interact with folders, windows, and files to explore content.

**Live site:** [aaronbatchelder.com](https://aaronbatchelder.com)

![Classic Mac OS Desktop](https://img.shields.io/badge/Style-System%207-platinum)
![Built with React](https://img.shields.io/badge/Built%20with-React-blue)
![Vite](https://img.shields.io/badge/Bundler-Vite-purple)

## The Story

This entire site was built in a single session with [Claude Code](https://claude.ai/code) (Anthropic's CLI coding assistant). I wrote a detailed spec document describing what I wanted—a nostalgic System 7 Mac experience—and Claude built it from scratch.

### The Process

1. **I wrote the spec** - A ~1000-line product spec describing the Classic Mac OS aesthetic, window behavior, menu bar, games, and a HyperCard-inspired blog system
2. **Claude built it** - Component by component, from the desktop environment to a working Brick Breaker game
3. **We iterated** - I provided screenshots and feedback ("the folder icons should be manila, not yellow", "the menu dropdown text is invisible"), and Claude fixed issues in real-time
4. **Shipped** - Pushed to GitHub and deployed to Vercel, all from the CLI

The whole thing took a few hours of collaborative work.

## Features

### Desktop Environment
- **Authentic System 7 UI** - Platinum gray appearance, proper window chrome, menu bar at top
- **Working windows** - Drag, resize, close, zoom, and WindowShade (collapse to title bar)
- **Icon selection** - Classic inverted highlight on click
- **Global menu bar** - Changes based on active application

### Content
- **About Me** - Bio, photo, downloadable résumé, contact info
- **Portfolio** - Project case studies in SimpleText-style windows
- **External Links** - GitHub and LinkedIn with confirmation dialogs

### Games
- **Brick Breaker** - Fully playable Breakout clone with lives, scoring, and level progression
- **Minesweeper** - Classic mine-sweeping action

### Blog (HyperCard Stack)
- **Card-based navigation** - Inspired by Apple's revolutionary HyperCard (1987)
- **Home, Index, and Post cards** - Navigate with arrows or jump to index
- **Coming soon** - Blog posts will be added over time

### Little Details
- Rainbow Apple logo in menu bar
- Manila folder icons (not yellow!)
- Proper title bar stripes
- Close box on left, zoom box on right
- Bio auto-opens after 3 seconds to greet visitors

## Tech Stack

- **React** - Component architecture
- **Vite** - Fast builds and HMR
- **Pure CSS** - No UI libraries, hand-crafted for authenticity
- **Canvas API** - For Brick Breaker game rendering

No external component libraries. Everything built from scratch to match the System 7 aesthetic.

## The Spec

The original product spec I wrote is in this repo: it covers everything from the difference between Mac and Windows UI conventions to the exact CSS variables for the platinum color scheme. If you're curious about the level of detail that went into this, check it out.

Key sections:
- Classic Mac OS vs Windows differences
- Window anatomy and behavior
- Menu bar specification
- Brick Breaker game design
- HyperCard blog system (card types, navigation, visual style)
- Implementation phases

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

## Building

```bash
npm run build
```

Output is in `dist/`

## Deployment

This site is deployed on [Vercel](https://vercel.com) with automatic deploys from the `main` branch.

## What I Learned

Building with an AI coding assistant is genuinely collaborative. The spec I wrote wasn't code—it was product thinking: user interactions, visual design, edge cases. Claude translated that into working React components.

When things didn't look right (menu text invisible, windows opening behind each other, icons overlapping), I just took a screenshot and described the problem. Claude diagnosed and fixed issues I would have spent much longer debugging myself.

This is the future of building personal projects: focus on *what* you want, iterate on the details, ship fast.

## Credits

- Built by [Aaron Batchelder](https://linkedin.com/in/aaronbatchelder)
- Coded with [Claude Code](https://claude.ai/claude-code) by Anthropic
- Inspired by Apple's System 7 (1991) and HyperCard (1987)

## License

MIT - Feel free to fork and make your own retro personal site!

---

*Welcome to Macintosh.*
