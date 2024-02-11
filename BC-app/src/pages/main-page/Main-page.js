import React, { useState, useEffect } from 'react';
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
import SBlockWrite from '../../components/structure-elements/SBlock-write.js';

const MainPage = () => {
    const [articles, setArticles] = useState([]);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await fetch('http://localhost:3001/getArticles');
                const data = await response.json();
                setArticles(data);
            } catch (error) {
                console.error('Ошибка при загрузке статей', error);
            }
        };

        fetchArticles();
    }, []);

    return (
        <div id="main-page">
            <AnimatedBackground />
            <div id="page-scrollbar-container">
                <SBlockHeader />
                {articles.map((article, index) => (
                    <div className='block' key={index}>
                        <SBlock article={article} />
                    </div>
                ))}
                <div className='block'>
                    <SBlockWrite />
                </div>
                <Header />
                <Footer />
            </div>
        </div>
    );
}

export default MainPage;