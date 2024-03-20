import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import "../../pages/main-page/Main-page.css";

const SBlockToggle = ({ activeOrNot, width, height, labelFor, labelLeft, labelRight, imageLeft, imageRight, imageSlider, onClick }) => {
    const [isActive, setIsActive] = useState(activeOrNot);
    const [startX, setStartX] = useState(null);
    const [isSwiping, setIsSwiping] = useState(false);

    const handleClick = () => {
        setIsActive(!isActive);
    };

    useEffect(() => {
        onClick && onClick(!isActive)
    }, [isActive])

    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsSwiping(true);
    };

    const handleTouchMove = (e) => {
        if (!isSwiping) return;
        const currentX = e.touches[0].clientX;
        const deltaX = currentX - startX;
        const threshold = 50;

        if (deltaX > threshold) {
            isActive === false &&
            setIsActive(true);
        } else if (deltaX < -threshold) {
            isActive === true &&
            setIsActive(false);   
        }
    };

    const handleTouchEnd = () => {
        setIsSwiping(false);
        setStartX(null);
    };

    return (
        <div
            className={`structure-block-toggler ${isActive ? 'active' : ''}`}
            style={{ width: width, height: height }}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onClick={handleClick}
        >
            {labelFor && <label className='header-text switchero'>{labelFor}</label>}
            {labelLeft && <span className="structure-block-maintext switchero">{labelLeft}</span>}
            {imageLeft && <img src={imageLeft} alt="left icon" className="account-button switchero" />}
            <div className="switcher">
                {imageSlider && <img src={imageSlider} alt="toggle icon" className="account-button switchero" />}
            </div>
            {labelRight && <span className="structure-block-maintext switchero">{labelRight}</span>}
            {imageRight && <img src={imageRight} alt="right icon" className="account-button switchero" />}
        </div >
    );
}

SBlockToggle.propTypes = {
    width: PropTypes.string.isRequired,
    height: PropTypes.string.isRequired,
    labelFor: PropTypes.string,
    labelLeft: PropTypes.string,
    labelRight: PropTypes.string,
    imageLeft: PropTypes.string,
    imageRight: PropTypes.string,
    imageSlider: PropTypes.string,
    onClick: PropTypes.func.isRequired,
}

export default SBlockToggle;