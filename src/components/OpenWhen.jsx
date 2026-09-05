import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const notes = [
  { icon: "☁️", label: "seu dia estiver difícil", title: "Pra quando o dia pesar", text: "Você não precisa estar bem o tempo todo. Quando o mundo estiver barulhento demais, lembra que comigo você tem um lugar onde pode simplesmente existir. Eu fico aqui." },
  { icon: "🌙", label: "você não conseguir dormir", title: "Pra uma noite comprida", text: "Se eu pudesse, eu diminuía o volume de todos os pensamentos e deixava só uma certeza: tem alguém desse lado pensando em você com muito carinho." },
  { icon: "🐱", label: "sentir saudade", title: "Pra matar um pouquinho da saudade", text: "Considera isso um vale-abraço virtual. Não substitui o de verdade, então fica registrado que eu te devo um bem apertado quando a gente se encontrar." },
  { icon: "🍂", label: "quiser lembrar de nós", title: "Pra lembrar da gente", text: "Tudo isso começou com pequenas coisas e, sem perceber, virou uma das partes mais bonitas dos meus dias. Eu gosto muito do nosso jeito de ser nós." },
];

export default function OpenWhen() {
  const [active, setActive] = useState(null);
  const [opened, setOpened] = useState([]);

  function openNote(index) {
    setActive(index);
    setOpened((old) => old.includes(index) ? old : [...old, index]);
  }

  return (
    <section className="relative overflow-hidden bg-[#071a35] px-6 py-28 text-white">
      <div className="absolute inset-0 opacity-50 [background:radial-gradient(circle_at_20%_10%,#2563eb33,transparent_28%),radial-gradient(circle_at_80%_90%,#b4530930,transparent_28%)]" />
      <div className="relative mx-auto max-w-5xl">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-[.34em] text-blue-300">uma caixinha só sua</p>
          <h2 className="mt-4 text-4xl font-bold sm:text-5xl">Abra quando...</h2>
          <p className="mt-5 leading-8 text-blue-100/65">Não precisa abrir tudo agora. Escolhe o bilhetinho que combina com o momento.</p>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {notes.map((note, index) => (
            <motion.button key={note.label} type="button" onClick={() => openNote(index)} whileHover={{ y: -6 }} whileTap={{ scale: .97 }} className={`relative min-h-44 rounded-[28px] border p-6 text-left transition ${active === index ? "border-blue-300 bg-blue-400/15" : "border-white/10 bg-white/[.06] hover:bg-white/[.1]"}`}>
              <span className="text-4xl">{note.icon}</span>
              <p className="mt-8 text-sm leading-6 text-blue-50">{note.label}</p>
              <span className="absolute right-5 top-5 text-xs text-blue-300/60">{opened.includes(index) ? "aberto ♡" : "toque"}</span>
            </motion.button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          {active !== null && (
            <motion.div key={active} initial={{ opacity: 0, y: 18, scale: .98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -10 }} className="mx-auto mt-8 max-w-3xl rounded-[30px] border border-blue-300/20 bg-white/[.08] p-7 text-center backdrop-blur sm:p-9">
              <div className="text-3xl">{notes[active].icon}</div>
              <h3 className="mt-3 text-2xl font-bold">{notes[active].title}</h3>
              <p className="mx-auto mt-4 max-w-2xl leading-8 text-blue-50/75">{notes[active].text}</p>
              <button type="button" onClick={() => setActive(null)} className="mt-6 rounded-full border border-white/15 px-5 py-2 text-sm text-blue-100 hover:bg-white/10">guardar bilhetinho</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
