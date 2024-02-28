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

  useEffect(() => {
    const changeColors = () => {
      document.documentElement.style.setProperty('--primary-div-color', 'rgba(0, 0, 0, 0.56)');
      document.documentElement.style.setProperty('--secondary-div-color', 'rgba(0, 0, 0, 0.33)');
      document.documentElement.style.setProperty('--primary-border-color', 'rgba(174, 175, 177, 0.658)');
      document.documentElement.style.setProperty('--secondary-border-color', 'rgba(8, 20, 44, 0.76)');
      document.documentElement.style.setProperty('--primary-text-color', 'rgb(192, 192, 192)');
      document.documentElement.style.setProperty('--primary-text-color-hover', 'rgb(255, 255, 255)');
      document.documentElement.style.setProperty('--secondary-text-color', 'white');
      document.documentElement.style.setProperty('--error-color', 'rgb(255, 131, 131)');
      document.documentElement.style.setProperty('--link-color', 'rgb(145, 145, 255)');
      document.documentElement.style.setProperty('--primary-button-color', 'rgba(15, 15, 15, 0.4)');
      document.documentElement.style.setProperty('--primary-button-color-hover', 'rgba(31, 31, 31, 0.38)');
      document.documentElement.style.setProperty('--secondary-button-color', 'rgba(15, 15, 15, 0.4)');
    };

    changeColors();
  }, []);

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




