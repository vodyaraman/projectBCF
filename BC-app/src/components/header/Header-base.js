import React from "react";
import ChangeThemeWindow from "./ChangeTheme";
import ChangeLanguage from "./ChangeLanguage";
import "./header.css";

const HeaderBase = ({ switchBackgroundTheme }) => {
    return (
        <header>
            <div id="function-header">
                <div id="header-base">
                    <ChangeThemeWindow switchBackgroundTheme={switchBackgroundTheme} />
                    <ChangeLanguage />
                </div>
            </div>
        </header>
    );
};

export default HeaderBase;