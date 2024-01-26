import React, { useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import './day-bg.css';

const AnimatedBackgroundDay = () => {
const props = useSpring({
from: { opacity: 0 },
to: { opacity: 1 },
config: { duration: 2000 },
});

useEffect(() => {
// You can add more animations or logic here if needed
}, []);

return (
<div id="animated-background">
<animated.div id="animated-backgound-day" style={props}>
{/* Your animated day background content goes here */}
<div className="sun"></div>
<div className="grass"></div>
{/* Add more elements for the sky, grass, and other details */}
</animated.div>
</div>
);
};

export default AnimatedBackgroundDay;