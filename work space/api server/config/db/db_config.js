const db_connection = require('mysql2')

module.exports = {
    "connect_local": () => {
        return db_connection.createConnection({
            host : 'localhost',
            user : 'root',
            password : '',
            database : "db_langaming"
        })
    },
    "connect" : () => {
        return db_connection.createConnection({
            host : 'web-eu-1.serenityservers.net',
            user : 'iceshiel_langame',
            password : 'langaming1',
            database : "iceshiel_langaming"
        })
    }
}
