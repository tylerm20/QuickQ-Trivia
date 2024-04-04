import React, { useState } from "react";
import { screens } from "../../constants";
import SettingsScreen from "../../Screens/SettingsScreen";
import BasicButton from "../../Components/BasicButton";
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
                <div>Rapid Daily Trivia Quiz</div>{" "}
                <span className="Date">{today.toLocaleDateString()}</span>
            </div>
            <img className="BrainTreeLogo" src="brain_tree_logo_purple.svg" />
            {hasPlayedTodaysGame && !isDevMode ? (
                <div className="AlreadyPlayed">
                    <div className="ComeBack">
                        Come back for a new Quiz tomorrow!
                    </div>
                    <BasicButton
                        onClick={() => setScreenShowing(screens.finish)}
                    >
                        See Results
                    </BasicButton>
                </div>
            ) : (
                <div className="Buttons">
                    <BasicButton
                        className="HowToPlayButton"
                        onClick={() => setShowSettingsModal(true)}
                    >
                        How to Play
                    </BasicButton>
                    <button
                        className="StartButton"
                        onClick={() => setScreenShowing(screens.game)}
                    >
                        Start
                    </button>
                </div>
            )}
        </div>
    );
};

export default StartScreen;
