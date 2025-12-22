# Product Spec: Classic Mac OS Personal Website

## Overview

A personal website that replicates the look and feel of classic Mac OS (System 7 era, early 1990s). The site loads directly into a Finder-style desktop environment where visitors interact with folders, windows, and files to explore content about Aaron.

## Design Philosophy

- **Authentic nostalgia**: Faithful recreation of System 7's platinum appearance
- **Functional whimsy**: Every interaction should feel like using a real Mac
- **Content-first**: The novelty serves the content, not the other way around

---

## Classic Mac OS vs Windows: Key Differences

| Element | Windows 95 | Mac OS System 7 |
|---------|------------|-----------------|
| Menu bar | Per-window | Global at top of screen |
| Window controls | Right side (min/max/close) | Close box left, zoom box right |
| Trash | Recycle Bin on desktop | Trash in bottom-right corner |
| Color scheme | Teal/gray | Platinum gray with subtle patterns |
| Font | MS Sans Serif | Chicago (bold) / Geneva |
| Icons | Flat with shadow | 3D with depth and shading |
| Startup | Start button | Apple menu (rainbow apple) |

---

## Core Components

### 1. Desktop Environment

**Visual Elements**
- Subtle gray geometric pattern background (or solid platinum gray)
- Menu bar fixed to TOP of screen with:
  - Apple menu (rainbow logo) — left
  - Application menu — right
  - File, Edit, View, Special menus
- Desktop icons with labels BELOW (no selection box, just highlight)
- Trash icon fixed to bottom-right corner

**Menu Bar Behavior**
- Clicking menu name reveals dropdown
- Menus have that distinctive Mac look: rounded corners, shadow, divider lines
- Apple menu shows "About This Website" and fun items
- Keyboard shortcuts displayed in menus (⌘ symbols)

**Desktop Behavior**
- Icons are selectable (single click inverts icon colors)
- Double-click opens folder/application
- Icons arranged in grid, aligned to invisible grid

### 2. Desktop Folders

Six primary items on desktop:

| Item | Icon | Contents |
|------|------|----------|
| About Me | Classic Mac folder | `Bio`, `Photo`, `Résumé`, `Contact` |
| My Portfolio | Classic Mac folder | Project documents |
| GitHub Projects | Classic Mac folder | Links to repos |
| Subscribe | Classic Mac folder | Newsletter signup |
| Games | Classic Mac folder | Brick Breaker game |
| Blog | HyperCard stack icon | HyperCard-style blog application |

**Additional Desktop Items**
- Hard drive icon (top-right): "Macintosh HD" — opens root folder with all content
- Trash (bottom-right): Empty, but functional hover state

### 3. Window System (Finder Windows)

**Window Anatomy — System 7 Style**
- Title bar with horizontal lines (stripes) pattern
- Close box (small square) — LEFT side of title bar
- Zoom box (small square) — RIGHT side of title bar
- Window title centered in title bar
- No minimize button (Mac used WindowShade — double-click title to collapse)
- Scroll bars with up/down arrows at BOTH ends
- Size box (resize handle) — bottom-right corner
- Subtle drop shadow behind window

**Window Behavior**
- Draggable by title bar
- Close box: closes window
- Zoom box: toggles between standard and "zoomed" (full content) size
- Double-click title bar: WindowShade (collapses to just title bar) — stretch goal
- Size box: resize window
- Windows can overlap (z-index management)
- Clicking a window brings it to front

**Finder Window Interior**
- Icon view by default (grid of icons)
- Header bar showing folder name and item count
- Clean white or light gray background

### 4. File Types & Viewers

| Type | Icon Style | Viewer |
|------|-----------|--------|
| Text document | Dog-eared page with lines | SimpleText clone |
| Image | Thumbnail preview or generic | Picture viewer |
| Application | Diamond/app icon | Custom app window |
| Alias/Link | Italic name + arrow | Opens URL in new tab |
| Game | Joystick or custom icon | Game window |

