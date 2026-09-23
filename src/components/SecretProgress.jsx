import { useEffect, useState } from "react";
import { LockKeyhole, Sparkles, X } from "lucide-react";
import { getSecrets, SECRET_EVENT, SECRET_TOTAL } from "../secretSystem";

export default function SecretProgress() {
  const [found, setFound] = useState([]);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const sync = () => setFound(getSecrets());
    sync(); window.addEventListener(SECRET_EVENT, sync);
    return () => window.removeEventListener(SECRET_EVENT, sync);
  }, []);
  const done = found.length >= SECRET_TOTAL;
  return <>
    <button type="button" onClick={() => setOpen(true)} className="fixed bottom-5 left-5 z-[65] flex items-center gap-2 rounded-full border border-blue-200/60 bg-[#071a35]/95 px-4 py-3 text-xs font-bold text-blue-100 shadow-xl backdrop-blur" aria-label="Ver segredos encontrados">
      <LockKeyhole size={15}/><span>{Math.min(found.length, SECRET_TOTAL)}/{SECRET_TOTAL}</span>
    </button>
    {open && <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/70 p-5 backdrop-blur-md" role="dialog" aria-modal="true">
      <div className="relative w-full max-w-lg rounded-[2rem] bg-white p-7 text-center shadow-2xl sm:p-9">
        <button onClick={() => setOpen(false)} className="absolute right-4 top-4 rounded-full p-2 text-slate-500 hover:bg-slate-100"><X/></button>
        <Sparkles className="mx-auto text-amber-500"/>
        <p className="mt-4 text-xs font-bold uppercase tracking-[.28em] text-blue-600">universo secreto da Mi</p>
        <h2 className="mt-3 text-3xl font-black text-slate-900">{found.length} de {SECRET_TOTAL} segredos</h2>
        <div className="mx-auto mt-6 flex max-w-xs gap-2">{Array.from({length:SECRET_TOTAL}).map((_,i)=><span key={i} className={`h-2 flex-1 rounded-full ${i<found.length?'bg-blue-600':'bg-slate-200'}`}/>)}</div>
        {!done ? <p className="mt-6 leading-7 text-slate-600">Alguns são fáceis. Outros talvez você passe por eles várias vezes sem perceber. 😼</p> : <div className="mt-7 rounded-3xl bg-[#071a35] p-6 text-blue-50"><strong className="block text-xl text-white">Você encontrou tudo. 🤍</strong><p className="mt-3 leading-7">Eu sabia que você entrava aqui. Só não sabia até onde sua curiosidade ia chegar. Se chegou até aqui, fica registrado: eu escolheria viver tudo isso com você de novo.</p><p className="mt-4 text-sm text-blue-200">— do seu namorado</p></div>}
      </div>
    </div>}
  </>;
}
