import { motion } from "framer-motion";

export default function MusicMessage() {
  const musicUrl = "https://www.youtube.com/watch?v=n1Hzf_is8tI&list=RDn1Hzf_is8tI&start_radio=1";

  return (
    <section className="relative overflow-hidden bg-white px-5 py-24 sm:px-8">
      <div className="absolute left-1/2 top-1/2 h-80 w-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/20 blur-3xl" />
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="relative mx-auto w-full max-w-2xl rounded-[34px] border border-blue-100 bg-white/80 p-7 text-center shadow-xl backdrop-blur-md sm:p-10"
      >
        <div className="mb-5 text-5xl">🎧</div>
        <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-blue-600">trilha sonora</p>
        <h2 className="mb-5 text-3xl font-bold leading-tight text-slate-900 sm:text-4xl">Uma música para esse capítulo</h2>
        <p className="mx-auto mb-8 max-w-xl text-base leading-8 text-slate-600 sm:text-lg">
          Algumas músicas acabam ganhando um significado diferente quando passam a lembrar alguém. Essa ficou por aqui porque me lembra você. 🤍
        </p>
        <motion.a href={musicUrl} target="_blank" rel="noopener noreferrer" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }} className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-blue-700 px-7 py-4 font-semibold text-white shadow-lg sm:w-auto">
          Ouvir a música 🎵
        </motion.a>
      </motion.div>
    </section>
  );
}
