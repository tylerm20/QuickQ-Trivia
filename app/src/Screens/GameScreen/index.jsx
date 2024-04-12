import React, { useState, useEffect } from "react";
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

const playerResults = {};
const questionResults = [];

const GameScreen = ({
    setScreenShowing,
    setPlayerResults,
    score,
    setScore,
    setTotalTime,
    questions,
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

    const finishGame = () => {
        const totalTime = GAME_SECONDS - gameSecondsRemaining;
        playerResults["questionResults"] = questionResults;
        playerResults["totalTime"] = totalTime;
        playerResults["score"] = score;
        setPlayerResults(playerResults);
        setScreenShowing(screens.finish);
        setTotalTime(totalTime);
        // store that game was played for today
        localStorage.setItem(
            new Date().toDateString(),
            JSON.stringify(playerResults)
        );
    };

    const finishQuestion = ({ userAnswer, userSkipped }) => {
        const questionResult = {};
        setUserAnswer(userAnswer);
        questionResult["userAnswer"] = userAnswer;
        if (checkAnswer(userAnswer)) {
            setScore(score + 1);
            questionResult["isCorrect"] = true;
            // show something saying right answer
        } else {
            questionResult["isCorrect"] = false;
        }
        questionResult["skipped"] = userSkipped;
        questionResult["time"] = questionTime;
        setQuestionTime(0);
        setIsBetweenQuestions(true);
        setShowWholeQuestion(true);
        setIsBuzzing(false);
        setBuzzSecondsRemaining(BUZZ_SECONDS);
        questionResults.push(questionResult);
    };

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

    const getCurrentQuestionObj = () => questions[currentQuestionIndex];
    const getQuestionText = (questionObj) => questionObj["question"];
    const getQuestionAnswerText = (questionObj) => questionObj["answers"][0];

    const checkAnswer = (userAnswer) => {
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
                            Correct Answer:{" "}
                            <b>
                                {getQuestionAnswerText(getCurrentQuestionObj())}
                            </b>
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
                    question={getQuestionText(getCurrentQuestionObj())}
                    isBuzzing={isBuzzing}
                    showWholeQuestion={showWholeQuestion}
                    questionNumber={currentQuestionIndex + 1}
                    isShowingSettings={showSettingsModal}
                />
            </div>
            <div className="BottomRow">{getBottomRowContent()}</div>
        </div>
    );
};

export default GameScreen;
