import React, { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import StartScreen from "./Screens/StartScreen";
import FinishScreen from "./Screens/FinishScreen";
import GameScreen from "./Screens/GameScreen";
import LoadingScreen from "./Screens/LoadingScreen";
import StatsScreen from "./Screens/StatsScreen";
import SettingsScreen from "./Screens/SettingsScreen";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { screens, GameModes, GAME_MODE_STORAGE_KEY } from "./constants";
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
    const [gameMode, setGameMode] = useState(GameModes.FREE_RESPONSE);
    const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    ReactGA.initialize("G-VFCGD245RZ");

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
            timeUntilNextDay.hours < 1 &&
            timeUntilNextDay.minutes < 1 &&
            timeUntilNextDay.seconds < 1
        ) {
            setHasStartedTodaysGame(false);
            setHasFinishedTodaysGame(false);
            // maybe fetch questions for new day here
        }
    }, [timeUntilNextDay]);

    useEffect(() => {
        setHasStartedTodaysGame(
            !!localStorage.getItem(new Date().toDateString())
        );
    }, [screenShowing]);

    useEffect(() => {
        const results = localStorage.getItem(new Date().toDateString());
        setHasFinishedTodaysGame(results && JSON.parse(results)["isFinished"]);
    }, [screenShowing]);

    useEffect(() => {
        const gameMode = localStorage.getItem(GAME_MODE_STORAGE_KEY);
        if (gameMode) {
            setGameMode(gameMode);
        }
    }, [hasFinishedTodaysGame]);

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
                        gameMode={gameMode}
                        setGameMode={setGameMode}
                        isFetchingQuestions={isFetchingQuestions}
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
                            gameMode={gameMode}
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
                        gameMode={gameMode}
                    />
                );
            case screens.loading:
                return (
                    <LoadingScreen
                        isFinished={!isFetchingQuestions}
                        callback={() => setScreenShowing(screens.game)}
                    />
                );
            case screens.stats:
                return <StatsScreen setScreenShowing={setScreenShowing} />;
            default:
                console.log("not sure what screen to show");
        }
    };

    useEffect(() => {
        const fetchQuestionsFromServer = () => {
            setIsFetchingQuestions(true);
            const today = new Date();
            const year = today.getFullYear();
            const month = String(today.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
            const day = String(today.getDate()).padStart(2, "0");
            const isoDateString = `${year}-${month}-${day}`;
            console.log(today);
            console.log(isoDateString);
            console.log(process.env.REACT_APP_API_URL);
            fetch(
                `${process.env.REACT_APP_API_URL}/questions/${isoDateString}`,
                {
                    headers: {
                        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                    },
                }
            )
                .then(async (response) => {
                    const responseJson = await response.json();
                    setIsFetchingQuestions(false);
                    return setQuestions(responseJson);
                })
                .catch((error) => {
                    console.error("Error fetching or parsing JSON:", error);
                    setIsFetchingQuestions(false);
                });
        };

        if (!isFetchingQuestions) {
            fetchQuestionsFromServer();
        }
    }, [hasFinishedTodaysGame]);

    useEffect(() => {
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
            <div className="AppHeader">
                <div className="Title">
                    <span className="QuickStyle">Quick</span>
                    <span className="QStyle">Q</span>
                </div>
                <FontAwesomeIcon
                    icon={faInfoCircle}
                    className="InfoIcon"
                    onClick={() => setShowSettingsModal(!showSettingsModal)}
                />
            </div>
            <div className="Content">
                {showSettingsModal && (
                    <SettingsScreen
                        showModal={showSettingsModal}
                        setShowModal={setShowSettingsModal}
                    />
                )}
                {getScreenToShow()}
            </div>
        </div>
    );
}

export default App;
