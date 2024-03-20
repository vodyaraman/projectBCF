import React, { useState, useRef, useEffect, useContext } from "react";
import { useTranslation } from "react-i18next";
import ChangeThemeWindow from "../header/header-components/ChangeTheme.js";
import ChangeLanguageWindow from "../header/header-components/ChangeLanguage.js";
import "../header/header.css";
import SettingsImg from "../images/settings.png";
import SettingsImgBlack from "../images/settingsBlack.png";
import { ThemeContext } from "../../contexts/ThemeContext.js";

const SettingsWindow = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();
    const settingsRef = useRef(null);
    const {theme} = useContext(ThemeContext)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (settingsRef.current && !settingsRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };


    return (
        <div
            ref={settingsRef}
            className="header-settings"
        >
            <img
                className="settings-button"
                src={ theme==="night" ? SettingsImg : SettingsImgBlack}
                alt="setting"
                onClick={toggleSettings}
            />
            {isOpen && (
                <div className="settings-content">
                    <div className="header-text">{t("theme")} <ChangeThemeWindow /></div>
                    <div className="header-text">{t("language")} <ChangeLanguageWindow/></div>
                    <p className="header-text">{t("text-opacity")}</p>
                    <p className="header-text">{t("light-edition")}</p>
                </div>
            )}
        </div>
    );
};

export default SettingsWindow;