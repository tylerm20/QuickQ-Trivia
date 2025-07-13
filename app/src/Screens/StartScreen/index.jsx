import React, { useState, useEffect } from "react";
import ReactGA from "react-ga4";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import SettingsScreen from "../../Screens/SettingsScreen";
import BasicButton from "../../Components/BasicButton";
import CategoriesChart from "../../Components/CategoriesChart";
import Switch from "../../Components/Switch";
import { calculateCategoryScores, isMultipleChoiceMode } from "../../utils";
import {
    screens,
    GameModes,
    GAME_MODE_STORAGE_KEY,
    FIRST_GAME_DATE,
    LAST_GAME_DATE,
    SEEN_ANNOUNCEMENT_2_STORAGE_KEY,
} from "../../constants";
import "./style.css";
import AnnouncementScreen from "../AnnouncementScreen";

const StartScreen = ({
    setScreenShowing,
    hasFinishedTodaysGame,
    hasStartedTodaysGame,
    gameMode,
    setGameMode,
    isFetchingQuestions,
    selectedDate,
    setSelectedDate,
    datesAlreadyPlayed,
}) => {
    // TODO: this seems to be re-rendered constantly
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [showAnnouncementModel, setShowAnnouncementModel] = useState(false);
    const [categoryScores, setCategoryScores] = useState({});

    useEffect(
        () => setCategoryScores(calculateCategoryScores()),
        [calculateCategoryScores]
    );

    const changeGameMode = () => {
        const newGameMode = isMultipleChoiceMode(gameMode)
            ? GameModes.FREE_RESPONSE
            : GameModes.MULTIPLE_CHOICE;
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

    const hasSeenAnnouncement = () => {
        return !!localStorage.getItem(SEEN_ANNOUNCEMENT_2_STORAGE_KEY);
    };

    useEffect(() => {
        if (doesNotHaveGameResultsStored()) {
            setShowSettingsModal(true);
        }
    }, []);

    useEffect(() => {
        if (!hasSeenAnnouncement()) {
            setShowAnnouncementModel(true);
        }
    }, []);

    const showStats = () => {
        ReactGA.event({
            category: "navigation",
            action: "stats",
            label: "show_stats",
        });
        setScreenShowing(screens.stats);
    };

    return (
        <div className="StartScreen">
            {showAnnouncementModel && (
                <AnnouncementScreen
                    showModal={showAnnouncementModel}
                    setShowModal={setShowAnnouncementModel}
                />
            )}
            {!showAnnouncementModel && showSettingsModal && (
                <SettingsScreen
                    showModal={showSettingsModal}
                    setShowModal={setShowSettingsModal}
                />
            )}
            <div className="Header">
                <div>Rapid Daily Trivia Quiz</div>
                <div className="Archive">Archive</div>
                <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                        if (date) {
                            setSelectedDate(date);
                        }
                    }}
                    maxDate={LAST_GAME_DATE}
                    minDate={FIRST_GAME_DATE}
                    highlightDates={datesAlreadyPlayed}
                    dayClassName={(date) => {
                        // Custom class for highlighted dates
                        if (
                            datesAlreadyPlayed.some(
                                (d) => d.toDateString() === date.toDateString()
                            )
                        ) {
                            return "DateAlreadyPlayed";
                        }
                        return "";
                    }}
                />
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
                    <div className="ComeBack">
                        <b>
                            Check out another quiz from the archive by changing
                            the date above!
                        </b>
                    </div>
                    <div className="Buttons">
                        <BasicButton
                            className="OtherButton"
                            onClick={showStats}
                        >
                            See Stats
                        </BasicButton>
                        <BasicButton
                            onClick={() => setScreenShowing(screens.finish)}
                        >
                            Quiz Results
                        </BasicButton>
                    </div>
                </div>
            ) : (
                <div>
                    {!hasStartedTodaysGame}
                    <div className="Buttons">
                        <BasicButton
                            className="OtherButton"
                            onClick={() =>
                                doesNotHaveGameResultsStored()
                                    ? setShowSettingsModal(true)
                                    : showStats()
                            }
                        >
                            {doesNotHaveGameResultsStored()
                                ? "How to Play"
                                : "See Stats"}
                        </BasicButton>
                        <button
                            className="StartButton"
                            onClick={() => {
                                isFetchingQuestions
                                    ? setScreenShowing(screens.loading)
                                    : setScreenShowing(screens.game);
                            }}
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
