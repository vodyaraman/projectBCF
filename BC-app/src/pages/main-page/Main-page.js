import React from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import HeaderBase from "../../components/header/Header-base";


const MainPage = () => {
    return(
        <div id="main-page">
            <HeaderBase/>
            <div id="main-window">

            </div>
        </div>
    )
}

export default MainPage