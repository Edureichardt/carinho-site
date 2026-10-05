import { useEffect, useState } from "react";
const KEY="mi-site-secrets-v21";
export default function SecretHuntV21(){
 const [count,setCount]=useState(()=>JSON.parse(localStorage.getItem(KEY)||"[]").length);const [show,setShow]=useState(false);
 useEffect(()=>{const fn=e=>{setCount(e.detail.count);if(e.detail.count>=8)setShow(true)};addEventListener("mi-secret-found",fn);return()=>removeEventListener("mi-secret-found",fn)},[]);
 return <><div className="fixed bottom-24 left-3 z-[75] rounded-full border border-blue-100/70 bg-white/80 px-3 py-2 text-[10px] font-black text-slate-700 shadow-xl backdrop-blur">♡ novos segredos {Math.min(count,8)}/8</div>{(show||count>=8)&&<div className="fixed inset-0 z-[190] grid place-items-center bg-slate-950/90 p-6 text-center text-white backdrop-blur"><div className="max-w-sm"><div className="text-6xl">🌸💙</div><h2 className="mt-4 text-3xl font-black">Você achou todos.</h2><p className="mt-4 leading-7 text-blue-100">Eu sabia que você não ia deixar nenhum segredo quieto kkk. A melhor parte desse site continua sendo ter motivos para voltar aqui e escrever mais um pedacinho da nossa história.</p><p className="mt-5 text-xl font-black">Eu te amo, Mi. 🤍</p><button onClick={()=>setShow(false)} className="mt-7 rounded-2xl bg-white px-6 py-3 font-black text-blue-950">guardar esse segredo</button></div></div>}</>;
}
