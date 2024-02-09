import React  from "react";
import { useState } from "react";
import "../header/header.css";
import AccountImg from "../images/account.png"

const AccountMenu = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSettings = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div id="header-account-block">
            <img id="account-button"
                src={AccountImg}
                alt="ACC"
                onClick={toggleSettings}>
            </img>
            {isOpen && (
                <div className="accountmenu-content">
                </div>
            )}
        </div>
    );
};

export default AccountMenu;