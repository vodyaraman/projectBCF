import React, { useState, useEffect } from "react";
import "../header/header.css";
import "../../pages/main-page/Main-page.css"
import { useTranslation } from "react-i18next";

const SBLockHeader = () => {
    const { t } = useTranslation();
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const images = [
        "https://sotni.ru/wp-content/uploads/2023/08/nochnoe-nebo-42-1.webp",
        "https://mirpozitiva.ru/wp-content/uploads/2019/11/1477041461_noch_v_lesy.jpg",
        "https://images.unsplash.com/photo-1468276311594-df7cb65d8df6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMTc3M3wwfDF8c2VhcmNofDE0fHxza3klMjBuaWdodHxlbnwwfHx8fDE2Njc2NDY4MzU&ixlib=rb-4.0.3&q=80&w=2000"
    ];
    const anchors = ["#block1", "#block2", "#footer"]; // Массив якорей

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentImageIndex(prevIndex =>
                prevIndex === images.length - 1 ? 0 : prevIndex + 1
            );
        }, 50000); // Интервал в миллисекундах (50 секунд)
        return () => clearInterval(timer);
    }, [images.length]);

    const handlePrevButtonClick = () => {
        setCurrentImageIndex(prevIndex =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const handleNextButtonClick = () => {
        setCurrentImageIndex(prevIndex =>
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    };

    const handleImageClick = () => {
        window.location.href = anchors[currentImageIndex]; // Переход по ссылке-якорю при клике на изображение
    };

    return (
        <div id="bot-header">
            <div id="structure-block-header">
                {images.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`carousel-${index}`}
                        onClick={handleImageClick}
                        style={{
                            display: index === currentImageIndex ? "block" : "none"
                        }}
                    />
                ))}
                <div id="dot-navigation">
                    {images.map((_, index) => (
                        <span
                            key={index}
                            className={`dot ${index === currentImageIndex ? "active" : ""}`}
                            onClick={() => setCurrentImageIndex(index)}
                        ></span>
                    ))}
                </div>
            </div>
            <div id="sbh-buttons-panel">
                <button className="bot-header-button-arrow" onClick={handlePrevButtonClick}>{"<"}</button>
                <button className="bot-header-button" onClick={() => window.location.href = anchors[currentImageIndex]}>{t("goto")}</button>
                <button className="bot-header-button-arrow" onClick={handleNextButtonClick}>{">"}</button>
            </div>
        </div>

    );
};

export default SBLockHeader;