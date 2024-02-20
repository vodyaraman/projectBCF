import React, { useState, useEffect } from "react";
import i18n from "../../../localisation/i18n"
import "./header-component.css";
import { useTranslation } from "react-i18next";

const ChangeLanguageWindow = () => {
    const [isHovered, setIsHovered] = useState(false);

    const { t } = useTranslation();

    useEffect(() => {
        const savedLanguage = localStorage.getItem('language');
        if (savedLanguage) {
        setLanguage(savedLanguage);
        i18n.changeLanguage(savedLanguage);
        }
        }, []);

    function handleMouseEnter() {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const [language, setLanguage] = useState("EN");

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
        localStorage.setItem('language', selectedLanguage);
    };

    return (
        <div
            className="change-settings-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {!isHovered && (
                <div className="button-img">{language}</div>
            )}
            {isHovered && (
                <div id="choose-language">
                    <div
                        className="button-img"
                        onClick={() => handleLanguageChange("RU")}
                    >
                        {t("RU")}
                    </div>
                    <div
                        className="button-img"
                        onClick={() => handleLanguageChange("EN")}
                    >
                        {t("EN")}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChangeLanguageWindow;