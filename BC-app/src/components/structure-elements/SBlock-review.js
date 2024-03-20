import React, { useContext, useState } from 'react';
import "../../pages/reviews-page/Reviews.css"
import "../../pages/main-page/Main-page.css"
import DatabaseClient from "../../httpRequests"
import { AuthContext } from '../../contexts/UserContext';

const SBlockReview = () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [selectBlock, setSelectedBlock] = useState(false);
    const { user } = useContext(AuthContext)
    const dbClient = new DatabaseClient();

    const handleMouseOver = (hoveredRating) => {
        if (!selectBlock)
            setRating(hoveredRating);
    };

    const handleClick = (selectedRating) => {
        setRating(selectedRating);
        setSelectedBlock(true)
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    }

    const handleSubmit = async () => {
        try {
            await dbClient.addReview(rating, reviewText, user.accid);
            setRating(0);
            setReviewText('');
            setSelectedBlock(false);
        } catch (error) {
            console.error('Error adding review:', error);
        }
    }

    return (
        <div className='structure-block'>
            <div className="structure-block-review">
                <h1>Leave a Review</h1>
                <div id="rating">
                    <div>
                        {[...Array(5)].map((_, index) => {
                            const ratingValue = index + 1;
                            return (
                                <span
                                    className='rating-star'
                                    key={ratingValue}
                                    onMouseOver={() => handleMouseOver(ratingValue)}
                                    onClick={() => handleClick(ratingValue)}
                                    style={{
                                        color: ratingValue <= rating ? 'gold' : 'gray',
                                    }}
                                >
                                    ★
                                </span>
                            );
                        })}
                    </div>
                    <h2>Rate: {rating}/5</h2>
                </div>
                <div>
                    <label htmlFor="review" className="structure-block-maintext">Write ur review down below <br />
                        Don't forget to mention about: <br />
                        - website's design, <br />
                        - optimization, <br />
                        - user's comfortability <br />
                        - routes accesibility <br />
                        - what u love and what u hate in this concept
                    </label>
                    <textarea className="article-text-content" id="review" value={reviewText} onChange={handleReviewTextChange} />
                    <button className="article-button" onClick={handleSubmit}>Submit Review</button>
                </div>
            </div>
        </div>
    );
}

export default SBlockReview;