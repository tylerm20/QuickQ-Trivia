import { screens } from "../../constants"

const SettingsButton = ({ setScreenShowing }) => {
    // Add your settings button functionality here
    return (
      <div className="settings">
        <div>not yet implemented</div>
        <button onClick={() => setScreenShowing(screens.game)}>Back</button>
      </div>
    );
  };
  
  export default SettingsButton;
  