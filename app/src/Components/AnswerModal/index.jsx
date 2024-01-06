import React, { useState, useRef } from 'react';
import "./style.css"

const AnswerModal = ({ onSubmit }) => {
    const [text, setText] = useState("")
    const inputRef = useRef(null);

    const handleTextChange = (e) => {
      setText(e.target.value)
    };
  
    const handleSubmit = () => {
      onSubmit(text)
      setText("")
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
          handleSubmit()
        }
      };
  
    return (
      <div className='AnswerModal'>
        <input
            autoFocus
            type="text"
            value={text}
            onChange={handleTextChange}
            ref={inputRef}
            onKeyDown={handleKeyDown}
        />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    );

};

export default AnswerModal;
