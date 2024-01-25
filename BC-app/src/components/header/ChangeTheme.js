import React, { useState } from "react";
import changeThemeImg from "../images/change-theme.jpg";
import sunnyImg from "../images/sun.jpg";
import moonImg from "../images/moon.jpg";
import "./header.css";

const ChangeThemeWindow = () => {
const [isHovered, setIsHovered] = useState(false);

const handleMouseEnter = () => {
setIsHovered(true);
};

const handleMouseLeave = () => {
setIsHovered(false);
};

return (
    <div id="header-change-theme-button" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        {isHovered || (
        <img src={changeThemeImg} alt="Button 1" className="header-button"/>
    )}
        {isHovered && (
        <div id="choose-theme">
            <img src={sunnyImg} alt="Button 1.1"/>
            <img src={moonImg} alt="Button 1.2"/>
        </div>
        )}
    </div>
);
};

export default ChangeThemeWindow;