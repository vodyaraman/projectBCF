import React from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import "../../components/header/bot-header.css";
import "./About.css";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import { useTranslation } from "react-i18next";


const InfoPage = () => {
    const { t } = useTranslation();
    return (
        <div id="main-page">
            <div id="page-scrollbar-container">
                <Header />
                <div className='block'>
                    <div className='structure-block half'>
                        <h1>{t("sources")}</h1>
                            
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
};

export default InfoPage;