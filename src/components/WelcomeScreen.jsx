import { motion } from "framer-motion";
import { useState } from "react";

export default function WelcomeScreen({ onStart }) {
  const [exit, setExit] = useState(false);

  function start() {
    setExit(true);
    setTimeout(onStart, 800);
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: exit ? 0 : 1, scale: exit ? 1.08 : 1 }}
      transition={{ duration: 0.8 }}
      className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden bg-gradient-to-br from-[#071a36] via-[#0d2d5a] to-[#11213c] px-6 text-white"
    >
      <div className="absolute left-8 top-14 text-5xl opacity-20">🍂</div>
      <div className="absolute bottom-16 right-10 text-6xl opacity-20">🍁</div>
      <div className="text-center">
        <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 2.4, repeat: Infinity }} className="text-7xl">
          💌
        </motion.div>
        <p className="mt-7 text-xs font-semibold uppercase tracking-[0.35em] text-blue-200">tem atualização por aqui</p>
        <h1 className="mt-5 text-4xl font-bold sm:text-6xl">Para a Mi 🤍</h1>
        <p className="mx-auto mt-6 max-w-md text-lg leading-8 text-blue-100/75">
          Algumas coisas mudaram desde a última vez que você entrou aqui. Uma delas é que agora eu posso te chamar de minha namorada.
        </p>
        <button onClick={start} className="mt-10 rounded-full bg-white px-9 py-4 font-semibold text-blue-900 shadow-2xl transition hover:scale-105">
          Abrir nossa nova fase ✨
        </button>
      </div>
    </motion.div>
  );
}
