import "./style.css";

const Modal = ({ showModal, children }) => {
    return (
        showModal && (
            <div className="Modal">
                <div className="ModalContent">{children}</div>
            </div>
        )
    );
};

export default Modal;
