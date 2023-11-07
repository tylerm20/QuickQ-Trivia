import "./style.css"

import React, { useState, useEffect } from 'react';

const Timer = () => {
  const [seconds, setSeconds] = useState(60); // Initial timer value

  // Function to decrement the timer by 1 second
  const decrementTimer = () => {
    if (seconds > 0) {
      setSeconds(seconds - 1);
    }
  };

  useEffect(() => {
    // Start the countdown timer
    const timerInterval = setInterval(decrementTimer, 1000); // 1 second interval

    // Clean up the interval when the component unmounts
    return () => {
      clearInterval(timerInterval);
    };
  }, [decrementTimer]);

  return (
    <div className="timer">
      <p>{seconds} seconds</p>
    </div>
  );
};

export default Timer;
