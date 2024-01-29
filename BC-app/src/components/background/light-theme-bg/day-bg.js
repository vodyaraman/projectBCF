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
        // You can add more animations or logic here if needed
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
                {/* Add more elements for the sky, grass, and other details */}
            </animated.div>
        </div>
    );

};

export default AnimatedBackgroundDay;