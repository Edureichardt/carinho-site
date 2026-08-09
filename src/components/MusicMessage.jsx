import { motion } from "framer-motion";

export default function MusicMessage() {

  const musicUrl =
    "https://www.youtube.com/watch?v=n1Hzf_is8tI&list=RDn1Hzf_is8tI&start_radio=1";

  return (
    <section
      className="
        relative
        overflow-hidden
        px-5
        py-20
        sm:px-8
        sm:py-24
        lg:px-12
      "
    >

      {/* brilho decorativo */}
      <div
        className="
          absolute
          left-1/2
          top-1/2
          h-72
          w-72
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-rose-300/20
          blur-3xl
        "
      />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="
          relative
          mx-auto
          w-full
          max-w-2xl
          rounded-3xl
          border
          border-rose-200
          bg-white/70
          p-6
          text-center
          shadow-xl
          backdrop-blur-md
          sm:p-10
        "
      >

        <div className="mb-5 text-4xl sm:text-5xl">
          🎧
        </div>


        <p
          className="
            mb-3
            text-sm
            font-medium
            uppercase
            tracking-[0.2em]
            text-rose-400
            sm:text-base
          "
        >
          Uma música para você
        </p>


        <h2
          className="
            mb-5
            text-2xl
            font-bold
            leading-tight
            text-rose-900
            sm:text-3xl
            md:text-4xl
          "
        >
          Essa música está me lembrando você agora...
        </h2>


        <p
          className="
            mx-auto
            mb-8
            max-w-xl
            text-base
            leading-relaxed
            text-gray-600
            sm:text-lg
          "
        >
          Não sei explicar exatamente o motivo,
          mas ouvi e pensei em você. ❤️
        </p>


        <motion.a
          href={musicUrl}
          target="_blank"
          rel="noopener noreferrer"

          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}

          className="
            inline-flex
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            bg-gradient-to-r
            from-rose-500
            to-pink-500
            px-6
            py-4
            text-base
            font-semibold
            text-white
            shadow-lg
            transition
            sm:w-auto
            sm:px-8
          "
        >
          <span>Ouvir a música</span>
          <span>❤️</span>
        </motion.a>

      </motion.div>

    </section>
  );
}