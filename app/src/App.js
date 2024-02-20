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

    function daysPastFeb19th2024() {
        // Create a Date object for today's date
        const today = new Date();

        // Create a Date object for February 19, 2024
        const referenceDate = new Date(2024, 1, 19); // Months are zero-indexed (January = 0)

        // Calculate the difference in milliseconds
        const timeDifference = today.getTime() - referenceDate.getTime();

        // Convert the difference from milliseconds to days
        const daysPast = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysPast;
    }

    const readQuestionsFromFile = () => {
        fetch("chunked_questions.json")
            .then((response) => {
                return response.json(); // Parse directly as JSON
            })
            .then((data) => {
                const questionSetToUse = daysPastFeb19th2024();
                console.log("question set being used: " + questionSetToUse);
                setQuestions(data[questionSetToUse]);
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
