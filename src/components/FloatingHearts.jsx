const hearts = [

{emoji:"❤️",left:"8%",top:"18%",delay:"0s"},

{emoji:"🌸",left:"85%",top:"12%",delay:"2s"},

{emoji:"🤍",left:"12%",top:"70%",delay:"3s"},

{emoji:"💖",left:"90%",top:"65%",delay:"5s"},

{emoji:"✨",left:"50%",top:"22%",delay:"1s"}

]

export default function FloatingHearts(){

return(

<>

{hearts.map((heart,index)=>(

<div

key={index}

className="absolute text-4xl opacity-20 animate-bounce"

style={{

left:heart.left,

top:heart.top,

animationDelay:heart.delay,

animationDuration:"6s"

}}

>

{heart.emoji}

</div>

))}

</>

)

}