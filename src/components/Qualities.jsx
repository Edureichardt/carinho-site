import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const qualities = [
  { emoji: "🚀", title: "Sua coragem", text: "Eu admiro a forma como você corre atrás das suas coisas e tenta construir o seu próprio caminho." },
  { emoji: "😊", title: "Seu sorriso", text: "Tem um jeito de deixar tudo mais leve. E sim, eu continuo ficando bobo olhando." },
  { emoji: "👀", title: "Seu olhar", text: "Foi uma das primeiras coisas que me prendeu em você e continua sendo uma das minhas favoritas." },
  { emoji: "✨", title: "Quem você é", text: "Seu jeito, sua personalidade e essa energia meio doida e única que faz você ser exatamente você." },
];

export default function Qualities() {
  return (
    <section className="bg-[#f6f9ff] px-6 py-28">
      <div className="mx-auto max-w-6xl">
        <SectionTitle>Coisas que continuam me encantando</SectionTitle>
        <div className="mt-16 grid grid-cols-1 gap-7 sm:grid-cols-2">
          {qualities.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, delay: index * 0.1 }}
              className="rounded-[32px] border border-blue-100 bg-white p-8 shadow-[0_18px_55px_rgba(30,64,175,0.07)] transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <div className="text-5xl">{item.emoji}</div>
              <h3 className="mt-6 text-2xl font-bold text-slate-800">{item.title}</h3>
              <p className="mt-4 leading-8 text-slate-600">{item.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
