import React from "react";
import { Link } from "react-router-dom";
import SettingsWindow from "../structure-elements/SBlock-settings";
import AccountMenu from "../structure-elements/SBlock-account";
import "./header.css";

const Header = () => {
    return (
        <header id="page-wrapper">
            <div id="top-header">
                <SettingsWindow />
                <AccountMenu />
                <div id="header-links">
                    <Link to="/mainpage"><span className="header-text">Главная</span></Link>
                    <Link to="/articles"><span className="header-text">Статьи</span></Link>
                    <Link to="/reviews"><span className="header-text">Отзывы</span></Link>
                    <Link to="/about"><span className="header-text">Про Нас</span></Link>
                </div>
            </div>
        </header>
    );
};

export default Header;