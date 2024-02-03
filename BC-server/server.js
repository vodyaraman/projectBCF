const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { Pool } = require('pg');

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

app.post('/submitData', async (req, res) => {
    const {code} = req.body;
    try {
        const result = await pool.query('SELECT * FROM accounts WHERE code = $1', [code]);
        
        if (result.rows.length > 0) {
            const user = result.rows[0];
            res.status(200).json({ exists: true, user });
        } else {
            console.log(code)
            res.status(200).json({ exists: false, message: 'Код не найден в базе данных'});
        }
    } catch (error) {
        console.error('Ошибка при выполнении запроса', error);
        res.status(500).json({ message: 'Внутренняя ошибка сервера' });
    }
});

app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});