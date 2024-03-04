import BasicButton from "../BasicButton";

const SettingsButton = ({ onClick }) => {
    return (
        <div className="settings">
            <BasicButton onClick={onClick}>Info</BasicButton>
        </div>
    );
};

export default SettingsButton;
