import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

const moments = [
  { icon: "🏐", title: "Tudo começou...", text: "Com um jogo de vôlei e eu chegando lá sem imaginar que ia encontrar uma garota que faria eu pensar: meu Deus, uma deusa grega." },
  { icon: "👀", title: "Depois vieram os detalhes", text: "Os olhos, o sorriso, as conversas e aquele momento em que eu percebi que já estava prestando atenção demais em você." },
  { icon: "💌", title: "Veio o primeiro site", text: "Eu queria fazer alguma coisa diferente para mostrar o quanto você tinha se tornado especial para mim. Daí nasceu esse cantinho." },
  { icon: "🤍", title: "E então veio o sim", text: "Eu te pedi em namoro, você aceitou, e uma história que já era bonita ganhou um novo começo. Esse é o capítulo que eu mais queria atualizar." },
];

export default function Timeline() {
  return (
    <section className="bg-white px-6 py-28">
      <div className="mx-auto max-w-5xl">
        <SectionTitle>Como chegamos até aqui</SectionTitle>
        <div className="mt-20 space-y-8">
          {moments.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -45 : 45 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="flex flex-col items-start gap-6 sm:flex-row"
            >
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-blue-100 text-3xl ring-8 ring-blue-50">{item.icon}</div>
              <div className="w-full rounded-[30px] border border-blue-100 bg-[#f7fbff] p-7">
                <h3 className="text-2xl font-bold text-slate-800">{item.title}</h3>
                <p className="mt-4 leading-8 text-slate-600">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
