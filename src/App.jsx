import { useState } from "react";

import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Story from "./components/Story";
import Qualities from "./components/Qualities";
import FunQuestions from "./components/FunQuestions";
import Timeline from "./components/Timeline";
import Letter from "./components/Letter";
import FinalMoment from "./components/FinalMoment";
import Footer from "./components/Footer";
import MusicPlayer from "./components/MusicPlayer";
import WelcomeScreen from "./components/WelcomeScreen";


function App() {

  const [started, setStarted] = useState(false);


  return (

    <div className="bg-rose-50 overflow-x-hidden">


      {!started && (

        <WelcomeScreen 
          onStart={() => setStarted(true)}
        />

      )}



      <MusicPlayer 
        start={started}
      />


      <Navbar />


      <main>

        <Hero />

        <Story />

        <Qualities />

        <FunQuestions />

        <Timeline />

        <Letter />

        <FinalMoment />

      </main>


      <Footer />


    </div>

  );

}


export default App;