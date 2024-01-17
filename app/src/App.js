import React, { useState } from 'react';
import SettingsScreen from './Components/SettingsScreen';
import StartScreen from './Components/StartScreen';
import FinishScreen from './Components/FinishScreen';
import GameScreen from './Components/GameScreen';

import { screens } from "./constants"
import "./App.css"

function App() {
    const [screenShowing, setScreenShowing] = useState(screens.start);
    const [playerResults, setPlayerResults] = useState(null);
    const [score, setScore] = useState(0);
    const [totalTime, setTotalTime] = useState(0);

    const getScreenToShow = () => {
        switch (screenShowing) {
            case screens.start:
                return <StartScreen setScreenShowing={setScreenShowing} />
            case screens.game:
                return <GameScreen setScreenShowing={setScreenShowing} setPlayerResults={setPlayerResults} score={score} setScore={setScore} setTotalTime={setTotalTime} />
            case screens.finish:
                return <FinishScreen setScreenShowing={setScreenShowing} playerResults={playerResults} score={score} totalTime={totalTime} />
            case screens.settings:
                return <SettingsScreen setScreenShowing={setScreenShowing} />
            default:
                console.log("not sure what screen to show")
        }
    }

    return (
        <div className="App">
            <div className='Title'>MinQuiz Alpha</div>
            <div className="Content">
                {getScreenToShow()}
            </div>
        </div>
    );
}

export default App;
