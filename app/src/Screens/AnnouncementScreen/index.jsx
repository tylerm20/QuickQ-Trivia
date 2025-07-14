import React, { useEffect, useRef } from "react";
import Modal from "../../Components/Modal";
import { SEEN_ANNOUNCEMENT_2_STORAGE_KEY } from "../../constants";
import "./style.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faX } from "@fortawesome/free-solid-svg-icons";

const AnnouncementScreen = ({ showModal, setShowModal }) => {
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

    const handleClose = () => {
        localStorage.setItem(SEEN_ANNOUNCEMENT_2_STORAGE_KEY, "true"); // Store that the user has seen it
        setShowModal(false);
    };

    return (
        <Modal showModal>
            <div className="Settings" ref={modalRef}>
                <FontAwesomeIcon
                    icon={faX}
                    className="CloseIcon"
                    onClick={handleClose}
                />
                <div>
                    <h3>QuickQ Trainer</h3>
                    <p>
                        Thank you to Marty Heavey for making QuickQ open source, from which this game has been heavily borrowed from.
                    </p>
                    <p>
                        You can send me an email if you have questions.
                    </p>
                    <p>
                        <a href="mailto:tmaxey20@gmail.com">
                            tmaxey20@gmail.com
                        </a>
                    </p>
                </div>
                <br />
                <button className="CloseButton" onClick={handleClose}>
                    Close
                </button>
            </div>
        </Modal>
    );
};

export default AnnouncementScreen;
