import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const reasons = [
  { icon: "👀", title: "Seu olhar", text: "Porque eu ainda consigo me perder nos seus olhos do mesmo jeito que no começo." },
  { icon: "😊", title: "Seu sorriso", text: "Porque ele muda o clima de qualquer momento e sempre consegue mudar o meu dia também." },
  { icon: "✨", title: "Seu jeitinho", text: "Essa mistura única de doideira, carinho e personalidade que só você tem." },
  { icon: "🌱", title: "Sua coragem", text: "Eu amo ver você correndo atrás do que quer e construindo o seu próprio caminho." },
  { icon: "🐱", title: "Nossas pequenas coisas", text: "As piadas, as conversas aleatórias e até os momentos bobos que acabam ficando especiais." },
  { icon: "🤍", title: "Seu coração", text: "Porque por trás de tudo o que eu admiro em você existe uma pessoa que eu quero cuidar e conhecer cada vez mais." },
  { icon: "🍂", title: "Como tudo fica com você", text: "Momentos simples parecem ganhar outra cor quando eu sei que vou dividir eles com você." },
  { icon: "∞", title: "Nós", text: "Porque entre tantas coisas que eu poderia escolher, uma das minhas favoritas agora é poder chamar você de minha namorada." },
];

export default function EightReasons() {
  const [revealed, setRevealed] = useState([]);
  const toggle = (index) => setRevealed((old) => old.includes(index) ? old : [...old, index]);
  const complete = revealed.length === reasons.length;
  return (
    <section id="oito" className="relative overflow-hidden bg-[#06152d] px-6 py-28 text-white sm:py-36">
      <div className="absolute inset-0 opacity-40 [background:radial-gradient(circle_at_15%_20%,#3b82f655,transparent_30%),radial-gradient(circle_at_85%_75%,#d9770635,transparent_28%)]" />
      <div className="absolute -left-8 top-24 rotate-[-18deg] text-7xl opacity-10">🍂</div>
      <div className="absolute -right-6 bottom-16 rotate-12 text-8xl opacity-10">🍁</div>

      <div className="relative mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto max-w-3xl text-center"
        >
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-blue-300">você escolheu o número</p>
          <div className="mt-3 font-serif text-[120px] font-bold leading-none text-blue-200/95 sm:text-[160px]">8</div>
          <h2 className="-mt-4 text-3xl font-bold sm:text-5xl">8 coisas que eu amo em você</h2>
          <p className="mx-auto mt-6 max-w-2xl leading-8 text-blue-100/70">
            Eu poderia colocar muito mais. Mas como o 8 foi o seu número, ele ganhou um cantinho só dele por aqui.
          </p>
        </motion.div>

        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((reason, index) => (
            <motion.button
              type="button"
              key={reason.title}
              onClick={() => toggle(index)}
              initial={{ opacity: 0, y: 35 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: index * 0.07 }}
              whileHover={{ y: -6 }}
              whileTap={{ scale: .98 }}
              className={`group min-h-64 rounded-[28px] border p-6 text-left backdrop-blur-md transition-colors ${revealed.includes(index) ? "border-blue-300/35 bg-white/[0.11]" : "border-blue-300/15 bg-white/[0.06] hover:bg-white/[0.10]"}`}
            >
              <div className="flex items-center justify-between">
                <span className="text-3xl">{revealed.includes(index) ? reason.icon : "♡"}</span>
                <span className="text-sm font-semibold text-blue-300/60">0{index + 1}</span>
              </div>
              {revealed.includes(index) ? (<>
                <h3 className="mt-8 text-xl font-bold text-white">{reason.title}</h3>
                <motion.p initial={{opacity:0}} animate={{opacity:1}} className="mt-3 text-sm leading-7 text-blue-100/65">{reason.text}</motion.p>
              </>) : (<>
                <h3 className="mt-8 text-xl font-bold text-white/80">Motivo escondido</h3>
                <p className="mt-3 text-sm leading-7 text-blue-200/50">toca para descobrir</p>
              </>)}
            </motion.button>
          ))}
        </div>
        <div className="mx-auto mt-9 max-w-xl text-center">
          <div className="h-1.5 overflow-hidden rounded-full bg-white/10"><motion.div className="h-full bg-blue-300" animate={{ width: `${(revealed.length / 8) * 100}%` }} /></div>
          <p className="mt-3 text-sm text-blue-200/60">{revealed.length}/8 descobertos</p>
          <AnimatePresence>{complete && <motion.p initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} className="mt-5 text-lg text-blue-100">Você abriu os 8. Mas a verdade é que eu não conseguiria limitar tudo que amo em você a um número. ♡</motion.p>}</AnimatePresence>
        </div>
      </div>
    </section>
  );
}
