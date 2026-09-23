import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Heart, Image as ImageIcon, X } from "lucide-react";
import { unlockSecret } from "../secretSystem";

import foto1 from "../assets/fotos/nos-01.jpeg";
import foto2 from "../assets/fotos/nos-02.jpeg";
import foto3 from "../assets/fotos/nos-03.jpeg";
import foto4 from "../assets/fotos/nos-04.jpeg";
import foto5 from "../assets/fotos/nos-05.jpeg";
import foto6 from "../assets/fotos/nos-06.jpeg";
import foto7 from "../assets/fotos/nos-07.jpeg";

const photos = [
  { src: foto1, caption: "Um pedacinho de nós 💙", alt: "Foto do casal ao ar livre" },
  { src: foto2, caption: "Meu lugar favorito é pertinho de você 🤍", alt: "Foto carinhosa do casal" },
  { src: foto3, caption: "Nós, do nosso jeitinho.", alt: "Selfie em preto e branco do casal" },
  { src: foto4, caption: "E eu escolheria esse sorriso de novo.", alt: "Selfie descontraída do casal" },
  { src: foto5, caption: "Uma foto simples, uma memória que eu quero guardar.", alt: "Selfie do casal" },
  { src: foto6, caption: "Você deixa meus dias mais bonitos. 💙", alt: "Selfie divertida do casal" },
  { src: foto7, caption: "Tem abraço que parece casa.", alt: "Abraço do casal em preto e branco" },
];

export default function Gallery() {
  const [selected, setSelected] = useState(null);

  const close = () => setSelected(null);
  const previous = () => setSelected((current) => (current - 1 + photos.length) % photos.length);
  const next = () => setSelected((current) => (current + 1) % photos.length);

  useEffect(() => {
    if (selected === null) return;
    const onKey = (event) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") previous();
      if (event.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [selected]);

  return (
    <section id="galeria" className="relative overflow-hidden px-5 py-24 sm:px-8">
      <div className="pointer-events-none absolute -left-20 top-16 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-8 h-72 w-72 rounded-full bg-amber-100/50 blur-3xl" />

      <div className="relative mx-auto max-w-6xl">
        <div className="mx-auto mb-12 max-w-2xl text-center">
          <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-blue-100 bg-white/70 px-4 py-2 text-xs font-semibold uppercase tracking-[0.22em] text-blue-700 backdrop-blur">
            <Heart size={14} fill="currentColor" /> nossas memórias
          </span>
          <h2 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">Nossa galeria</h2>
          <p className="mt-4 leading-relaxed text-slate-600">
            Alguns momentos merecem mais do que ficar perdidos na galeria do celular. Aqui vai ficando um pedacinho da nossa história. 💙
          </p>
        </div>

        {photos.length === 0 ? (
          <div className="mx-auto max-w-3xl rounded-[2rem] border border-dashed border-blue-200 bg-white/65 p-8 text-center shadow-sm backdrop-blur sm:p-12">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
              <ImageIcon size={30} />
            </div>
            <h3 className="mt-5 text-xl font-bold text-slate-800">Nosso álbum começa aqui</h3>
            <p className="mx-auto mt-2 max-w-lg text-sm leading-6 text-slate-500">
              As fotos que o Edu escolher vão aparecer aqui como polaroids. Cada uma pode ter uma frase, uma data ou uma pequena memória nossa.
            </p>
          </div>
        ) : (
          <div className="columns-2 gap-3 sm:columns-3 sm:gap-5 lg:columns-4">
            {photos.map((photo, index) => (
              <button
                type="button"
                key={`${photo.src}-${index}`}
                onClick={() => setSelected(index)}
                className="group mb-3 w-full break-inside-avoid rounded-[1.35rem] bg-white p-2 text-left shadow-[0_10px_35px_rgba(30,64,175,0.09)] transition duration-300 hover:-translate-y-1 hover:rotate-[0.4deg] sm:mb-5 sm:p-3"
                aria-label={`Abrir foto ${index + 1}`}
              >
                <div className="relative overflow-hidden rounded-[1rem] bg-blue-50">
                  {index === 2 && <span onClick={(e) => { e.stopPropagation(); unlockSecret("gallery-heart"); }} className="absolute bottom-2 right-2 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-white/35 text-xs text-white/75 backdrop-blur transition hover:bg-white/70 hover:text-blue-700" title="♡">♡</span>}
                  <img src={photo.src} alt={photo.alt || photo.caption || `Memória ${index + 1}`} className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.035]" />
                </div>
                {photo.caption && <p className="px-2 pb-2 pt-3 text-center text-sm font-medium text-slate-700">{photo.caption}</p>}
              </button>
            ))}
          </div>
        )}
      </div>

      {selected !== null && photos[selected] && (
        <div className="fixed inset-0 z-[90] flex items-center justify-center bg-slate-950/85 p-4 backdrop-blur-md" role="dialog" aria-modal="true" aria-label="Foto ampliada">
          <button type="button" onClick={close} className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20" aria-label="Fechar galeria"><X /></button>
          {photos.length > 1 && <button type="button" onClick={previous} className="absolute left-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:left-8" aria-label="Foto anterior"><ChevronLeft /></button>}
          <div className="max-h-[88vh] max-w-4xl text-center">
            <img src={photos[selected].src} alt={photos[selected].alt || photos[selected].caption || "Nossa foto"} className="mx-auto max-h-[76vh] max-w-full rounded-2xl object-contain shadow-2xl" />
            {photos[selected].caption && <p className="mx-auto mt-4 max-w-xl text-sm text-white/85 sm:text-base">{photos[selected].caption}</p>}
            <p className="mt-2 text-xs text-white/45">{selected + 1} / {photos.length}</p>
          </div>
          {photos.length > 1 && <button type="button" onClick={next} className="absolute right-3 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-white transition hover:bg-white/20 sm:right-8" aria-label="Próxima foto"><ChevronRight /></button>}
        </div>
      )}
    </section>
  );
}
