import { motion } from "framer-motion";
import { useState } from "react";

export default function WelcomeScreen({ onStart }) {

  const [exit, setExit] = useState(false);


  function start(){

    setExit(true);

    setTimeout(()=>{

      onStart();

    },800);

  }


  return (

    <motion.div

      initial={{opacity:1}}

      animate={{
        opacity: exit ? 0 : 1,
        scale: exit ? 1.2 : 1
      }}

      transition={{
        duration:.8
      }}

      className="
      fixed
      inset-0
      z-[100]
      flex
      items-center
      justify-center

      bg-gradient-to-br
      from-rose-100
      via-pink-50
      to-white
      "

    >


      <div
      className="
      text-center
      px-6
      "
      >


        <motion.div

        animate={{
          y:[0,-10,0]
        }}

        transition={{
          duration:2,
          repeat:Infinity
        }}

        className="
        text-6xl
        "
        >
          💌
        </motion.div>



        <h1
        className="
        mt-8
        text-4xl
        sm:text-6xl
        font-bold
        text-gray-800
        "
        >
          Geo ❤️
        </h1>



        <p
        className="
        mt-6
        text-gray-600
        text-lg
        "
        >

          Preparei uma pequena surpresa para você.

        </p>



        <button

        onClick={start}

        className="
        mt-12
        px-10
        py-4

        rounded-full

        bg-rose-500

        text-white

        font-semibold

        shadow-xl

        hover:scale-105

        transition
        "

        >

          Abrir surpresa ✨

        </button>


      </div>


    </motion.div>

  );

}