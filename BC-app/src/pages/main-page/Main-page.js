import React from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import "./Main-page.css"
import Header from "../../components/header/Header.js";
import AnimatedBackground from '../../components/background/AnimatedBackground';
import SBlock from "../../components/structure-elements/SBlock-main.js"


const MainPage = () => {
    return(
        <div id="main-page">
            <AnimatedBackground />
            <Header/>
            <div id="page-scrollbar-container">
                <SBlock/>
            </div>
        </div>
    )
}

export default MainPage