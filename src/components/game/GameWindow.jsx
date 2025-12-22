import { Window } from '../Window';
import { BrickBreaker } from './BrickBreaker';

export function GameWindow({ windowProps, onScoreUpdate }) {
  return (
    <Window {...windowProps} className="game-window">
      <BrickBreaker onScoreUpdate={onScoreUpdate} />
    </Window>
  );
}
