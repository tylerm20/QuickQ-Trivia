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

const TextModal = ({ showModal, setShowModal, text }) => {
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
                {text}
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

export default TextModal;
