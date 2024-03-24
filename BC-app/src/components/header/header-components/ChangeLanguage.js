import React, { useCallback, memo, useState, useEffect, useMemo } from "react";
import i18n from "../../../localisation/i18n";
import "./header-component.css";
import SBlockToggle from "../../structure-elements/SBlock-toggle";

const ChangeLanguageWindow = memo(() => {
    const [language, setLanguage] = useState(i18n.language)
    
    const isActive = useMemo(() => {
        return language === "EN" ? false : true
    }, [language]);

    useEffect(() => {
        i18n.changeLanguage(language)
        localStorage.setItem("language", language);
    }, [language])

    const handleLanguageChange = useCallback(() => {    
        setLanguage(prevLanguage => prevLanguage === "EN" ? "RU" : "EN")
    }, []);

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
});

export default ChangeLanguageWindow;