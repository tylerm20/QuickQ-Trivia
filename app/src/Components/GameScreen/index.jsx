import React, { useState, useEffect } from "react";
import Timer from "../Timer";
import Score from "../Score";
import SettingsButton from "../SettingsButton";
import Question from "../Question";
import AnswerModal from "../AnswerModal";
import {
    BUZZ_SECONDS,
    GAME_SECONDS,
    questionsAndAnswers,
    screens,
} from "../../constants";
import "./style.css";

const playerResults = [];

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

    const finishGame = () => {
        setPlayerResults(playerResults);
        setScreenShowing(screens.finish);
        setTotalTime(GAME_SECONDS - gameSecondsRemaining);
    };

    const finishQuestion = ({ userAnswer, userSkipped }) => {
        const questionResult = {};
        setUserAnswer(userAnswer);
        questionResult["userAnswer"] = userAnswer;
        if (checkQuestion(userAnswer)) {
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
        playerResults.push(questionResult);
        // else show something saying wrong answer
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
            finishGame();
        }
    }, [gameSecondsRemaining, finishGame, finishQuestion]);

    useEffect(() => {
        if (buzzSecondsRemaining < 1) {
            finishQuestion({ userAnswer: "", userSkipped: false });
        }
    }, [buzzSecondsRemaining, finishQuestion]);

    const decrementGameSecondsTimer = () => {
        if (gameSecondsRemaining > 0 && !isBuzzing && !isBetweenQuestions) {
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
    const getQuestionAnswerText = (questionObj) =>
        questionObj["answer"].replace(/\[[^\]]*\]/g, "").replace(/\{|\}/g, "");

    const checkQuestion = (userAnswer) => {
        if (!userAnswer) {
            return false;
        }
        const userAnswerLower = userAnswer.toLowerCase();
        const currentQuestionAnswerLower = getCurrentQuestionObj()
            ["answer"].replace(/\[[^\]]*\]/g, "")
            .trim()
            .toLowerCase();
        const regex = /\{(.*?)\}/g;
        const wordsInBraces = [];
        let match;
        while ((match = regex.exec(currentQuestionAnswerLower)) !== null) {
            const word = match[0];
            wordsInBraces.push(word.replace(/\{|\}/g, ""));
        }
        console.log(wordsInBraces);
        console.log(currentQuestionAnswerLower.replace(/\{|\}/g, ""));
        return (
            // check if answer matches exactly
            userAnswerLower === currentQuestionAnswerLower ||
            // check if the answer is equal to the answer without the braces
            userAnswerLower ===
                currentQuestionAnswerLower.replace(/\{|\}/g, "") ||
            // check if answer is one of the braced options
            wordsInBraces.includes(userAnswerLower)
            // TODO: check if the answer is close enough to the any of the other options?
        );
    };

    const skipQuestion = () => {
        finishQuestion({ serAnswer: "", userSkipped: true });
    };

    const buzz = () => {
        // stop question timer
        setIsBuzzing(true);
    };

    const moveToNextQuestion = () => {
        // if there is another question
        if (currentQuestionIndex < questionsAndAnswers.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setIsBetweenQuestions(false);
            setShowWholeQuestion(false);
            // start question timer
        } else {
            finishGame();
        }
    };

    return (
        <div className="GameScreen">
            <div className="TopRow">
                <Score score={score} />
                <Timer
                    seconds={gameSecondsRemaining}
                    decrementTimer={decrementGameSecondsTimer}
                />
                <SettingsButton
                    onClick={() => {
                        setScreenShowing(screens.settings);
                    }}
                />
            </div>
            <div className="CenterContent">
                <Question
                    question={getQuestionText(getCurrentQuestionObj())}
                    isBuzzing={isBuzzing}
                    showWholeQuestion={showWholeQuestion}
                    questionNumber={currentQuestionIndex + 1}
                />
                {isBuzzing && (
                    <Timer
                        seconds={buzzSecondsRemaining}
                        decrementTimer={decrementBuzzSecondsTimer}
                    />
                )}
                {isBuzzing && <AnswerModal onSubmit={finishQuestion} />}
            </div>
            <div>
                {isBetweenQuestions ? (
                    <div className="BottomRow">
                        {checkQuestion(userAnswer) ? (
                            <div className="Correct">Correct</div>
                        ) : (
                            <div className="Incorrect">Incorrect</div>
                        )}
                        <div>Your Answer: {userAnswer}</div>
                        <div>
                            Correct Answer:{" "}
                            {getQuestionAnswerText(getCurrentQuestionObj())}
                        </div>
                        <button onClick={moveToNextQuestion}>
                            next question
                        </button>
                    </div>
                ) : (
                    <div className="BottomRow">
                        <button className="BuzzButton" onClick={buzz}>
                            Buzz
                        </button>
                        <button className="SkipButton" onClick={skipQuestion}>
                            Skip
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default GameScreen;
