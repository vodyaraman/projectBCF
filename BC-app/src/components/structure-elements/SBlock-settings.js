import React from "react";
import { useState } from "react";
import ChangeThemeWindow from "../header/header-components/ChangeTheme.js"
import ChangeLanguageWindow from "../header/header-components/ChangeLanguage.js"
import "../header/header.css";
import SettingsImg from "../images/settings.png"
import { useTranslation } from "react-i18next";

const SettingsWindow = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

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
                    <div className="header-text">{t("theme")} <ChangeThemeWindow /></div>
                    <div className="header-text">{t("language")} <ChangeLanguageWindow /></div>
                    <p className="header-text">{t("text-opacity")}</p>
                    <p className="header-text">{t("light-edition")}</p>
                </div>
            )}
        </div>
    );
};

export default SettingsWindow;