const express = require('express');
const router = express.Router();
const pool = require('../db');
const { spawn } = require('child_process');
const path = require('path');

const sendReviewToTelegram = (review_data) => {
    try {
        const pythonScriptPath = path.join(__dirname, '../../BC-middleware/reviews.py');
        const dataToSend = `${review_data.user_id} оставил отзыв: ${review_data.review_text} Оценка: ${review_data.rating} звезд!`
        const pythonProcess = spawn('python', [pythonScriptPath]);

        pythonProcess.stdin.write(dataToSend, 'utf-8');
        pythonProcess.stdin.end();

        pythonProcess.stdout.on('data', data => {
            console.log(`stdout: ${data}`);
        }, 'utf-8');

        pythonProcess.stderr.on('data', (data) => {
            console.error(`stderr: ${data}`);
        });

        pythonProcess.on('close', (code) => {
            console.log(`child process exited with code ${code}`);
        });
    } catch (error) {
        console.error('Ошибка при выполнении отправки в Телеграм', error);
    }
}


router.post('/addReview', async (req, res) => {
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


/*pythonProcess.stdout.on('data', data => {
    console.log(`stdout: ${data}`);
});
pythonProcess.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
});
pythonProcess.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
});*/