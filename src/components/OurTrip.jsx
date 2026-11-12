import { useMemo, useState } from "react";
import { Camera, Heart, MapPin, Mountain, Waves, X, ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import morroTrilha from "../assets/viagem/morro-trilha.webp";
import morroMirante from "../assets/viagem/morro-mirante.webp";
import morroVista from "../assets/viagem/morro-vista.webp";
import morroSelfie from "../assets/viagem/morro-selfie.webp";
import morroAbraco from "../assets/viagem/morro-abraco.webp";
import miSorriso from "../assets/viagem/mi-sorriso.webp";
import praiaChegada from "../assets/viagem/praia-chegada.webp";
import praiaPes from "../assets/viagem/praia-pes-na-areia.webp";
import praiaNos from "../assets/viagem/praia-nos.webp";

const memories = [
  { src: morroMirante, place: "Dia de praia", type: "praia", caption: "A Brisa a leveza.", tag: "Brisa" },
  { src: morroTrilha, place: "Dia de praia", type: "praia", caption: "Até o caminho fica mais bonito quando é com você.", tag: "O caminho" },
  { src: morroVista, place: "Morro das Antenas", type: "morro", caption: "Um daqueles cenários que dá vontade de guardar para sempre.", tag: "Nossa paisagem" },
  { src: morroSelfie, place: "Dia de praia", type: "praia", caption: "Às vezes, tudo que a gente precisa é disso: mar, calma e companhia.", tag: "Nós dois" },
  { src: morroAbraco, place: "Morro das Antenas", type: "morro", caption: "Meu detalhe favorito da viagem: ter você pertinho.", tag: "Meu lugar" },
  { src: miSorriso, place: "Entre uma lembrança e outra", type: "todos", caption: "E claro que não podia faltar esse rostinho. ♡", tag: "Amor" },
  { src: praiaChegada, place: "Morro das Antenas", type: "morro", caption: "Lá em cima, com o mundo inteiro diante da gente.", tag: "A vista" },
  { src: praiaPes, place: "Morro das Antenas", type: "morro", caption: "A gente e um pedacinho enorme do mundo ao fundo.", tag: "Sem pressa" },
  { src: praiaNos, place: "Morro das Antenas", type: "morro", caption: "Mais uma memória nossa para levar comigo.", tag: "Mais um capítulo" },
];

export default function OurTrip() {
  const [filter, setFilter] = useState("todos");
  const [selected, setSelected] = useState(null);
  const [liked, setLiked] = useState([]);
  const visible = useMemo(() => memories.filter((m) => filter === "todos" || m.type === filter || m.type === "todos"), [filter]);
  const current = selected === null ? null : memories[selected];
  const open = (memory) => setSelected(memories.indexOf(memory));
  const move = (direction) => setSelected((value) => (value + direction + memories.length) % memories.length);
  const toggleLike = (index) => setLiked((items) => items.includes(index) ? items.filter((item) => item !== index) : [...items, index]);

  return (
    <section id="nossa-viagem" className="relative isolate overflow-hidden bg-gradient-to-b from-[#edf4ff] via-[#f8faff] to-[#f6f0e8] px-5 py-24 sm:px-8">
      <div className="pointer-events-none absolute -left-28 top-20 h-80 w-80 rounded-full bg-blue-200/35 blur-3xl" />
      <div className="pointer-events-none absolute -right-28 bottom-10 h-96 w-96 rounded-full bg-amber-200/30 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <header className="mx-auto mb-14 max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-blue-200/80 bg-white/70 px-4 py-2 text-[11px] font-bold uppercase tracking-[.24em] text-blue-800 shadow-sm backdrop-blur"><Sparkles size={14}/> um capítulo novo da gente</span>
          <h2 className="mt-6 font-serif text-4xl font-bold leading-tight text-slate-900 sm:text-6xl">Do alto das montanhas<br/><span className="text-blue-700">até pertinho do mar.</span></h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-slate-600 sm:text-lg">Nossa viagem para Jaraguá do Sul, o Morro das Antenas e depois aquele tempo na praia. Um monte de paisagens bonitas — mas minha parte favorita continua sendo viver tudo isso com você.</p>
        </header>

        <div className="mb-10 grid gap-4 md:grid-cols-2">
          <div className="group relative min-h-[190px] overflow-hidden rounded-[2rem] bg-slate-900 p-7 text-white shadow-xl sm:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,rgba(147,197,253,.5),transparent_40%),linear-gradient(135deg,#10284c,#07152c)]" />
            <Mountain className="absolute -bottom-5 -right-2 h-40 w-40 text-white/10 transition duration-700 group-hover:scale-110" />
            <div className="relative"><span className="text-xs font-bold uppercase tracking-[.25em] text-blue-200">Primeira parada</span><h3 className="mt-3 font-serif text-3xl sm:text-4xl">Morro das Antenas</h3><p className="mt-3 max-w-sm text-sm leading-6 text-blue-100/80">O vento, a vista lá de cima e nós dois aproveitando aquele momento.</p><span className="mt-6 inline-flex items-center gap-2 text-sm text-blue-100"><MapPin size={15}/> Jaraguá do Sul · SC</span></div>
          </div>
          <div className="group relative min-h-[190px] overflow-hidden rounded-[2rem] bg-[#153b59] p-7 text-white shadow-xl sm:p-9">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_15%,rgba(186,230,253,.4),transparent_40%),linear-gradient(135deg,#245879,#102b46)]" />
            <Waves className="absolute -bottom-5 -right-2 h-40 w-40 text-white/10 transition duration-700 group-hover:scale-110" />
            <div className="relative"><span className="text-xs font-bold uppercase tracking-[.25em] text-cyan-100">Depois, um respiro</span><h3 className="mt-3 font-serif text-3xl sm:text-4xl">Um dia de praia</h3><p className="mt-3 max-w-sm text-sm leading-6 text-cyan-50/80">Areia, mar, brisa e a felicidade das coisas simples quando estamos juntos.</p><span className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-50"><Waves size={15}/> Nosso momento à beira-mar</span></div>
          </div>
        </div>

        <div className="mb-7 flex flex-col items-center justify-between gap-4 sm:flex-row">
          <div><p className="text-xs font-bold uppercase tracking-[.24em] text-blue-700">Diário de viagem</p><h3 className="mt-1 font-serif text-3xl font-bold text-slate-900">Nove lembranças para rever</h3></div>
          <div className="flex flex-wrap justify-center gap-2" aria-label="Filtrar fotos">
            {[['todos','Todas'],['morro','⛰ Morro'],['praia','🌊 Praia']].map(([value,label])=><button key={value} type="button" onClick={()=>setFilter(value)} className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${filter===value?'border-blue-800 bg-blue-800 text-white shadow-md':'border-blue-200 bg-white/80 text-slate-600 hover:border-blue-400 hover:text-blue-800'}`}>{label}</button>)}
          </div>
        </div>

        <div className="columns-2 gap-3 sm:columns-3 sm:gap-5">
          {visible.map((memory) => { const index = memories.indexOf(memory); return (
            <article key={memory.src} className="group relative mb-4 break-inside-avoid overflow-hidden rounded-[1.5rem] border border-white/80 bg-white p-2 shadow-[0_14px_45px_rgba(30,64,110,.12)] transition duration-500 hover:-translate-y-1 sm:mb-5 sm:p-3">
              <button type="button" onClick={()=>open(memory)} className="block w-full overflow-hidden rounded-[1.1rem] bg-blue-50 text-left" aria-label={`Ampliar foto: ${memory.tag}`}><img src={memory.src} alt={`${memory.tag} - ${memory.place}`} loading="lazy" className="h-auto w-full object-cover transition duration-700 group-hover:scale-[1.045]"/><span className="absolute left-4 top-4 rounded-full border border-white/40 bg-slate-950/35 px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white backdrop-blur">{memory.tag}</span></button>
              <div className="flex items-start justify-between gap-2 px-2 pb-1 pt-3"><div><p className="text-sm font-semibold text-slate-800">{memory.caption}</p><p className="mt-1 text-[11px] text-slate-400">{memory.place}</p></div><button type="button" onClick={()=>toggleLike(index)} aria-label={liked.includes(index)?'Desmarcar favorita':'Marcar como favorita'} className={`mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-full transition ${liked.includes(index)?'bg-rose-50 text-rose-500':'bg-slate-50 text-slate-400 hover:bg-rose-50 hover:text-rose-400'}`}><Heart size={16} fill={liked.includes(index)?'currentColor':'none'}/></button></div>
            </article>
          );})}
        </div>

        <div className="mx-auto mt-14 max-w-3xl rounded-[2rem] border border-blue-100 bg-white/75 px-7 py-9 text-center shadow-[0_15px_50px_rgba(30,64,110,.08)] backdrop-blur sm:px-12">
          <span className="text-3xl">♡</span><p className="mt-4 font-serif text-2xl italic leading-relaxed text-slate-800 sm:text-3xl">“A paisagem era linda, mas o que fez a viagem valer a pena foi ter você ao meu lado.”</p><p className="mt-5 text-xs font-bold uppercase tracking-[.25em] text-blue-700">mais uma memória nossa · Edu & Mi</p>
          <p className="mt-6 text-sm text-slate-500">E essa galeria ainda pode crescer. Que venham muitos outros destinos, fotos e histórias para guardar.</p>
        </div>
      </div>

      {current && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#061329]/90 p-4 backdrop-blur-lg" role="dialog" aria-modal="true" aria-label="Foto da viagem" onClick={()=>setSelected(null)}>
        <button type="button" onClick={()=>setSelected(null)} aria-label="Fechar" className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20"><X/></button>
        <button type="button" onClick={(e)=>{e.stopPropagation();move(-1)}} aria-label="Foto anterior" className="absolute left-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:left-7"><ChevronLeft/></button>
        <div className="max-w-5xl text-center" onClick={(e)=>e.stopPropagation()}><img src={current.src} alt={current.caption} className="mx-auto max-h-[76vh] max-w-full rounded-2xl object-contain shadow-2xl"/><p className="mt-5 font-serif text-xl text-white sm:text-2xl">{current.caption}</p><p className="mt-2 text-xs uppercase tracking-[.2em] text-blue-200">{current.place} · {selected+1} de {memories.length}</p></div>
        <button type="button" onClick={(e)=>{e.stopPropagation();move(1)}} aria-label="Próxima foto" className="absolute right-2 top-1/2 grid h-11 w-11 -translate-y-1/2 place-items-center rounded-full bg-white/10 text-white hover:bg-white/20 sm:right-7"><ChevronRight/></button>
      </div>}
    </section>
  );
}
