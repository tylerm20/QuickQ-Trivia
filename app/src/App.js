import React, { useState, useEffect } from 'react';
import Timer from './Components/Timer';
import Score from './Components/Score';
import Settings from './Components/Settings';
import Question from './Components/Question';

const questions = [
  "here is the fireset question it goes on and ansdfasdfnoa on andn on eadsfna;sdlfkjas;dfkjl answer",
  "this is the second question; look how fast I can type. the quick brown fox jumped over the lazy dog",
  "qwuest 3, ;adsokfj;asldfja;sdlfjkas;dlkfjas;dlfkjas;dlkfjas;dlkfjasd;lkfjasd;lfjasd;lfjasd;fljasd;flkj",
  "no 4 asdf;lkjasdfj;lkjafs d;lkfjdas;lfkjdsa;fkljasdf;kljasdfl;kja014239udasl;kfj as;ldfk jasd;flkj asdf;lkjasd",
]

function App() {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [buzzTimer, setBuzzTimer] = useState(15);
  const [buzzTimerInterval, setBuzzTimerInterval] = useState(null)
  const [isBuzzing, setIsBuzzing] = useState(false)
  const [showWholeQuestion, setShowWholeQuestion] = useState(false)


  const onBuzzClick = () => {
    console.log("click")
    startBuzzTimer();
  }
  
  const startBuzzTimer = () => {
      console.log("Here")
      setIsBuzzing(true);
      setBuzzTimerInterval(setInterval(() => {
        setBuzzTimer(buzzTimer - 1)
        console.log(buzzTimer)
      }, 1000));
   
  
    if (buzzTimer < 1) {
      setIsBuzzing(false);
      setShowWholeQuestion(true);
      setBuzzTimer(15)
    }
  }

  useEffect(() => {
    if (buzzTimer < 1 && buzzTimerInterval) {
      clearInterval(buzzTimerInterval)
    }
  }, [startBuzzTimer])

  return (
    <div className="App">
      <Timer />
      <div className="top-row">
        <Score score={score} />
        {buzzTimer}
        <Settings />
      </div>
      <Question 
        question={questions[currentQuestionIndex]}
        isBuzzing={isBuzzing}
        showWholeQuestion={false}
      />
      <div className="bottom-row">
        <div><button onClick={onBuzzClick}
        className='buzz-button'>Buzz</button></div>
        <div><button className='skip-button'>Skip</button></div>
      </div>
    </div>
  );
}

export default App;
