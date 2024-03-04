import React from "react";
import "./style.css";

function Button({ children, onClick, style }) {
    return (
        <button onClick={onClick} className={style}>
            {children}
        </button>
    );
}

export default Button;
