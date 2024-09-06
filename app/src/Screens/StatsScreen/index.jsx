import React, { useEffect, useState } from "react";
import BasicButton from "../../Components/BasicButton";
import {
    screens,
    CATEGORY_COLOR_MAP,
    CATEGORIES_NAME_LIST,
} from "../../constants";
import { getEmojiForCategory, isMultipleChoiceMode } from "../../utils";
import "./style.css";

const StatsScreen = ({ setScreenShowing }) => {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        function calculateGameStats() {
            const stats = {
                totalGamesPlayed: 0,
                totalQuestionsAttempted: 0,
                totalCorrectAnswers: 0,
                totalSkippedQuestions: 0,
                averageScore: 0,
                averageTimePerQuestion: 0,
                longestStreak: 0,
                currentStreak: 0,
            };
            const categoryStats = {};

            let previousDate = null;

            for (let i = 0; i < localStorage.length; i++) {
                const key = localStorage.key(i);

                // Check if the key is a valid date string
                if (Date.parse(key)) {
                    const value = JSON.parse(localStorage.getItem(key));

                    stats.totalGamesPlayed++;
                    stats.totalQuestionsAttempted +=
                        value.questionResults.length;
                    stats.totalCorrectAnswers += value.questionResults.filter(
                        (result) => result.isCorrect
                    ).length;
                    stats.totalSkippedQuestions += value.questionResults.filter(
                        (result) => result.skipped
                    ).length;

                    if (value.isFinished) {
                        // Only consider finished games for score and time calculations
                        stats.averageScore += value.score;
                        stats.averageTimePerQuestion +=
                            value.questionResults.reduce(
                                (sum, result) => sum + result.time,
                                0
                            ) / value.questionResults.length;

                        // Category-specific stats
                        value.questionResults.forEach((result) => {
                            const category = result.category;
                            if (!categoryStats[category]) {
                                categoryStats[category] = {
                                    attempted: 0,
                                    correct: 0,
                                    skipped: 0,
                                };
                            }
                            if (result.skipped) {
                                categoryStats[category].skipped++;
                            } else {
                                categoryStats[category].attempted++;
                            }
                            if (result.isCorrect) {
                                categoryStats[category].correct++;
                            }
                        });

                        // TODO: this seems wrong
                        // Streak calculation
                        const currentDate = new Date(key);
                        if (
                            previousDate &&
                            currentDate.getDate() - previousDate.getDate() ===
                                1 &&
                            value.score > 0
                        ) {
                            stats.currentStreak++;
                        } else {
                            stats.currentStreak = value.score > 0 ? 1 : 0; // Reset streak if not consecutive or no correct answers
                        }
                        stats.longestStreak = Math.max(
                            stats.longestStreak,
                            stats.currentStreak
                        );
                        previousDate = currentDate;
                    }
                }
            }

            if (stats.totalGamesPlayed > 0) {
                stats.averageScore = (
                    stats.averageScore / stats.totalGamesPlayed
                ).toFixed(2);
                stats.averageTimePerQuestion = (
                    stats.averageTimePerQuestion / stats.totalGamesPlayed
                ).toFixed(2);
            }

            // Calculate percentages for each category
            for (const category in categoryStats) {
                const { attempted, correct } = categoryStats[category];
                categoryStats[category].percentageCorrect =
                    attempted > 0 ? (correct / attempted) * 100 : 0;
            }

            // Add categoryStats to the final stats object
            stats.categoryStats = categoryStats;

            return stats;
        }
        setStats(calculateGameStats());
    }, []);

    const CategoryStats = ({ stats }) => {
        return (
            <div>
                {CATEGORIES_NAME_LIST.map((category) => {
                    const categoryData = stats.categoryStats[category];
                    return (
                        <div key={category} className="category-stats">
                            <h3 style={{ color: CATEGORY_COLOR_MAP[category] }}>
                                {category} {getEmojiForCategory(category)}
                            </h3>
                            <div className="StatBlock">
                                <div>Attempted: {categoryData.attempted}</div>
                                <div>Correct: {categoryData.correct}</div>
                                <div>Skipped: {categoryData.skipped}</div>
                                <div>
                                    Percentage Correct:{" "}
                                    {categoryData.percentageCorrect.toFixed(2)}%
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="StatsScreen">
            {stats && stats.totalGamesPlayed > 0 ? (
                <div>
                    <h1>Stats</h1>
                    <div className="StatBlock">
                        <div>Games Played: {stats.totalGamesPlayed}</div>
                        <div>
                            Questions Attempted: {stats.totalQuestionsAttempted}
                        </div>
                        <div>
                            Questions Skipped: {stats.totalSkippedQuestions}
                        </div>
                        <div>Average Score: {stats.averageScore}</div>
                        <div>
                            Average Time Per Question:{" "}
                            {stats.averageTimePerQuestion}s
                        </div>
                    </div>
                    {/* // TODO: get this figured */}
                    {/* <div>Longest Streak: {stats.longestStreak}</div>
                    <div>Current Streak: {stats.currentStreak}</div> */}
                    <h2>By Category</h2>
                    <CategoryStats stats={stats} />
                </div>
            ) : (
                <div>
                    Finish your first game and come back to view your stats!
                </div>
            )}
            <div className="Footer">
                <BasicButton onClick={() => setScreenShowing(screens.start)}>
                    Home
                </BasicButton>
            </div>
        </div>
    );
};

export default StatsScreen;
