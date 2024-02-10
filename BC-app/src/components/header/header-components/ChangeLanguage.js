import React, { useState } from "react";
import ChangeLanImg from "../../images/change-language.png";
import i18n from "../../../localisation/i18n"
import "../header.css";
import { useTranslation } from "react-i18next";

const ChangeLanguageWindow = () => {
    const [isClicked, setIsClicked] = useState(false);

    const { t } = useTranslation();

    const handleButtonClick = () => {
        setIsClicked(!isClicked);
    };

    const [language, setLanguage] = useState("EN");

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage);
        setIsClicked(false);
    };

    return (
        <div
            id="header-change-language-block"
            onClick={handleButtonClick}
            onMouseLeave={() => setIsClicked(false)}
        >
            {isClicked && (
                <div className="choose-language">
                    <img className="button-img" src={ChangeLanImg} alt="CL" />
                    <span
                        className="change-language-text"
                        onClick={() => handleLanguageChange("RU")}
                    >
                        {t("RU")}
                    </span>
                    <span
                        className="change-language-text"
                        onClick={() => handleLanguageChange("EN")}
                    >
                        {t("EN")}
                    </span>
                </div>
            )}
            {!isClicked && (
                <span className="change-language-text">{language}</span>
            )}
        </div>
    );
};

export default ChangeLanguageWindow;