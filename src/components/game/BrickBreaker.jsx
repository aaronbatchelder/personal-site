import { useRef, useEffect, useState, useCallback } from 'react';

const CANVAS_WIDTH = 480;
const CANVAS_HEIGHT = 320;
const PADDLE_WIDTH = 80;
const PADDLE_HEIGHT = 12;
const BALL_RADIUS = 6;
const BRICK_ROWS = 5;
const BRICK_COLS = 10;
const BRICK_WIDTH = 44;
const BRICK_HEIGHT = 16;
const BRICK_PADDING = 2;
const BRICK_OFFSET_TOP = 40;
const BRICK_OFFSET_LEFT = 4;

const BRICK_COLORS = ['#666', '#888', '#AAA', '#CCC', '#EEE'];
const BRICK_POINTS = [30, 25, 20, 15, 10];

function createBricks() {
  const bricks = [];
  for (let row = 0; row < BRICK_ROWS; row++) {
    for (let col = 0; col < BRICK_COLS; col++) {
      bricks.push({
        x: BRICK_OFFSET_LEFT + col * (BRICK_WIDTH + BRICK_PADDING),
        y: BRICK_OFFSET_TOP + row * (BRICK_HEIGHT + BRICK_PADDING),
        width: BRICK_WIDTH,
        height: BRICK_HEIGHT,
        color: BRICK_COLORS[row],
        points: BRICK_POINTS[row],
        destroyed: false,
      });
    }
  }
  return bricks;
}

