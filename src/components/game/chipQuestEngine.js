// Chip Quest - tile engine
//
// Pure game logic, no React and no DOM. Everything mutates a single state
// object created by parseLevel() so the render loop can keep it in a ref.

export const T = {
  FLOOR: '.',
  WALL: '#',
  CHIP: '+',
  SOCKET: 'S',
  EXIT: 'X',
  WATER: '~',
  FIRE: '*',
  ICE: '_',
  BLOCK: '%',
  HINT: '?',
};

export const FORCE_DIRS = {
  '<': { x: -1, y: 0 },
  '>': { x: 1, y: 0 },
  '^': { x: 0, y: -1 },
  v: { x: 0, y: 1 },
};

export const KEY_TILES = { r: 'red', b: 'blue', g: 'green', y: 'yellow' };
export const DOOR_TILES = { R: 'red', B: 'blue', G: 'green', Y: 'yellow' };
export const BOOT_TILES = {
  1: 'flippers',
  2: 'fireboots',
  3: 'skates',
  4: 'suction',
};

const MONSTER_TILES = { e: 'bug', o: 'ball' };
const MONSTER_START_DIR = { bug: { x: 0, y: -1 }, ball: { x: 1, y: 0 } };

// Tiles a pushed block is allowed to move onto
const BLOCK_TARGETS = new Set([T.FLOOR, T.HINT, T.WATER, T.FIRE]);
// Tiles a monster is allowed to walk on
const MONSTER_TARGETS = new Set([T.FLOOR, T.HINT]);

export const DIRECTIONS = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

export function parseLevel(def, levelIndex = 0) {
  const grid = def.map.map((row) => row.split(''));
  const height = grid.length;
  const width = grid[0].length;

  let player = null;
  const monsters = [];
  let totalChips = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const ch = grid[y][x];
      if (ch === 'P') {
        player = { x, y };
        grid[y][x] = T.FLOOR;
      } else if (MONSTER_TILES[ch]) {
        const kind = MONSTER_TILES[ch];
        const dir = MONSTER_START_DIR[kind];
        monsters.push({ x, y, dx: dir.x, dy: dir.y, kind });
        grid[y][x] = T.FLOOR;
      } else if (ch === T.CHIP) {
        totalChips++;
      }
    }
  }

  return {
    levelIndex,
    name: def.name,
    hint: def.hint || null,
    grid,
    width,
    height,
    player: player || { x: 1, y: 1 },
    monsters,
    chipsLeft: totalChips,
    totalChips,
    keys: { red: 0, blue: 0, green: 0, yellow: 0 },
    boots: { flippers: false, fireboots: false, skates: false, suction: false },
    timeLeft: def.time ?? 0,
    status: 'playing',
    death: null,
    facing: 'down',
    onHint: false,
  };
}

export function tileAt(state, x, y) {
  if (x < 0 || y < 0 || x >= state.width || y >= state.height) return T.WALL;
  return state.grid[y][x];
}

function setTile(state, x, y, ch) {
  state.grid[y][x] = ch;
}

function monsterAt(state, x, y) {
  return state.monsters.find((m) => m.x === x && m.y === y) || null;
}

function kill(state, reason) {
  state.status = 'dead';
  state.death = reason;
}

function playerCanEnter(state, x, y) {
  const ch = tileAt(state, x, y);
  if (ch === T.WALL || ch === T.BLOCK) return false;
  if (DOOR_TILES[ch]) return state.keys[DOOR_TILES[ch]] > 0;
  if (ch === T.SOCKET) return state.chipsLeft === 0;
  return true;
}

// Everything that happens because the player is now standing on (x, y)
function landOn(state, x, y) {
  state.player.x = x;
  state.player.y = y;

  const ch = tileAt(state, x, y);

  if (DOOR_TILES[ch]) {
    state.keys[DOOR_TILES[ch]] -= 1;
    setTile(state, x, y, T.FLOOR);
  } else if (KEY_TILES[ch]) {
    state.keys[KEY_TILES[ch]] += 1;
    setTile(state, x, y, T.FLOOR);
  } else if (BOOT_TILES[ch]) {
    state.boots[BOOT_TILES[ch]] = true;
    setTile(state, x, y, T.FLOOR);
  } else if (ch === T.CHIP) {
    state.chipsLeft = Math.max(0, state.chipsLeft - 1);
    setTile(state, x, y, T.FLOOR);
  } else if (ch === T.SOCKET) {
    setTile(state, x, y, T.FLOOR);
  }

  state.onHint = tileAt(state, x, y) === T.HINT;

  if (monsterAt(state, x, y)) {
    kill(state, 'monster');
    return;
  }

  const now = tileAt(state, x, y);
  if (now === T.WATER && !state.boots.flippers) {
    kill(state, 'water');
    return;
  }
  if (now === T.FIRE && !state.boots.fireboots) {
    kill(state, 'fire');
    return;
  }
  if (now === T.EXIT) {
    state.status = 'won';
  }
}

