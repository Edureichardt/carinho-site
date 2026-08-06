import Button from "./Button";
import FloatingHearts from "./FloatingHearts";

export default function Hero() {

  function scrollNext(){

    window.scrollTo({
      top: window.innerHeight,
      behavior:"smooth"
    });

  }


  return (

    <section 
      className="
      min-h-screen
      relative
      flex
      items-center
      justify-center
      overflow-hidden
      "
    >

      {/* Fundo */}

      <div 
      className="
      absolute
      inset-0
      bg-gradient-to-br
      from-pink-100
      via-rose-50
      to-white
      "
      />


      <div
      className="
      absolute
      w-[500px]
      h-[500px]
      rounded-full
      bg-pink-300/20
      blur-3xl
      -top-40
      -left-40
      "
      />


      <div
      className="
      absolute
      w-[600px]
      h-[600px]
      rounded-full
      bg-rose-300/20
      blur-3xl
      -bottom-40
      -right-40
      "
      />


      <FloatingHearts />


      <div
      className="
      relative
      z-10
      max-w-4xl
      px-6
      text-center
      "
      >


        <p
        className="
        uppercase
        tracking-[8px]
        text-xs
        sm:text-sm
        text-rose-500
        "
        >
          Uma pequena surpresa
        </p>



        <h1
        className="
        mt-8
        text-5xl
        sm:text-7xl
        font-bold
        text-gray-800
        "
        >
          Bom diaa,Flor do dia ☀️
        </h1>



        <p
        className="
        mt-8
        text-lg
        sm:text-xl
        text-gray-600
        leading-9
        "
        >

          Hoje eu só queria começar o seu dia
          lembrando o quão incrivel vc é
          

        </p>



        <p
        className="
        mt-6
        text-gray-500
        leading-8
        "
        >

          Fiz esse pequeno espaço porque achei
          que você merecia algo diferente.

        </p>



        <div className="mt-12">

          <Button onClick={scrollNext}/>

        </div>


      </div>


    </section>

  );

}