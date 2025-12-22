import { useState, useCallback, useEffect } from 'react';

const BOARD_SIZE = 9;
const MINE_COUNT = 10;

function createBoard() {
  // Create empty board
  const board = Array(BOARD_SIZE).fill(null).map(() =>
    Array(BOARD_SIZE).fill(null).map(() => ({
      isMine: false,
      isRevealed: false,
      isFlagged: false,
      neighborMines: 0,
    }))
  );

  // Place mines randomly
  let minesPlaced = 0;
  while (minesPlaced < MINE_COUNT) {
    const row = Math.floor(Math.random() * BOARD_SIZE);
    const col = Math.floor(Math.random() * BOARD_SIZE);
    if (!board[row][col].isMine) {
      board[row][col].isMine = true;
      minesPlaced++;
    }
  }

  // Calculate neighbor mine counts
  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (!board[row][col].isMine) {
        let count = 0;
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            const nr = row + dr;
            const nc = col + dc;
            if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
              if (board[nr][nc].isMine) count++;
            }
          }
        }
        board[row][col].neighborMines = count;
      }
    }
  }

  return board;
}

function Cell({ cell, onClick, onRightClick, gameOver, won }) {
  const handleContextMenu = (e) => {
    e.preventDefault();
    onRightClick();
  };

  let content = '';
  let className = 'minesweeper-cell';

  if (cell.isRevealed) {
    className += ' revealed';
    if (cell.isMine) {
      content = '💣';
      className += ' mine';
    } else if (cell.neighborMines > 0) {
      content = cell.neighborMines;
      className += ` n${cell.neighborMines}`;
    }
  } else if (cell.isFlagged) {
    content = '🚩';
    className += ' flagged';
  } else if (gameOver && cell.isMine) {
    content = '💣';
    className += ' revealed mine';
  }

  if (won && cell.isMine) {
    content = '🚩';
    className += ' flagged';
  }

  return (
    <button
      className={className}
      onClick={onClick}
      onContextMenu={handleContextMenu}
      disabled={gameOver || won || cell.isRevealed}
    >
      {content}
    </button>
  );
}

