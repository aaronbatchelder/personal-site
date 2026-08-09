import { useRef, useEffect, useState, useCallback } from 'react';
import { LEVELS } from './chipQuestLevels';
import {
  parseLevel,
  movePlayer,
  tickMonsters,
  tickClock,
  tileAt,
  T,
  FORCE_DIRS,
  KEY_TILES,
  DOOR_TILES,
  BOOT_TILES,
  DEATH_MESSAGES,
} from './chipQuestEngine';

const TILE = 32;
const VIEW = 9;
const CANVAS_SIZE = TILE * VIEW;

const STEP_MS = 40;
const MOVE_MS = 130;
const MONSTER_MS = 420;
const STORAGE_KEY = 'chipQuestUnlocked';

const KEY_DIRS = {
  ArrowUp: 'up',
  ArrowDown: 'down',
  ArrowLeft: 'left',
  ArrowRight: 'right',
  KeyW: 'up',
  KeyS: 'down',
  KeyA: 'left',
  KeyD: 'right',
};

const C = {
  floor: '#f1f1f1',
  floorDot: '#dcdcdc',
  wallFace: '#9c9c9c',
  wallLight: '#cfcfcf',
  wallDark: '#4f4f4f',
  ink: '#1a1a1a',
  chipBody: '#2f7d64',
  chipPin: '#123c31',
  socket: '#6b6b6b',
  water: '#84b6e0',
  waterDeep: '#4b81b6',
  fire: '#e0761f',
  ice: '#dceff8',
  iceLine: '#9fc9dd',
  force: '#b6b6c8',
  forceArrow: '#5a5a74',
  block: '#bb8c5d',
  blockLight: '#dcb68d',
  blockDark: '#7d5734',
  hint: '#ece2bd',
  player: '#20304f',
  bug: '#8d3a8d',
  ball: '#5a5a5a',
};

const COLORS = {
  red: '#c0392b',
  blue: '#2f6fb0',
  green: '#2e8b57',
  yellow: '#d3a017',
};

const BOOT_LABELS = {
  flippers: 'Flippers',
  fireboots: 'Fire Boots',
  skates: 'Ice Skates',
  suction: 'Suction Boots',
};

const BOOT_COLORS = {
  flippers: '#2f6fb0',
  fireboots: '#e0761f',
  skates: '#6fb3c8',
  suction: '#7a6f3f',
};

function readUnlocked() {
  const saved = parseInt(localStorage.getItem(STORAGE_KEY) ?? '0', 10);
  if (Number.isNaN(saved)) return 0;
  return Math.min(Math.max(saved, 0), LEVELS.length - 1);
}

function bevel(ctx, x, y, size, face, light, dark) {
  ctx.fillStyle = face;
  ctx.fillRect(x, y, size, size);
  ctx.fillStyle = light;
  ctx.fillRect(x, y, size, 3);
  ctx.fillRect(x, y, 3, size);
  ctx.fillStyle = dark;
  ctx.fillRect(x, y + size - 3, size, 3);
  ctx.fillRect(x + size - 3, y, 3, size);
}

function drawFloor(ctx, x, y) {
  ctx.fillStyle = C.floor;
  ctx.fillRect(x, y, TILE, TILE);
  ctx.fillStyle = C.floorDot;
  ctx.fillRect(x + 15, y + 15, 2, 2);
}

function drawArrow(ctx, x, y, dir, color) {
  const cx = x + TILE / 2;
  const cy = y + TILE / 2;
  ctx.fillStyle = color;
  ctx.beginPath();
  if (dir.y === -1) {
    ctx.moveTo(cx, cy - 8);
    ctx.lineTo(cx + 8, cy + 5);
    ctx.lineTo(cx - 8, cy + 5);
  } else if (dir.y === 1) {
    ctx.moveTo(cx, cy + 8);
    ctx.lineTo(cx + 8, cy - 5);
    ctx.lineTo(cx - 8, cy - 5);
  } else if (dir.x === -1) {
    ctx.moveTo(cx - 8, cy);
    ctx.lineTo(cx + 5, cy - 8);
    ctx.lineTo(cx + 5, cy + 8);
  } else {
    ctx.moveTo(cx + 8, cy);
    ctx.lineTo(cx - 5, cy - 8);
    ctx.lineTo(cx - 5, cy + 8);
  }
  ctx.closePath();
  ctx.fill();
}

