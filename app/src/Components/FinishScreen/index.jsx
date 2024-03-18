import React from "react";
import "./style.css";
import BasicButton from "../BasicButton";
import {
    GREEN_CHECK_EMOJI_HTML,
    NEXT_TRACK_EMOJI_HTML,
    RED_X_EMOJI_HTML,
    CLOCK_EMOJI_HTML,
} from "../../constants";

const FinishScreen = ({
    setScreenShowing,
    playerResults,
    score,
    totalTime,
    questions,
    isDevMode,
    setIsDevMode,
    streak,
}) => {
    const finalScore = score || playerResults.score;
    const finalTime = totalTime || playerResults.totalTime;
    const showResults = () => {
        if (!playerResults || !playerResults.questionResults) {
            return;
        }
        const results = [];
        let i = 1;
        for (const result of playerResults.questionResults) {
            results.push(
                <div className="QuestionResult" key={i}>
                    <details>
                        <summary>
                            <b>Question {i}</b>
                        </summary>
                        <p>{questions[i - 1].question}</p>
                    </details>
                    <div>
                        {result.skipped ? "Skipped" : result.userAnswer}{" "}
                        {result.isCorrect
                            ? GREEN_CHECK_EMOJI_HTML
                            : result.skipped
                              ? NEXT_TRACK_EMOJI_HTML
                              : RED_X_EMOJI_HTML}
                    </div>
                    <div>
                        {CLOCK_EMOJI_HTML} {result.time} sec
                    </div>
                </div>
            );
            i += 1;
        }
        return results;
    };

    const share = () => {
        const sharableResults = getResultsStr();
        if (navigator.canShare) {
            navigator.share({
                title: "Results",
                text: sharableResults,
            });
        } else {
            navigator.clipboard.writeText(sharableResults).then(() => {
                console.log(sharableResults);
                alert("Copied to clipboard");
            });
        }
    };

    const getResultsStr = () => {
        const sharableResultsArr = [
            "QuickQ: Daily Trivia Quiz",
            `${new Date().toLocaleDateString()}`,
            `Score: ${finalScore}`,
            `Time: ${finalTime}s`,
        ];
        let i = 1;
        for (const result of playerResults.questionResults) {
            const rowArr = [`${i}. `];
            if (result.isCorrect) {
                rowArr.push("✅");
            } else if (result.skipped) {
                rowArr.push("⏭️");
            } else {
                rowArr.push("❌");
            }
            rowArr.push(` ${result.time}s`);
            const row = rowArr.join("");
            sharableResultsArr.push(row);
            i += 1;
        }
        sharableResultsArr.push("https://QuickQTrivia.com");
        return sharableResultsArr.join("\n");
    };

    return (
        <div className="FinishScreen">
            <h3 className="Header">Game Over</h3>
            <h3 className="Score">Score: {finalScore}</h3>
            <h3 className="Score">Total Time: {finalTime} sec</h3>
            <h3 className="Score">Streak: {streak} days</h3>
            <div className="Share">
                <BasicButton onClick={share}>share</BasicButton>
            </div>
            {showResults()}
        </div>
    );
};

export default FinishScreen;
