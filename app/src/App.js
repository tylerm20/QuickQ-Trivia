import React, { useState, useEffect } from "react";
import StartScreen from "./Screens/StartScreen";
import FinishScreen from "./Screens/FinishScreen";
import GameScreen from "./Screens/GameScreen";

import { screens } from "./constants";
import "./App.css";

function App() {
    const [screenShowing, setScreenShowing] = useState(screens.start);
    const [playerResults, setPlayerResults] = useState(null);
    const [score, setScore] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [questions, setQuestions] = useState(null);
    const [streak, setStreak] = useState(0);
    const [timeUntilNextDay, setTimeUntilNextDay] = useState(
        calculateTimeUntilNextDay()
    );
    const [hasStartedTodaysGame, setHasStartedTodaysGame] = useState(false);
    const [hasFinishedTodaysGame, setHasFinishedTodaysGame] = useState(false);

    function calculateTimeUntilNextDay() {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(tomorrow.getDate() + 1);
        tomorrow.setHours(0, 0, 0, 0); // Start of the next day
        const difference = tomorrow - now;

        const seconds = Math.max(Math.floor((difference / 1000) % 60), 0);
        const minutes = Math.max(Math.floor((difference / 1000 / 60) % 60), 0);
        const hours = Math.max(
            Math.floor((difference / (1000 * 60 * 60)) % 24),
            0
        );

        return { hours, minutes, seconds };
    }

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeUntilNextDay(calculateTimeUntilNextDay());
        }, 1000); // Update every second

        return () => clearInterval(timer); // Cleanup on unmount
    }, [calculateTimeUntilNextDay]);

    useEffect(() => {
        if (
            timeUntilNextDay.hours < 8 &&
            timeUntilNextDay.minutes < 51 &&
            timeUntilNextDay.seconds < 1
        ) {
            setHasStartedTodaysGame(false);
            setHasFinishedTodaysGame(false);
        }
    }, [timeUntilNextDay]);

    useEffect(() => {
        setHasStartedTodaysGame(
            !!localStorage.getItem(new Date().toDateString())
        );
    }, []);

    useEffect(() => {
        const results = localStorage.getItem(new Date().toDateString());
        setHasFinishedTodaysGame(results && JSON.parse(results)["isFinished"]);
    }, [screenShowing]);

    const calculateStreak = () => {
        let dateToCheck = new Date();
        let streak = 0;
        let keepChecking = true;
        while (keepChecking) {
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

    function daysPastApril142024() {
        // Create a Date object for April 14, 2024
        const referenceDate = new Date(2024, 3, 14); // Months are zero-indexed (January = 0)

        // Calculate the difference in milliseconds
        const timeDifference = new Date().getTime() - referenceDate.getTime();

        // Convert the difference from milliseconds to days
        const daysPast = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        return daysPast;
    }

    const getScreenToShow = () => {
        switch (screenShowing) {
            case screens.start:
                return (
                    <StartScreen
                        setScreenShowing={setScreenShowing}
                        today={new Date()}
                        hasFinishedTodaysGame={hasFinishedTodaysGame}
                        hasStartedTodaysGame={hasStartedTodaysGame}
                        timeUntilNextGame={timeUntilNextDay}
                    />
                );
            case screens.game:
                return (
                    questions && (
                        <GameScreen
                            setScreenShowing={setScreenShowing}
                            setPlayerResults={setPlayerResults}
                            score={score}
                            setScore={setScore}
                            setTotalTime={setTotalTime}
                            questions={questions}
                            hasStartedTodaysGame={hasStartedTodaysGame}
                        />
                    )
                );
            case screens.finish:
                return (
                    <FinishScreen
                        setScreenShowing={setScreenShowing}
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

    useEffect(() => {
        const readQuestionsFromFile = () => {
            fetch("questions_with_categories.json")
                .then((response) => {
                    return response.json(); // Parse directly as JSON
                })
                .then((data) => {
                    const questionSetToUse = daysPastApril142024();
                    console.log("question set being used: " + questionSetToUse);
                    setQuestions(data[questionSetToUse]);
                })
                .catch((error) => {
                    console.error("Error fetching or parsing JSON:", error);
                });
        };

        readQuestionsFromFile();
        if (hasFinishedTodaysGame) {
            const results = JSON.parse(
                localStorage.getItem(new Date().toDateString())
            );
            setPlayerResults(results);
        }
    }, [hasFinishedTodaysGame]);

    useEffect(() => {
        if (screenShowing === screens.finish) {
            calculateStreak();
        }
    }, [streak, screenShowing]);

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
