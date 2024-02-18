import React  from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import "../header/header.css";
import AccountImg from "../images/account.png"
import { useTranslation } from "react-i18next";

const AccountMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { t } = useTranslation();

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="header-settings">
            <img className="account-button"
                src={AccountImg}
                alt="ACC"
                onClick={toggleSettings}>
            </img>
            {isOpen && (
                <div className="accountmenu-content">
                    <Link to="/"><span className="header-text">{t("login-h1")}</span></Link>
                    <span className="header-text">{t("registration")}</span>
                    <span className="header-text">{t("leave-comment")}</span>
                </div>
            )}
        </div>
    );
};

export default AccountMenu;