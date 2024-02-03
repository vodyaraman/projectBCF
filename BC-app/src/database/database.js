const {DB} = require('pg')

const db = new DB({
    user: "postgres",
    host: "localhost",
    database: "projectBC-pgdb",
    password: "123",
    port: 6666,
})

module.exports = db
