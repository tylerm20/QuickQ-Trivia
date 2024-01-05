import React, { useState, useEffect } from 'react';
import Timer from './Components/Timer';
import Score from './Components/Score';
import Settings from './Components/Settings';
import Question from './Components/Question';
import AnswerModal from './Components/AnswerModal';

const questionsAndAnswers = [
  ["here is the fireset question it goes on and ansdfasdfnoa on andn on eadsfna;sdlfkjas;dfkjl answer", "answer"],
  ["this is the second question; look how fast I can type. the quick brown fox jumped over the lazy dog", "answer"],
  ["qwuest 3, ;adsokfj;asldfja;sdlfjkas;dlkfjas;dlfkjas;dlkfjas;dlkfjasd;lkfjasd;lfjasd;lfjasd;fljasd;flkj", "answer"],
  ["no 4 asdf;lkjasdfj;lkjafs d;lkfjdas;lfkjdsa;fkljasdf;kljasdfl;kja014239udasl;kfj as;ldfk jasd;flkj asdf;lkjasd", "answer"]
]

function App() {
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [isBuzzing, setIsBuzzing] = useState(false)
  const [showWholeQuestion, setShowWholeQuestion] = useState(false)
  const [gameSecondsRemaining, setGameSecondsRemaining] = useState(60)
  const [buzzSecondsRemaining, setBuzzSecondsRemaining] = useState(15);

  const decrementGameSecondsTimer = () => {
    if (gameSecondsRemaining > 0) {
      setGameSecondsRemaining(gameSecondsRemaining - 1);
    }
  };

  const decrementBuzzSecondsTimer = () => {
    if (buzzSecondsRemaining > 0 && isBuzzing) {
      setBuzzSecondsRemaining(buzzSecondsRemaining - 1);
    }
  };

  const checkQuestion = (userAnswer) => {
    return userAnswer == questionsAndAnswers[currentQuestionIndex][1]
  }

  const finishQuestion = (userAnswer) => {
    if (checkQuestion(userAnswer)) {
      setScore(score + 1)
      // show something saying right answer
    }
    setShowWholeQuestion(true)
    setIsBuzzing(false)
    setCurrentQuestionIndex(currentQuestionIndex + 1)
    // else show something saying wrong answer
  }

  return (
    <div className="App">
      <Timer seconds={gameSecondsRemaining} decrementTimer={decrementGameSecondsTimer} />
      <div className="top-row">
        <Score score={score} />
        <Timer seconds={buzzSecondsRemaining} decrementTimer={decrementBuzzSecondsTimer} />
        <Settings />
      </div>
      <Question 
        question={questionsAndAnswers[currentQuestionIndex][0]}
        isBuzzing={isBuzzing}
        showWholeQuestion={showWholeQuestion}
      />
      {isBuzzing && <AnswerModal onSubmit={finishQuestion} />}
      <div className="bottom-row">
        <div>
          <button 
          onClick={() => setIsBuzzing(true)}
          className='buzz-button'>
            Buzz
          </button>
        </div>
        <div><button className='skip-button'>Skip</button></div>
      </div>
    </div>
  );
}

export default App;
