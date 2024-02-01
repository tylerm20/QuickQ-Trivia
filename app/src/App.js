import React, { useState, useEffect } from "react";
import SettingsScreen from "./Components/SettingsScreen";
import StartScreen from "./Components/StartScreen";
import FinishScreen from "./Components/FinishScreen";
import GameScreen from "./Components/GameScreen";
// import { getQuestionsAndAnswers } from "./utils";

import { screens } from "./constants";
import "./App.css";

function App() {
    const [screenShowing, setScreenShowing] = useState(screens.start);
    const [playerResults, setPlayerResults] = useState(null);
    const [score, setScore] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [previousScreen, setPreviousScreen] = useState(null);
    const [questions, setQuestions] = useState(null);
    const [today, setToday] = useState(new Date());

    const setScreenShowingAndPreviousScreen = (newScreen) => {
        setPreviousScreen(screenShowing);
        setScreenShowing(newScreen);
    };

    const hasPlayedTodaysGame = () => {
        return !!localStorage.getItem(today.toDateString());
    };

    const pickRandomUnique = (arr, numElements) => {
        if (numElements > arr.length) {
            throw new Error(
                "Cannot pick more elements than the array contains"
            );
        }

        const shuffled = arr.slice(0); // Create a copy of the array
        let currentIndex = arr.length;
        const randomElements = [];

        // Fisher-Yates Shuffle to randomize the array
        while (currentIndex !== 0) {
            const randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;

            // Swap current element with random element
            [shuffled[currentIndex], shuffled[randomIndex]] = [
                shuffled[randomIndex],
                shuffled[currentIndex],
            ];
        }

        return shuffled.slice(0, numElements); // Return the first 'numElements' after shuffling
    };

    const readQuestionsFromFile = () => {
        fetch("2015-05-19-QUIZBOWL.json")
            .then((response) => {
                return response.json(); // Parse directly as JSON
            })
            .then((data) => {
                // Assuming 'data' is now an array of objects
                const msLevelQuestions = data.filter(
                    (question) => question.difficulty === "MS"
                );
                setQuestions(pickRandomUnique(msLevelQuestions, 10));
            })
            .catch((error) => {
                console.error("Error fetching or parsing JSON:", error);
            });
    };

    // TODO: this seems to be happening more than once
    useEffect(() => {
        readQuestionsFromFile();
        if (hasPlayedTodaysGame()) {
            const results = JSON.parse(
                localStorage.getItem(today.toDateString())
            );
            setPlayerResults(results);
        }
    }, []);

    const getScreenToShow = () => {
        switch (screenShowing) {
            case screens.start:
                return (
                    <StartScreen
                        setScreenShowing={setScreenShowingAndPreviousScreen}
                        today={today}
                        hasPlayedTodaysGame={hasPlayedTodaysGame()}
                    />
                );
            case screens.game:
                return (
                    questions && (
                        <GameScreen
                            setScreenShowing={setScreenShowingAndPreviousScreen}
                            setPlayerResults={setPlayerResults}
                            score={score}
                            setScore={setScore}
                            setTotalTime={setTotalTime}
                            questions={questions}
                        />
                    )
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
            // case screens.settings:
            //     return (
            //         <SettingsScreen
            //             setScreenShowing={setScreenShowingAndPreviousScreen}
            //             previousScreen={previousScreen}
            //         />
            //     );
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
