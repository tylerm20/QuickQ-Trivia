import "./style.css"

import React, { useEffect } from 'react';

const Timer = ({ seconds, decrementTimer }) => {
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
        Time: {seconds}
    </div>
  );
};

export default Timer;
