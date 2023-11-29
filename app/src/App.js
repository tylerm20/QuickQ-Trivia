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
  const [isBuzzing, setIsBuzzing] = useState(false)
  const [showWholeQuestion, setShowWholeQuestion] = useState(false)


  useEffect(() => {
    let timerInterval;

    if (isBuzzing && buzzTimer > 0) {
      timerInterval = setInterval(() => {
        setBuzzTimer((prevSeconds) => prevSeconds - 1);
      }, 1000);
    } else {
      setIsBuzzing(false)
      setShowWholeQuestion(true)
      clearInterval(timerInterval);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [isBuzzing, buzzTimer]);

  const onBuzzClick = () => {
    setIsBuzzing(true);
  };

  const showNextQuestion = () => {
    setCurrentQuestionIndex(prevQuestionIndex => prevQuestionIndex + 1)
    console.log(currentQuestionIndex)
  }

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
        showWholeQuestion={showWholeQuestion}
      />
      <div className="bottom-row">
        <div>
          <button
            onClick={onBuzzClick}
            className='buzz-button'>
              Buzz
          </button>
        </div>
        <div>
          <button
            className='skip-button'
            onClick={showNextQuestion}>
              Skip
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
