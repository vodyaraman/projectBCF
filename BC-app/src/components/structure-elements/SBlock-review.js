import React, { useState } from 'react';
import "../../pages/reviews-page/Reviews.css"
import "../../pages/main-page/Main-page.css"
import axios from 'axios';

const HOST = "192.168.43.134";
const PORT = 3001;


const SBlockReview = () => {
    const [rating, setRating] = useState(0);
    const [reviewText, setReviewText] = useState('');
    const [selectBlock, setSelectedBlock] = useState(false);

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
            const response = await axios.post(`http://${HOST}:${PORT}/reviews/addReview`, {
                rating: rating,
                review_text: reviewText,
                user_id: 1
            });
            console.log('Review added successfully:', response.data);
            setRating(0);
            setReviewText('');
            setSelectedBlock(false)
        }
        catch (error) {
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
                    <label htmlFor="review" className="structure-block-maintext">Your Review:</label>
                    <textarea className="article-text-content" id="review" value={reviewText} onChange={handleReviewTextChange} />
                    <button className="article-button" onClick={handleSubmit}>Submit Review</button>
                </div>
            </div>
        </div>
    );
}

export default SBlockReview;