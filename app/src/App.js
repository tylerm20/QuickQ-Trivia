import React, { useState } from 'react';
import Timer from './Components/Timer';
import Score from './Components/Score';
import Settings from './Components/Settings';
import Question from './Components/Question';

function App() {
  const [score, setScore] = useState(0);

  return (
    <div className="App">
      <Timer />
      <div className="top-row">
        <Score score={score} />
        <Settings />
      </div>
      <Question />
      <div className="bottom-row">
        <div><button className='buzz-button'>Buzz</button></div>
        <div><button className='skip-button'>Skip</button></div>
      </div>
    </div>
  );
}

export default App;
