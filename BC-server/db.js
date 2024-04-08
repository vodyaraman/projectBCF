const { Pool } = require("pg");

const pool = new Pool ({
    user: 'postgres',
    host: 'bc-database',
    database: 'projectBC-pgdb',
    password: '123',
    port: 5432,
});

module.exports = pool