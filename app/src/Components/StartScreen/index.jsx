import React, { useState } from "react";
import { screens } from "../../constants";
import SettingsScreen from "../SettingsScreen";
import "./style.css";

const StartScreen = ({
    setScreenShowing,
    today,
    hasPlayedTodaysGame,
    isDevMode,
    setIsDevMode,
}) => {
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    return (
        <div className="StartScreen">
            {showSettingsModal && (
                <SettingsScreen
                    showModal={showSettingsModal}
                    setShowModal={setShowSettingsModal}
                    isDevMode={isDevMode}
                    setIsDevMode={setIsDevMode}
                />
            )}
            <div className="Header">
                <div>Your Quiz for</div> {today.toLocaleDateString()}
            </div>
            {hasPlayedTodaysGame && !isDevMode ? (
                <div className="Header">
                    <div>Come back for a new Quiz tomorrow!</div>
                    <button onClick={() => setScreenShowing(screens.finish)}>
                        See Results
                    </button>
                </div>
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
