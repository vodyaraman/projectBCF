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
    const touchStartX = useRef(null);
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

    const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e) => {
        if (touchStartX.current && e.touches.length) {
            const deltaX = e.touches[0].clientX - touchStartX.current;
            if (deltaX > 50) { setIsOpen(true); }
            if (deltaX < 50) { setIsOpen(false) }
        }
    };

    return (
        <div
            ref={settingsRef}
            className="header-settings"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
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
                    <div className="header-text">{t("language")} <ChangeLanguageWindow /></div>
                    <p className="header-text">{t("text-opacity")}</p>
                    <p className="header-text">{t("light-edition")}</p>
                </div>
            )}
        </div>
    );
};

export default SettingsWindow;