import React, { useState, useEffect } from 'react';

const Question = () => {
  const [question, setQuestion] = useState('');
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const questionText = 'This is your trivia question.';

  // Function to display the question one character at a time
  const displayQuestionPieceByPiece = () => {
    let currentIndex = 0;
    const interval = setInterval(() => {
      if (currentIndex <= questionText.length) {
        setDisplayedQuestion(questionText.slice(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(interval);
      }
    }, 100); // Adjust the speed by changing the interval duration
  };

  useEffect(() => {
    displayQuestionPieceByPiece();
  }, []);

  return (
    <div className="question">
      <h2>Question:</h2>
      <p>{displayedQuestion}</p>
    </div>
  );
};

export default Question;
