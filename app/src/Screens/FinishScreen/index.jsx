import React from "react";
import "./style.css";
import BasicButton from "../../Components/BasicButton";
import screens, {
    GREEN_CHECK_EMOJI_HTML,
    NEXT_TRACK_EMOJI_HTML,
    RED_X_EMOJI_HTML,
    CLOCK_EMOJI_HTML,
    GAME_SECONDS,
} from "../../constants";
import { convertNumberToEmoji, getEmojiForCategory } from "../../utils";

const FinishScreen = ({
    setScreenShowing,
    playerResults,
    score,
    totalTime,
    questions,
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
                            <b>
                                Question {i}{" "}
                                {getEmojiForCategory(questions[i - 1].category)}
                            </b>
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
            `QuickQ: ${new Date().toLocaleDateString()}`,
            `Score: ${finalScore}`,
            `Time: ${finalTime}s`,
        ];
        let i = 1;
        for (const result of playerResults.questionResults) {
            const rowArr = [
                `${convertNumberToEmoji(i)} ${getEmojiForCategory(questions[i - 1].category)} `,
            ];
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
            <h3 className="GameOver">
                Game Over:
                <br />
                {finalTime === GAME_SECONDS
                    ? "You ran out of time"
                    : "You answered all of today's questions"}
            </h3>
            <h3>
                Score: <span className="FinalScore">{finalScore}</span>
            </h3>
            <h3>
                Total Time: <span className="FinalTime">{finalTime}</span> sec
            </h3>
            <h3>
                Streak: <span className="Streak">{streak}</span> days
            </h3>
            <div className="Share">
                <BasicButton onClick={share}>share</BasicButton>
            </div>
            {showResults()}
            {/* TODO: update categories chart to have data when navigating back there */}
            {/* <div className="Footer">
                <BasicButton onClick={() => setScreenShowing(screens.start)}>
                    Home
                </BasicButton>
            </div> */}
        </div>
    );
};

export default FinishScreen;
