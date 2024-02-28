import React, { useState } from 'react';
import "../../pages/reviews-page/Reviews.css"
import "../../pages/main-page/Main-page.css"

const SBlockReview = () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [selectBlock, setSelectedBlock] = useState(false);

    const handleMouseOver = (hoveredRating) => {
        if (!selectBlock)
            setRating(hoveredRating); // Обновляем состояние при наведении на звезду
    };

    const handleClick = (selectedRating) => {
        setRating(selectedRating);
        setSelectedBlock(true)
    };

    const handleReviewTextChange = (event) => {
        setReviewText(event.target.value);
    }

    const handleSubmit = () => {
        console.log("Rating: ", rating);
        console.log("Review: ", reviewText);
        setRating(0);
        setReviewText('');
        setSelectedBlock(false)
    }

    return (
        <div className='structure-block'>
            <div className="structure-block-review">
                <h1>Leave a Review</h1>
                <div id="rating">
                    <label className="structure-block-maintext">Rating:
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
                    </label>    
                </div>
                <div>
                    <label htmlFor="review" className="structure-block-maintext">Your Review:</label>
                    <textarea className="article-text-content" id="review" value={reviewText} onChange={handleReviewTextChange} />
                    <button className="article-button" onClick={handleSubmit}>Submit Review</button>
                </div>
            </div>
        </div>
    );
}

export default SBlockReview;