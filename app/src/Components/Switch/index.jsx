import React, { useEffect } from "react";
import "./style.css";

const Switch = ({ isEnabled, onIsEnabledChanged }) => {
    return (
        <label className="Switch">
            <input
                type="checkbox"
                checked={isEnabled}
                onChange={onIsEnabledChanged}
            />
            <span className="Slider"></span>
        </label>
    );
};

export default Switch;
