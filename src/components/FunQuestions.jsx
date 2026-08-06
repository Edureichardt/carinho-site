import { useState } from "react";
import { motion } from "framer-motion";

const questions = [
  {
    text: "A Geo é uma pessoa incrível?",
    yes: "Claro ❤️",
    no: "Não 😶",
    result: "Resposta muito fácil essa 😂"
  },

  {
    text: "Tu é um pouquinho doida? 😂",
    yes: "Sim, e é isso que te deixa  especial 😆",
    no: "Jamais 😇",
    result: "Essa parte do seu jeito é uma das coisas mais legais em você."
  },

  {
    text: "mereço outro beijo?",
    yes: "Com certeza ☀️",
    no: "Não sei 🤔",
    result: "Então fica registrado."
  },

  {
    text: "vc fala de cegos?",
    yes: "claro 💖",
    no: "capaz 🙈",
    result: "olocooo."
  }
];


export default function FunQuestions(){

const [current,setCurrent] = useState(0);

const [finished,setFinished] = useState(false);

const [noPosition,setNoPosition] = useState({
  top:"0px",
  left:"0px"
});


function next(){

if(current < questions.length - 1){

setCurrent(current + 1);

}else{

setFinished(true);

}

}



function moveNo(){

setNoPosition({

top:`${Math.random()*120 - 60}px`,

left:`${Math.random()*160 - 80}px`

});

}



if(finished){

return(

<section className="py-28 px-6 bg-white">

<motion.div

initial={{opacity:0,scale:.8}}

whileInView={{opacity:1,scale:1}}

className="
max-w-3xl
mx-auto
text-center
"

>

<h2 className="
text-4xl
font-bold
text-gray-800
">

Parabéns, Geo 😂❤️

</h2>


<p className="
mt-8
text-lg
text-gray-600
leading-8
">

Você acabou de completar o teste mais fácil do mundo:

descobrir que você é uma pessoa incrível.

</p>


</motion.div>

</section>

)

}



const question = questions[current];


return(

<section className="
py-28
px-6
bg-rose-50
">

<div className="
max-w-3xl
mx-auto
text-center
">


<h2 className="
text-4xl
font-bold
text-gray-800
">

Uma brincadeira rápida 😄

</h2>


<p className="
mt-10
text-2xl
font-semibold
text-gray-700
">

{question.text}

</p>



<div className="
mt-12
flex
justify-center
gap-6
relative
">


<button

onClick={next}

className="
bg-rose-500
text-white
px-8
py-4
rounded-full
shadow-lg
hover:scale-105
transition
"

>

{question.yes}

</button>



<button

onMouseEnter={moveNo}

onTouchStart={moveNo}

style={{
transform:
`translate(${noPosition.left},${noPosition.top})`
}}

className="
bg-gray-200
text-gray-700
px-8
py-4
rounded-full
transition-all
duration-300
"

>

{question.no}

</button>



</div>


</div>


</section>

)

}