**SimpleText Viewer**
- Clean white document area
- Menu bar inherits: File, Edit, Font, Size, Style
- Geneva or Monaco font
- No toolbar, minimal chrome

**Picture Viewer**
- Window sized to image
- Title bar shows filename
- Simple gray border around image

---

## Folder Contents Detail

### About Me/
```
📄 Bio              → Personal bio, background, what you're about
🖼️ Photo            → Your headshot
📄 Résumé           → Career history, skills, formatted nicely
📄 Contact          → Email, social links
```

### My Portfolio/
```
📄 Project One      → Description, role, outcomes
📄 Project Two      → (repeat for each major project)
📄 Project Three
📁 Screenshots      → Subfolder with images (stretch goal)
```

### GitHub Projects/
```
🔗 Repo One         → Links to GitHub repos (alias icons)
🔗 Repo Two         → Opens confirmation alert, then new tab
🔗 Repo Three
📄 Read Me          → Overview of your open source work
```

### Subscribe/
```
💎 Newsletter       → Opens a window with email signup form
📄 Why Subscribe    → Value prop for your newsletter
```

### Games/
```
🕹️ Brick Breaker    → Breakout-style game (playable in window)
📄 High Scores      → Local high scores (localStorage)
📄 Read Me          → Instructions
```

---

## Game: Brick Breaker

A classic Breakout clone — simple, satisfying, and era-appropriate.

### Gameplay
- Paddle at bottom, controlled by mouse (or arrow keys)
- Ball bounces off walls, paddle, and bricks
- Colored brick rows (different point values)
- 3 lives, lose a life when ball falls below paddle
- Level complete when all bricks destroyed
- Progressive difficulty (faster ball each level)

### Visual Style (Mac-authentic)
- Black and white or limited color palette option
- Pixelated ball and paddle
- System 7-style window chrome
- "Game Over" and "You Win" dialogs in Mac alert style
- Sound effects: subtle clicks and beeps (optional)

### UI Elements
- Score display in window (not menu bar)
- Lives remaining (heart icons or ball icons)
- Pause functionality (spacebar or click)
- New Game button

### Implementation Notes
```javascript
// Game state
{
  ballPosition: { x, y },
  ballVelocity: { dx, dy },
  paddleX: number,
  bricks: [{ x, y, color, destroyed: boolean }],
  score: number,
  lives: 3,
  level: 1,
  gameState: 'ready' | 'playing' | 'paused' | 'gameover' | 'won'
}
```

