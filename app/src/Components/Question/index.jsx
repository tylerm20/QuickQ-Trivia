import React, { useState, useEffect } from 'react';

const Question = ({ question }) => {
  const [displayedQuestion, setDisplayedQuestion] = useState('');

  // Function to display the question one character at a time
  const displayQuestionPieceByPiece = (question) => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= question.length) {
        setDisplayedQuestion(question.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the speed by changing the interval duration
  };

  useEffect(() => {
    displayQuestionPieceByPiece(question);
  }, [question]);

  return (
    <div className="question">
      <h2>Question:</h2>
      <p>{displayedQuestion}</p>
    </div>
  );
};

export default Question;
