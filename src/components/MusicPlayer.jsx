import { useRef, useState, useEffect } from "react";
import music from "../assets/music/romantica.mp3";

export default function MusicPlayer() {

  const audioRef = useRef(null);

  const [playing, setPlaying] = useState(false);


  useEffect(() => {

    const startMusic = async () => {

      try {

        await audioRef.current.play();

        setPlaying(true);

      } catch (error) {

        // Navegador bloqueou autoplay
        setPlaying(false);

      }

    };


    startMusic();

  }, []);



  function toggleMusic(){

    if(!playing){

      audioRef.current.play();

      setPlaying(true);

    } else {

      audioRef.current.pause();

      setPlaying(false);

    }

  }



  return (

    <>

      <audio
        ref={audioRef}
        loop
      >

        <source 
          src={music} 
          type="audio/mp3" 
        />

      </audio>



      <button

        onClick={toggleMusic}

        className="
        fixed
        bottom-6
        right-6
        z-50

        w-16
        h-16

        rounded-full

        bg-rose-500

        text-white

        text-2xl

        shadow-xl

        hover:scale-110

        active:scale-95

        transition-all

        animate-pulse
        "

      >

        {playing ? "⏸️" : "🎵"}

      </button>


    </>

  );
}