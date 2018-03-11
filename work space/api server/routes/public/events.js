const db_connection = require('../../config/db/db_config').connect();


module.exports = function (server) {
    
    server.get('/events', 
        function(req, res) {
            res.render('pages/events');
        }
    );
}
