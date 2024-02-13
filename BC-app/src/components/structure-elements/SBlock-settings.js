import React from "react";
import { useState } from "react";
import ChangeThemeWindow from "../header/header-components/ChangeTheme.js"
import "../header/header.css";
import SettingsImg from "../images/settings.png"

const SettingsWindow = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="header-settings">
            <img className="settings-button"
                src={SettingsImg}
                alt="setting"
                onClick={toggleSettings}>
            </img>
            {isOpen && (
                <div className="settings-content">
                    <div className="header-text">Тема <ChangeThemeWindow /></div>
                    <p className="header-text">Язык</p>
                    <p className="header-text">Яркость текста</p>
                    <p className="header-text">Упрощенный режим</p>
                    <p></p>
                </div>
            )}
        </div>
    );
};

export default SettingsWindow;