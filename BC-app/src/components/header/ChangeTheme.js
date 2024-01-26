import React, { useState } from "react";
import sunnyImg from "../images/sun.jpg";
import moonImg from "../images/moon.jpg";
import changeThemeImg from "../images/change-theme.jpg";
import "./header.css";

const ChangeThemeWindow = ({ switchBackgroundTheme }) => {
    const [isHovered, setIsHovered] = useState(false);

    const handleMouseEnter = () => {
        setIsHovered(true);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    const handleThemeChange = (theme) => {
        switchBackgroundTheme(theme);
    };

    return (
        <div
            id="header-change-theme-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isHovered || <img src={changeThemeImg} alt="Day Theme" onClick={() => handleThemeChange('day')} />}
            {isHovered && (
                <div id="choose-theme">
                    <img
                        src={sunnyImg}
                        alt="Day Theme"
                        onClick={() => handleThemeChange('day')}
                    />
                    <img
                        src={moonImg}
                        alt="Night Theme"
                        onClick={() => handleThemeChange('night')}
                    />
                </div>
            )}
        </div>
    );
};

export default ChangeThemeWindow;