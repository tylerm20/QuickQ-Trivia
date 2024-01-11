import React from 'react';
import "./style.css"

const FinishScreen = ({ setScreenShowing, playerResults }) => {

    const showResults = () => {
        const results = []
        let i = 1
        for (const result of playerResults) {
            console.log(result)
            results.push(
                <div key={i}>
                    <div>question {i}</div>
                    <div>
                    {
                        result.skipped
                        ? "skipped"
                        : result.userAnswer 
                    }
                    {" "}
                    {
                        result.isCorrect
                        ? "check"
                        : "x"
                    }
                    </div>
                    <div>time: {result.time} seconds</div>
                </div>
            )
            i += 1
        }
        return results
    }
   
    return (
      <div className='FinishScreen'>
        <div>game over</div>
        {showResults()}
      </div>
    );

};

export default FinishScreen;