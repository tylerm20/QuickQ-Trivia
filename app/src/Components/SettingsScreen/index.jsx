import Modal from "../Modal";

const SettingsScreen = ({ showModal, setShowModal }) => {
    return (
        <Modal showModal>
            <div className="settings">
                <div>
                    MinQuiz is a one minute triva game. Once you start the game,
                    a timer starts counting down one minute. During the game, a
                    question will begin to appear one character at a time. If
                    you think you know the answer to the question, hit the
                    "Buzz" button and type in your answer. Hitting the "Buzz"
                    button will stop new characters of the question from
                    appearing. Your one minute timer is stopped while you are
                    typing your answer, but you only have 15 seconds to submit
                    your answer. You can also skip any question by pressing the
                    "Skip" button. See how many questions you can answer
                    correctly in one minute!
                </div>
                <button onClick={() => setShowModal(!showModal)}>Close</button>
            </div>
        </Modal>
    );
};

export default SettingsScreen;
