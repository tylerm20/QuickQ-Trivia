const Modal = ({ showModal, children }) => {
    return showModal && <div className="Modal">{children}</div>;
};

export default Modal;
