import { useEffect, useState } from "react";

export default function HiddenHeart({ id, className="", hint="Você encontrou um pedacinho novo daqui. 🤍" }) {
  const key="mi-site-secrets-v21";
  const [found,setFound]=useState(()=>JSON.parse(localStorage.getItem(key)||"[]").includes(id));
  function collect(){
    const old=JSON.parse(localStorage.getItem(key)||"[]");
    if(!old.includes(id)){const next=[...old,id];localStorage.setItem(key,JSON.stringify(next));window.dispatchEvent(new CustomEvent("mi-secret-found",{detail:{id,count:next.length}}));}
    setFound(true);
  }
  if(found) return null;
  return <button onClick={collect} title={hint} aria-label="Segredo escondido" className={`absolute z-30 grid h-9 w-9 place-items-center rounded-full border border-white/60 bg-white/65 text-lg shadow-lg backdrop-blur transition hover:scale-125 ${className}`}>♡</button>;
}