function blockCanEnter(state, x, y) {
  const ch = tileAt(state, x, y);
  if (!BLOCK_TARGETS.has(ch)) return false;
  return !monsterAt(state, x, y);
}

// One tile of movement. Returns true if the player actually moved.
function attemptStep(state, dir, allowPush) {
  const nx = state.player.x + dir.x;
  const ny = state.player.y + dir.y;
  const ch = tileAt(state, nx, ny);

  if (ch === T.BLOCK) {
    if (!allowPush) return false;
    const bx = nx + dir.x;
    const by = ny + dir.y;
    if (!blockCanEnter(state, bx, by)) return false;

    const dest = tileAt(state, bx, by);
    setTile(state, nx, ny, T.FLOOR);
    // A block dropped in water or fire fills it in and is consumed
    setTile(state, bx, by, dest === T.WATER || dest === T.FIRE ? T.FLOOR : T.BLOCK);
  } else if (!playerCanEnter(state, nx, ny)) {
    return false;
  }

  landOn(state, nx, ny);
  return true;
}

// Ice keeps you going until something stops you; force floors shove you along.
function resolveSlides(state, dir) {
  let d = dir;

  for (let guard = 0; guard < 250; guard++) {
    if (state.status !== 'playing') return;

    const ch = tileAt(state, state.player.x, state.player.y);
    const force = FORCE_DIRS[ch];

    if (ch === T.ICE) {
      if (state.boots.skates) return;
      if (!attemptStep(state, d, false)) {
        d = { x: -d.x, y: -d.y };
        if (!attemptStep(state, d, false)) return;
      }
    } else if (force) {
      if (state.boots.suction) return;
      d = force;
      if (!attemptStep(state, d, false)) return;
    } else {
      return;
    }
  }
}

export function movePlayer(state, dirName) {
  if (state.status !== 'playing') return false;

  const dir = DIRECTIONS[dirName];
  if (!dir) return false;

  state.facing = dirName;

  if (!attemptStep(state, dir, true)) return false;
  resolveSlides(state, dir);
  return true;
}

function monsterCanEnter(state, x, y, self) {
  if (!MONSTER_TARGETS.has(tileAt(state, x, y))) return false;
  const other = monsterAt(state, x, y);
  return !other || other === self;
}

function turnLeft(d) {
  return { x: d.dy, y: -d.dx };
}

function turnRight(d) {
  return { x: -d.dy, y: d.dx };
}

function monsterChoices(m) {
  const straight = { x: m.dx, y: m.dy };
  if (m.kind === 'ball') {
    return [straight, { x: -m.dx, y: -m.dy }];
  }
  // Bug: hugs the wall on its left
  return [turnLeft(m), straight, turnRight(m), { x: -m.dx, y: -m.dy }];
}

export function tickMonsters(state) {
  if (state.status !== 'playing') return;

  for (const m of state.monsters) {
    for (const d of monsterChoices(m)) {
      if (monsterCanEnter(state, m.x + d.x, m.y + d.y, m)) {
        m.x += d.x;
        m.y += d.y;
        m.dx = d.x;
        m.dy = d.y;
        break;
      }
    }

    if (m.x === state.player.x && m.y === state.player.y) {
      kill(state, 'monster');
      return;
    }
  }
}

export function tickClock(state) {
  if (state.status !== 'playing' || state.timeLeft <= 0) return;
  state.timeLeft -= 1;
  if (state.timeLeft <= 0) {
    state.timeLeft = 0;
    kill(state, 'time');
  }
}

export const DEATH_MESSAGES = {
  water: 'Ooops! You can’t swim without flippers!',
  fire: 'Ooops! Fire boots would have helped there.',
  monster: 'Ooops! Watch out for creatures!',
  time: 'Ooops! Out of time!',
};
