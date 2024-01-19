import React, { useState } from "react";
import { screens } from "../../constants";
import "./style.css";

const StartScreen = ({ setScreenShowing }) => {
    return (
        <div className="StartScreen">
            <button
                className="StartButton"
                onClick={() => setScreenShowing(screens.game)}
            >
                Start
            </button>
            <button
                className="HowToPlayButton"
                onClick={() => setScreenShowing(screens.settings)}
            >
                How to Play
            </button>
        </div>
    );
};

export default StartScreen;
