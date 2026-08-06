import { motion } from "framer-motion";


const texts = [

"Geo, talvez você nem perceba isso...",

"Mas existem pessoas que chegam de um jeito simples e conseguem deixar os dias mais interessantes.",

"Com você foi assim.",

"Quanto mais eu conheço seu jeito, mais eu percebo que tem algo especial ali.",

"Não apenas pela pessoa linda que você é, mas pela pessoa incrível que existe por trás disso."

];


export default function Story(){

return(

<section
className="
bg-white
py-32
px-6
"
>


<div
className="
max-w-4xl
mx-auto
"
>


{texts.map((text,index)=>(


<motion.div

key={index}

initial={{
opacity:0,
y:60
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
duration:.8,
delay:.1
}}

viewport={{
once:true
}}

className="
mb-24
"

>


<h2
className="
text-center
text-3xl
sm:text-5xl
font-bold
leading-relaxed
text-gray-800
"
>

{text}


</h2>


</motion.div>


))}



</div>


</section>

)


}