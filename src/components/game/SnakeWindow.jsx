import { Window } from '../Window';
import { Snake } from './Snake';

export function SnakeWindow({ windowProps }) {
  return (
    <Window {...windowProps} className="snake-window">
      <Snake />
    </Window>
  );
}
