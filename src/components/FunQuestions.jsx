import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  { text: "A Mi é a namorada mais linda?", yes: "Óbvio 🤍", no: "Hmmm..." },
  { text: "Eu mereço mais oito beijos?", yes: "Talvez 9 😌", no: "Jamais" },
  { text: "Gatinhos deixam qualquer site melhor?", yes: "SIM 🐱", no: "Não" },
  { text: "A gente ainda tem muita história para viver?", yes: "Com certeza 🍂", no: "Sei não" },
];

export default function FunQuestions() {
  const [current, setCurrent] = useState(0);
  const [finished, setFinished] = useState(false);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  function next() {
    if (current < questions.length - 1) setCurrent(current + 1);
    else setFinished(true);
    setNoPosition({ x: 0, y: 0 });
  }

  function moveNo() {
    setNoPosition({ x: Math.random() * 150 - 75, y: Math.random() * 100 - 50 });
  }

  if (finished) {
    return (
      <section className="bg-[#eef6ff] px-6 py-24 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.85 }} whileInView={{ opacity: 1, scale: 1 }} className="mx-auto max-w-3xl">
          <div className="text-6xl">😽</div>
          <h2 className="mt-6 text-4xl font-bold text-blue-900">Resultado oficial</h2>
          <p className="mt-6 text-lg leading-8 text-slate-600">Você segue sendo incrível, eu sigo apaixonado e o botão “não” segue sendo completamente decorativo kkkkk.</p>
        </motion.div>
      </section>
    );
  }

  const question = questions[current];

  return (
    <section className="bg-[#eef6ff] px-6 py-24">
      <div className="mx-auto max-w-3xl text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.3em] text-blue-600">teste científico 100% confiável</p>
        <h2 className="mt-4 text-3xl font-bold text-slate-800 sm:text-5xl">Uma brincadeira rápida</h2>
        <p className="mt-10 text-2xl font-semibold text-slate-700">{question.text}</p>
        <div className="relative mt-12 flex min-h-20 justify-center gap-5">
          <button onClick={next} className="rounded-full bg-blue-700 px-8 py-4 font-semibold text-white shadow-lg transition hover:scale-105">{question.yes}</button>
          <button
            onMouseEnter={moveNo}
            onTouchStart={moveNo}
            style={{ transform: `translate(${noPosition.x}px, ${noPosition.y}px)` }}
            className="rounded-full bg-white px-8 py-4 text-slate-600 shadow-sm transition-all duration-300"
          >
            {question.no}
          </button>
        </div>
      </div>
    </section>
  );
}
