import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LilyIcon from "./LilyIcon";
import { unlockSecret } from "../secretSystem";

const SPECIAL_DAY = { year: 2026, month: 8, day: 23 }; // setembro = 8

function compareToday() {
  const now = new Date();
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const special = new Date(SPECIAL_DAY.year, SPECIAL_DAY.month, SPECIAL_DAY.day).getTime();
  if (today === special) return "today";
  if (today > special) return "memory";
  return "before";
}

export default function LilyMoment() {
  const [bloomed, setBloomed] = useState(false);
  const moment = useMemo(compareToday, []);

  const copy = moment === "today"
    ? {
        eyebrow: "23.09.2026 • tem algo saindo desse site",
        title: "Hoje esse lírio queria chegar um pouquinho mais perto de você.",
        body: "Por enquanto ele mora aqui na tela. Mas algumas coisas bonitas não foram feitas para ficar só no digital.",
        quote: "Esse aqui ainda é só digital. Mas talvez hoje ele encontre o caminho até você de verdade. 🤍",
        hint: "toca no lírio de hoje",
      }
    : moment === "memory"
    ? {
        eyebrow: "23.09.2026 • uma memória que ficou",
        title: "Teve um dia em que um lírio saiu daqui para encontrar você.",
        body: "Eu quis guardar esse pedacinho aqui também. Porque o melhor desse site é quando alguma coisa dele consegue existir fora da tela.",
        quote: "23.09.2026 🌸 — o dia em que um pedacinho desse site saiu da tela e foi encontrar você.",
        hint: "toca para lembrar",
      }
    : {
        eyebrow: "um símbolo seu aqui dentro",
        title: "Se esse site tivesse uma flor, eu queria que fosse um lírio.",
        body: "Delicado sem ser frágil, bonito sem precisar chamar atenção o tempo todo. Eu gostei da ideia de deixar ele aparecendo pela nossa história como uma lembrança sua.",
        quote: "Algumas coisas bonitas simplesmente aparecem na nossa vida. E eu tive sorte de você aparecer na minha.",
        hint: "toca na flor",
      };

  function bloom() {
    setBloomed(true);
    window.dispatchEvent(new CustomEvent("lily-bloomed"));
    unlockSecret("lily");
  }

  return (
    <section id="lirio" className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] via-[#fffdf8] to-[#f6f9ff] px-4 py-16 sm:px-6 sm:py-24 lg:py-28">
      <div className="absolute -left-20 top-10 h-56 w-56 rounded-full bg-amber-200/20 blur-3xl sm:h-72 sm:w-72" />
      <div className="absolute -right-24 bottom-0 h-64 w-64 rounded-full bg-blue-200/30 blur-3xl sm:h-80 sm:w-80" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <motion.button
          type="button"
          onClick={bloom}
          className="group relative mx-auto flex min-h-[270px] w-full max-w-[340px] cursor-pointer items-center justify-center rounded-[32px] border border-blue-100/80 bg-white/75 p-5 shadow-xl shadow-blue-950/5 backdrop-blur-sm sm:min-h-[340px] sm:rounded-[42px] sm:p-7"
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Fazer o lírio desabrochar"
        >
          {moment === "today" && <span className="absolute right-4 top-4 rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase tracking-[.18em] text-amber-800">só hoje ✨</span>}
          <span className="absolute left-5 top-5 text-[10px] font-semibold uppercase tracking-[0.24em] text-amber-700/70 sm:left-6 sm:top-6 sm:text-xs sm:tracking-[0.28em]">
            {copy.hint}
          </span>
          <motion.div
            animate={bloomed ? { scale: [0.92, 1.08, 1], rotate: [0, -2, 0] } : { scale: 0.86 }}
            transition={{ duration: 1.05, ease: "easeOut" }}
            className="w-44 sm:w-64"
          >
            <LilyIcon open={bloomed} className={bloomed ? "lily-bloomed" : "lily-closed"} />
          </motion.div>
          <span className="absolute bottom-5 text-xs text-slate-500 transition group-hover:text-blue-700 sm:bottom-6 sm:text-sm">
            {bloomed ? "desabrochou 🤍" : "um pequeno segredo"}
          </span>
        </motion.button>

        <div className="text-center lg:text-left">
          <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-amber-700/70 sm:text-xs sm:tracking-[0.34em]">{copy.eyebrow}</p>
          <h2 className="mx-auto mt-4 max-w-xl text-3xl font-bold leading-tight text-slate-900 sm:mt-5 sm:text-5xl lg:mx-0">
            {copy.title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-slate-600 sm:mt-7 sm:text-lg sm:leading-8 lg:mx-0">{copy.body}</p>

          <AnimatePresence>
            {bloomed && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.25, duration: 0.65 }}
                className="mx-auto mt-6 max-w-xl rounded-3xl border border-amber-200/60 bg-[#fffaf1] p-5 text-left text-slate-700 shadow-sm sm:mt-8 sm:p-6 lg:mx-0"
              >
                <p className="text-base italic leading-7 sm:text-lg sm:leading-8">“{copy.quote}”</p>
                {moment === "today" && <p className="mt-3 text-xs leading-5 text-amber-800/80">Não precisa procurar mais nenhuma pista. Algumas surpresas continuam fora daqui. 🌸</p>}
                <p className="mt-4 text-xs font-semibold uppercase tracking-[0.18em] text-blue-800 sm:text-sm sm:tracking-[0.2em]">— do seu namorado 🤍</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
