import React, { useEffect, useRef } from "react";
import Modal from "../../Components/Modal";
import { SEEN_ANNOUNCEMENT_STORAGE_KEY } from "../../constants";
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
        localStorage.setItem(SEEN_ANNOUNCEMENT_STORAGE_KEY, "true"); // Store that the user has seen it
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
                    <h3>Help Shape the Future of QuickQ!</h3>
                    <p>
                        I've loved building and maintaining <b>QuickQ</b>, but I
                        no longer have the time to give it the attention it
                        deserves. I'm reaching out to gather feedback and invite
                        contributions from the community.
                    </p>
                    <p>
                        Let me know what you love about QuickQ, what you'd like
                        to see improved, and how you might be willing to help.
                        I'm especially looking for partners to assist with
                        maintaining QuickQ, exploring monetization strategies,
                        and contributing new questions—particularly in the
                        categories of{" "}
                        <b>Sports, Entertainment, and Current Events</b>.
                    </p>
                    <p>
                        📢 <b>Share your feedback:</b>{" "}
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSeYxUIKKQDYX4PSTFuE4d4RvbYDA5ey8znBFy5XeSBRY_qhRw/viewform?usp=dialog"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Feedback Form
                        </a>
                    </p>
                    <p>
                        ❓ <b>Submit trivia questions:</b>{" "}
                        <a
                            href="https://docs.google.com/forms/d/e/1FAIpQLSeYznbR5FKYeB_q7ti8qp6JKm7xST5psSHZ0u9OkbP6YXdrfQ/viewform?usp=dialog"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Question Submission Form
                        </a>
                    </p>
                    <p>
                        ✉️ <b>Email me:</b>{" "}
                        <a href="mailto:QuickQTrivia@gmail.com">
                            QuickQTrivia@gmail.com
                        </a>
                    </p>
                    <p>
                        Thanks for playing and for being part of this community!
                    </p>
                    <p>- Marty</p>
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
