import React, { useState, useContext } from 'react';
import "./header-component.css";
import { ThemeContext } from '../../../contexts/ThemeContext';
import MoonImg from "../../images/moon.jpg"
import SunImg from "../../images/sun.jpg"
import SBlockToggle from '../../structure-elements/SBlock-toggle';

const ChangeThemeWindow = () => {

    const { theme, handleThemeChange } = useContext(ThemeContext)
    const [themeSwtiched, switchTheme] = useState(theme)
    const isActive = themeSwtiched === 'day' ? false : true

    const handleThemeClick = () => {
        themeSwtiched === 'day' ? (switchTheme('night')) : (switchTheme('day'))
        handleThemeChange(themeSwtiched)
    }

    return (
        <div className="change-settings-block">
            <SBlockToggle 
            width='100px' 
            height='4.3vh' 
            onClick={handleThemeClick} 
            activeOrNot={isActive}
            imageSlider={themeSwtiched === 'night' ? SunImg : MoonImg}/>
        </div>
    );
};

export default ChangeThemeWindow;