function drawKey(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.beginPath();
  ctx.arc(x + 12, y + 12, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = C.floor;
  ctx.beginPath();
  ctx.arc(x + 12, y + 12, 2.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = color;
  ctx.fillRect(x + 15, y + 15, 10, 4);
  ctx.fillRect(x + 21, y + 19, 4, 4);
}

function drawDoor(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, TILE, TILE);
  ctx.strokeStyle = 'rgba(0,0,0,0.55)';
  ctx.lineWidth = 2;
  ctx.strokeRect(x + 1, y + 1, TILE - 2, TILE - 2);
  ctx.fillStyle = 'rgba(255,255,255,0.35)';
  ctx.fillRect(x + 4, y + 4, TILE - 8, 3);
  ctx.fillStyle = '#f4f4f4';
  ctx.beginPath();
  ctx.arc(x + TILE / 2, y + 14, 3.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillRect(x + TILE / 2 - 1.5, y + 14, 3, 8);
}

function drawBoot(ctx, x, y, kind) {
  ctx.fillStyle = BOOT_COLORS[kind];
  ctx.beginPath();
  ctx.moveTo(x + 10, y + 7);
  ctx.lineTo(x + 17, y + 7);
  ctx.lineTo(x + 17, y + 18);
  ctx.lineTo(x + 25, y + 18);
  ctx.lineTo(x + 25, y + 25);
  ctx.lineTo(x + 10, y + 25);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = 'rgba(255,255,255,0.5)';
  ctx.fillRect(x + 10, y + 22, 15, 3);
}

function drawChip(ctx, x, y) {
  ctx.fillStyle = C.chipPin;
  for (let i = 0; i < 3; i++) {
    ctx.fillRect(x + 8 + i * 6, y + 5, 3, 4);
    ctx.fillRect(x + 8 + i * 6, y + 23, 3, 4);
  }
  ctx.fillStyle = C.chipBody;
  ctx.fillRect(x + 6, y + 8, 20, 16);
  ctx.strokeStyle = C.chipPin;
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 6.5, y + 8.5, 19, 15);
  ctx.fillStyle = '#a9e2cd';
  ctx.fillRect(x + 10, y + 12, 12, 2);
  ctx.fillRect(x + 10, y + 17, 8, 2);
}

function drawSocket(ctx, x, y) {
  ctx.fillStyle = C.socket;
  ctx.fillRect(x + 3, y + 3, TILE - 6, TILE - 6);
  ctx.fillStyle = '#3a3a3a';
  for (let i = 0; i < 4; i++) {
    ctx.fillRect(x + 6 + i * 6, y + 6, 3, 3);
    ctx.fillRect(x + 6 + i * 6, y + TILE - 9, 3, 3);
  }
  ctx.fillStyle = '#d8d8d8';
  ctx.fillRect(x + 9, y + 12, 14, 8);
  ctx.fillStyle = C.socket;
  ctx.fillRect(x + 12, y + 14, 8, 4);
}

function drawExit(ctx, x, y) {
  for (let ry = 0; ry < 4; ry++) {
    for (let rx = 0; rx < 4; rx++) {
      ctx.fillStyle = (rx + ry) % 2 === 0 ? '#f4f4f4' : '#1a1a1a';
      ctx.fillRect(x + rx * 8, y + ry * 8, 8, 8);
    }
  }
  ctx.fillStyle = '#2e8b57';
  ctx.beginPath();
  ctx.arc(x + TILE / 2, y + TILE / 2, 8, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f4f4f4';
  ctx.beginPath();
  ctx.arc(x + TILE / 2, y + TILE / 2, 3.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawWater(ctx, x, y, phase) {
  ctx.fillStyle = C.water;
  ctx.fillRect(x, y, TILE, TILE);
  ctx.strokeStyle = C.waterDeep;
  ctx.lineWidth = 2;
  for (let i = 0; i < 2; i++) {
    const wy = y + 10 + i * 11 + Math.sin(phase / 260 + (x + i * 9) / 12) * 1.6;
    ctx.beginPath();
    ctx.moveTo(x + 4, wy);
    ctx.quadraticCurveTo(x + 11, wy - 3, x + 17, wy);
    ctx.quadraticCurveTo(x + 23, wy + 3, x + 28, wy);
    ctx.stroke();
  }
}

function drawFire(ctx, x, y, phase) {
  ctx.fillStyle = '#7a2d0d';
  ctx.fillRect(x, y, TILE, TILE);
  const flick = Math.sin(phase / 130 + x) * 2;
  ctx.fillStyle = C.fire;
  ctx.beginPath();
  ctx.moveTo(x + 6, y + 28);
  ctx.quadraticCurveTo(x + 6, y + 14 + flick, x + 16, y + 4);
  ctx.quadraticCurveTo(x + 26, y + 14 - flick, x + 26, y + 28);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = '#f6cf5c';
  ctx.beginPath();
  ctx.moveTo(x + 12, y + 28);
  ctx.quadraticCurveTo(x + 12, y + 19, x + 16, y + 12);
  ctx.quadraticCurveTo(x + 20, y + 19, x + 20, y + 28);
  ctx.closePath();
  ctx.fill();
}

function drawIce(ctx, x, y) {
  ctx.fillStyle = C.ice;
  ctx.fillRect(x, y, TILE, TILE);
  ctx.strokeStyle = C.iceLine;
  ctx.lineWidth = 1.5;
  ctx.beginPath();
  ctx.moveTo(x + 4, y + 6);
  ctx.lineTo(x + 26, y + 20);
  ctx.moveTo(x + 20, y + 5);
  ctx.lineTo(x + 28, y + 11);
  ctx.moveTo(x + 4, y + 24);
  ctx.lineTo(x + 13, y + 28);
  ctx.stroke();
}

function drawBlock(ctx, x, y) {
  bevel(ctx, x + 1, y + 1, TILE - 2, C.block, C.blockLight, C.blockDark);
  ctx.strokeStyle = C.blockDark;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + 8, y + 8);
  ctx.lineTo(x + TILE - 8, y + TILE - 8);
  ctx.moveTo(x + TILE - 8, y + 8);
  ctx.lineTo(x + 8, y + TILE - 8);
  ctx.stroke();
}

function drawHint(ctx, x, y) {
  ctx.fillStyle = C.hint;
  ctx.fillRect(x, y, TILE, TILE);
  ctx.strokeStyle = '#b9a86a';
  ctx.lineWidth = 1;
  ctx.strokeRect(x + 3.5, y + 3.5, TILE - 7, TILE - 7);
  ctx.fillStyle = '#6b5a1f';
  ctx.font = 'bold 17px Geneva, sans-serif';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText('?', x + TILE / 2, y + TILE / 2 + 1);
}

function drawPlayer(ctx, x, y, facing) {
  ctx.fillStyle = C.player;
  ctx.fillRect(x + 11, y + 13, 10, 11);
  ctx.fillRect(x + 8, y + 15, 3, 7);
  ctx.fillRect(x + 21, y + 15, 3, 7);
  ctx.fillRect(x + 12, y + 24, 3, 4);
  ctx.fillRect(x + 17, y + 24, 3, 4);
  ctx.fillStyle = '#f0d3a8';
  ctx.beginPath();
  ctx.arc(x + 16, y + 9, 5.5, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = C.player;
  ctx.fillRect(x + 10, y + 3, 12, 3);

  ctx.fillStyle = C.ink;
  if (facing === 'left') {
    ctx.fillRect(x + 11, y + 8, 2, 2);
  } else if (facing === 'right') {
    ctx.fillRect(x + 19, y + 8, 2, 2);
  } else if (facing === 'down') {
    ctx.fillRect(x + 13, y + 9, 2, 2);
    ctx.fillRect(x + 17, y + 9, 2, 2);
  } else {
    ctx.fillRect(x + 13, y + 6, 2, 2);
    ctx.fillRect(x + 17, y + 6, 2, 2);
  }
}

function drawBug(ctx, x, y) {
  ctx.strokeStyle = C.bug;
  ctx.lineWidth = 2;
  for (let i = -1; i <= 1; i++) {
    ctx.beginPath();
    ctx.moveTo(x + 10, y + 14 + i * 5);
    ctx.lineTo(x + 4, y + 12 + i * 6);
    ctx.moveTo(x + 22, y + 14 + i * 5);
    ctx.lineTo(x + 28, y + 12 + i * 6);
    ctx.stroke();
  }
  ctx.fillStyle = C.bug;
  ctx.beginPath();
  ctx.ellipse(x + 16, y + 17, 7, 9, 0, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f4f4f4';
  ctx.beginPath();
  ctx.arc(x + 13, y + 12, 2, 0, Math.PI * 2);
  ctx.arc(x + 19, y + 12, 2, 0, Math.PI * 2);
  ctx.fill();
}

function drawBall(ctx, x, y) {
  ctx.fillStyle = C.ball;
  ctx.beginPath();
  ctx.arc(x + 16, y + 16, 10, 0, Math.PI * 2);
  ctx.fill();
  ctx.strokeStyle = '#e8e8e8';
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.arc(x + 16, y + 16, 5, 0, Math.PI * 2);
  ctx.stroke();
  ctx.fillStyle = 'rgba(255,255,255,0.6)';
  ctx.beginPath();
  ctx.arc(x + 12, y + 12, 2.5, 0, Math.PI * 2);
  ctx.fill();
}

function drawTile(ctx, ch, x, y, phase) {
  if (ch === T.WALL) {
    bevel(ctx, x, y, TILE, C.wallFace, C.wallLight, C.wallDark);
    return;
  }

  if (ch === T.WATER) return drawWater(ctx, x, y, phase);
  if (ch === T.FIRE) return drawFire(ctx, x, y, phase);
  if (ch === T.ICE) return drawIce(ctx, x, y);
  if (DOOR_TILES[ch]) return drawDoor(ctx, x, y, COLORS[DOOR_TILES[ch]]);
  if (ch === T.HINT) return drawHint(ctx, x, y);

  drawFloor(ctx, x, y);

  if (ch === T.CHIP) drawChip(ctx, x, y);
  else if (ch === T.SOCKET) drawSocket(ctx, x, y);
  else if (ch === T.EXIT) drawExit(ctx, x, y);
  else if (ch === T.BLOCK) drawBlock(ctx, x, y);
  else if (KEY_TILES[ch]) drawKey(ctx, x, y, COLORS[KEY_TILES[ch]]);
  else if (BOOT_TILES[ch]) drawBoot(ctx, x, y, BOOT_TILES[ch]);
  else if (FORCE_DIRS[ch]) {
    ctx.fillStyle = C.force;
    ctx.fillRect(x, y, TILE, TILE);
    drawArrow(ctx, x, y, FORCE_DIRS[ch], C.forceArrow);
  }
}

function sameHud(a, b) {
  return (
    a.time === b.time &&
    a.chips === b.chips &&
    a.onHint === b.onHint &&
    a.red === b.red &&
    a.blue === b.blue &&
    a.green === b.green &&
    a.yellow === b.yellow &&
    a.flippers === b.flippers &&
    a.fireboots === b.fireboots &&
    a.skates === b.skates &&
    a.suction === b.suction
  );
}

function hudFrom(state) {
  return {
    time: state.timeLeft,
    chips: state.chipsLeft,
    onHint: state.onHint,
    red: state.keys.red,
    blue: state.keys.blue,
    green: state.keys.green,
    yellow: state.keys.yellow,
    flippers: state.boots.flippers,
    fireboots: state.boots.fireboots,
    skates: state.boots.skates,
    suction: state.boots.suction,
  };
}

export function ChipQuest({ isActive = true }) {
  const canvasRef = useRef(null);
  const stateRef = useRef(null);
  const heldRef = useRef([]);
  const clockRef = useRef({ lastMove: 0, monster: 0, second: 0 });

  const [levelIndex, setLevelIndex] = useState(() => readUnlocked());
  const [unlocked, setUnlocked] = useState(() => readUnlocked());
  const [phase, setPhase] = useState('ready');
  const [death, setDeath] = useState(null);
  const [hud, setHud] = useState(() => hudFrom(parseLevel(LEVELS[readUnlocked()])));

  const level = LEVELS[levelIndex];

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const state = stateRef.current;
    if (!canvas || !state) return;

    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    if (canvas.width !== CANVAS_SIZE * dpr) {
      canvas.width = CANVAS_SIZE * dpr;
      canvas.height = CANVAS_SIZE * dpr;
    }
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    const phaseMs = performance.now();
    const half = Math.floor(VIEW / 2);
    const camX = Math.max(0, Math.min(state.player.x - half, state.width - VIEW));
    const camY = Math.max(0, Math.min(state.player.y - half, state.height - VIEW));

    for (let vy = 0; vy < VIEW; vy++) {
      for (let vx = 0; vx < VIEW; vx++) {
        const gx = camX + vx;
        const gy = camY + vy;
        const px = vx * TILE;
        const py = vy * TILE;
        if (gx < 0 || gy < 0 || gx >= state.width || gy >= state.height) {
          ctx.fillStyle = C.wallDark;
          ctx.fillRect(px, py, TILE, TILE);
          continue;
        }
        drawTile(ctx, tileAt(state, gx, gy), px, py, phaseMs);
      }
    }

    for (const m of state.monsters) {
      const px = (m.x - camX) * TILE;
      const py = (m.y - camY) * TILE;
      if (px < 0 || py < 0 || px >= CANVAS_SIZE || py >= CANVAS_SIZE) continue;
      if (m.kind === 'bug') drawBug(ctx, px, py);
      else drawBall(ctx, px, py);
    }

    if (state.status !== 'dead') {
      drawPlayer(ctx, (state.player.x - camX) * TILE, (state.player.y - camY) * TILE, state.facing);
    }

    ctx.strokeStyle = C.ink;
    ctx.lineWidth = 2;
    ctx.strokeRect(1, 1, CANVAS_SIZE - 2, CANVAS_SIZE - 2);
  }, []);

  const loadLevel = useCallback(
    (index) => {
      stateRef.current = parseLevel(LEVELS[index], index);
      heldRef.current = [];
      clockRef.current = { lastMove: 0, monster: 0, second: 0 };
      setHud(hudFrom(stateRef.current));
      setDeath(null);
      setPhase('ready');
      draw();
    },
    [draw]
  );

  useEffect(() => {
    loadLevel(levelIndex);
  }, [levelIndex, loadLevel]);

  const startOrResume = useCallback(() => {
    setPhase((prev) => {
      if (prev === 'ready' || prev === 'paused') return 'playing';
      if (prev === 'dead') {
        loadLevel(levelIndex);
        return 'ready';
      }
      return prev;
    });
  }, [levelIndex, loadLevel]);

  const advance = useCallback(() => {
    const next = levelIndex + 1;
    if (next >= LEVELS.length) {
      setPhase('gamecomplete');
      return;
    }
    setUnlocked((prev) => {
      const value = Math.max(prev, next);
      localStorage.setItem(STORAGE_KEY, String(value));
      return value;
    });
    setLevelIndex(next);
  }, [levelIndex]);

  const restartLevel = useCallback(() => loadLevel(levelIndex), [loadLevel, levelIndex]);
  const startPlaying = useCallback(() => setPhase('playing'), []);
  const restartGame = useCallback(() => setLevelIndex(0), []);

  const handleOverlayAction = useCallback(() => {
    if (phase === 'levelcomplete') advance();
    else if (phase === 'gamecomplete') restartGame();
    else if (phase === 'dead') restartLevel();
    else startPlaying();
  }, [phase, advance, restartGame, restartLevel, startPlaying]);

  const syncFromState = useCallback(() => {
    const state = stateRef.current;
    setHud((prev) => {
      const next = hudFrom(state);
      return sameHud(prev, next) ? prev : next;
    });
    draw();

    if (state.status === 'dead') {
      setDeath(state.death);
      setPhase('dead');
    } else if (state.status === 'won') {
      setPhase('levelcomplete');
    }
  }, [draw]);

  // A tap moves immediately; the loop below takes over while a key is held.
  const step = useCallback(
    (dir) => {
      const state = stateRef.current;
      if (!state || state.status !== 'playing') return;

      const now = performance.now();
      if (now - clockRef.current.lastMove < MOVE_MS) return;
      clockRef.current.lastMove = now;

      movePlayer(state, dir);
      syncFromState();
    },
    [syncFromState]
  );

  // Main loop
  useEffect(() => {
    if (phase !== 'playing') return undefined;

    const id = setInterval(() => {
      const state = stateRef.current;
      if (!state) return;
      const clock = clockRef.current;

      const dir = heldRef.current[heldRef.current.length - 1];
      if (dir) step(dir);

      clock.monster += STEP_MS;
      if (clock.monster >= MONSTER_MS) {
        clock.monster = 0;
        tickMonsters(state);
      }

      clock.second += STEP_MS;
      if (clock.second >= 1000) {
        clock.second -= 1000;
        tickClock(state);
      }

      syncFromState();
    }, STEP_MS);

    return () => clearInterval(id);
  }, [phase, step, syncFromState]);

  // Keyboard
  useEffect(() => {
    if (!isActive) {
      heldRef.current = [];
      return undefined;
    }

    const handleKeyDown = (e) => {
      const dir = KEY_DIRS[e.code];

      if (dir) {
        e.preventDefault();
        if (phase === 'ready') setPhase('playing');
        if (!heldRef.current.includes(dir)) heldRef.current.push(dir);
        if (phase === 'ready' || phase === 'playing') step(dir);
        return;
      }

      if (e.code === 'Space') {
        e.preventDefault();
        if (phase === 'playing') setPhase('paused');
        else if (phase === 'levelcomplete') advance();
        else if (phase === 'gamecomplete') setLevelIndex(0);
        else startOrResume();
        return;
      }

      if (e.code === 'KeyR') {
        e.preventDefault();
        loadLevel(levelIndex);
      }
    };

    const handleKeyUp = (e) => {
      const dir = KEY_DIRS[e.code];
      if (dir) heldRef.current = heldRef.current.filter((d) => d !== dir);
    };

    const clearHeld = () => {
      heldRef.current = [];
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('blur', clearHeld);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('blur', clearHeld);
    };
  }, [isActive, phase, levelIndex, advance, startOrResume, loadLevel, step]);

  useEffect(() => {
    draw();
  }, [draw, phase]);

  const overlay = (() => {
    switch (phase) {
      case 'ready':
        return {
          title: 'Chip Quest',
          subtitle: `Level ${levelIndex + 1} — ${level.name}`,
          detail: 'Arrow keys or WASD to move • Space to pause • R to restart',
          action: 'Start Level',
          picker: true,
        };
      case 'paused':
        return {
          title: 'Paused',
          subtitle: 'Press Space to continue',
          action: 'Resume',
        };
      case 'dead':
        return {
          title: 'Bzzzt!',
          subtitle: DEATH_MESSAGES[death] || 'Ooops!',
          action: 'Try Again',
        };
      case 'levelcomplete':
        return {
          title: 'Level Complete!',
          subtitle:
            levelIndex + 1 < LEVELS.length
              ? `${LEVELS[levelIndex + 1].name} is next`
              : 'That was the last one',
          action: 'Continue',
        };
      case 'gamecomplete':
        return {
          title: 'You did it!',
          subtitle: `All ${LEVELS.length} levels cleared. Nicely done.`,
          action: 'Play Again',
        };
      default:
        return null;
    }
  })();

  const hintText =
    hud.onHint && level.hint
      ? level.hint
      : 'Grab every chip, step on the socket, then head for the exit.';

  return (
    <div className="chipquest-container">
      <div className="game-header">
        <div className="game-stats">
          <div className="game-stat">
            <span className="game-stat-label">Level:</span>
            <span className="game-stat-value">{levelIndex + 1}</span>
          </div>
          <div className="game-stat">
            <span className="game-stat-label">Chips:</span>
            <span className="game-stat-value">{hud.chips}</span>
          </div>
          <div className="game-stat">
            <span className="game-stat-label">Time:</span>
            <span className="game-stat-value">{hud.time}</span>
          </div>
        </div>
        <div className="chipquest-level-name">{level.name}</div>
      </div>

      <div className="chipquest-body">
        <div className="chipquest-stage">
          <canvas
            ref={canvasRef}
            style={{ width: CANVAS_SIZE, height: CANVAS_SIZE }}
            className="chipquest-canvas"
            onClick={phase === 'ready' ? startPlaying : undefined}
          />
          {overlay && (
            <div className="game-overlay chipquest-overlay">
              <div className="game-overlay-text">{overlay.title}</div>
              <div className="game-overlay-subtext">{overlay.subtitle}</div>
              {overlay.detail && (
                <div className="game-overlay-subtext chipquest-overlay-detail">{overlay.detail}</div>
              )}
              {overlay.picker && (
                <div className="chipquest-picker">
                  <button
                    className="chipquest-picker-button"
                    disabled={levelIndex === 0}
                    onClick={() => setLevelIndex((i) => Math.max(0, i - 1))}
                  >
                    ◀
                  </button>
                  <span className="chipquest-picker-label">
                    Level {levelIndex + 1} of {LEVELS.length}
                  </span>
                  <button
                    className="chipquest-picker-button"
                    disabled={levelIndex >= unlocked}
                    onClick={() => setLevelIndex((i) => Math.min(unlocked, i + 1))}
                  >
                    ▶
                  </button>
                </div>
              )}
              <button className="game-button" onClick={handleOverlayAction}>
                {overlay.action}
              </button>
            </div>
          )}
        </div>

        <div className="chipquest-panel">
          <div className="chipquest-panel-title">Inventory</div>
          <div className="chipquest-slots">
            {Object.entries(COLORS).map(([name, color]) => (
              <div
                key={name}
                className={`chipquest-slot ${hud[name] > 0 ? 'has' : ''}`}
                title={`${name} key`}
              >
                <span className="chipquest-key-dot" style={{ background: color }} />
                {hud[name] > 1 && <span className="chipquest-slot-count">{hud[name]}</span>}
              </div>
            ))}
          </div>
          <div className="chipquest-slots">
            {Object.keys(BOOT_LABELS).map((kind) => (
              <div
                key={kind}
                className={`chipquest-slot ${hud[kind] ? 'has' : ''}`}
                title={BOOT_LABELS[kind]}
              >
                <span
                  className="chipquest-boot-mark"
                  style={{ background: hud[kind] ? BOOT_COLORS[kind] : 'transparent' }}
                />
              </div>
            ))}
          </div>

          <div className="chipquest-panel-title">Hint</div>
          <div className="chipquest-hint">{hintText}</div>

          <button className="chipquest-restart" onClick={restartLevel}>
            Restart (R)
          </button>
        </div>
      </div>
    </div>
  );
}
