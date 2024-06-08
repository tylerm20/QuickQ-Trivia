import React, { useState, useEffect, useCallback } from "react";
import Fuse from "fuse.js";
import Timer from "../../Components/Timer";
import Score from "../../Components/Score";
import SettingsButton from "../../Components/SettingsButton";
import BasicButton from "../../Components/BasicButton";
import Question from "../../Components/Question";
import AnswerModal from "../../Components/AnswerModal";
import { BUZZ_SECONDS, GAME_SECONDS, screens } from "../../constants";
import "./style.css";
import SettingsScreen from "../SettingsScreen";

let playerResults = {};
let questionResults = [];

const GameScreen = ({
    setScreenShowing,
    setPlayerResults,
    score,
    setScore,
    setTotalTime,
    questions,
    hasStartedTodaysGame,
}) => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [isBuzzing, setIsBuzzing] = useState(false);
    const [showWholeQuestion, setShowWholeQuestion] = useState(false);
    const [isBetweenQuestions, setIsBetweenQuestions] = useState(false);
    const [userAnswer, setUserAnswer] = useState("");
    const [gameSecondsRemaining, setGameSecondsRemaining] =
        useState(GAME_SECONDS);
    const [buzzSecondsRemaining, setBuzzSecondsRemaining] =
        useState(BUZZ_SECONDS);
    const [questionTime, setQuestionTime] = useState(0);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showCorrectOrIncorrect, setShowCorrectOrIncorrect] = useState(false);
    const [userAnswerCorrect, setUserAnswerCorrect] = useState(false);

    const finishGame = () => {
        setScreenShowing(screens.finish);
    };

    const decrementGameSecondsTimer = () => {
        if (
            gameSecondsRemaining > 0 &&
            !isBuzzing &&
            !isBetweenQuestions &&
            !showSettingsModal
        ) {
            setGameSecondsRemaining(gameSecondsRemaining - 1);
            setQuestionTime(questionTime + 1);
        }
    };

    const decrementBuzzSecondsTimer = () => {
        if (buzzSecondsRemaining > 0 && isBuzzing) {
            setBuzzSecondsRemaining(buzzSecondsRemaining - 1);
        }
    };

    const skipQuestion = () => {
        finishQuestion({ userAnswer: "", userSkipped: true });
    };

    const buzz = () => {
        // stop question timer
        setIsBuzzing(true);
    };

    const moveToNextQuestion = () => {
        // if there is another question
        if (
            currentQuestionIndex < questions.length - 1 &&
            gameSecondsRemaining > 0
        ) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsBetweenQuestions(false);
            setShowWholeQuestion(false);
            // start question timer
        } else {
            finishGame();
        }
    };

    const getBottomRowContent = () => {
        if (isBuzzing) {
            return (
                <div className="AnswerInputBottowRow">
                    <Timer
                        seconds={buzzSecondsRemaining}
                        decrementTimer={decrementBuzzSecondsTimer}
                    />
                    <AnswerModal onSubmit={finishQuestion} />
                </div>
            );
        } else if (isBetweenQuestions) {
            return (
                <div className="BetweenQuestionsBottomRow">
                    <div className="AnswerBottomRow">
                        {checkAnswer(userAnswer) ? (
                            <div className="Correct">Correct</div>
                        ) : (
                            <div className="Incorrect">Incorrect</div>
                        )}
                        <div>
                            Your Answer: <b>{userAnswer}</b>
                        </div>
                        <div>
                            Correct Answer: <b>{getQuestionAnswerText()}</b>
                        </div>
                    </div>
                    <BasicButton
                        className="NextButton"
                        onClick={moveToNextQuestion}
                    >
                        {currentQuestionIndex < questions.length - 1 &&
                        gameSecondsRemaining > 0
                            ? "Next Question"
                            : "See Results"}
                    </BasicButton>
                </div>
            );
        } else {
            return (
                <div className="BuzzBottomRow">
                    <button className="BuzzButton" onClick={buzz}>
                        Buzz
                    </button>
                    <button className="SkipButton" onClick={skipQuestion}>
                        Skip
                    </button>
                </div>
            );
        }
    };

    const getCurrentQuestionObj = useCallback(
        () => questions[currentQuestionIndex],
        [questions, currentQuestionIndex]
    );
    const getQuestionText = useCallback(
        () => getCurrentQuestionObj()["question"],
        [getCurrentQuestionObj]
    );
    const getQuestionAnswerText = useCallback(
        () => getCurrentQuestionObj()["answers"][0],
        [getCurrentQuestionObj]
    );
    const getQuestionCategory = useCallback(() => {
        try {
            return getCurrentQuestionObj()["category"];
        } catch (e) {
            console.log(e);
            return "Miscellaneous";
        }
    }, [getCurrentQuestionObj]);

    const updateCurrentResults = (localScore) => {
        const totalTime = GAME_SECONDS - gameSecondsRemaining;
        playerResults["questionResults"] = questionResults;
        playerResults["totalTime"] = totalTime;
        playerResults["score"] = localScore;
        playerResults["isFinished"] =
            questionResults.length === questions.length ||
            totalTime === GAME_SECONDS;
        // need a new copy of the object to for React to know playerResults have changed and call calculateStreak again
        setPlayerResults({ ...playerResults });
        setTotalTime(totalTime);
        localStorage.setItem(
            new Date().toDateString(),
            JSON.stringify(playerResults)
        );
    };

    const checkAnswer = useCallback(
        (userAnswer) => {
            if (!userAnswer) {
                return false;
            }
            const currentQuestionAnswers = getCurrentQuestionObj()["answers"];
            const fuse = new Fuse(currentQuestionAnswers, {
                includeScore: true,
                threshold: 0.35,
                minMatchCharLength: 3,
            });
            const fuseResults = fuse.search(userAnswer.trim());
            return fuseResults.length;
        },
        [getCurrentQuestionObj]
    );

    const finishQuestion = ({ userAnswer, userSkipped }) => {
        const questionResult = {};
        // because we are updating the score in state in this function
        // we can't rely on it to be up to date, so we have a local copy
        let localScore = score;
        setUserAnswer(userAnswer);
        questionResult["userAnswer"] = userAnswer;
        const isCorrect = checkAnswer(userAnswer);
        if (isCorrect) {
            localScore += 1;
            setScore(localScore);
            questionResult["isCorrect"] = isCorrect;
        } else {
            questionResult["isCorrect"] = isCorrect;
        }
        showCorrectOrIncorrectAnimation(isCorrect);
        questionResult["skipped"] = userSkipped;
        questionResult["time"] = questionTime;
        questionResult["category"] = getQuestionCategory();
        setQuestionTime(0);
        setIsBetweenQuestions(true);
        setShowWholeQuestion(true);
        setIsBuzzing(false);
        setBuzzSecondsRemaining(BUZZ_SECONDS);
        questionResults.push(questionResult);
        updateCurrentResults(localScore);
    };

    const showCorrectOrIncorrectAnimation = (isCorrect) => {
        setUserAnswerCorrect(isCorrect);
        setShowCorrectOrIncorrect(true);

        // Fade out after a delay
        setTimeout(() => {
            setShowCorrectOrIncorrect(false);
        }, 1000);
    };

    useEffect(() => {
        // if we are resuming a game
        if (hasStartedTodaysGame && !isBetweenQuestions) {
            const results = localStorage.getItem(new Date().toDateString());
            if (results) {
                const jsonResults = JSON.parse(results);
                questionResults = [...jsonResults["questionResults"]];
                setPlayerResults(jsonResults);
                setCurrentQuestionIndex(jsonResults["questionResults"].length);
                setGameSecondsRemaining(
                    GAME_SECONDS - jsonResults["totalTime"]
                );
                setScore(jsonResults["score"]);
            }
        }
    }, [hasStartedTodaysGame, setPlayerResults, setScore, isBetweenQuestions]);

    useEffect(() => {
        const buzzOnSpace = (event) => {
            if (event.key === " " && !isBuzzing && !isBetweenQuestions) {
                setIsBuzzing(true);
                event.preventDefault();
            }
        };

        document.addEventListener("keydown", buzzOnSpace);

        // Clean up the event listener when the component unmounts
        return () => document.removeEventListener("keydown", buzzOnSpace);
    }, [isBuzzing, isBetweenQuestions]);

    // useEffect(() => {
    //     const nextQuestionOnN = (event) => {
    //         console.log("between", isBetweenQuestions);
    //         if (event.key === "n" && isBetweenQuestions) {
    //             console.log("moveToNextQuestion");
    //             moveToNextQuestion();
    //             event.preventDefault();
    //         }
    //     };

    //     document.addEventListener("keydown", nextQuestionOnN);

    //     // Clean up the event listener when the component unmounts
    //     return () => {
    //         document.addEventListener("keydown", nextQuestionOnN);
    //     };
    // }, [moveToNextQuestion, isBetweenQuestions])

    useEffect(() => {
        if (gameSecondsRemaining < 1) {
            finishQuestion({ userAnswer: "", userSkipped: false });
        }
    }, [gameSecondsRemaining]);

    useEffect(() => {
        if (buzzSecondsRemaining < 1) {
            finishQuestion({ userAnswer: "", userSkipped: false });
        }
    }, [buzzSecondsRemaining]);

    useEffect(() => {
        if (!hasStartedTodaysGame) {
            setCurrentQuestionIndex(0);
            setShowWholeQuestion(false);
            setIsBetweenQuestions(false);
            setGameSecondsRemaining(GAME_SECONDS);
            setShowCorrectOrIncorrect(false);
            setScore(0);
            playerResults = {};
            questionResults = [];
        }
    }, [hasStartedTodaysGame]);

    return (
        <div className="GameScreen">
            {showSettingsModal && (
                <SettingsScreen
                    showModal={showSettingsModal}
                    setShowModal={setShowSettingsModal}
                />
            )}
            <div className="TopRow">
                <Score score={score} />
                <Timer
                    seconds={gameSecondsRemaining}
                    decrementTimer={decrementGameSecondsTimer}
                />
                <SettingsButton
                    onClick={() => {
                        setShowSettingsModal(!showSettingsModal);
                    }}
                />
            </div>
            <div className="CenterContent">
                <Question
                    category={getQuestionCategory()}
                    isBuzzing={isBuzzing}
                    isShowingSettings={showSettingsModal}
                    question={getQuestionText()}
                    questionNumber={currentQuestionIndex + 1}
                    showWholeQuestion={showWholeQuestion}
                    shouldShowCorrectOrIncorrectAnimation={
                        showCorrectOrIncorrect
                    }
                    userAnswerCorrect={userAnswerCorrect}
                />
            </div>
            <div className="BottomRow">{getBottomRowContent()}</div>
        </div>
    );
};

export default GameScreen;
