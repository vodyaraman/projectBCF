import React from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import "../../components/header/bot-header.css";
import "./Main-page.css";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import AnimatedBackground from '../../components/background/AnimatedBackground';
import SBlock from "../../components/structure-elements/SBlock-main.js";
import SBlockHeader from "../../components/structure-elements/SBlock-header.js";


const MainPage = () => {
    return (
        <div id="main-page">
            <AnimatedBackground />
            <div id="page-scrollbar-container">
                <SBlockHeader />
                <div className='block'>
                    <SBlock />
                </div>
                <div className='block'>
                    <SBlock />
                </div>
                <Header />
                <Footer />
            </div>
        </div>
    )
}

export default MainPage