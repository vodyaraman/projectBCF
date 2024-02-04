import React from 'react';
import HeaderBase from "../../components/header/Header-base";
import AnimatedBackgroundNight from "../../components/background/dark-theme-bg/night-bg";
import AnimatedBackgroundDay from "../../components/background/light-theme-bg/day-bg";

class AnimatedBackground extends React.Component {
    constructor(props) {
        super(props);

        // Initialize state with the default background theme or retrieve it from localStorage
        this.state = {
            backgroundTheme: this.getStoredBackgroundTheme() || 'day',
        };
    }

    switchBackgroundTheme = (theme) => {
        // Update the background theme in the component's state
        this.setState({ backgroundTheme: theme });
        // Optionally, store the theme in localStorage for session persistence
        this.storeBackgroundTheme(theme);
    };

    render() {
        const { backgroundTheme } = this.state;

        return (
            <div id='animated-background'>
                <HeaderBase switchBackgroundTheme={this.switchBackgroundTheme} />
                {backgroundTheme === 'night' ? (
                    <AnimatedBackgroundNight />
                ) : (
                    <AnimatedBackgroundDay />
                )}
            </div>
        );
    }

    storeBackgroundTheme = (theme) => {
        localStorage.setItem('backgroundTheme', theme);
    };

    getStoredBackgroundTheme = () => {
        return localStorage.getItem('backgroundTheme');
    };
}

export default AnimatedBackground;