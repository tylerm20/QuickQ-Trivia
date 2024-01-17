import React from 'react';
import "./style.css"

const FinishScreen = ({ setScreenShowing, playerResults, score, totalTime }) => {

    const showResults = () => {
        const results = []
        let i = 1
        for (const result of playerResults) {
            results.push(
                <div className="QuestionResult" key={i}>
                    <div><b>Question {i}</b></div>
                    <div>
                    {
                        result.skipped
                        ? "Skipped"
                        : result.userAnswer 
                    }
                    {" "}
                    {
                        result.isCorrect
                        ? <span>&#9989;</span>
                        : <span>&#10060;</span>
                    }
                    </div>
                    <div><span>&#128337;</span> {result.time} sec</div>
                </div>
            )
            i += 1
        }
        return results
    }
   
    return (
      <div className='FinishScreen'>
        <h3 className="Header">Game Over</h3>
        <h3 className="Score">Score: {score}</h3>
        <h3 className="Score">Total Time: {totalTime} sec</h3>
        {showResults()}
      </div>
    );

};

export default FinishScreen;