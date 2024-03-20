import React, { useContext, useRef, useState, useEffect } from "react";
import "../header/header.css";
import AccountImg from "../images/account.png"
import AccountImgBlack from "../images/accountBlack.png"
import { useTranslation } from "react-i18next";
import { AuthContext } from "../../contexts/UserContext";
import { ThemeContext } from "../../contexts/ThemeContext";
import Authorisation from "../../pages/authorisation-page/Authorisation.js";

const AccountMenu = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isAuth, setIsAuth] = useState(false)
    const accountRef = useRef(null)
    const { t } = useTranslation();
    const { user, handleSetUser } = useContext(AuthContext)
    const {theme} = useContext(ThemeContext)

    console.log(user)

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (accountRef.current && !accountRef.current.contains(e.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    const handleLogOut = () => {
        handleSetUser(null)
    }

    const handleLogIn = () => {
        setIsAuth(!isAuth)
        setIsOpen(!isOpen)
    }
//<Link to="/user"><span className="header-text">{t("login-h1")}</span></Link>
    return (
        <div className="header-settings" ref={accountRef}>
            {isAuth && (<Authorisation cancelAuth = {handleLogIn}/>)}
            <img className="account-button"
                src={theme==="night" ? AccountImg : AccountImgBlack}
                alt="ACC"
                onClick={toggleSettings}>
            </img>
            {isOpen && (
                <div className="accountmenu-content">
                    {user ? (
                        <div>
                            <span className="header-text">{user.login}</span>
                            <div className="header-text" onClick={handleLogOut}>Log out</div>
                        </div>
                        ) : (
                        <div>
                            <span className="header-text" onClick={handleLogIn}>{t("login-h1")}</span>
                            <span className="header-text">{t("registration")}</span>
                            <span className="header-text">{t("leave-comment")}</span>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default AccountMenu;