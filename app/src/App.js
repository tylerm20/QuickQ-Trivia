import React, { useState } from "react";
import SettingsScreen from "./Components/SettingsScreen";
import StartScreen from "./Components/StartScreen";
import FinishScreen from "./Components/FinishScreen";
import GameScreen from "./Components/GameScreen";

import { screens } from "./constants";
import "./App.css";

function App() {
    const [screenShowing, setScreenShowing] = useState(screens.start);
    const [playerResults, setPlayerResults] = useState(null);
    const [score, setScore] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [previousScreen, setPreviousScreen] = useState(null);

    const setScreenShowingAndPreviousScreen = (newScreen) => {
        setPreviousScreen(screenShowing);
        setScreenShowing(newScreen);
    };

    const getScreenToShow = () => {
        switch (screenShowing) {
            case screens.start:
                return (
                    <StartScreen
                        setScreenShowing={setScreenShowingAndPreviousScreen}
                    />
                );
            case screens.game:
                return (
                    <GameScreen
                        setScreenShowing={setScreenShowingAndPreviousScreen}
                        setPlayerResults={setPlayerResults}
                        score={score}
                        setScore={setScore}
                        setTotalTime={setTotalTime}
                    />
                );
            case screens.finish:
                return (
                    <FinishScreen
                        setScreenShowing={setScreenShowingAndPreviousScreen}
                        playerResults={playerResults}
                        score={score}
                        totalTime={totalTime}
                    />
                );
            case screens.settings:
                return (
                    <SettingsScreen
                        setScreenShowing={setScreenShowingAndPreviousScreen}
                        previousScreen={previousScreen}
                    />
                );
            default:
                console.log("not sure what screen to show");
        }
    };

    return (
        <div className="App">
            <div className="Title">MinQuiz Alpha</div>
            <div className="Content">{getScreenToShow()}</div>
        </div>
    );
}

export default App;
