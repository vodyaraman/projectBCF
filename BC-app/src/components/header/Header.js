import React from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SettingsWindow from "../structure-elements/SBlock-settings";
import AccountMenu from "../structure-elements/SBlock-account";
import "./header.css";
const Header = () => {
    const { t } = useTranslation();
    return (
        <header>
            <SettingsWindow />
            <AccountMenu /> 
            <div className="header-links">
                <Link to="/mainpage"><span className="header-links-text">{t("mainpage")}</span></Link>
                <Link to="/articles"><span className="header-links-text">{t("articles")}</span></Link>
                <Link to="/reviews"><span className="header-links-text">{t("reviews")}</span></Link>
                <Link to="/about"><span className="header-links-text">{t("about")}</span></Link>
            </div>
            
        </header>
    );
};

export default Header;