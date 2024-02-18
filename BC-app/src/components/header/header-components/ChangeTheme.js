import React, { useState, useContext } from 'react';
import sunnyImg from "../../images/sun.jpg";
import moonImg from "../../images/moon.jpg";
import changeThemeImg from "../../images/change-theme.jpg";
import "./header-component.css";
import { ThemeContext } from '../../../contexts/ThemeContext';

const ChangeThemeWindow = () => {
    const [isHovered, setIsHovered] = useState(false);
    const { handleThemeChange } = useContext(ThemeContext);

    function handleMouseEnter() {
        setIsHovered(true);
    }

    const handleMouseLeave = () => {
        setIsHovered(false);
    };

    return (
        <div
            className="change-settings-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {isHovered || (
                <img
                    className="button-img"
                    src={changeThemeImg}
                    alt="Change Theme"
                    onClick={() => handleThemeChange('day')}
                />
            )}
            {isHovered && (
                <div className="choose-theme">
                    <img
                        className="button-img"
                        src={sunnyImg}
                        alt="Day Theme"
                        onClick={() => handleThemeChange('day')}
                    />
                    <img
                        className="button-img"
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