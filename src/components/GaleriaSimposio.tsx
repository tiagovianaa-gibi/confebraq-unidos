import { useCallback, useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn } from "lucide-react";

const TOTAL = 60;
const THUMB_BASE = "/simposio/galeria/thumb";
const FULL_BASE = "/simposio/galeria/full";

const ids = Array.from({ length: TOTAL }, (_, i) => String(i + 1).padStart(2, "0"));

type GaleriaSimposioProps = {
  /** Quantidade de fotos exibidas na grade. Omitir mostra todas. */
  limite?: number;
};

const GaleriaSimposio = ({ limite }: GaleriaSimposioProps) => {
  const fotos = typeof limite === "number" ? ids.slice(0, limite) : ids;
  const [aberta, setAberta] = useState<number | null>(null);

  const fechar = useCallback(() => setAberta(null), []);
  const anterior = useCallback(
    () => setAberta((i) => (i === null ? i : (i - 1 + fotos.length) % fotos.length)),
    [fotos.length],
  );
  const proxima = useCallback(
    () => setAberta((i) => (i === null ? i : (i + 1) % fotos.length)),
    [fotos.length],
  );

  useEffect(() => {
    if (aberta === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") fechar();
      else if (e.key === "ArrowLeft") anterior();
      else if (e.key === "ArrowRight") proxima();
    };
    window.addEventListener("keydown", onKey);
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = original;
    };
  }, [aberta, fechar, anterior, proxima]);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 lg:grid-cols-4">
        {fotos.map((id, i) => (
          <button
            key={id}
            type="button"
            onClick={() => setAberta(i)}
            className="group relative aspect-[3/2] overflow-hidden rounded-2xl bg-muted focus:outline-none focus-visible:ring-2 focus-visible:ring-secondary"
            aria-label={`Abrir foto ${i + 1} de ${fotos.length}`}
          >
            <img
              src={`${THUMB_BASE}/foto-${id}.webp`}
              alt={`III Simpósio Nacional de Quadrilhas Juninas — foto ${i + 1}`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <span className="absolute inset-0 flex items-center justify-center bg-black/0 text-white opacity-0 transition-all duration-300 group-hover:bg-black/30 group-hover:opacity-100">
              <ZoomIn className="h-7 w-7" />
            </span>
          </button>
        ))}
      </div>

      {aberta !== null && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Foto ${aberta + 1} de ${fotos.length}`}
          onClick={fechar}
        >
          <button
            type="button"
            onClick={fechar}
            className="absolute right-4 top-4 z-10 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20"
            aria-label="Fechar"
          >
            <X className="h-6 w-6" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              anterior();
            }}
            className="absolute left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:left-6"
            aria-label="Foto anterior"
          >
            <ChevronLeft className="h-7 w-7" />
          </button>

          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              proxima();
            }}
            className="absolute right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/10 p-2.5 text-white transition-colors hover:bg-white/20 sm:right-6"
            aria-label="Próxima foto"
          >
            <ChevronRight className="h-7 w-7" />
          </button>

          <figure className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={`${FULL_BASE}/foto-${fotos[aberta]}.webp`}
              alt={`III Simpósio Nacional de Quadrilhas Juninas — foto ${aberta + 1}`}
              className="max-h-[82vh] w-auto rounded-lg object-contain shadow-2xl"
            />
            <figcaption className="mt-4 text-center text-sm text-white/70">
              {aberta + 1} / {fotos.length} · Foto: Marcello Candido
            </figcaption>
          </figure>
        </div>
      )}
    </>
  );
};

export default GaleriaSimposio;
