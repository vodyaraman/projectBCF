import React from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import "../../components/header/bot-header.css";
import "./Reviews.css";
import Header from "../../components/header/Header.js";
import AnimatedBackground from '../../components/background/AnimatedBackground';
import SBlockReview from "../../components/structure-elements/SBlock-review.js"
import Footer from "../../components/footer/Footer.js";

const ReviewsPage = () => {
    return (
        <div id="reviews-page">
            <AnimatedBackground />
            <div id="page-scrollbar-container">
                <Header />
                <div className='block'>
                    <SBlockReview />
                </div>
                <Footer />
            </div>
        </div>
    )
};

export default ReviewsPage;