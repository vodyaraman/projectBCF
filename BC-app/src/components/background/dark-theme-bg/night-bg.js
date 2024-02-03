import React, { useEffect, useMemo } from 'react';
import { useSpring, animated } from 'react-spring';
import './night-bg.css';

const FallingStar = () => {
  const [props, set] = useSpring(() => ({
    opacity: 0,
    xy: [Math.random() * window.innerWidth, -10],
  }));

  useEffect(() => {
    const minInterval = 2000;
    const maxInterval = 7000;

    const fall = () => {
      set({ opacity: 1, xy: [Math.random() * window.innerWidth, window.innerHeight + 10] });
      setTimeout(() => {
        set({ opacity: 0, xy: [Math.random() * window.innerWidth, -10] });
      }, Math.random() * 5000);
    };

    const animate = () => {
      fall();
      requestAnimationFrame(() => {
        const timeout = setTimeout(animate, minInterval + Math.random() * (maxInterval - minInterval));
        return () => clearTimeout(timeout);
      });
    };

    const initialTimeout = setTimeout(() => {
      animate();
    }, minInterval + Math.random() * (maxInterval - minInterval));

    return () => clearTimeout(initialTimeout);
  }, [set]);

  return <animated.div className="falling-star" style={{
    transform: props.xy.to((x, y) => `translate(${x}px, ${y}px)`),
    opacity: props.opacity
  }} />;
};


const AnimatedBackgroundNight = () => {
  const props = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 3000 },
  });

  const stars = useMemo(
    () =>
      Array.from({ length: 50 }, (_, index) => ({
        id: index,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        opacity: Math.random(),
      })),
    []
  );

  return (
    <div id="animated-background-base-night">
      <animated.div id="animated-background-night" style={props}>
        {stars.map((star) => (
          <animated.div
            key={star.id}
            className="star"
            style={{
              left: star.x,
              top: star.y,
              opacity: star.opacity,
            }}
          />
        ))}
        <FallingStar />
      </animated.div>
    </div>
  );
};

export default AnimatedBackgroundNight;




