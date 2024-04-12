import React, { useState, useEffect } from "react";
import SettingsScreen from "./Screens/SettingsScreen";
import StartScreen from "./Screens/StartScreen";
import FinishScreen from "./Screens/FinishScreen";
import GameScreen from "./Screens/GameScreen";
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
    const [streak, setStreak] = useState(0);

    const setScreenShowingAndPreviousScreen = (newScreen) => {
        setPreviousScreen(screenShowing);
        setScreenShowing(newScreen);
    };

    const hasPlayedTodaysGame = () => {
        return !!localStorage.getItem(today.toDateString());
    };

    const calculateStreak = () => {
        console.log("calculating streak");
        let dateToCheck = new Date();
        let streak = 0;
        let keepChecking = true;
        while (keepChecking) {
            console.log(streak);
            keepChecking = false;
            const results = localStorage.getItem(dateToCheck.toDateString());
            if (results) {
                const jsonResults = JSON.parse(results);
                if (jsonResults && jsonResults.score > 0) {
                    streak += 1;
                    keepChecking = true;
                    dateToCheck = new Date(
                        dateToCheck.setDate(dateToCheck.getDate() - 1)
                    );
                }
            }
        }
        setStreak(streak);
    };

    function daysPastApril62024() {
        // Create a Date object for today's date
        const today = new Date();

        // Create a Date object for April 6, 2024
        const referenceDate = new Date(2024, 3, 6); // Months are zero-indexed (January = 0)

        // Calculate the difference in milliseconds
        const timeDifference = today.getTime() - referenceDate.getTime();

        // Convert the difference from milliseconds to days
        const daysPast = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysPast;
    }

    const readQuestionsFromFile = () => {
        fetch("shuffled_questions.json")
            .then((response) => {
                return response.json(); // Parse directly as JSON
            })
            .then((data) => {
                const questionSetToUse = daysPastApril62024();
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

    // TODO: this seems to be happening more than once
    useEffect(() => {
        calculateStreak();
    }, [playerResults, streak]);

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
                        questions={questions}
                        streak={streak}
                    />
                );
            default:
                console.log("not sure what screen to show");
        }
    };

    return (
        <div className="App">
            <div className="Title">
                <span className="QuickStyle">Quick</span>
                <span className="QStyle">Q</span>
            </div>
            <div className="Content">{getScreenToShow()}</div>
        </div>
    );
}

export default App;
