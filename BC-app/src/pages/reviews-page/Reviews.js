import React, { useState } from 'react';
import "../../components/background/dark-theme-bg/night-bg.css";
import "../../components/background/light-theme-bg/day-bg.css";
import "../../components/header/header.css";
import "../../components/header/bot-header.css";
import "./Reviews.css";
import "../main-page/Main-page.css"
import Header from "../../components/header/Header.js";
import SBlockReview from "../../components/structure-elements/SBlock-review.js"
import Footer from "../../components/footer/Footer.js";
import SBlockToggle from '../../components/structure-elements/SBlock-toggle.js';
import SBlockReviewsList from '../../components/structure-elements/SBlock-reviewslist.js';

const ReviewsPage = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleSwitchClick = () => {
        setIsOpen(!isOpen)
    }
    return (
        <div id="reviews-page">
            <div id="page-scrollbar-container">
                <Header />
                <div className='block'>
                    <div className='review-switcher'>
                        <SBlockToggle width="80%" height="50px" onClick={handleSwitchClick} labelLeft="Your review" labelRight="Other reviews" />
                    </div>
                </div>
                <div className='block'>
                    {!isOpen ? (
                        <SBlockReview />
                    ) : (<SBlockReviewsList/>)}
                </div>
                <Footer />
            </div>
        </div>
    )
};

export default ReviewsPage;