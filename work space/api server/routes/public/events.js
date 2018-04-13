const db_connection = require('../../config/db/db_config').connect();


module.exports = function (server) {
    
    server.get('/events', 
    function(req, res) {
        console.log("===== Public Route - Get All Events ===== ")
        let sql_get_school_data = `SELECT * FROM tb_lan_events`;
        all_events = true;
            
        db_connection.query(sql_get_school_data, function (err, data) {
            console.log("Data found on events:")
            console.log(data)
            if (err) {
                res.send({
                    data_error: true
                });
            }
            else {
                res.send({
                    data_error: false,
                    all_events: all_events,
                    school_data: data
                });
            }
        })
    });
}