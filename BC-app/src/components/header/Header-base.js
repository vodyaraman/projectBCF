import React from "react";
import ChangeThemeWindow from "./ChangeTheme";
import ChangeLanguage from "./ChangeLanguage";
import "./header.css";

const HeaderBase = ({ switchBackgroundTheme }) => {
    return (
            <div id="function-header">
                <div id="header-base">
                    <ChangeThemeWindow switchBackgroundTheme={switchBackgroundTheme} />
                    <ChangeLanguage />
                </div>
            </div>
    );
};

export default HeaderBase;