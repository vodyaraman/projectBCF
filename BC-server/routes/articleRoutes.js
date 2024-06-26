const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerStorage')
const pool = require('../db');

router.post('/addArticle', upload.single('file'), async (req, res) => {
    const { title, article, userid, file, isMain, sectionid } = req.body;
    console.log(sectionid)
    try {
        if (req.file) {
            let filename = req.file.filename;
            console.log('Uploaded file:', filename);
        } else {
            console.log('No file uploaded');
        }
        const result = await pool.query('INSERT INTO articles (title, article, userid, filename, ismain, section_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *', [title, article, userid, file, isMain, sectionid]);

        res.status(200).json({ success: true, article: result.rows[0] });
    } catch (error) {
        console.error('Ошибка при выполнении запроса', error);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});

router.get('/getArticles', async (req, res) => {
    try {
        const articles = await pool.query('SELECT * FROM articles ORDER BY time');
        res.json(articles.rows);
    } catch (error) {
        console.error('Ошибка при загрузке статей', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

router.delete('/deleteArticle/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
        await pool.query('DELETE FROM articles WHERE id = $1', [articleId]);
        res.status(200).json({ success: true, message: 'Статья успешно удалена' });
    } catch (error) {
        console.error('Ошибка при удалении статьи', error);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});

router.put('/updateArticle/:id', async (req, res) => {
    const articleId = req.params.id;
    const { title, content } = req.body;
    try {
        const result = await pool.query('UPDATE articles SET title = $1, article = $2 WHERE id = $3 RETURNING *', [title, content, articleId]);
        res.status(200).json({ success: true, article: result.rows[0] });
    } catch (error) {
        console.error('Ошибка при обновлении статьи', error);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});

router.get('/getSections', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM sections');
        res.json(result.rows);
    } catch (error) {
        console.error("Ошибка при загрузке разделов", error)
        res.status(500).json(message, "Внутренняя ошибка сервера")
    }
})

router.post('/getArticlesBySection', async (req, res) => {
    const {section_id} = req.body;
    try {
        const result = await pool.query('SELECT * FROM articles WHERE section_id=$1', [section_id]);
        res.json(result.rows)
    } catch (error) {
        console.error("Ошибка при загрузке статей", error)
        res.status(500).json(message, "Внутренняя ошибка сервера")
    }
})

module.exports = router;