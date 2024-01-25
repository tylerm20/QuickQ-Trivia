import React, { useState } from "react";
import { screens } from "../../constants";
import SettingsScreen from "../SettingsScreen";
import "./style.css";

const StartScreen = ({ setScreenShowing }) => {
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    return (
        <div className="StartScreen">
            {showSettingsModal && (
                <SettingsScreen
                    showModal={showSettingsModal}
                    setShowModal={setShowSettingsModal}
                />
            )}
            <button
                className="StartButton"
                onClick={() => setScreenShowing(screens.game)}
            >
                Start
            </button>
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
