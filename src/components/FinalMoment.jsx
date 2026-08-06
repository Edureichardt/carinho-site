import { motion } from "framer-motion";


export default function FinalMoment(){

return(

<section

className="
relative
min-h-screen
flex
items-center
justify-center
overflow-hidden

bg-gradient-to-br
from-gray-900
via-rose-950
to-black

px-6

"

>


{/* estrelas */}

<div className="
absolute
inset-0
"
>

<span className="
absolute
top-[20%]
left-[15%]
text-white/40
text-2xl
">
✦
</span>


<span className="
absolute
top-[40%]
right-[20%]
text-white/30
text-3xl
">
✦
</span>


<span className="
absolute
bottom-[25%]
left-[30%]
text-white/40
text-xl
">
✦
</span>


</div>



<motion.div

initial={{
opacity:0,
y:60
}}

whileInView={{
opacity:1,
y:0
}}

transition={{
duration:1
}}

viewport={{
once:true
}}

className="
relative
z-10
max-w-3xl
text-center
"

>


<motion.p

initial={{
opacity:0
}}

whileInView={{
opacity:1
}}

transition={{
delay:.5
}}

className="
text-rose-300
uppercase
tracking-[8px]
text-sm
"

>

Geo

</motion.p>



<motion.h2

initial={{
opacity:0,
scale:.8
}}

whileInView={{
opacity:1,
scale:1
}}

transition={{
delay:1,
duration:1
}}

className="
mt-10
text-4xl
sm:text-6xl
font-bold
text-white
leading-tight
"

>

Antes de você sair daqui...

</motion.h2>



<motion.p

initial={{
opacity:0
}}

whileInView={{
opacity:1
}}

transition={{
delay:2
}}

className="
mt-10
text-lg
sm:text-xl
text-white/80
leading-9
"

>



Espero que esse pequeno presente tenha conseguido arrancar pelo menos um sorriso seu.

</motion.p>



<motion.div

initial={{
opacity:0
}}

whileInView={{
opacity:1
}}

transition={{
delay:3
}}

className="
mt-12
text-4xl
"

>

❤️

</motion.div>



<motion.p

initial={{
opacity:0
}}

whileInView={{
opacity:1
}}

transition={{
delay:3.5
}}

className="
mt-10
text-white
font-semibold
text-xl
"

>

Tenha um dia incrível, Geo ☀️

</motion.p>



</motion.div>


</section>

)

}