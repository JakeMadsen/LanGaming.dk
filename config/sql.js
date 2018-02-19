const db_connection = require('mysql2')

module.exports = {
    "connect": () => {
        return db_connection.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : "db_langaming"
        })
    }
}
