import React, { useState, useEffect } from 'react';
import "../../pages/main-page/Main-page.css"
import axios from 'axios';

const HOST = "192.168.43.134";
const PORT = 3001;

const SBlockReviewsList = () => {
    const [reviews, setReviews] = useState([])
    const getAllReviews = async () => {
        try {
            const response = await fetch(`http://${HOST}:${PORT}/reviews/getReviews`)
            setReviews(await response.json());
        } catch (error) {
            console.log("Ошибка при получении отзывов", error)
        }
    }
    useEffect(() => {
        getAllReviews();
    }, []);
    return (
        <div className='structure-block'>
            {reviews.map((review, index) => (
                <div className='micro-block' key={index} name={index}>
                    <div className='article-text-title review'> {review.login} : 
                    {[...Array(5)].map((_, index) => {
                        const ratingValue = index + 1;
                        return (
                            <span
                                className='rating-star review'
                                key={ratingValue}
                                style={{
                                    color: ratingValue <= review.rating ? 'gold' : 'gray',
                                }}
                            >
                                ★
                            </span>
                        );
                    })}</div>
                    <div className='structure-block-maintext'>
                        {review.review_text}
                    </div>
                </div>
            ))}
        </div>
    );
}

export default SBlockReviewsList