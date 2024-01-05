import React, { useState, useEffect } from 'react';

const Question = ({ question, isBuzzing, showWholeQuestion }) => {
  const [displayedQuestion, setDisplayedQuestion] = useState('');

  useEffect(() => {
    let interval
    let currentIndex = 0
    if (currentIndex <= question.length && !isBuzzing) {
    interval = setInterval(() => {
        setDisplayedQuestion(question.slice(0, currentIndex));
        currentIndex++;
      }, 100); // Adjust the speed by changing the interval duration
    } else if (interval) {
      clearInterval(interval);
    }
    return () => interval && clearInterval(interval);
  }, [question, isBuzzing]);

  return (
    <div className="question">
      <h2>Question:</h2>
      <p>
        {displayedQuestion}
      </p>
    </div>
  );
};

export default Question;
