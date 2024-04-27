import React, { useState, useEffect } from "react";
import "./style.css";
import { getEmojiForCategory } from "../../utils";
import { CATEGORY_COLOR_MAP } from "../../constants";

const Question = ({
    category,
    isBuzzing,
    isShowingSettings,
    question,
    questionNumber,
    showWholeQuestion,
}) => {
    const [displayedQuestion, setDisplayedQuestion] = useState("");
    const [charactersShowing, setCharactersShowing] = useState(0);

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
            <div className="QuestionText">
                {showWholeQuestion ? question : displayedQuestion}
            </div>
        </div>
    );
};

export default Question;
