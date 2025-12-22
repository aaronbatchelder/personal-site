import { Window } from '../Window';
import { Minesweeper } from './Minesweeper';

export function MinesweeperWindow({ windowProps }) {
  return (
    <Window {...windowProps} className="minesweeper-window">
      <Minesweeper />
    </Window>
  );
}
