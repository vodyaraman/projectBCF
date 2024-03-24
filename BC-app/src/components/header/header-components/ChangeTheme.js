import React, { useState, useContext, useMemo, memo } from 'react';
import "./header-component.css";
import { ThemeContext } from '../../../contexts/ThemeContext';
import MoonImg from "../../images/moon.jpg"
import SunImg from "../../images/sun.jpg"
import SBlockToggle from '../../structure-elements/SBlock-toggle';

const ChangeThemeWindow = memo(() => {
    const { theme, handleThemeChange } = useContext(ThemeContext)
    const [themeSwtiched, switchTheme] = useState(theme)

    const isActive = useMemo(() => {
        return themeSwtiched === 'day' ? false : true
    }, [themeSwtiched]);

    const handleThemeClick = () => {
        const newTheme = themeSwtiched === "day" ? "night" : "day";
        switchTheme(newTheme);
        handleThemeChange(newTheme);
    }

    return (
        <div className="change-settings-block">
            <SBlockToggle 
            width='100px' 
            height='4.3vh' 
            onClick={handleThemeClick} 
            activeOrNot={isActive}
            imageSlider={theme === 'day' ? SunImg : MoonImg}/>
        </div>
    );
});

export default ChangeThemeWindow;