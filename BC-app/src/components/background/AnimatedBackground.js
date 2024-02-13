import React from 'react';
import AnimatedBackgroundNight from "../../components/background/dark-theme-bg/night-bg";
import AnimatedBackgroundDay from "../../components/background/light-theme-bg/day-bg";
import { ThemeContext } from '../../contexts/ThemeContext';
import "../header/header.css"

class AnimatedBackground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundTheme:  localStorage.getItem('backgroundTheme') || 'day',
        };
    }

    render() {
        return (
            <ThemeContext.Consumer>
                {({ theme }) => (
                    <div id='animated-background'>
                        {theme === 'night' ? <AnimatedBackgroundNight /> : <AnimatedBackgroundDay />}
                    </div>
                )}
            </ThemeContext.Consumer>
        );
    }
}

export default AnimatedBackground;