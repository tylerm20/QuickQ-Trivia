import React, { useEffect } from "react";
import "./style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";

const LoadingScreen = ({ callback, isFinished }) => {
    useEffect(() => {
        if (isFinished) {
            callback();
        }
    }, [isFinished]);

    return (
        <div className="LoadingScreen">
            <FontAwesomeIcon icon={faSpinner} className="SpinnerIcon" />
        </div>
    );
};

export default LoadingScreen;
