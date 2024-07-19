import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import { getEmojiForCategory, isMultipleChoiceMode } from "../../utils";
import { CATEGORY_COLOR_MAP } from "../../constants";

const Question = ({
    category,
    isBuzzing,
    isShowingSettings,
    question,
    questionNumber,
    showWholeQuestion,
    shouldShowCorrectOrIncorrectAnimation,
    userAnswerCorrect,
    userOutOfTime,
    gameMode,
}) => {
    const [displayedQuestion, setDisplayedQuestion] = useState("");
    const [charactersShowing, setCharactersShowing] = useState(0);
    const correctOrIncorrectAnimationRef = useRef(null);

    useEffect(() => {
        // Reset displayed question when the question or showWholeQuestion changes
        if (showWholeQuestion) {
            setDisplayedQuestion(question);
            return;
        }

        setDisplayedQuestion("");
        setCharactersShowing(0);
    }, [question, showWholeQuestion]);

    useEffect(() => {
        if (
            !isBuzzing &&
            !isShowingSettings &&
            !showWholeQuestion &&
            charactersShowing <= question.length
        ) {
            const interval = setInterval(() => {
                setCharactersShowing((c) => c + 1);
            }, 50); // Reveal characters one by one

            return () => clearInterval(interval);
        }
    }, [
        isBuzzing,
        isShowingSettings,
        showWholeQuestion,
        charactersShowing,
        question.length,
    ]);

    useEffect(() => {
        // Update displayed question only when charactersShowing changes
        setDisplayedQuestion(question.slice(0, charactersShowing));
    }, [charactersShowing, question]);

    return (
        <div className="question">
            <div className="QuestionHeader">
                #{questionNumber}:{" "}
                <span
                    className="Category"
                    style={{ color: CATEGORY_COLOR_MAP[category] }}
                >
                    {category}
                </span>{" "}
                {getEmojiForCategory(category)}
            </div>
            <div
                ref={correctOrIncorrectAnimationRef}
                className={`CorrectOrIncorrectAnimation ${shouldShowCorrectOrIncorrectAnimation ? "visible" : ""}`}
            >
                {userOutOfTime ? (
                    <span className="IncorrectAnimation">Time's up</span>
                ) : userAnswerCorrect ? (
                    <span className="CorrectAnimation">Correct</span>
                ) : (
                    <span className="IncorrectAnimation">Incorrect</span>
                )}
            </div>
            <div
                className="QuestionText"
                style={
                    isMultipleChoiceMode(gameMode) && !showWholeQuestion
                        ? {
                              overflow: "scroll",
                              maxHeight: "calc(100vh - 300px)",
                          }
                        : {}
                }
            >
                {showWholeQuestion ? question : displayedQuestion}
            </div>
        </div>
    );
};

export default Question;
