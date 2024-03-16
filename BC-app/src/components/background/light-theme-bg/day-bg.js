import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './day-bg.css';

const AnimatedBackgroundDay = () => {
    const props = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 3000 },
    });

    useEffect(() => {
        const changeColors = () => {
            document.documentElement.style.setProperty('--primary-div-color', 'rgba(255, 255, 255, 0.99)');
            document.documentElement.style.setProperty('--secondary-div-color', 'rgba(220, 220, 220, 0.33)');
            document.documentElement.style.setProperty('--primary-border-color', 'rgba(174, 175, 177, 0.658)');
            document.documentElement.style.setProperty('--secondary-border-color', 'rgba(8, 20, 44, 0.76)');
            document.documentElement.style.setProperty('--primary-text-color', 'rgba(24, 24, 24, 0.9)');
            document.documentElement.style.setProperty('--primary-text-color-hover', 'rgba(0, 0, 0, 1)');
            document.documentElement.style.setProperty('--secondary-text-color', 'rgb(0, 0, 0)');
            document.documentElement.style.setProperty('--error-color', 'red');
            document.documentElement.style.setProperty('--link-color', 'blue');
            document.documentElement.style.setProperty('--primary-button-color', 'rgba(15, 15, 15, 0.4)');
            document.documentElement.style.setProperty('--primary-button-color-hover', 'rgba(31, 31, 31, 0.38)');
            document.documentElement.style.setProperty('--secondary-button-color', 'rgba(8, 70, 240, 0.767)');
          };
        
          changeColors();
    }, []);

    return (
        <div id="animated-background-base-day">
            <animated.div id="animated-background-day" style={props}>
                <div id="background-wrap">
                    <div className="x1">
                        <div className="cloud"></div>
                    </div>
                    <div className="x2">
                        <div className="cloud"></div>
                    </div>
                    <div className="x3">
                        <div className="cloud"></div>
                    </div>
                    <div className="x4">
                        <div className="cloud"></div>
                    </div>
                </div>
                <div className="sun"></div>            
            </animated.div>
        </div>
    );

};

export default AnimatedBackgroundDay;