import React, { useState, useEffect } from "react";
import { screens } from "../../constants";
import SettingsScreen from "../../Screens/SettingsScreen";
import BasicButton from "../../Components/BasicButton";
import CategoriesChart from "../../Components/CategoriesChart";
import Switch from "../../Components/Switch";
import { calculateCategoryScores } from "../../utils";
import { GameModes, GAME_MODE_STORAGE_KEY } from "../../constants";
import "./style.css";

const StartScreen = ({
    setScreenShowing,
    today,
    hasFinishedTodaysGame,
    hasStartedTodaysGame,
    timeUntilNextGame,
    gameMode,
    setGameMode,
}) => {
    // TODO: this seems to be re-rendered constantly
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [categoryScores, setCategoryScores] = useState({});

    useEffect(
        () => setCategoryScores(calculateCategoryScores()),
        [calculateCategoryScores]
    );

    function formatTimeComponent(timeComponent) {
        return timeComponent < 10 ? `0${timeComponent}` : timeComponent;
    }

    const changeGameMode = () => {
        console.log("here");
        const newGameMode =
            gameMode === GameModes.FREE_RESPONSE
                ? GameModes.MULTIPLE_CHOICE
                : GameModes.FREE_RESPONSE;
        setGameMode(newGameMode);
        localStorage.setItem(GAME_MODE_STORAGE_KEY, newGameMode);
    };

    const doesNotHaveGameResultsStored = () => {
        return (
            Object.keys(localStorage).length === 0 ||
            (Object.keys(localStorage).length === 1 &&
                localStorage.getItem(GAME_MODE_STORAGE_KEY))
        );
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
                <div>Rapid Daily Trivia Quiz</div>{" "}
                <span className="Date">{today.toLocaleDateString()}</span>
            </div>

            {/* Condition checking there are no saved games */}
            {doesNotHaveGameResultsStored() ? (
                /* if we have no games in local storage */
                <img className="QQLogo" src="QQ2.png" />
            ) : (
                <CategoriesChart categoryScores={categoryScores} />
            )}
            {hasFinishedTodaysGame ? (
                <div className="AlreadyPlayed">
                    <div className="ComeBack">Come back for a new Quiz in </div>
                    <div className="CountdownUntilNextDay">
                        {formatTimeComponent(timeUntilNextGame.hours)}:
                        {formatTimeComponent(timeUntilNextGame.minutes)}:
                        {formatTimeComponent(timeUntilNextGame.seconds)}
                    </div>
                    <div className="Buttons">
                        <BasicButton
                            className="HowToPlayButton"
                            onClick={() => setShowSettingsModal(true)}
                        >
                            Info
                        </BasicButton>
                        <BasicButton
                            onClick={() => setScreenShowing(screens.finish)}
                        >
                            See Results
                        </BasicButton>
                    </div>
                </div>
            ) : (
                <div>
                    {!hasStartedTodaysGame && (
                        <div className="ModeSelector">
                            Game Mode:
                            <Switch
                                isEnabled={
                                    gameMode === GameModes.MULTIPLE_CHOICE
                                }
                                onIsEnabledChanged={(e) => changeGameMode()}
                            />
                            <div className="GameModeLabel">
                                {gameMode === GameModes.MULTIPLE_CHOICE
                                    ? "Multiple Choice"
                                    : "Free Response"}
                            </div>
                        </div>
                    )}
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
                </div>
            )}
        </div>
    );
};

export default StartScreen;
