import React, { useState } from "react";
import i18n from "../../localisation/i18n"
import ChangeLanImg from "../images/change-language.png";
import "./header.css";
import { useTranslation } from "react-i18next";

const ChangeLanguageWindow = () => {

    const [isClicked, setIsClicked] = useState(false);

    const {t} = useTranslation()

    const handleButtonClick = () => {
        setIsClicked(!isClicked);
    };
    const [language, setLanguage] = useState("EN");

    const handleLanguageChange = (selectedLanguage) => {
        setLanguage(selectedLanguage);
        i18n.changeLanguage(selectedLanguage); // Обновите язык через i18n
        setIsClicked(false);
    };


    return (
        <div
            id="header-change-language-block"
            onClick={handleButtonClick}
            onMouseLeave={() => setIsClicked(false)}
        >
            {isClicked && (
                <div id="choose-language">
                    <img src={ChangeLanImg} alt="CL"></img>
                    <span
                        className="image-text"
                        onClick={() => handleLanguageChange("RU")}
                    >
                    {t("RU")}
                    </span>
                    <span
                        className="image-text"
                        onClick={() => handleLanguageChange("EN")}
                    >
                    {t("EN")}
                    </span>
                </div>
            )}
            {!isClicked && <span className="image-text">{language}</span>}
        </div>
    );
};

export default ChangeLanguageWindow;