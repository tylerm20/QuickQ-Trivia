import React, { useState, useEffect } from 'react';
import Timer from './Components/Timer';
import Score from './Components/Score';
import Settings from './Components/Settings';
import Question from './Components/Question';
import AnswerModal from './Components/AnswerModal';
import StartScreen from './Components/StartScreen';
import FinishScreen from './Components/FinishScreen';
import GameScreen from './Components/GameScreen';
import { screens } from "./constants"
import "./App.css"

function App() {
    const [screenShowing, setScreenShowing] = useState(screens.start);

    const getScreenToShow = () => {
        switch (screenShowing) {
            case screens.start:
                return <StartScreen setScreenShowing={setScreenShowing}/>
            case screens.game:
                return <GameScreen setScreenShowing={setScreenShowing}/>
            case screens.finish:
                return <FinishScreen setScreenShowing={setScreenShowing}/>
            case screens.settings:
                return <Settings setScreenShowing={setScreenShowing}/>
            default:
                console.log("not sure what screen to show")
        }
    }

    return (
        <div className="App">
            <div className='Title'>MinQuiz Alpha</div>
            {console.log(screenShowing)}
            {getScreenToShow()}
        </div>
    );
}

export default App;
