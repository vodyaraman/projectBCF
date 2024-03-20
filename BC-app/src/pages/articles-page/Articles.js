import React from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import "../../components/header/bot-header.css";
import "./Articles.css";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import SBlockSections from '../../components/structure-elements/SBlock-sections.js';

const ArticlesPage = () => {
    return (
        <div id="articles-page">
            <div id="page-scrollbar-container">
                <Header />
                <SBlockSections />
                <Footer />
            </div>
        </div>
    )
};

export default ArticlesPage;