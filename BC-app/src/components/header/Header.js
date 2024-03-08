import React from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SettingsWindow from "../structure-elements/SBlock-settings";
import AccountMenu from "../structure-elements/SBlock-account";
import "./header.css";

const Header = () => {
    const { t } = useTranslation();
    return (
        <header id="header">
            <SettingsWindow />
            <AccountMenu />
            <div className="header-links">
                <NavLink exact to="/mainpage" className="header-links-text" activeClassName="active-link">{t("mainpage")}</NavLink>
                <NavLink exact to="/articles" className="header-links-text" activeClassName="active-link">{t("articles")}</NavLink>
                <NavLink exact to="/reviews" className="header-links-text" activeClassName="active-link">{t("reviews")}</NavLink>
                <NavLink exact to="/about" className="header-links-text" activeClassName="active-link">{t("about")}</NavLink>
            </div>
        </header>
    );
};

export default Header;