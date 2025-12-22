import { Window } from './Window';

export function PictureWindow({ windowProps, imageSrc, imageAlt }) {
  return (
    <Window {...windowProps} className="picture-window">
      <img src={imageSrc} alt={imageAlt} />
    </Window>
  );
}
