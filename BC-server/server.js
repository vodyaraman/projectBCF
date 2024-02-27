const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const path = require('path');
const { Pool } = require('pg');
const { Server } = require('http');

const app = express();
const port = 3001;

// Подключение к PostgreSQL
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'projectBC-pgdb',
    password: '123',
    port: 6666,
});

app.use(cors());
app.use(bodyParser.json());

// Настройка multer для обработки загрузки файлов
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'images')); // Путь к папке images относительно текущей директории (где находится server.js)
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    }
});

const upload = multer({ storage: storage });

// Маршрут для загрузки файла
app.post('/uploadFile', upload.single('file'), (req, res) => {
    if (!req.file) {
        console.log('No file uploaded');
        res.status(400).json({ success: false, message: 'No file uploaded' });
        return;
    }
    console.log("Uploaded file:", req.file.filename);
    res.status(200).json({ success: true, filename: req.file.filename });
});

// Обработчик добавления статьи с загруженным файлом
app.post('/addArticle', upload.single('file'), async (req, res) => {
    const { title, article, userid, file } = req.body;
    try {
        // Проверяем, был ли загружен файл
        if (req.file) {
            // Получаем имя файла из запроса
            let filename = req.file.filename;
            console.log('Uploaded file:', filename);
        } else {
            console.log('No file uploaded');
        }

        // Вставляем статью в базу данных с именем файла, если он был загружен
        // Или без указания файла, если его нет
        const result = await pool.query('INSERT INTO articles (title, article, userid, filename) VALUES ($1, $2, $3, $4) RETURNING *', [title, article, userid, file]);

        res.status(200).json({ success: true, article: result.rows[0] });
    } catch (error) {
        console.error('Ошибка при выполнении запроса', error);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});

app.post('/submitData', async (req, res) => {
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
app.post('/getUserByID', async (req, res) => {
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
app.get('/getArticles', async (req, res) => {
    try {
        const articles = await pool.query('SELECT * FROM articles ORDER BY time');
        res.json(articles.rows);
    } catch (error) {
        console.error('Ошибка при загрузке статей', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});
app.get('/images/:filename', (req, res) => {
    const { filename } = req.params;
    const filePath = path.join(__dirname, 'images', filename);
    res.sendFile(filePath);
});
// Обработчик обновления статьи
app.put('/updateArticle/:id', async (req, res) => {
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

// Обработчик удаления статьи
app.delete('/deleteArticle/:id', async (req, res) => {
    const articleId = req.params.id;
    try {
        await pool.query('DELETE FROM articles WHERE id = $1', [articleId]);
        res.status(200).json({ success: true, message: 'Статья успешно удалена' });
    } catch (error) {
        console.error('Ошибка при удалении статьи', error);
        res.status(500).json({ success: false, message: 'Внутренняя ошибка сервера' });
    }
});
const server = app.listen(port, `192.168.43.134`, () => {
    const host = server.address().address;
    console.log(`Сервер запущен на порту ${port} на хосте ${host}`);
});