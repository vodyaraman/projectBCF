import React from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import "../../components/header/bot-header.css";
import "./Articles.css";
import Header from "../../components/header/Header.js";
import AnimatedBackground from '../../components/background/AnimatedBackground';
import Footer from "../../components/footer/Footer.js";

const ArticlesPage = () => {
    return (
        <div id="main-page">
            <AnimatedBackground />
            <div id="page-scrollbar-container">
                <Header />
                <Footer />
            </div>
        </div>
    )
};

export default ArticlesPage;