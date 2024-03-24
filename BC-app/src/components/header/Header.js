import React, {memo} from "react";
import { NavLink } from "react-router-dom";
import { useTranslation } from "react-i18next";
import SettingsWindow from "../structure-elements/SBlock-settings";
import AccountMenu from "../structure-elements/SBlock-account";
import "./header.css";

const Header = memo(() => {
    const { t } = useTranslation();
    return (
        <header id="header">
            <SettingsWindow />
            <AccountMenu />
            <div className="header-links">
                <NavLink to="/"
                    className={({ isActive }) =>
                        isActive ? "header-links-text active-link" : "header-links-text"}>
                    {t("mainpage")}
                </NavLink>
                <NavLink to="/articles"
                    className={({ isActive }) =>
                        isActive ? "header-links-text active-link" : "header-links-text"}>
                    {t("articles")}
                </NavLink>
                <NavLink to="/reviews"
                    className={({ isActive }) =>
                        isActive ? "header-links-text active-link" : "header-links-text"}>
                    {t("reviews")}
                </NavLink>
                <NavLink to="/about"
                    className={({ isActive }) =>
                        isActive ? "header-links-text active-link" : "header-links-text"}>
                    {t("about")}
                </NavLink>
            </div>
        </header>
    );
});

export default Header;