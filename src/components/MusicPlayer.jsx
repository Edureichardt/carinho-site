import { useRef, useState, useImperativeHandle, forwardRef } from "react";
import music from "../assets/music/romantica.mp3";

const MusicPlayer = forwardRef((props, ref) => {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);

  useImperativeHandle(ref, () => ({
    startMusic: async () => {
      try {
        await audioRef.current.play();
        setPlaying(true);
      } catch (error) {
        console.log("Erro ao iniciar música:", error);
      }
    },
  }));

  function toggleMusic() {
    if (!playing) {
      audioRef.current.play();
      setPlaying(true);
    } else {
      audioRef.current.pause();
      setPlaying(false);
    }
  }

  return (
    <>
      <audio ref={audioRef} loop><source src={music} type="audio/mp3" /></audio>
      <button onClick={toggleMusic} aria-label={playing ? "Pausar música" : "Tocar música"} className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-700 text-xl text-white shadow-xl shadow-blue-950/25 transition-all hover:scale-110 active:scale-95">
        {playing ? "⏸" : "♫"}
      </button>
    </>
  );
});

export default MusicPlayer;