export function BrickBreaker({ onScoreUpdate, onGameStateChange }) {
  const canvasRef = useRef(null);
  const requestRef = useRef();

  const [gameState, setGameState] = useState('ready'); // ready, playing, paused, gameover, won
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [level, setLevel] = useState(1);

  const gameData = useRef({
    ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50, dx: 4, dy: -4 },
    paddle: { x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2 },
    bricks: createBricks(),
  });

  const resetBall = useCallback(() => {
    gameData.current.ball = {
      x: CANVAS_WIDTH / 2,
      y: CANVAS_HEIGHT - 50,
      dx: 4 * (Math.random() > 0.5 ? 1 : -1),
      dy: -4,
    };
  }, []);

  const resetGame = useCallback(() => {
    gameData.current = {
      ball: { x: CANVAS_WIDTH / 2, y: CANVAS_HEIGHT - 50, dx: 4, dy: -4 },
      paddle: { x: (CANVAS_WIDTH - PADDLE_WIDTH) / 2 },
      bricks: createBricks(),
    };
    setScore(0);
    setLives(3);
    setLevel(1);
    setGameState('ready');
  }, []);

  const startGame = useCallback(() => {
    if (gameState === 'ready' || gameState === 'gameover' || gameState === 'won') {
      resetGame();
      setGameState('playing');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  }, [gameState, resetGame]);

  const pauseGame = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused');
    }
  }, [gameState]);

  const togglePause = useCallback(() => {
    if (gameState === 'playing') {
      setGameState('paused');
    } else if (gameState === 'paused') {
      setGameState('playing');
    }
  }, [gameState]);

  // Mouse movement
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      gameData.current.paddle.x = Math.max(
        0,
        Math.min(CANVAS_WIDTH - PADDLE_WIDTH, mouseX - PADDLE_WIDTH / 2)
      );
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    return () => canvas.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        if (gameState === 'ready') {
          startGame();
        } else {
          togglePause();
        }
      }
      if (e.code === 'ArrowLeft') {
        gameData.current.paddle.x = Math.max(0, gameData.current.paddle.x - 20);
      }
      if (e.code === 'ArrowRight') {
        gameData.current.paddle.x = Math.min(
          CANVAS_WIDTH - PADDLE_WIDTH,
          gameData.current.paddle.x + 20
        );
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [gameState, startGame, togglePause]);

  // Game loop
  useEffect(() => {
    if (gameState !== 'playing') return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    const gameLoop = () => {
      const { ball, paddle, bricks } = gameData.current;

      // Clear canvas
      ctx.fillStyle = '#FFF';
      ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

      // Draw bricks
      bricks.forEach((brick) => {
        if (!brick.destroyed) {
          ctx.fillStyle = brick.color;
          ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
          ctx.strokeStyle = '#000';
          ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
        }
      });

      // Draw paddle
      ctx.fillStyle = '#000';
      ctx.fillRect(paddle.x, CANVAS_HEIGHT - PADDLE_HEIGHT - 10, PADDLE_WIDTH, PADDLE_HEIGHT);

      // Draw ball
      ctx.beginPath();
      ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
      ctx.fillStyle = '#000';
      ctx.fill();
      ctx.closePath();

      // Move ball
      ball.x += ball.dx;
      ball.y += ball.dy;

      // Wall collision
      if (ball.x + BALL_RADIUS > CANVAS_WIDTH || ball.x - BALL_RADIUS < 0) {
        ball.dx = -ball.dx;
      }
      if (ball.y - BALL_RADIUS < 0) {
        ball.dy = -ball.dy;
      }

      // Paddle collision
      if (
        ball.y + BALL_RADIUS > CANVAS_HEIGHT - PADDLE_HEIGHT - 10 &&
        ball.y - BALL_RADIUS < CANVAS_HEIGHT - 10 &&
        ball.x > paddle.x &&
        ball.x < paddle.x + PADDLE_WIDTH
      ) {
        ball.dy = -Math.abs(ball.dy);
        // Add angle based on where ball hits paddle
        const hitPos = (ball.x - paddle.x) / PADDLE_WIDTH;
        ball.dx = 8 * (hitPos - 0.5);
      }

      // Ball fell below paddle
      if (ball.y > CANVAS_HEIGHT) {
        const newLives = lives - 1;
        setLives(newLives);
        if (newLives <= 0) {
          setGameState('gameover');
          onGameStateChange?.('gameover');
        } else {
          resetBall();
        }
      }

      // Brick collision
      let allDestroyed = true;
      bricks.forEach((brick) => {
        if (!brick.destroyed) {
          allDestroyed = false;
          if (
            ball.x + BALL_RADIUS > brick.x &&
            ball.x - BALL_RADIUS < brick.x + brick.width &&
            ball.y + BALL_RADIUS > brick.y &&
            ball.y - BALL_RADIUS < brick.y + brick.height
          ) {
            brick.destroyed = true;
            ball.dy = -ball.dy;
            const newScore = score + brick.points;
            setScore(newScore);
            onScoreUpdate?.(newScore);
          }
        }
      });

      // Check win
      if (allDestroyed) {
        setGameState('won');
        onGameStateChange?.('won');
      }

      requestRef.current = requestAnimationFrame(gameLoop);
    };

    requestRef.current = requestAnimationFrame(gameLoop);
    return () => cancelAnimationFrame(requestRef.current);
  }, [gameState, lives, score, resetBall, onScoreUpdate, onGameStateChange]);

  // Draw static state when not playing
  useEffect(() => {
    if (gameState === 'playing') return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const { ball, paddle, bricks } = gameData.current;

    ctx.fillStyle = '#FFF';
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    bricks.forEach((brick) => {
      if (!brick.destroyed) {
        ctx.fillStyle = brick.color;
        ctx.fillRect(brick.x, brick.y, brick.width, brick.height);
        ctx.strokeStyle = '#000';
        ctx.strokeRect(brick.x, brick.y, brick.width, brick.height);
      }
    });

    ctx.fillStyle = '#000';
    ctx.fillRect(paddle.x, CANVAS_HEIGHT - PADDLE_HEIGHT - 10, PADDLE_WIDTH, PADDLE_HEIGHT);

    ctx.beginPath();
    ctx.arc(ball.x, ball.y, BALL_RADIUS, 0, Math.PI * 2);
    ctx.fillStyle = '#000';
    ctx.fill();
    ctx.closePath();
  }, [gameState]);

  return (
    <div className="game-container" style={{ position: 'relative' }}>
      <div className="game-header">
        <div className="game-stats">
          <div className="game-stat">
            <span className="game-stat-label">Score:</span>
            <span className="game-stat-value">{score}</span>
          </div>
          <div className="game-stat">
            <span className="game-stat-label">Level:</span>
            <span className="game-stat-value">{level}</span>
          </div>
        </div>
        <div className="game-lives">
          {[...Array(3)].map((_, i) => (
            <div key={i} className={`game-life ${i >= lives ? 'lost' : ''}`} />
          ))}
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

      {(gameState === 'ready' || gameState === 'paused' || gameState === 'gameover' || gameState === 'won') && (
        <div className="game-overlay">
          <div className="game-overlay-text">
            {gameState === 'ready' && 'Brick Breaker'}
            {gameState === 'paused' && 'Paused'}
            {gameState === 'gameover' && 'Game Over'}
            {gameState === 'won' && 'You Win!'}
          </div>
          <div className="game-overlay-subtext">
            {gameState === 'ready' && 'Click or press Space to start'}
            {gameState === 'paused' && 'Press Space to continue'}
            {gameState === 'gameover' && `Final Score: ${score}`}
            {gameState === 'won' && `Final Score: ${score}`}
          </div>
          {(gameState === 'gameover' || gameState === 'won') && (
            <button className="game-button" onClick={resetGame}>
              New Game
            </button>
          )}
        </div>
      )}
    </div>
  );
}
