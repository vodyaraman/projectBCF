import React  from "react";
import { useState } from "react";
import ChangeThemeWindow from "../header/header-components/ChangeTheme.js"
import ChangeLanguage from "../header/header-components/ChangeLanguage.js"
import "../header/header.css";
import SettingsImg from "../images/settings.png"

const SettingsWindow = ({ switchBackgroundTheme }) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id="header-settings-block">
            <img id="settings-button"
                src={SettingsImg}
                alt="setting"
                onClick={toggleSettings}>
            </img>
            {isOpen && (
                <div className="settings-content">
                    <ChangeThemeWindow switchBackgroundTheme={switchBackgroundTheme} />
                    <ChangeLanguage />
                </div>
            )}
        </div>
    );
};

export default SettingsWindow;