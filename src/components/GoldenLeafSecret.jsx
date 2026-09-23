import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { unlockSecret } from "../secretSystem";
export default function GoldenLeafSecret(){
 const [show,setShow]=useState(false); const [caught,setCaught]=useState(false);
 useEffect(()=>{ const t=setTimeout(()=>setShow(true),9000); return()=>clearTimeout(t)},[]);
 function catchLeaf(){unlockSecret("golden-leaf");setCaught(true);setTimeout(()=>setShow(false),4200)}
 return <AnimatePresence>{show&&<motion.button type="button" onClick={catchLeaf} initial={{y:-80,x:0,opacity:0}} animate={{y:[-50,120,280,440],x:[0,35,-20,30],rotate:[0,120,260,430],opacity:[0,1,1,.9]}} transition={{duration:12,ease:"linear"}} className="fixed left-[18%] top-20 z-[70] text-4xl drop-shadow-lg" aria-label="Folha dourada secreta">🍂{caught&&<span className="absolute left-10 top-0 w-48 rounded-2xl bg-[#071a35] p-3 text-left text-xs leading-5 text-white">Você pegou a folha rara. Segredo encontrado ✨</span>}</motion.button>}</AnimatePresence>
}
