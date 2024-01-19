import React from "react";
import "./style.css";
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
}) => {
    const showResults = () => {
        const results = [];
        let i = 1;
        for (const result of playerResults) {
            results.push(
                <div className="QuestionResult" key={i}>
                    <div>
                        <b>Question {i}</b>
                    </div>
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
        const sharableResultsArr = [`Score: ${score}`];
        let i = 1;
        for (const result of playerResults) {
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
        return sharableResultsArr.join("\n");
    };

    return (
        <div className="FinishScreen">
            <h3 className="Header">Game Over</h3>
            <h3 className="Score">Score: {score}</h3>
            <h3 className="Score">Total Time: {totalTime} sec</h3>
            <div className="Share">
                <button onClick={share}>share</button>
            </div>
            {showResults()}
        </div>
    );
};

export default FinishScreen;
