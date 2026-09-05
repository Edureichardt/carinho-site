import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";

export default function Letter() {
  return (
    <section className="relative overflow-hidden bg-[#f6f9ff] px-6 py-32">
      <div className="absolute left-5 top-16 text-7xl opacity-[0.07]">🍂</div>
      <div className="absolute bottom-14 right-6 text-7xl opacity-[0.07]">🍁</div>
      <div className="mx-auto max-w-4xl">
        <SectionTitle>Uma carta para essa nossa nova fase</SectionTitle>
        <motion.div
          initial={{ opacity: 0, scale: 0.94, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative mt-16 rounded-[40px] border border-blue-100 bg-[#fffdf8] p-8 shadow-2xl shadow-blue-950/10 sm:p-14"
        >
          <div className="absolute right-8 top-6 text-4xl">💌</div>
          <div className="space-y-8 text-lg leading-9 text-slate-700">
            <p>Mi,</p>
            <p>Quando eu fiz a primeira versão desse site, eu queria encontrar um jeito diferente de mostrar que você tinha se tornado especial para mim.</p>
            <p>Hoje eu volto aqui com uma sensação ainda melhor, porque agora não preciso mais falar só sobre a vontade de continuar te conhecendo. Eu posso falar sobre a alegria de ter você comigo.</p>
            <p>Eu gosto do seu jeito, do seu sorriso, dos seus olhos, da sua personalidade e até dessas pequenas doideiras que fazem eu rir e pensar em você depois.</p>
            <p>Mas gosto principalmente da pessoa que existe por trás de tudo isso. Quero estar presente nas fases boas, te apoiar nas difíceis, dividir momentos simples e continuar construindo lembranças que sejam nossas.</p>
            <p>Eu não sei exatamente como vão ser todos os próximos capítulos. Mas sei que estou muito feliz por esse ter começado com nós dois juntos.</p>
            <p>E se eu tiver que resumir essa atualização inteira em uma frase, seria bem simples:</p>
            <p className="text-center text-2xl font-bold text-blue-800">eu amo ter você na minha vida. 🤍</p>
            <p className="text-center font-semibold text-amber-700">Com carinho, do seu namorado.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
