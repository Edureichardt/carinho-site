import { motion } from "framer-motion";
import SectionTitle from "./SectionTitle";


const moments = [

  {
    icon: "🌱",
    title: "No começo...",
    text:
      "um jogo de Beach, que quando cheguei vi uma DEUSA GREGA."
  },

  {
    icon: "✨",
    title: "Com o tempo...",
    text:
      "Fui percebendo pequenos detalhes que começaram a chamar minha atenção.e comecei a pensar ."
  },

  {
    icon: "💭",
    title: "Então eu percebi...",
    text:
      " Será que ela é doida ou tem TDAH kkkk."
  },

  {
    icon: "❤️",
    title: "Por isso fiz isso...",
    text:
      "Porque às vezes algumas pessoas merecem saber o quanto são especiais. E eu queria encontrar uma forma diferente de demonstrar isso para você, e vc é especial em varios fatores kkk ."
  }

];


export default function Timeline(){

return(

<section
className="
py-28
px-6
bg-white
"
>


<div
className="
max-w-5xl
mx-auto
"
>


<SectionTitle>
Uma pequena história
</SectionTitle>



<div
className="
mt-20
space-y-10
"
>


{
moments.map((item,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
x:index % 2 === 0 ? -60 : 60
}}

whileInView={{
opacity:1,
x:0
}}

transition={{
duration:.8
}}

viewport={{
once:true
}}

className="
relative
flex
flex-col
sm:flex-row
gap-6
items-start
"

>


<div
className="
flex
items-center
justify-center
w-16
h-16
rounded-full
bg-rose-100
text-3xl
shrink-0
"
>

{item.icon}

</div>



<div
className="
bg-rose-50
rounded-3xl
p-7
w-full
"
>


<h3
className="
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


</div>


</motion.div>


))

}


</div>


</div>


</section>

)

}