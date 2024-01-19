import React, { useState, useEffect } from "react";
import "./style.css";

const Question = ({
    question,
    isBuzzing,
    showWholeQuestion,
    questionNumber,
}) => {
    const [displayedQuestion, setDisplayedQuestion] = useState("");

    useEffect(() => {
        let interval;
        let currentIndex = 0;
        if (currentIndex <= question.length && !isBuzzing) {
            interval = setInterval(() => {
                setDisplayedQuestion(question.slice(0, currentIndex));
                currentIndex++;
            }, 50); // Adjust the speed by changing the interval duration
        } else if (interval) {
            clearInterval(interval);
        }
        return () => interval && clearInterval(interval);
    }, [question, isBuzzing]);

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
