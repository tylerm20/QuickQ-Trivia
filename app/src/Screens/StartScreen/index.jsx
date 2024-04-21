import React, { useState, useEffect } from "react";
import { screens } from "../../constants";
import SettingsScreen from "../../Screens/SettingsScreen";
import BasicButton from "../../Components/BasicButton";
import CategoriesChart from "../../Components/CategoriesChart";
import { calculateCategoryScores } from "../../utils";
import "./style.css";

const StartScreen = ({
    setScreenShowing,
    today,
    hasFinishedTodaysGame,
    hasStartedTodaysGame,
}) => {
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [categoryScores, setCategoryScores] = useState({});

    useEffect(
        () => setCategoryScores(calculateCategoryScores()),
        [calculateCategoryScores]
    );

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

            {Object.keys(localStorage).length === 0 ? (
                /* if we have no games in local storage */
                <img className="Logo" src="QQ2.png" />
            ) : (
                <CategoriesChart categoryScores={categoryScores} />
            )}
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
