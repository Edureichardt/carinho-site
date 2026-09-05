import { motion } from "framer-motion";

export default function FinalMoment() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden bg-gradient-to-br from-[#06152d] via-[#0d2c59] to-[#111827] px-6 text-white">
      <div className="absolute left-[10%] top-[18%] text-4xl opacity-15">🍂</div>
      <div className="absolute right-[12%] top-[24%] text-3xl opacity-20">✦</div>
      <div className="absolute bottom-[18%] left-[18%] text-4xl opacity-15">🐾</div>
      <div className="absolute bottom-[24%] right-[16%] text-5xl opacity-10">🍁</div>

      <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 1 }} className="relative z-10 max-w-3xl text-center">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 0.4 }} className="text-sm uppercase tracking-[0.4em] text-blue-300">Mi 🤍</motion.p>
        <motion.h2 initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8, duration: 0.8 }} className="mt-9 text-4xl font-bold leading-tight sm:text-6xl">Antes de você sair daqui...</motion.h2>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 1.4 }} className="mt-9 text-lg leading-9 text-blue-100/80 sm:text-xl">
          A primeira versão foi feita para te surpreender. Essa atualização foi feita para guardar uma coisa que eu estou muito feliz de poder dizer agora:
        </motion.p>
        <motion.p initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} transition={{ delay: 2 }} className="mt-10 text-3xl font-bold text-white sm:text-5xl">
          eu amo você, minha namorada. 🤍
        </motion.p>
        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 2.7 }} className="mt-12 text-5xl">🐱🍂🤍</motion.div>
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ delay: 3.1 }} className="mt-8 text-sm uppercase tracking-[0.3em] text-blue-200/70">e isso é só o começo</motion.p>
      </motion.div>
    </section>
  );
}
