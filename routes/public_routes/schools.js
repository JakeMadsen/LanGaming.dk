const db_connection = require('../../config/sql').connect();
const moment = require('moment');

module.exports = function (server) {
    
    server.get('/skoler', 
        function(req, res) {
            res.render('pages/skoler');
        }
    );

    server.get('/skoler/:school_name', 
        function(req, res) {
            console.log("TEST: " +  req.params.school_name)
            res.render('pages/skoler');



            console.log("===== Public Route - Get School ===== ")

            let school_name = req.params.school_name;
    
            let sql_get_school_data = `SELECT * FROM tb_schools WHERE school_urlName = '${school_name}'`;
                
            db_connection.query(sql_get_school_data, function (err, data) {
                if (err) {
                    console.log("Error was encountered:")
                    console.log(err);
                    res.json(400, err.message = 'validering fejlede' );
                }
                else {
                    // console.log("Lend out - " + lend_type_id + " Was edited.")
                    console.log(data)
                    res.json(200, data);
                }
            })

        }
    );
}
