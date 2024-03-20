import React, { useState, useEffect } from "react";
import i18n from "../../../localisation/i18n"
import "./header-component.css";
import SBlockToggle from "../../structure-elements/SBlock-toggle";

const ChangeLanguageWindow = () => {
    const [language, setLanguage] = useState(localStorage.getItem('language'));
    const isActive = language === 'RU' ? false : true

    useEffect(() => {
        language && i18n.changeLanguage(language);
    }, [language]);

    const handleLanguageChange = () => {
        language === "RU" ? setLanguage("EN") : setLanguage("RU");
        localStorage.setItem('language', language);
    };

    return (
        <div className="change-settings-block">
            <SBlockToggle 
            width="100px" 
            height="4.3vh" 
            onClick={handleLanguageChange} 
            activeOrNot={isActive}
            labelLeft={"EN"}
            labelRight={"RU"}
            />
        </div>
    );
};

export default ChangeLanguageWindow;