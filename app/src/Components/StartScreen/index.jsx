import React, { useState } from 'react';
import { screens } from "../../constants"
import "./style.css"

const StartScreen = ({ setScreenShowing }) => {
   
    return (
      <div className='StartScreen'>
        <button onClick={() => setScreenShowing(screens.game)}>start</button>
      </div>
    );

};

export default StartScreen;
