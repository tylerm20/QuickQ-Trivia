import React, { useState } from "react";
import { screens } from "../../constants";
import SettingsScreen from "../../Screens/SettingsScreen";
import BasicButton from "../../Components/BasicButton";
import CategoriesChart from "../../Components/CategoriesChart";
import "./style.css";

const StartScreen = ({
    setScreenShowing,
    today,
    hasFinishedTodaysGame,
    hasStartedTodaysGame,
}) => {
    const [showSettingsModal, setShowSettingsModal] = useState(false);

    return (
        <div className="StartScreen">
            {showSettingsModal && (
                <SettingsScreen
                    showModal={showSettingsModal}
                    setShowModal={setShowSettingsModal}
                />
            )}
            <div className="Header">
                <div>Rapid Daily Trivia Quiz</div>{" "}
                <span className="Date">{today.toLocaleDateString()}</span>
            </div>
            {/* if we have no games in local storage */}
            {Object.keys(localStorage).length === 0 &&
                "Play your first game to start collecting stats!"}
            <CategoriesChart />
            {hasFinishedTodaysGame ? (
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
                        {hasStartedTodaysGame ? "Resume" : "Start"}
                    </button>
                </div>
            )}
        </div>
    );
};

export default StartScreen;
