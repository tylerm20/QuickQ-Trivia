import Modal from "../../Components/Modal";
import "./style.css";

const SettingsScreen = ({ showModal, setShowModal }) => {
    return (
        <Modal showModal>
            <div className="Settings">
                <div>
                    QuickQ is a 90 second daily trivia quiz. Once you start the
                    game, a timer starts counting down. During the game, a
                    question will begin to appear one character at a time. If
                    you think you know the answer to the question, hit the
                    "Buzz" button and type in your answer. Hitting the "Buzz"
                    button will stop new characters of the question from
                    appearing. Your timer is stopped while you are typing your
                    answer, but you only have 15 seconds to submit your answer.
                    You can also skip any question by pressing the "Skip"
                    button. See how many questions you can answer correctly in
                    90 seconds! Start a streak to see how many days in a row you
                    can answer at least one question correctly.
                </div>
                <br />
                <div>
                    Send your feedback to{" "}
                    <a href="mailto:QuickQTrivia@gmail.com">
                        QuickQTrivia@gmail.com
                    </a>
                </div>
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
