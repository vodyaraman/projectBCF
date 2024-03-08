const express = require('express');
const router = express.Router();
const pool = require('../db');

router.post('/submitData', async (req, res) => {
    const { code } = req.body;
    try {
        const result = await pool.query('SELECT * FROM accounts WHERE code = $1', [code]);

        if (result.rows.length > 0) {
            const user = result.rows[0];
            res.status(200).json({ exists: true, user });
        } else {
            console.log(code)
            res.status(200).json({ exists: false, message: 'Код не найден в базе данных' });
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

router.post('/getUserByID', async (req, res) => {
    const { userid } = req.body;
    try {
        const result = await pool.query('SELECT login FROM accounts WHERE accounts.accID = $1', [userid]);

        if (result.rows.length > 0) {
            const login = result.rows[0].login;
            res.status(200).json({ success: true, login });
        } else {
            res.status(404).json({ success: false, message: 'Пользователь с указанным ID не найден' });
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса', error);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});

router.post('/addUser', async (req, res) => {
    const { rating, review_text, user_id } = req.body;
    try {
        const result = await pool.query('INSERT INTO reviews (rating, review_text, user_id) VALUES ($1, $2, $3) RETURNING *', [rating, review_text, user_id]);
        const review_data = result.rows[0];

        // Вызов функции для отправки отзыва в телеграм
        sendReviewToTelegram(review_data);

        res.status(200).json({ success: true, review: result.rows[0] });
    }
    catch (error) {
        console.error('Ошибка при выполнении запроса', error);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});
module.exports = router;