import { useRef, useEffect, useState, useCallback } from 'react';

const CANVAS_WIDTH = 400;
const CANVAS_HEIGHT = 400;
const GRID_SIZE = 20;
const CELL_SIZE = CANVAS_WIDTH / GRID_SIZE;
const INITIAL_SPEED = 150;
const SPEED_INCREASE = 5;
const MIN_SPEED = 50;

function getRandomPosition(snake) {
  let position;
  do {
    position = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };
  } while (snake.some(segment => segment.x === position.x && segment.y === position.y));
  return position;
}

export function Snake({ onScoreUpdate, onGameStateChange }) {
  const canvasRef = useRef(null);
  const gameLoopRef = useRef();
  const directionRef = useRef({ x: 1, y: 0 });
  const nextDirectionRef = useRef({ x: 1, y: 0 });

  const [gameState, setGameState] = useState('ready');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    const saved = localStorage.getItem('snakeHighScore');
    return saved ? parseInt(saved, 10) : 0;
  });

  const gameData = useRef({
    snake: [{ x: 10, y: 10 }],
    food: { x: 15, y: 10 },
    speed: INITIAL_SPEED,
  });

  const resetGame = useCallback(() => {
    const initialSnake = [{ x: 10, y: 10 }];
    gameData.current = {
      snake: initialSnake,
      food: getRandomPosition(initialSnake),
      speed: INITIAL_SPEED,
    };
    directionRef.current = { x: 1, y: 0 };
    nextDirectionRef.current = { x: 1, y: 0 };
    setScore(0);
    setGameState('ready');
  }, []);

  const startGame = useCallback(() => {
    if (gameState === 'ready' || gameState === 'gameover') {
      if (gameState === 'gameover') {
        resetGame();
      }
      setGameState('playing');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  }, [gameState, resetGame]);

  const togglePause = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  }, [gameState]);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'ready' || gameState === 'gameover') {
          startGame();
        } else {
          togglePause();
        }
        return;
      }

      if (gameState !== 'playing') return;

      const currentDir = directionRef.current;
      let newDir = null;

      switch (e.code) {
        case 'ArrowUp':
        case 'KeyW':
          if (currentDir.y !== 1) newDir = { x: 0, y: -1 };
          break;
        case 'ArrowDown':
        case 'KeyS':
          if (currentDir.y !== -1) newDir = { x: 0, y: 1 };
          break;
        case 'ArrowLeft':
        case 'KeyA':
          if (currentDir.x !== 1) newDir = { x: -1, y: 0 };
          break;
        case 'ArrowRight':
        case 'KeyD':
          if (currentDir.x !== -1) newDir = { x: 1, y: 0 };
          break;
        default:
          return;
      }

      if (newDir) {
        e.preventDefault();
        nextDirectionRef.current = newDir;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, startGame, togglePause]);

  // Draw function
  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { snake, food } = gameData.current;

    // Clear canvas
    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Draw grid (subtle)
    ctx.strokeStyle = '#EEE';
    ctx.lineWidth = 1;
    for (let i = 0; i <= GRID_SIZE; i++) {
      ctx.beginPath();
      ctx.moveTo(i * CELL_SIZE, 0);
      ctx.lineTo(i * CELL_SIZE, CANVAS_HEIGHT);
      ctx.stroke();
      ctx.beginPath();
      ctx.moveTo(0, i * CELL_SIZE);
      ctx.lineTo(CANVAS_WIDTH, i * CELL_SIZE);
      ctx.stroke();
    }

    // Draw food
    ctx.fillStyle = '#666';
    ctx.beginPath();
    ctx.arc(
      food.x * CELL_SIZE + CELL_SIZE / 2,
      food.y * CELL_SIZE + CELL_SIZE / 2,
      CELL_SIZE / 2 - 2,
      0,
      Math.PI * 2
    );
    ctx.fill();

    // Draw snake
    snake.forEach((segment, index) => {
      ctx.fillStyle = index === 0 ? '#000' : '#333';
      ctx.fillRect(
        segment.x * CELL_SIZE + 1,
        segment.y * CELL_SIZE + 1,
        CELL_SIZE - 2,
        CELL_SIZE - 2
      );
    });

    // Draw border
    ctx.strokeStyle = '#000';
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
  }, []);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') {
      draw();
      return;
    }

    const gameLoop = () => {
      const { snake, food } = gameData.current;

      // Update direction
      directionRef.current = nextDirectionRef.current;
      const dir = directionRef.current;

      // Calculate new head position
      const head = snake[0];
      const newHead = {
        x: head.x + dir.x,
        y: head.y + dir.y,
      };

      // Check wall collision
      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE
      ) {
        setGameState('gameover');
        onGameStateChange?.('gameover');
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('snakeHighScore', score.toString());
        }
        return;
      }

      // Check self collision
      if (snake.some(segment => segment.x === newHead.x && segment.y === newHead.y)) {
        setGameState('gameover');
        onGameStateChange?.('gameover');
        if (score > highScore) {
          setHighScore(score);
          localStorage.setItem('snakeHighScore', score.toString());
        }
        return;
      }

      // Move snake
      const newSnake = [newHead, ...snake];

      // Check food collision
      if (newHead.x === food.x && newHead.y === food.y) {
        const newScore = score + 10;
        setScore(newScore);
        onScoreUpdate?.(newScore);
        gameData.current.food = getRandomPosition(newSnake);
        // Speed up
        gameData.current.speed = Math.max(MIN_SPEED, gameData.current.speed - SPEED_INCREASE);
      } else {
        newSnake.pop();
      }

      gameData.current.snake = newSnake;
      draw();

      gameLoopRef.current = setTimeout(gameLoop, gameData.current.speed);
    };

    gameLoopRef.current = setTimeout(gameLoop, gameData.current.speed);
    return () => clearTimeout(gameLoopRef.current);
  }, [gameState, score, highScore, draw, onScoreUpdate, onGameStateChange]);

  // Initial draw
  useEffect(() => {
    draw();
  }, [draw]);

  return (
    <div className="game-container" style={{ position: 'relative' }}>
      <div className="game-header">
        <div className="game-stats">
          <div className="game-stat">
            <span className="game-stat-label">Score:</span>
            <span className="game-stat-value">{score}</span>
          </div>
          <div className="game-stat">
            <span className="game-stat-label">High:</span>
            <span className="game-stat-value">{highScore}</span>
          </div>
        </div>
        <div className="game-lives">
          <span style={{ fontSize: '12px', color: '#666' }}>
            {gameData.current.snake.length} segments
          </span>
        </div>
      </div>

      <div className="game-canvas-container">
        <canvas
          ref={canvasRef}
          width={CANVAS_WIDTH}
          height={CANVAS_HEIGHT}
          className="game-canvas"
          onClick={gameState === 'ready' ? startGame : undefined}
        />
      </div>

      {(gameState === 'ready' || gameState === 'paused' || gameState === 'gameover') && (
        <div className="game-overlay">
          <div className="game-overlay-text">
            {gameState === 'ready' && 'Snake'}
            {gameState === 'paused' && 'Paused'}
            {gameState === 'gameover' && 'Game Over'}
          </div>
          <div className="game-overlay-subtext">
            {gameState === 'ready' && 'Click or press Space to start'}
            {gameState === 'paused' && 'Press Space to continue'}
            {gameState === 'gameover' && `Final Score: ${score}`}
          </div>
          {gameState === 'ready' && (
            <div className="game-overlay-subtext" style={{ marginTop: '8px', fontSize: '11px' }}>
              Use Arrow Keys or WASD to move
            </div>
          )}
          {gameState === 'gameover' && (
            <button className="game-button" onClick={resetGame}>
              New Game
            </button>
          )}
        </div>
      )}
    </div>
  );
}
