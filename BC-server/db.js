const { Pool } = require("pg");

const pool = new Pool ({
    user: 'postgres',
    host: 'localhost',
    database: 'projectBC-pgdb',
    password: '123',
    port: 6666,
});

module.exports = pool