import { motion } from "framer-motion";

const texts = [
  "Mi, da última vez esse site falava sobre alguém que eu estava conhecendo...",
  "Agora eu volto aqui podendo escrever uma coisa que eu queria muito: você é minha namorada.",
  "Aquele primeiro interesse virou carinho, o carinho virou vontade de estar perto...",
  "e, de algum jeito, a nossa história foi ganhando espaço até chegar aqui.",
  "Então essa atualização não é só do site. É um pequeno registro do começo de nós dois. 🤍",
];

export default function Story() {
  return (
    <section className="bg-white px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-4xl">
        {texts.map((text, index) => (
          <motion.div
            key={text}
            initial={{ opacity: 0, y: 55 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75 }}
            viewport={{ once: true }}
            className="mb-20 last:mb-0"
          >
            <h2 className={`text-center text-3xl font-bold leading-relaxed sm:text-5xl ${index === 1 ? "text-blue-800" : "text-slate-800"}`}>
              {text}
            </h2>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
