import React, { useState } from "react";
import ChangeLanImg from "../images/change-language.png";
import "./header.css";

const ChangeLanguageWindow = () => {
const [isClicked, setIsClicked] = useState(false);
const [language, setLanguage] = useState("EN");

const handleButtonClick = () => {
setIsClicked(!isClicked);
};

const handleLanguageChange = (selectedLanguage) => {
setLanguage(selectedLanguage);
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
            RU
            </span>
            <span
            className="image-text"
            onClick={() => handleLanguageChange("EN")}
            >
            EN
            </span>
        </div>
        )}
        {!isClicked && <span className="image-text">{language}</span>}
    </div>
);
};

export default ChangeLanguageWindow;