export function Minesweeper() {
  const [board, setBoard] = useState(() => createBoard());
  const [gameState, setGameState] = useState('playing'); // playing, won, lost
  const [flagCount, setFlagCount] = useState(0);
  const [time, setTime] = useState(0);
  const [timerActive, setTimerActive] = useState(false);
  const [firstClick, setFirstClick] = useState(true);

  // Timer
  useEffect(() => {
    let interval;
    if (timerActive && gameState === 'playing') {
      interval = setInterval(() => {
        setTime(t => Math.min(t + 1, 999));
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timerActive, gameState]);

  const revealCell = useCallback((row, col, currentBoard) => {
    const newBoard = currentBoard.map(r => r.map(c => ({ ...c })));

    const reveal = (r, c) => {
      if (r < 0 || r >= BOARD_SIZE || c < 0 || c >= BOARD_SIZE) return;
      if (newBoard[r][c].isRevealed || newBoard[r][c].isFlagged) return;

      newBoard[r][c].isRevealed = true;

      if (newBoard[r][c].neighborMines === 0 && !newBoard[r][c].isMine) {
        for (let dr = -1; dr <= 1; dr++) {
          for (let dc = -1; dc <= 1; dc++) {
            reveal(r + dr, c + dc);
          }
        }
      }
    };

    reveal(row, col);
    return newBoard;
  }, []);

  const checkWin = useCallback((currentBoard) => {
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const cell = currentBoard[row][col];
        if (!cell.isMine && !cell.isRevealed) {
          return false;
        }
      }
    }
    return true;
  }, []);

  const handleCellClick = useCallback((row, col) => {
    if (gameState !== 'playing') return;
    if (board[row][col].isFlagged) return;

    if (firstClick) {
      setFirstClick(false);
      setTimerActive(true);

      // Ensure first click is safe
      if (board[row][col].isMine) {
        // Move the mine somewhere else
        let newBoard = board.map(r => r.map(c => ({ ...c })));
        newBoard[row][col].isMine = false;

        // Find a new spot for the mine
        for (let r = 0; r < BOARD_SIZE; r++) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            if (!newBoard[r][c].isMine && (r !== row || c !== col)) {
              newBoard[r][c].isMine = true;
              break;
            }
          }
          if (newBoard.flat().filter(c => c.isMine).length === MINE_COUNT) break;
        }

        // Recalculate neighbor counts
        for (let r = 0; r < BOARD_SIZE; r++) {
          for (let c = 0; c < BOARD_SIZE; c++) {
            if (!newBoard[r][c].isMine) {
              let count = 0;
              for (let dr = -1; dr <= 1; dr++) {
                for (let dc = -1; dc <= 1; dc++) {
                  const nr = r + dr;
                  const nc = c + dc;
                  if (nr >= 0 && nr < BOARD_SIZE && nc >= 0 && nc < BOARD_SIZE) {
                    if (newBoard[nr][nc].isMine) count++;
                  }
                }
              }
              newBoard[r][c].neighborMines = count;
            }
          }
        }

        const revealedBoard = revealCell(row, col, newBoard);
        setBoard(revealedBoard);
        return;
      }
    }

    if (board[row][col].isMine) {
      // Game over
      const newBoard = board.map(r => r.map(c => ({ ...c })));
      newBoard[row][col].isRevealed = true;
      setBoard(newBoard);
      setGameState('lost');
      setTimerActive(false);
      return;
    }

    const newBoard = revealCell(row, col, board);
    setBoard(newBoard);

    if (checkWin(newBoard)) {
      setGameState('won');
      setTimerActive(false);
    }
  }, [board, gameState, firstClick, revealCell, checkWin]);

  const handleRightClick = useCallback((row, col) => {
    if (gameState !== 'playing') return;
    if (board[row][col].isRevealed) return;

    const newBoard = board.map(r => r.map(c => ({ ...c })));
    newBoard[row][col].isFlagged = !newBoard[row][col].isFlagged;
    setBoard(newBoard);
    setFlagCount(prev => newBoard[row][col].isFlagged ? prev + 1 : prev - 1);
  }, [board, gameState]);

  const resetGame = useCallback(() => {
    setBoard(createBoard());
    setGameState('playing');
    setFlagCount(0);
    setTime(0);
    setTimerActive(false);
    setFirstClick(true);
  }, []);

  const getFaceEmoji = () => {
    if (gameState === 'won') return '😎';
    if (gameState === 'lost') return '😵';
    return '🙂';
  };

  return (
    <div className="minesweeper-container">
      <div className="minesweeper-header">
        <div className="minesweeper-counter">
          {String(MINE_COUNT - flagCount).padStart(3, '0')}
        </div>
        <button className="minesweeper-face" onClick={resetGame}>
          {getFaceEmoji()}
        </button>
        <div className="minesweeper-counter">
          {String(time).padStart(3, '0')}
        </div>
      </div>
      <div className="minesweeper-board">
        {board.map((row, rowIdx) => (
          <div key={rowIdx} className="minesweeper-row">
            {row.map((cell, colIdx) => (
              <Cell
                key={`${rowIdx}-${colIdx}`}
                cell={cell}
                onClick={() => handleCellClick(rowIdx, colIdx)}
                onRightClick={() => handleRightClick(rowIdx, colIdx)}
                gameOver={gameState === 'lost'}
                won={gameState === 'won'}
              />
            ))}
          </div>
        ))}
      </div>
      {(gameState === 'won' || gameState === 'lost') && (
        <div className="minesweeper-message">
          {gameState === 'won' ? 'You Win!' : 'Game Over'}
        </div>
      )}
    </div>
  );
}
