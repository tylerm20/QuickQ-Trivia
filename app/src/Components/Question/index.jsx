import React, { useState, useEffect } from "react";
import "./style.css";
import { getEmojiForCategory } from "../../utils";

const Question = ({
    question,
    isBuzzing,
    isShowingSettings,
    showWholeQuestion,
    questionNumber,
    category,
}) => {
    const [displayedQuestion, setDisplayedQuestion] = useState("");
    const [charactersShowing, setCharactersShowing] = useState(0);

    useEffect(() => {
        let interval;
        if (
            charactersShowing <= question.length &&
            !isBuzzing &&
            !isShowingSettings &&
            !showWholeQuestion
        ) {
            interval = setInterval(() => {
                setDisplayedQuestion(question.slice(0, charactersShowing));
                setCharactersShowing(charactersShowing + 1);
            }, 50); // Adjust the speed by changing the interval duration
        } else if (interval) {
            clearInterval(interval);
        }
        return () => {
            interval && clearInterval(interval);
            showWholeQuestion && setCharactersShowing(0);
        };
    }, [
        question,
        isBuzzing,
        isShowingSettings,
        charactersShowing,
        showWholeQuestion,
    ]);

    return (
        <div className="question">
            <div className="QuestionHeader">
                #{questionNumber}: <span className="Category">{category}</span>{" "}
                {getEmojiForCategory(category)}
            </div>
            <div className="QuestionText">
                {showWholeQuestion ? question : displayedQuestion}
            </div>
        </div>
    );
};

export default Question;
