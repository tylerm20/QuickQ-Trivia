import Modal from "../../Components/Modal";
import "./style.css";

const SettingsScreen = ({ showModal, setShowModal }) => {
    return (
        <Modal showModal>
            <div className="Settings">
                <img
                    src="close_button_icon.png"
                    className="CloseIcon"
                    onClick={() => setShowModal(false)}
                />
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
                    <p>
                        There are 8 categories of questions: Current Events,
                        U.S. History, Sports, World History, Science, Geography,
                        Arts & Literature, and Entertainment (TV, Movies,
                        Music). Each day's Quiz will feature one question from
                        each category.
                    </p>
                    <p>
                        All data used for statistics is stored locally in your
                        browser, so if you switch devices or clear your
                        browser's storage you will lose your stats.
                    </p>
                </div>
                <br />
                <div>
                    Send your feedback or question suggestions to{" "}
                    <a href="mailto:QuickQTrivia@gmail.com">
                        QuickQTrivia@gmail.com
                    </a>
                </div>
                <br />
                <div className="CommunityFooter">
                    <div className="JoinTheCommunity">Join the Community:</div>
                    <div className="Logos">
                        <a
                            href="https://twitter.com/QuickQTrivia"
                            target="_blank"
                        >
                            <img className="Logo" src="x_logo_black.png" />
                        </a>
                        <a href="https://discord.gg/Jw5r8eMjFw" target="_blank">
                            <img
                                src="discord_logo_black.png"
                                className="Logo"
                            />
                        </a>
                    </div>
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
