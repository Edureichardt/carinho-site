import { useRef, useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Qualities from "./components/Qualities";
import EightReasons from "./components/EightReasons";
import CatSurprise from "./components/CatSurprise";
import FunQuestions from "./components/FunQuestions";
import Timeline from "./components/Timeline";
import Letter from "./components/Letter";
import MusicMessage from "./components/MusicMessage";
import FinalMoment from "./components/FinalMoment";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import WelcomeScreen from "./components/WelcomeScreen";
import LilyDivider from "./components/LilyDivider";
import InteractiveCat3D from "./components/InteractiveCat3D";
import AutumnLilyLayer from "./components/AutumnLilyLayer";
import LilyMoment from "./components/LilyMoment";
import OpenWhen from "./components/OpenWhen";
import Gallery from "./components/Gallery";
import TogetherClock from "./components/TogetherClock";
import DailySecret from "./components/DailySecret";
import SecretProgress from "./components/SecretProgress";
import GoldenLeafSecret from "./components/GoldenLeafSecret";
import NightSecret from "./components/NightSecret";
import FutureLetters from "./components/FutureLetters";
import RandomReasons from "./components/RandomReasons";
import OurChapters from "./components/OurChapters";
import OurSoundtrack from "./components/OurSoundtrack";
import CatMissions from "./components/CatMissions";
import TimeAtmosphere from "./components/TimeAtmosphere";
import MiGardenGame from "./components/MiGardenGame";

function App() {
  const [started, setStarted] = useState(false);
  const musicRef = useRef();

  function handleStart() {
    setStarted(true);
    musicRef.current?.startMusic();
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f6f9ff]">
      {!started && <WelcomeScreen onStart={handleStart} />}
      <MusicPlayer ref={musicRef} />
      {started && <AutumnLilyLayer />}
      {started && <InteractiveCat3D />}
      {started && <SecretProgress />}
      {started && <GoldenLeafSecret />}
      {started && <NightSecret />}
      {started && <TimeAtmosphere />}
      <Navbar />

      <main>
        <Hero />
        <TogetherClock />
        <LilyMoment />
        <Story />
        <Gallery />
        <MiGardenGame />
        <LilyDivider />
        <OurChapters />
        <EightReasons />
        <Qualities />
        <RandomReasons />
        <CatMissions />
        <CatSurprise />
        <Timeline />
        <FunQuestions />
        <Letter />
        <OpenWhen />
        <DailySecret />
        <FutureLetters />
        <OurSoundtrack />
        <MusicMessage />
        <FinalMoment />
      </main>

      <Footer />
    </div>
  );
}

export default App;