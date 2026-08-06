import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";


const qualities = [

  {
    emoji: "🚀",
    title: "Sua coragem",
    text:
      "Uma das coisas que mais admiro em você é ver você construindo o seu próprio caminho. Ter seu próprio negócio mostra sua coragem, sua dedicação e sua vontade de fazer acontecer."
  },

  {
    emoji: "😊",
    title: "Seu sorriso",
    text:
      "Eu acho muito bonito o seu sorriso. É aquele detalhe que chama atenção e consegue deixar qualquer momento mais leve."
  },

  {
    emoji: "👀",
    title: "Seu olhar",
    text:
      "Seus olhos têm algo diferente. É um daqueles detalhes que fazem a pessoa parar e perceber o quanto você é única."
  },

  {
    emoji: "🎨",
    title: "Seu estilo",
    text:
      "Eu gosto do jeito que você se expressa. Suas tatuagens, seus piercings e seu estilo mostram uma pessoa que não tem medo de ser exatamente quem é."
  },

  {
    emoji: "😂",
    title: "Seu lado doido",
    text:
      "Uma das coisas mais legais em você é esse seu jeito espontâneo. Essa sua energia diferente, divertida e um pouco doida é uma das coisas que fazem você ser a Geo."
  },

  {
    emoji: "✨",
    title: "Quem você é",
    text:
      "No final, não é apenas uma característica específica. É o conjunto de tudo isso que faz você ser uma pessoa que eu admiro muito."
  }

];


export default function Qualities(){

return(

<section
className="
py-28
px-6
bg-rose-50
"
>


<div
className="
max-w-6xl
mx-auto
"
>


<SectionTitle>
Algumas coisas que admiro em você
</SectionTitle>



<div
className="
grid
grid-cols-1
sm:grid-cols-2
gap-8
mt-16
"
>


{
qualities.map((item,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
y:50
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
duration:.7,
delay:index * .12
}}

viewport={{
once:true
}}

className="
bg-white
rounded-3xl
p-8
shadow-lg
hover:shadow-2xl
hover:-translate-y-2
transition-all
duration-300
"

>


<div
className="
text-5xl
"
>
{item.emoji}
</div>



<h3
className="
mt-6
text-2xl
font-bold
text-gray-800
"
>
{item.title}
</h3>



<p
className="
mt-4
text-gray-600
leading-8
"
>
{item.text}
</p>


</motion.div>


))

}


</div>


</div>


</section>


)

}