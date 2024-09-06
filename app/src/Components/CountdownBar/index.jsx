import React from "react";
import "./style.css"; // Import your CSS file

const CountdownBar = ({ totalTime, currentTime }) => {
    const percentage = (currentTime / totalTime) * 100;

    return (
        <div className="countdown-bar-container">
            <div
                className="countdown-bar"
                style={{ width: `${percentage}%` }}
            ></div>
            {/* Markings */}
            {Array.from({ length: 7 }).map((_, index) => (
                <div
                    className="marking"
                    key={index}
                    style={{ left: `${(index + 1) * 12.5}%` }}
                ></div>
            ))}
        </div>
    );
};

export default CountdownBar;
