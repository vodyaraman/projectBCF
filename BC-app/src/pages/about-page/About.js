import React from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import "../../components/header/bot-header.css";
import "./About.css";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";

const AboutPage = () => {
    return (
        <div id="main-page">
            <div id="page-scrollbar-container">
                <Header />
                <Footer />
            </div>
        </div>
    )
};

export default AboutPage;