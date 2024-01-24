import React, { useState, useEffect } from "react";
import "./style.css";

const Question = ({
    question,
    isBuzzing,
    isShowingSettings,
    showWholeQuestion,
    questionNumber,
}) => {
    const [displayedQuestion, setDisplayedQuestion] = useState("");
    const [charactersShowing, setCharactersShowing] = useState(0);

    // TODO: this seems to show a few characters to start
    useEffect(() => {
        let interval;
        if (
            charactersShowing <= question.length &&
            !isBuzzing &&
            !isShowingSettings
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
            isBuzzing && setCharactersShowing(0);
        };
    }, [question, isBuzzing, isShowingSettings, charactersShowing]);

    return (
        <div className="question">
            <div className="QuestionHeader">Question #{questionNumber}</div>
            <div className="QuestionText">
                {showWholeQuestion ? question : displayedQuestion}
            </div>
        </div>
    );
};

export default Question;
