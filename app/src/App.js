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
import {
    screens,
    GameModes,
    GAME_MODE_STORAGE_KEY,
    FIRST_GAME_DATE,
    LAST_GAME_DATE,
} from "./constants";
import "./App.css";

function App() {
    const [screenShowing, setScreenShowing] = useState(screens.start);
    const [playerResults, setPlayerResults] = useState(null);
    const [score, setScore] = useState(0);
    const [totalTime, setTotalTime] = useState(0);
    const [questions, setQuestions] = useState(null);
    const [streak, setStreak] = useState(0);
    const [datesAlreadyPlayed, setDatesAlreadyPlayed] = useState([]);
    const [hasStartedTodaysGame, setHasStartedTodaysGame] = useState(false);
    const [hasFinishedTodaysGame, setHasFinishedTodaysGame] = useState(false);
    const [gameMode, setGameMode] = useState(GameModes.FREE_RESPONSE);
    const [isFetchingQuestions, setIsFetchingQuestions] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(LAST_GAME_DATE);

    ReactGA.initialize("G-VFCGD245RZ");

    useEffect(() => {
        setHasStartedTodaysGame(
            !!localStorage.getItem(selectedDate.toDateString())
        );
    }, [screenShowing, selectedDate]);

    useEffect(() => {
        const results = localStorage.getItem(selectedDate.toDateString());
        setHasFinishedTodaysGame(results && JSON.parse(results)["isFinished"]);
    }, [screenShowing, selectedDate]);

    useEffect(() => {
        const gameMode = localStorage.getItem(GAME_MODE_STORAGE_KEY);
        if (gameMode) {
            setGameMode(gameMode);
        }
    }, [hasFinishedTodaysGame]);

    const calculateStreak = () => {
        let dateToCheck = new Date(LAST_GAME_DATE);
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

    const getDatesAlreadyPlayed = () => {
        const datesPlayed = [];

        // Iterate backwards from today to the first game date
        for (
            let date = new Date(LAST_GAME_DATE);
            date >= FIRST_GAME_DATE;
            date.setDate(date.getDate() - 1)
        ) {
            const dateKey = date.toDateString();
            if (localStorage.getItem(dateKey)) {
                datesPlayed.push(new Date(date));
            }
        }

        return datesPlayed;
    };

    const getScreenToShow = () => {
        switch (screenShowing) {
            case screens.start:
                return (
                    <StartScreen
                        setScreenShowing={setScreenShowing}
                        hasFinishedTodaysGame={hasFinishedTodaysGame}
                        hasStartedTodaysGame={hasStartedTodaysGame}
                        gameMode={gameMode}
                        setGameMode={setGameMode}
                        isFetchingQuestions={isFetchingQuestions}
                        selectedDate={selectedDate}
                        setSelectedDate={setSelectedDate}
                        datesAlreadyPlayed={getDatesAlreadyPlayed()}
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
                            showingSettingsModal={showSettingsModal}
                            selectedDate={selectedDate}
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
                        selectedDate={selectedDate}
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
        const daysPastApril142024 = (chosenDate) => {
            // Calculate the difference in milliseconds
            const timeDifference =
                chosenDate.getTime() - FIRST_GAME_DATE.getTime();

            // Convert the difference from milliseconds to days
            const daysPast = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

            return daysPast;
        };

        const fetchQuestionsFromFile = () => {
            setIsFetchingQuestions(true);
            fetch("quickq_questions.json")
                .then(async (response) => {
                    const responseJson = await response.json();
                    const questionSetToUse = daysPastApril142024(selectedDate);
                    setQuestions(responseJson[questionSetToUse]);
                    setIsFetchingQuestions(false);
                })
                .catch((error) => {
                    console.error("Error fetching or parsing JSON:", error);
                    setIsFetchingQuestions(false);
                });
        };

        if (!isFetchingQuestions) {
            fetchQuestionsFromFile();
        }
    }, [hasFinishedTodaysGame, selectedDate]);

    // NOTE: here is how to fetch questions from the server

    // useEffect(() => {
    //     const fetchQuestionsFromServer = () => {
    //         setIsFetchingQuestions(true);
    //         const year = selectedDate.getFullYear();
    //         const month = String(selectedDate.getMonth() + 1).padStart(2, "0"); // Months are 0-indexed
    //         const day = String(selectedDate.getDate()).padStart(2, "0");
    //         const isoDateString = `${year}-${month}-${day}`;
    //         fetch(
    //             `${process.env.REACT_APP_API_URL}/questions/${isoDateString}`,
    //             {
    //                 headers: {
    //                     Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
    //                 },
    //             }
    //         )
    //             .then(async (response) => {
    //                 const responseJson = await response.json();
    //                 setIsFetchingQuestions(false);
    //                 return setQuestions(responseJson);
    //             })
    //             .catch((error) => {
    //                 console.error("Error fetching or parsing JSON:", error);
    //                 setIsFetchingQuestions(false);
    //             });
    //     };

    //     if (!isFetchingQuestions) {
    //         fetchQuestionsFromServer();
    //     }
    // }, [hasFinishedTodaysGame, selectedDate]);

    useEffect(() => {
        if (hasFinishedTodaysGame) {
            const results = JSON.parse(
                localStorage.getItem(selectedDate.toDateString())
            );
            setPlayerResults(results);
        }
    }, [hasFinishedTodaysGame, selectedDate]);

    useEffect(() => {
        if (screenShowing === screens.finish) {
            calculateStreak();
        }
    }, [streak, screenShowing]);

    useEffect(() => {
        setDatesAlreadyPlayed(getDatesAlreadyPlayed());
    }, [hasFinishedTodaysGame]);

    return (
        <div className="App">
            <div className="AppHeader">
                <div
                    className="Title"
                    onClick={() => setScreenShowing(screens.start)}
                >
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
