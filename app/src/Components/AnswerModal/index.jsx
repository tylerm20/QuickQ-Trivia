import React, { useState, useRef, useEffect } from "react";
import BasicButton from "../BasicButton";
import "./style.css";

const AnswerModal = ({ onSubmit }) => {
    const [text, setText] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        inputRef.current?.focus({ preventScroll: true });
    }, []);

    const handleTextChange = (e) => {
        setText(e.target.value);
    };

    const handleSubmit = () => {
        onSubmit({ userAnswer: text, userSkipped: false });
        setText("");
    };

    const handleKeyDown = (event) => {
        if (event.key === "Enter") {
            handleSubmit();
        }
    };

    return (
        <div className="AnswerModal">
            <input
                type="text"
                value={text}
                onChange={handleTextChange}
                ref={inputRef}
                onKeyDown={handleKeyDown}
            />
            <BasicButton onClick={handleSubmit}>Submit</BasicButton>
        </div>
    );
};

export default AnswerModal;
