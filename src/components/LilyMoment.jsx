import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import LilyIcon from "./LilyIcon";

export default function LilyMoment() {
  const [bloomed, setBloomed] = useState(false);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#f6f9ff] via-[#fffdf8] to-[#f6f9ff] px-6 py-28">
      <div className="absolute -left-20 top-10 h-72 w-72 rounded-full bg-amber-200/20 blur-3xl" />
      <div className="absolute -right-24 bottom-0 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" />

      <div className="relative mx-auto grid max-w-5xl items-center gap-12 lg:grid-cols-[0.9fr_1.1fr]">
        <motion.button
          type="button"
          onClick={() => {
            setBloomed(true);
            window.dispatchEvent(new CustomEvent("lily-bloomed"));
          }}
          className="group relative mx-auto flex min-h-[340px] w-full max-w-sm cursor-pointer items-center justify-center rounded-[42px] border border-blue-100/80 bg-white/70 p-7 shadow-xl shadow-blue-950/5 backdrop-blur-sm"
          whileHover={{ y: -6 }}
          whileTap={{ scale: 0.98 }}
          aria-label="Fazer o lírio desabrochar"
        >
          <span className="absolute left-6 top-6 text-xs font-semibold uppercase tracking-[0.28em] text-amber-700/70">
            toca na flor
          </span>
          <motion.div
            animate={bloomed ? { scale: [0.92, 1.08, 1], rotate: [0, -2, 0] } : { scale: 0.86 }}
            transition={{ duration: 1.05, ease: "easeOut" }}
            className="w-56 sm:w-64"
          >
            <LilyIcon open={bloomed} className={bloomed ? "lily-bloomed" : "lily-closed"} />
          </motion.div>
          <span className="absolute bottom-6 text-sm text-slate-500 transition group-hover:text-blue-700">
            {bloomed ? "desabrochou 🤍" : "um pequeno segredo"}
          </span>
        </motion.button>

        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.34em] text-amber-700/70">um símbolo seu aqui dentro</p>
          <h2 className="mt-5 text-4xl font-bold leading-tight text-slate-900 sm:text-5xl">
            Se esse site tivesse uma flor, eu queria que fosse um lírio.
          </h2>
          <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
            Delicado sem ser frágil, bonito sem precisar chamar atenção o tempo todo. Eu gostei da ideia de deixar ele aparecendo pela nossa história como uma lembrança sua.
          </p>

          <AnimatePresence>
            {bloomed && (
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.25, duration: 0.65 }}
                className="mt-8 rounded-3xl border border-amber-200/60 bg-[#fffaf1] p-6 text-slate-700 shadow-sm"
              >
                <p className="text-lg italic leading-8">
                  “Algumas coisas bonitas simplesmente aparecem na nossa vida. E eu tive sorte de você aparecer na minha.”
                </p>
                <p className="mt-4 text-sm font-semibold uppercase tracking-[0.2em] text-blue-800">— do seu namorado 🤍</p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
