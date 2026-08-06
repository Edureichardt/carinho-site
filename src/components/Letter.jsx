import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";


export default function Letter(){

return(

<section
className="
py-32
px-6
bg-rose-50
"
>


<div
className="
max-w-4xl
mx-auto
"
>


<SectionTitle>
Uma coisa que eu queria te dizer
</SectionTitle>



<motion.div

initial={{
opacity:0,
scale:.9,
y:50
}}

whileInView={{
opacity:1,
scale:1,
y:0
}}

transition={{
duration:.8
}}

viewport={{
once:true
}}

className="
mt-16
bg-[#fffdf8]
rounded-[40px]
p-8
sm:p-14
shadow-2xl
border
border-rose-100
relative
"

>


<div
className="
absolute
top-6
right-8
text-4xl
"
>
💌
</div>



<div
className="
space-y-8
text-gray-700
text-lg
leading-9
"
>


<p>
Geo,
</p>



<p>
Eu queria começar dizendo que esse site . Fiz porque achei que existia uma forma mais especial de demonstrar algo que às vezes é difícil colocar em palavras.
</p>



<p>
Eu admiro muito quem você é. Admiro a sua coragem de construir seu próprio caminho, de correr atrás das suas coisas e de não ter medo de ser diferente.
</p>



<p>
Gosto do seu jeito, da sua personalidade, dessa sua energia única. Gosto da pessoa que você mostra ser, com seu estilo, suas tatuagens, seus piercings e essa sua forma meio doida e divertida que faz eu ficar admirando igual um bobo.
</p>



<p>
Também queria que você soubesse que eu acho você uma pessoa muito linda. Seu sorriso, seus olhos e todos esses pequenos detalhes que fazem você ser você chamaram minha atenção.
</p>



<p>
Mas o que mais me faz admirar você vai além da aparência. É a pessoa que existe por trás de tudo isso.
</p>



<p>
Eu gosto de estar perto de você e gostaria de continuar conhecendo você cada vez mais, compartilhar momentos, fazer você sorrir e ser alguém que possa estar presente quando você precisar.
</p>



<p>
Não sei exatamente o que o futuro reserva, mas sei que hoje eu queria apenas que você soubesse disso.
</p>



<p>
Uma princesa que a disney nao tem e tchau brigado kk.
</p>



<p
className="
text-center
font-semibold
text-rose-500
"
>
Com carinho ❤️
</p>



</div>



</motion.div>


</div>


</section>

)

}