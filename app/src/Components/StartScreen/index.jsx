import React, { useState } from "react";
import { screens } from "../../constants";
import SettingsScreen from "../SettingsScreen";
import "./style.css";

const StartScreen = ({ setScreenShowing }) => {
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [today, setToday] = useState(new Date());
    const hasPlayedTodaysGame = () => {
        return localStorage.getItem(today.toDateString()) === "1";
    };

    return (
        <div className="StartScreen">
            {showSettingsModal && (
                <SettingsScreen
                    showModal={showSettingsModal}
                    setShowModal={setShowSettingsModal}
                />
            )}
            <div className="Header">
                <div>Your Quiz for</div> {today.toLocaleDateString()}
            </div>
            {console.log(localStorage.getItem(today.toDateString()))}
            {hasPlayedTodaysGame() ? (
                <div>Come back for a new Quiz tomorrow!</div>
            ) : (
                <button
                    className="StartButton"
                    onClick={() => setScreenShowing(screens.game)}
                >
                    Start
                </button>
            )}
            <button
                className="HowToPlayButton"
                onClick={() => setShowSettingsModal(true)}
            >
                How to Play
            </button>
        </div>
    );
};

export default StartScreen;
