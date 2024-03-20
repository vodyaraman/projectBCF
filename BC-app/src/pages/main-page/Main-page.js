import React, { useState, useEffect } from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import "../../components/header/bot-header.css";
import "./Main-page.css";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import SBlock from "../../components/structure-elements/SBlock-main.js";
import SBlockHeader from "../../components/structure-elements/SBlock-header.js";
import SBlockWrite from '../../components/structure-elements/SBlock-write.js';
import SBlockLift from '../../components/structure-elements/SBlock-lift.js';

const HOST = "192.168.43.134";
const PORT = 3001;

const MainPage = () => {
    const [articles, setArticles] = useState([]);

    const fetchArticles = async () => {
        try {
            const response = await fetch(`http://${HOST}:${PORT}/articles/getArticles`);
            const data = await response.json();
            setArticles(data);
        } catch (error) {
            console.error('Ошибка при загрузке статей', error);
        }
    };
    
    useEffect(() => {
        fetchArticles();
    }, []);

    return (
        <div id="main-page">
            <div id="page-scrollbar-container">
                <Header />
                <SBlockHeader />
                {articles.map((article, index) => (
                    <div className='block' key={index} name={article.title}>
                        <SBlock article={article} fetchArticles={fetchArticles} />
                    </div>
                ))}
                <div className='block'>
                    <SBlockWrite fetchArticles={fetchArticles} />
                </div>
                <SBlockLift />
                <Footer />
            </div>
        </div>
    );
}

export default MainPage;