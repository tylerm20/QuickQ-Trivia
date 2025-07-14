import React, { useEffect, useRef } from "react";
import Modal from "../../Components/Modal";
import "./style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";
import {
    faInstagram,
    faXTwitter,
    faDiscord,
    faFacebook,
} from "@fortawesome/free-brands-svg-icons";

const SettingsScreen = ({ showModal, setShowModal }) => {
    const modalRef = useRef(null); // Create a ref to the modal content
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                setShowModal(false);
            }
        };
        if (showModal) {
            document.addEventListener("mousedown", handleClickOutside);
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
        }

        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [showModal, setShowModal]);

    return (
        <Modal showModal>
            <div className="Settings" ref={modalRef}>
                <FontAwesomeIcon
                    icon={faX}
                    className="CloseIcon"
                    onClick={() => setShowModal(false)}
                />
                <div>
                    <h3>How to Play</h3>
                    This is a <b>70 second</b> daily trivia quiz. Once
                    you start the game, your timer starts counting down. During
                    the game, a question will begin to appear one character at a
                    time. If you think you know the answer to the question, hit
                    the <b>"Buzz"</b> button and type in your answer. Your timer
                    is stopped while you are typing your answer, but you only
                    have 15 seconds to submit it. You can also skip any question
                    by pressing the <b>"Skip"</b> button.
                    <p>
                        Each quiz has 8 questions.
                    </p>
                    <p>
                        Thank you to Marty Heavey for making his original game, QuickQ, open source, from which this is heavily borrowed.
                    </p>
                    <p>
                        All data used for statistics is stored locally in your
                        browser, so if you switch devices or clear your
                        browser's storage you will lose your stats.
                    </p>
                </div>
                <h3>Community</h3>
                <p>
                    ✉️ <b>Email me:</b>{" "}
                    <a href="mailto:tmaxey20@gmail.com">
                        tmaxey20@gmail.com
                    </a>
                </p>
                <br />
                <button
                    className="CloseButton"
                    onClick={() => setShowModal(!showModal)}
                >
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default SettingsScreen;