### Game Window
- Fixed size (doesn't resize with content)
- Title: "Brick Breaker"
- Close box to exit game
- Menu bar: Game (New Game, Pause, Quit), Help

---

## Blog: HyperCard Stack

The blog is built as a HyperCard stack — the iconic Mac application that predated the web. HyperCard used a "stack of cards" metaphor where users flip through cards containing text, images, and interactive buttons. This is historically appropriate (HyperCard shipped with every Mac from 1987) and solves the readability problem: blog posts get a proper reading experience while staying true to the OS metaphor.

### Why HyperCard?

- **Historically authentic**: HyperCard came bundled with every Mac and was how many people first experienced hypertext
- **Influenced the web**: Tim Berners-Lee cited HyperCard as inspiration for the World Wide Web
- **Perfect for a blog**: The card metaphor maps naturally to blog posts
- **Readable**: Fixed-size cards with proper typography, unlike cramped SimpleText windows
- **Interactive**: Navigation buttons, index views, and card-flipping feel native to the era

### Visual Design

HyperCard stacks had a distinctive look:
- **Fixed dimensions**: Cards were a set size (typically 512×342 pixels on original Macs, but we can scale up)
- **Black and white**: Original HyperCard was monochrome; color came later in v2.2
- **Button styles**: Rounded rectangles, rectangles, checkboxes, radio buttons
- **Text fields**: Scrollable text areas with simple borders
- **Navigation**: Arrow buttons, "go to card" buttons, home buttons

### Window Anatomy

```
┌─────────────────────────────────────────────────────────────────┐
│ ☐ ══════════════════ Aaron's Blog ═════════════════════════ ☐  │  ← Title bar (stripes)
├─────────────────────────────────────────────────────────────────┤
│  Stack  Edit  Go  Help                              HyperCard   │  ← Menu bar (when active)
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│     ┌─────────────────────────────────────────────────────┐     │
│     │                                                     │     │
│     │   Why I Still Build Internal Tools                  │     │
│     │   ─────────────────────────────────────────────     │     │
│     │   December 15, 2024                                 │     │
│     │                                                     │     │
│     │   There's something deeply satisfying about         │     │
│     │   building a tool that makes your coworkers'        │     │
│     │   lives easier. Not a product. Not something        │     │
│     │   with a roadmap and stakeholders and quarterly     │     │
│     │   reviews. Just a thing that solves a problem.      │     │
│     │                                                     │     │
│     │   I've been doing this for fifteen years now...     │     │
│     │                                                     │  ░  │  ← Scroll for long posts
│     │                                                     │  ░  │
│     │                                                     │     │
│     └─────────────────────────────────────────────────────┘     │
│                                                                 │
│    ┌────────┐                               ┌────────────────┐  │
│    │  ◀ ▶   │     Card 3 of 12              │    Index 📇    │  │  ← Navigation bar
│    └────────┘                               └────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

### Card Types

The blog stack contains different card types:

**1. Home Card (First Card)**
```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│                    📚 Aaron's Blog                          │
│                                                             │
│            Thoughts on building, products,                  │
│               and making things work.                       │
│                                                             │
│                                                             │
│         ┌─────────────────────────────────┐                 │
│         │      📖  Read Latest Post       │                 │
│         └─────────────────────────────────┘                 │
│                                                             │
│         ┌─────────────────────────────────┐                 │
│         │      📇  Browse All Posts       │                 │
│         └─────────────────────────────────┘                 │
│                                                             │
│                                                             │
│                    12 posts in stack                        │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

**2. Index Card**
```
┌─────────────────────────────────────────────────────────────┐
│                        📇 Index                             │
│  ───────────────────────────────────────────────────────    │
│                                                             │
│  ▸ Why I Still Build Internal Tools          Dec 15, 2024  │
│  ▸ The Case for Boring Technology            Dec 1, 2024   │
│  ▸ Fraud Prevention is a Product Problem     Nov 20, 2024  │
│  ▸ What Retool Taught Me About Users         Nov 8, 2024   │
│  ▸ Side Projects and Day Jobs                Oct 25, 2024  │
│  ▸ On Being a PM Who Codes                   Oct 10, 2024  │
│  ▸ ...                                                     │
│                                                          ░  │
│                                                          ░  │
│                                                             │
│    ┌────────┐                               ┌────────────┐  │
│    │  Home  │                               │   Close    │  │
│    └────────┘                               └────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

**3. Post Card (Blog Entry)**
- Title at top (bold, larger text)
- Horizontal rule separator
- Date below title
- Body text in scrollable field
- Navigation at bottom

### HyperCard Menu Bar

When the Blog stack is the active window, the menu bar changes:

```
 ┌───────────────────────────────────────────────────────────────┐
 │  🍎 │ Stack │ Edit │ Go │ Help │                   HyperCard  │
 └───────────────────────────────────────────────────────────────┘
```

**Stack Menu**
- About This Stack...
- ─────────────
- Close Stack            ⌘W

**Edit Menu**
- Copy                   ⌘C
- Select All             ⌘A

**Go Menu**
- Back                   ⌘[
- Home                   ⌘H
- ─────────────
- First Card             ⌘1
- Last Card              ⌘4
- ─────────────
- Next Card              ⌘→
- Previous Card          ⌘←
- ─────────────
- Find...                ⌘F

**Help Menu**
- About HyperCard...
- HyperCard Help

### Navigation Components

**Arrow Buttons**
```
┌────────┐
│  ◀ ▶   │   ← Previous / Next card buttons
└────────┘
```
- Left arrow: go to previous card (disabled on first card)
- Right arrow: go to next card (disabled on last card)
- Classic HyperCard button style: rounded rectangle, 3D bevel

**Card Counter**
```
Card 3 of 12
```
- Shows current position in stack
- Updates as user navigates

**Index Button**
```
┌────────────────┐
│    Index 📇    │   ← Opens index card
└────────────────┘
```

**Home Button**
```
┌────────────────┐
│    Home 🏠     │   ← Returns to home card
└────────────────┘
```

### Implementation Details

**State Shape**
```javascript
{
  // Stack state
  stack: {
    title: "Aaron's Blog",
    cards: [
      {
        id: 'home',
        type: 'home',
        // Home card is special, no content needed
      },
      {
        id: 'index',
        type: 'index',
        // Index is auto-generated from posts
      },
      {
        id: 'post-1',
        type: 'post',
        title: "Why I Still Build Internal Tools",
        date: "2024-12-15",
        content: "There's something deeply satisfying...",
        // Optional: tags, readTime, etc.
      },
      // ... more posts
    ],
    currentCardIndex: 0,
    history: [], // For "Back" navigation
  }
}
```

**Component Structure**
```
<HyperCardWindow>
  <HyperCardTitleBar title="Aaron's Blog" />
  <HyperCardContent>
    {currentCard.type === 'home' && <HomeCard />}
    {currentCard.type === 'index' && <IndexCard posts={posts} />}
    {currentCard.type === 'post' && <PostCard post={currentCard} />}
  </HyperCardContent>
  <HyperCardNavigation
    currentIndex={currentCardIndex}
    totalCards={cards.length}
    onPrev={goToPrevCard}
    onNext={goToNextCard}
    onIndex={goToIndex}
    onHome={goToHome}
  />
</HyperCardWindow>
```

### Visual Style Details

**Colors (Monochrome-ish)**
```css
--hc-background: #ffffff;      /* Card background */
--hc-text: #000000;            /* Body text */
--hc-border: #000000;          /* Lines, borders */
--hc-button-face: #dddddd;     /* Button background */
--hc-button-shadow: #888888;   /* Button 3D shadow */
--hc-button-highlight: #ffffff; /* Button 3D highlight */
--hc-field-bg: #ffffff;        /* Text field background */
--hc-selection: #000000;       /* Selected text bg (inverted) */
```

**Typography**
- Title: Chicago 18px (or scaled equivalent)
- Date: Geneva 12px, italic
- Body: Geneva 14px, line-height 1.5
- Buttons: Chicago 12px

**Button Style**
```css
.hypercard-button {
  background: var(--hc-button-face);
  border: 2px solid var(--hc-border);
  border-radius: 8px;
  padding: 6px 16px;
  font-family: var(--font-chicago);
  font-size: 12px;
  /* 3D effect */
  box-shadow: 
    inset 1px 1px 0 var(--hc-button-highlight),
    inset -1px -1px 0 var(--hc-button-shadow);
}

.hypercard-button:active {
  /* Invert colors when clicked */
  background: var(--hc-text);
  color: var(--hc-background);
}
```

**Text Field Style**
```css
.hypercard-field {
  background: var(--hc-field-bg);
  border: 1px solid var(--hc-border);
  padding: 8px;
  font-family: var(--font-geneva);
  font-size: 14px;
  line-height: 1.5;
  overflow-y: auto;
}
```

### Content Structure

Blog posts are stored as JSON:

```javascript
// /src/content/blog-posts.json
{
  "stackTitle": "Aaron's Blog",
  "stackDescription": "Thoughts on building, products, and making things work.",
  "posts": [
    {
      "id": "internal-tools",
      "title": "Why I Still Build Internal Tools",
      "date": "2024-12-15",
      "content": "There's something deeply satisfying about building a tool that makes your coworkers' lives easier.\n\nNot a product. Not something with a roadmap and stakeholders and quarterly reviews. Just a thing that solves a problem.\n\n..."
    },
    {
      "id": "boring-technology",
      "title": "The Case for Boring Technology",
      "date": "2024-12-01", 
      "content": "..."
    }
    // ... more posts
  ]
}
```

### Interactions

**Opening the Blog**
1. User double-clicks "Blog" icon on desktop
2. HyperCard window opens
3. Home card is displayed
4. Menu bar updates to HyperCard menus

**Navigating Posts**
1. Click right arrow → next card (with brief transition)
2. Click left arrow → previous card
3. Click "Index" → jump to index card
4. Click "Home" → jump to home card
5. Click post title in index → jump to that post's card

**Card Transitions (Optional Polish)**
HyperCard had visual effects for card transitions:
- `dissolve`: pixels randomly change
- `wipe left/right`: slide effect
- `barn door`: opens from center

For simplicity, start with instant transitions; add effects as stretch goal.

**Keyboard Navigation**
- `←` or `⌘[`: Previous card
- `→` or `⌘]`: Next card  
- `⌘H`: Home card
- `Escape` or `⌘W`: Close stack

### Window Behavior

- **Fixed size**: HyperCard windows don't resize (cards have fixed dimensions)
- **Draggable**: Window can be moved by title bar
- **Close box**: Closes the stack window
- **No zoom box**: HyperCard stacks typically didn't zoom
- **Scrollable content**: Long posts scroll within the card area, window stays fixed

### Stretch Goals

1. **Card transitions**: Implement dissolve/wipe effects between cards
2. **Find dialog**: ⌘F opens search, highlights matching text across cards
3. **Bookmark card**: Let visitors "dog-ear" cards (localStorage)
4. **Print card**: File menu option to print current card (browser print)
5. **About stack dialog**: Shows stack info, post count, author
6. **Recent cards**: Track recently viewed cards in Go menu
7. **Link cards**: Support for internal links between posts (like wiki)

---

## Technical Specification

### Stack Recommendation
- **Framework**: React (good for component state + game loop)
- **Styling**: CSS with custom properties for Mac theme
- **Game rendering**: Canvas API (for Brick Breaker)
- **No external UI libraries** — build from scratch for authenticity
- **Deployment**: Vercel, Netlify, or GitHub Pages

### Key CSS Variables
```css
:root {
  /* System 7 Platinum appearance */
  --mac-white: #ffffff;
  --mac-platinum: #dddddd;
  --mac-gray-light: #cccccc;
  --mac-gray-mid: #999999;
  --mac-gray-dark: #666666;
  --mac-black: #000000;
  
  /* Accent colors (limited palette) */
  --mac-highlight: #000000;      /* Selected items invert */
  --mac-title-active: #000000;   /* Active window stripes */
  --mac-title-inactive: #999999; /* Inactive window stripes */
  
  /* Fonts */
  --font-chicago: 'ChicagoFLF', 'Geneva', sans-serif;
  --font-geneva: 'Geneva', 'Helvetica', sans-serif;
  --font-monaco: 'Monaco', 'Courier New', monospace;
}
```

### Typography
Classic Mac used specific bitmap fonts:
- **Chicago**: Bold, used for menus and window titles
- **Geneva**: Clean sans-serif for body text
- **Monaco**: Monospace for code/plain text

You can use web fonts that replicate these, or find free Chicago clones like "ChicagoFLF".

### Component Hierarchy
```
<Desktop>
  <MenuBar>
    <AppleMenu />
    <FileMenu />
    <EditMenu />
    <ViewMenu />
    <SpecialMenu />
    <ApplicationMenu />
  </MenuBar>
  
  <DesktopArea>
    <DesktopIcon />  {/* About Me */}
    <DesktopIcon />  {/* My Portfolio */}
    <DesktopIcon />  {/* GitHub Projects */}
    <DesktopIcon />  {/* Subscribe */}
    <DesktopIcon />  {/* Games */}
    <DesktopIcon />  {/* Blog (HyperCard stack) */}
    <HardDriveIcon /> {/* Top right */}
    <TrashIcon />     {/* Bottom right */}
  </DesktopArea>
  
  <WindowManager>
    <FinderWindow />
    <SimpleTextWindow />
    <PictureWindow />
    <GameWindow />
    <HyperCardWindow>
      <HyperCardTitleBar />
      <HyperCardContent>
        <HomeCard />
        <IndexCard />
        <PostCard />
      </HyperCardContent>
      <HyperCardNavigation />
    </HyperCardWindow>
  </WindowManager>
</Desktop>
```

### State Management
```javascript
// Core state shape
{
  windows: [
    {
      id: 'win-1',
      type: 'finder' | 'simpletext' | 'picture' | 'game' | 'form',
      title: 'About Me',
      position: { x: 100, y: 50 },
      size: { width: 400, height: 300 },
      isShaded: false,        // WindowShade collapsed
      isZoomed: false,
      zIndex: 1,
      content: { /* folder/file contents */ }
    }
  ],
  activeWindow: 'win-1',
  selectedIcons: [],          // Mac allowed multi-select
  nextZIndex: 2,
  menuOpen: null,             // Currently open menu
  
  // Game state (when game window open)
  game: {
    /* Brick Breaker state */
  }
}
```

---

## Menu Bar Specification

The menu bar is GLOBAL — it changes based on the active application/window.

### Desktop/Finder Menus
```
 ┌─────────────────────────────────────────────────────────┐
 │  🍎 │ File │ Edit │ View │ Special │           Finder  │
 └─────────────────────────────────────────────────────────┘
```

**Apple Menu (🍎)**
- About This Website...
- ─────────────
- Recent Items (disabled/empty)

**File Menu**
- New Folder (disabled)
- Open                    ⌘O
- Close Window            ⌘W
- ─────────────
- Get Info (disabled)

**Edit Menu**
- Undo                    ⌘Z
- ─────────────
- Cut                     ⌘X
- Copy                    ⌘C
- Paste                   ⌘V
- Select All              ⌘A

**View Menu**
- by Icon (selected)
- by Name
- by Date

**Special Menu**
- Empty Trash...

### SimpleText Menus
```
 ┌─────────────────────────────────────────────────────────┐
 │  🍎 │ File │ Edit │ Font │ Size │ Style │   SimpleText  │
 └─────────────────────────────────────────────────────────┘
```

### Game Menus
```
 ┌─────────────────────────────────────────────────────────┐
 │  🍎 │ Game │ Help │                       Brick Breaker │
 └─────────────────────────────────────────────────────────┘
```

**Game Menu**
- New Game                ⌘N
- Pause                   ⌘P
- ─────────────
- Quit                    ⌘Q

---

## Interactions Spec

### Double-Click Folder Icon
1. Create new Finder window
2. Position window with slight offset from existing windows (cascade)
3. Populate with folder contents in icon view
4. Set as active window
5. Update menu bar to Finder menus

### Double-Click File in Folder
1. Determine file type
2. Create appropriate viewer window
3. Load content into viewer
4. Set as active window
5. Update menu bar for that application

### Single-Click Icon
1. Deselect all other icons (unless Shift held)
2. Invert icon colors (white on black)
3. Icon remains selected until click elsewhere

### Close Box Click
1. Close the window
2. Remove from state
3. If was active window, activate next topmost window
4. Update menu bar accordingly

### Zoom Box Click
1. Toggle between "user size" and "standard size"
2. Standard size: fits all content or fills screen minus margins
3. Remember user's manual size for toggle back

### Window Dragging
1. Mousedown on title bar (not on close/zoom boxes)
2. Begin drag, window moves with cursor
3. Mouseup ends drag
4. Window stays where dropped

### Trash Interaction
- Drag file to trash: not implemented (stretch goal)
- Double-click trash: opens empty trash window
- Hover: cursor changes or trash highlights subtly

---

## Alert Dialogs (Mac-Style)

When opening external links or showing messages, use authentic Mac alerts:

```
┌─────────────────────────────────────────────┐
│  ⚠️   You're about to visit an external     │
│       website. Continue?                     │
│                                              │
│              [ Cancel ]  [[ OK ]]            │
└─────────────────────────────────────────────┘
```

**Dialog Characteristics**
- Rounded corners
- Icon on left (stop sign, caution, note)
- Message text in Chicago/Geneva
- Default button has bold border [[ OK ]]
- Cancel button has normal border [ Cancel ]
- Modal: dims or disables rest of interface

---

## Content Files

### Bio (SimpleText document)
```
Aaron — Product Manager & Builder

15 years shipping products. Currently at Teachable 
working on fraud prevention and automation.

I build tools that make teams faster. When I'm not 
doing that, I'm mixing cocktails and watching 
prestige TV.

Location: [Your city]
Currently reading: [Book]
Currently building: [Side project]
```

### Résumé (formatted document)
- Work history with dates
- Key accomplishments at each role
- Skills section
- Education

### Project documents
Each portfolio piece:
- Project name and timeframe
- Your role
- Problem solved
- Approach taken
- Results/outcomes
- Tech used (if relevant)

---

## Visual Reference: Window Anatomy

```
┌──────────────────────────────────────────────────────────┐
│ ▫️ ═══════════════ About Me ══════════════════════════ ▫️│  ← Title bar with stripes
├──────────────────────────────────────────────────────────┤
│  4 items                                    32K in disk  │  ← Header bar
├──────────────────────────────────────────────────────────┤
│                                                       ▲  │
│    📄          🖼️          📄          📄             ░  │
│    Bio        Photo      Résumé     Contact          ░  │
│                                                       ░  │
│                                                       ░  │
│                                                       ▼  │
├──────────────────────────────────────────────────────┬───┤
│  ◀ ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ ▶ │ ⌟ │  ← Horizontal scroll + resize
└──────────────────────────────────────────────────────┴───┘
```

---

## Stretch Goals (v2)

1. **WindowShade**: Double-click title bar to collapse window to just title
2. **Drag-select**: Click and drag on desktop to select multiple icons
3. **Drag to trash**: Drag items to trash (no-op, but animated)
4. **Sound effects**: Classic Mac sounds (startup chime, error beep, click)
5. **Startup sequence**: "Happy Mac" icon, then loading bar
6. **Easter eggs**:
   - "About This Mac" shows your specs/bio
   - Secret key combo triggers special message
   - Bomb dialog (error) for 404 pages
7. **Multiple games**: Add Solitaire or a puzzle game
8. **Control Panels folder**: Fun "settings" that don't do anything
9. **Finder animations**: Zoom rectangle when opening/closing windows

---

## File Structure
```
/mac-site
├── index.html
├── /src
│   ├── main.jsx
│   ├── App.jsx
│   ├── /components
│   │   ├── Desktop.jsx
│   │   ├── MenuBar.jsx
│   │   ├── AppleMenu.jsx
│   │   ├── DropdownMenu.jsx
│   │   ├── DesktopIcon.jsx
│   │   ├── Window.jsx
│   │   ├── FinderWindow.jsx
│   │   ├── SimpleTextWindow.jsx
│   │   ├── PictureWindow.jsx
│   │   ├── AlertDialog.jsx
│   │   ├── SubscribeForm.jsx
│   │   ├── /game
│   │   │   ├── GameWindow.jsx
│   │   │   ├── BrickBreaker.jsx
│   │   │   └── gameLogic.js
│   │   └── /hypercard
│   │       ├── HyperCardWindow.jsx
│   │       ├── HyperCardTitleBar.jsx
│   │       ├── HyperCardContent.jsx
│   │       ├── HyperCardNavigation.jsx
│   │       ├── HomeCard.jsx
│   │       ├── IndexCard.jsx
│   │       ├── PostCard.jsx
│   │       └── HyperCardButton.jsx
│   ├── /hooks
│   │   ├── useWindowManager.js
│   │   ├── useDraggable.js
│   │   ├── useMenuBar.js
│   │   ├── useGameLoop.js
│   │   └── useHyperCardStack.js
│   ├── /content
│   │   ├── about-me.json
│   │   ├── portfolio.json
│   │   ├── github.json
│   │   ├── subscribe.json
│   │   └── blog-posts.json
│   └── /styles
│       ├── mac-theme.css
│       ├── fonts.css
│       ├── desktop.css
│       ├── window.css
│       ├── menu-bar.css
│       ├── finder.css
│       ├── game.css
│       └── hypercard.css
├── /public
│   ├── /fonts
│   │   └── ChicagoFLF.woff2
│   ├── /icons
│   │   ├── folder.png
│   │   ├── document.png
│   │   ├── picture.png
│   │   ├── app.png
│   │   ├── hard-drive.png
│   │   ├── trash-empty.png
│   │   ├── game.png
│   │   └── hypercard-stack.png
│   └── /images
│       └── headshot.jpg
└── package.json
```

---

## Implementation Order

### Phase 1: Foundation
1. Desktop with pattern/solid background
2. Global menu bar (static, no dropdowns yet)
3. Desktop icons with proper Mac styling
4. Basic window component (title bar, close box, zoom box)

### Phase 2: Window Management
5. Window manager (open, close, focus, z-index)
6. Window dragging
7. Finder window with icon grid view
8. File/folder navigation (double-click to open)

### Phase 3: Viewers & Content
9. SimpleText viewer
10. Picture viewer
11. Subscribe form window
12. Populate all content

### Phase 4: Menu Bar
13. Dropdown menu functionality
14. Apple menu with "About" dialog
15. Context-sensitive menus per app

### Phase 5: Game
16. Game window shell
17. Brick Breaker canvas setup
18. Game loop and physics
19. Scoring and lives
20. Game over / win states

### Phase 6: HyperCard Blog
21. HyperCard window shell (fixed size, no resize)
22. Card rendering system (home, index, post types)
23. Navigation component (prev/next arrows, card counter)
24. Home card with welcome message and buttons
25. Index card with clickable post list
26. Post card with scrollable content area
27. useHyperCardStack hook for navigation state
28. HyperCard-specific menu bar (Stack, Edit, Go, Help)
29. Keyboard navigation (arrow keys, ⌘H for home)
30. Populate with initial blog posts

### Phase 7: Polish
31. Mac-style alert dialogs
32. External link handling
33. Icon selection states
34. Final styling pass
35. Deploy

---

## Success Criteria

- [ ] Site loads directly to desktop with menu bar at top
- [ ] All six desktop items accessible and functional
- [ ] Windows open, close, drag, and zoom correctly
- [ ] Menu bar is global and updates per active app
- [ ] Brick Breaker is playable and fun
- [ ] Content is readable and well-formatted in SimpleText
- [ ] HyperCard blog opens and displays posts correctly
- [ ] Blog navigation works (prev/next, index, home)
- [ ] Blog posts are readable with proper typography
- [ ] External links show confirmation dialog
- [ ] Feels authentically Mac and delightfully nostalgic
- [ ] Works on desktop browsers (mobile: nice-to-have)

---

## References

- [System 7 Today](https://system7today.com/) — screenshots and resources
- [Infinite Mac](https://infinitemac.org/) — run real System 7 in browser
- [GUIdebook](https://guidebookgallery.org/screenshots/macos70) — UI screenshots
- [Chicago Font](https://fonts.google.com/specimen/VT323) — or search "ChicagoFLF"
- [Mac OS Icons](https://macintoshgarden.org/) — icon references
- [HyperCard Simulator](https://hcsimulator.com/) — web-based HyperCard clone
- [Internet Archive HyperCard](https://archive.org/details/AppleMacintoshSystem753) — run HyperCard in browser
- [HyperCard.org](https://hypercard.org/) — resources and file format docs

---

*Welcome to Macintosh.*
