import React from "react";
import "./style.css";

const Score = ({ score }) => {
    return (
        <div className="score">
            Score: <span className="ScoreDigits">{score}</span>
        </div>
    );
};

export default Score;
