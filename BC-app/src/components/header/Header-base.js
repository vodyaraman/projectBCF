import React from "react";
import ChangeThemeWindow from "./ChangeTheme";
import ChangeLanguage from "./ChangeLanguage";
import "./header.css";

const HeaderBase = ({ switchBackgroundTheme }) => {
    return (
        <div id="header-base">
            <ChangeThemeWindow switchBackgroundTheme={switchBackgroundTheme} />
            <ChangeLanguage />
        </div>

    );
};

export default HeaderBase;