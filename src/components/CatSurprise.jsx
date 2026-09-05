import { motion } from "framer-motion";

const cats = [
  { face: "🐱", text: "Fiscal oficial dos nossos momentos fofos" },
  { face: "😸", text: "Aprovando essa atualização com ronronadas" },
  { face: "😽", text: "Responsável pelos beijinhos extras" },
];

export default function CatSurprise() {
  return (
    <section className="relative overflow-hidden bg-[#eef6ff] px-6 py-24">
      <div className="mx-auto max-w-5xl text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-xs font-semibold uppercase tracking-[0.32em] text-blue-600"
        >
          participação especial
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-4 text-3xl font-bold text-slate-800 sm:text-5xl"
        >
          Os gatinhos também queriam aparecer
        </motion.h2>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {cats.map((cat, index) => (
            <motion.div
              key={cat.text}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.12 }}
              whileHover={{ rotate: index === 1 ? 2 : -2, scale: 1.03 }}
              className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-[0_18px_60px_rgba(37,99,235,0.08)]"
            >
              <motion.div
                animate={{ y: [0, -7, 0] }}
                transition={{ duration: 2.5 + index * 0.3, repeat: Infinity }}
                className="text-7xl"
              >
                {cat.face}
              </motion.div>
              <div className="mt-4 text-xl">🐾</div>
              <p className="mt-5 leading-7 text-slate-600">{cat.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
