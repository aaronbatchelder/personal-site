import { Window } from './Window';

export function SimpleTextWindow({ windowProps, document }) {
  return (
    <Window {...windowProps} className="simpletext-window">
      <div className="simpletext-content">
        <h1>{document.title}</h1>
        {document.content.split('\n\n').map((paragraph, idx) => (
          <p key={idx}>{paragraph}</p>
        ))}
      </div>
    </Window>
  );
}
