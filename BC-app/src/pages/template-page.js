import React from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import "../../components/header/bot-header.css";
import "./TEMPLATE.css";
import Header from "../../components/header/Header.js";
import SBlockHeader from "../../components/structure-elements/SBlock-header.js";
import AnimatedBackground from '../../components/background/AnimatedBackground';
import Footer from "../../components/footer/Footer.js";

const TEMPLATE = () => {
    return (
        <div id="main-page">
            <AnimatedBackground />
            <div id="page-scrollbar-container">
                <SBlockHeader />
                <Header />
                <Footer />
            </div>
        </div>
    )
};

export default TEMPLATE;