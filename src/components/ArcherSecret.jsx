import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const KEY="mi-v22-archer";
const HITKEY="mi-v22-archer-hits";

export default function ArcherSecret(){
 const [open,setOpen]=useState(false); const [found,setFound]=useState(()=>localStorage.getItem(KEY)==="1");
 const [hits,setHits]=useState(()=>+(localStorage.getItem(HITKEY)||0)); const [target,setTarget]=useState(null);
 const stars=useMemo(()=>Array.from({length:42},(_,i)=>({l:(i*37)%97,t:(i*61)%89,s:1+(i%3)})),[]);
 useEffect(()=>{if(!found||hits>=8)return; const id=setInterval(()=>setTarget({x:8+Math.random()*84,y:12+Math.random()*72}),9000);return()=>clearInterval(id)},[found,hits]);
 function discover(){setFound(true);localStorage.setItem(KEY,"1");setOpen(true);window.dispatchEvent(new CustomEvent("mi-secret-found",{detail:{id:"archer-v22"}}))}
 function hit(){const n=Math.min(8,hits+1);setHits(n);localStorage.setItem(HITKEY,String(n));setTarget(null)}
 return <>
  {!found&&<motion.button initial={{opacity:0}} animate={{opacity:.75}} whileHover={{scale:1.15,opacity:1}} onClick={discover} className="fixed bottom-28 left-3 z-[65] rotate-[-18deg] rounded-full border border-amber-200/60 bg-slate-950/55 px-3 py-2 text-xl shadow-xl backdrop-blur" title="Uma coisa parece estar escondida aqui…">🏹</motion.button>}
  {found&&hits<8&&target&&<button onClick={hit} className="fixed z-[64] grid h-9 w-9 place-items-center rounded-full border-2 border-amber-300 bg-slate-950/60 text-amber-200 shadow-xl" style={{left:`${target.x}%`,top:`${target.y}%`}} aria-label="Alvo secreto">◎</button>}
  {found&&<div className="fixed bottom-3 left-3 z-[62] rounded-full border border-white/20 bg-slate-950/55 px-3 py-1 text-[10px] font-black text-white/80 backdrop-blur">🏹 arqueira {hits}/8</div>}
  <AnimatePresence>{open&&<motion.div initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}} className="fixed inset-0 z-[220] overflow-y-auto bg-[#07111f]/95 p-5 text-white backdrop-blur-xl">
   <div className="pointer-events-none fixed inset-0">{stars.map((a,i)=><i key={i} className="absolute rounded-full bg-white" style={{left:`${a.l}%`,top:`${a.t}%`,width:a.s,height:a.s,opacity:.2+(i%5)/10}}/>)}</div>
   <motion.div initial={{y:25,opacity:0}} animate={{y:0,opacity:1}} className="relative mx-auto mt-8 max-w-2xl overflow-hidden rounded-[36px] border border-blue-200/20 bg-gradient-to-b from-blue-950/80 via-slate-950/90 to-amber-950/60 p-7 shadow-2xl sm:p-10">
    <button onClick={()=>setOpen(false)} className="absolute right-5 top-5 rounded-full bg-white/10 px-3 py-2">✕</button>
    <div className="text-center"><div className="text-6xl">🏹</div><p className="mt-4 text-xs font-black uppercase tracking-[.35em] text-amber-200">segredo encontrado</p><h2 className="mt-3 text-3xl font-black sm:text-5xl">A Arqueira do Meu Mundo</h2></div>
    <div className="mx-auto mt-8 max-w-lg space-y-4 text-center leading-7 text-blue-50/85"><p>Às vezes eu olho pra você e lembro de personagens que parecem ter saído de outro mundo.</p><p>Um pouco da coragem de uma princesa que nunca precisou ser salva. Um pouco da força de uma garota capaz de enfrentar um mundo inteiro.</p><p className="text-xl font-black text-white">Mas nenhuma delas é você.</p><p>E acho que é justamente por isso que eu gosto tanto da comparação. 🤍</p></div>
    <div className="mt-9 grid gap-3 sm:grid-cols-3"><Card icon="🍂" title="MERIDA" text="coragem • liberdade • cabelo impossível de ignorar"/><Card icon="🏹" title="ALOY" text="força • curiosidade • aventureira"/><Card icon="💙" title="MI" text="um pouco das duas e um monte de coisa que só existe nela"/></div>
    <div className="mt-8 rounded-3xl border border-white/10 bg-white/5 p-5 text-center"><p className="text-sm text-white/65">Depois de encontrar esta flecha, pequenos alvos podem aparecer pelo site.</p><b className="mt-2 block">Acerte 8. Tem outra coisa escondida. 🏹</b></div>
   </motion.div></motion.div>}</AnimatePresence>
  <AnimatePresence>{found&&hits>=8&&<motion.button initial={{scale:0,opacity:0}} animate={{scale:1,opacity:1}} onClick={()=>setOpen(true)} className="fixed bottom-14 left-3 z-[63] max-w-[230px] rounded-2xl border border-amber-200/30 bg-slate-950/85 p-3 text-left text-xs text-white shadow-2xl"><b className="text-amber-200">CONQUISTA DESBLOQUEADA 🏹</b><span className="mt-1 block">A garota que acertou meu coração.</span><span className="mt-1 block text-[9px] text-white/50">sim, foi brega. não me arrependo.</span></motion.button>}</AnimatePresence>
 </>
}
function Card({icon,title,text}){return <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-center"><div className="text-3xl">{icon}</div><b className="mt-2 block tracking-widest">{title}</b><p className="mt-2 text-xs leading-5 text-white/65">{text}</p></div>}
