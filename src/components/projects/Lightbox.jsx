import { useEffect, useRef } from 'react';

// Galeria em <dialog> nativo: foco preso no modal e Esc para fechar vêm do navegador.
export default function Lightbox({ title, images, index, onChange, onClose }) {
  const dialogRef = useRef(null);
  const open = images.length > 0;
  const image = images[index];

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const root = document.documentElement;
    const previous = root.style.overflow;
    root.style.overflow = 'hidden';
    return () => {
      root.style.overflow = previous;
    };
  }, [open]);

  const step = (delta) => onChange((index + delta + images.length) % images.length);

  const onKeyDown = (event) => {
    if (images.length < 2) return;
    if (event.key === 'ArrowRight') step(1);
    if (event.key === 'ArrowLeft') step(-1);
  };

  return (
    <dialog
      ref={dialogRef}
      aria-label={`Imagens do projeto ${title}`}
      onClose={onClose}
      onKeyDown={onKeyDown}
      onClick={(event) => {
        if (event.target === dialogRef.current) dialogRef.current.close();
      }}
      className="m-auto max-h-[95vh] w-[min(1200px,94vw)] border-2 border-paper bg-ink p-0 text-paper backdrop:bg-ink/85 backdrop:backdrop-blur-sm"
    >
      {image && (
        <div className="flex flex-col">
          <div className="flex items-center justify-between gap-4 border-b-2 border-paper/20 px-4 py-3 font-mono text-xs font-bold uppercase">
            <span>
              <span className="text-signal">{title}</span> · {String(index + 1).padStart(2, '0')} /{' '}
              {String(images.length).padStart(2, '0')}
            </span>
            <button
              type="button"
              autoFocus
              onClick={() => dialogRef.current.close()}
              className="-my-2 px-2 py-3 transition-colors hover:bg-signal hover:text-ink"
            >
              [ Fechar × ]
            </button>
          </div>

          <img src={image.url} alt={image.caption} className="max-h-[72vh] w-full bg-ink object-contain" />

          <div className="flex items-center justify-between gap-4 border-t-2 border-paper/20 px-4 py-3">
            <p className="font-mono text-xs text-paper/80">{image.caption}</p>
            {images.length > 1 && (
              <div className="flex shrink-0 gap-2 font-mono text-xs font-bold">
                <button
                  type="button"
                  onClick={() => step(-1)}
                  aria-label="Imagem anterior"
                  className="border-2 border-paper px-4 py-2.5 transition-colors hover:bg-paper hover:text-ink"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={() => step(1)}
                  aria-label="Próxima imagem"
                  className="border-2 border-paper px-4 py-2.5 transition-colors hover:bg-paper hover:text-ink"
                >
                  →
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </dialog>
  );
}
