import { Window } from '../Window';
import { ChipQuest } from './ChipQuest';

export function ChipQuestWindow({ windowProps }) {
  return (
    <Window {...windowProps} className="chipquest-window">
      <ChipQuest isActive={windowProps.isActive} />
    </Window>
  );
}
