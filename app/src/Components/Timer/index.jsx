import React, { useEffect } from "react";
import "./style.css";

const Timer = ({ seconds, decrementTimer }) => {
    useEffect(() => {
        // Start the countdown timer
        const timerInterval = setInterval(decrementTimer, 1000); // 1 second interval

        // Clean up the interval when the component unmounts
        return () => {
            clearInterval(timerInterval);
        };
    }, [decrementTimer]);

    function formatTime(number) {
        return (number < 10 ? "0" : "") + number;
    }

    return (
        <div className="timer">
            Time: <span className="Seconds">{formatTime(seconds)}</span>
        </div>
    );
};

export default Timer;
