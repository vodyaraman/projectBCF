const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/addReview', async (req, res) => {
    const { rating, review_text, user_id } = req.body;
    try {
        const result = await pool.query('INSERT INTO reviews (rating, review_text, user_id) VALUES ($1, $2, $3) RETURNING *', [rating, review_text, user_id]);
        res.status(200).json({ success: true, review: result.rows[0] });
    } catch (error) {
        console.error('Ошибка при выполнении запроса', error);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});

router.get('/getReviews', async (req, res) => {
    try {
        const reviews = await pool.query('SELECT * FROM reviews');
        res.json(reviews.rows);
    } catch (error) {
        console.error('Ошибка при загрузке отзывов', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

router.delete('/deleteReview/:id', async (req, res) => {
    const reviewId = req.params.id;
    try {
        await pool.query('DELETE FROM reviews WHERE id = $1', [reviewId]);
        res.status(200).json({ success: true, message: 'Отзыв успешно удален' });
    } catch (error) {
        console.error('Ошибка при удалении отзыва', error);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});

router.put('/updateReview/:id', async (req, res) => {
    const reviewId = req.params.id;
    const { rating, review_text } = req.body;
    try {
        const result = await pool.query('UPDATE reviews SET rating = $1, review_text = $2 WHERE id = $3 RETURNING *', [rating, review_text, reviewId]);
        res.status(200).json({ success: true, review: result.rows[0] });
    } catch (error) {
        console.error('Ошибка при обновлении отзыва', error);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});

module.exports = router;