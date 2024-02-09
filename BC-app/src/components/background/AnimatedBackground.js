import React from 'react';
import AnimatedBackgroundNight from "../../components/background/dark-theme-bg/night-bg";
import AnimatedBackgroundDay from "../../components/background/light-theme-bg/day-bg";
import SettingsWindow from '../structure-elements/SBlock-settings';

class AnimatedBackground extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            backgroundTheme: this.getStoredBackgroundTheme() || 'day',
        };
    }

    switchBackgroundTheme = (theme) => {
        this.setState({ backgroundTheme: theme });
        this.storeBackgroundTheme(theme);
    };

    render() {
        const { backgroundTheme } = this.state;

        return (
            <div id='animated-background'>
                <SettingsWindow switchBackgroundTheme={this.switchBackgroundTheme} />
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