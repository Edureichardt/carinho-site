import { useRef, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Qualities from "./components/Qualities";
import FunQuestions from "./components/FunQuestions";
import Timeline from "./components/Timeline";
import Letter from "./components/Letter";
import MusicMessage from "./components/MusicMessage";
import FinalMoment from "./components/FinalMoment";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import WelcomeScreen from "./components/WelcomeScreen";


function App() {

  const [started, setStarted] = useState(false);

  const musicRef = useRef();


  function handleStart() {

    setStarted(true);

    if (musicRef.current) {

      musicRef.current.startMusic();

    }

  }


  return (

    <div className="bg-rose-50 overflow-x-hidden">


      {!started && (

        <WelcomeScreen
          onStart={handleStart}
        />

      )}


      <MusicPlayer
        ref={musicRef}
      />


      <Navbar />


      <main>

        <Hero />

        <Story />

        <Qualities />

        <FunQuestions />

        <Timeline />

        <Letter />

        <MusicMessage />

        <FinalMoment />

      </main>


      <Footer />


    </div>

  );

}


export default App;

