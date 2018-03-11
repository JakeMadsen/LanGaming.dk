const db_connection = require('../../config/sql').connect();
const moment = require('moment');
var all_schools;

module.exports = function (server) {
    
    server.get('/skoler', 
    function(req, res) {
        console.log("===== Public Route - Get All School ===== ")
        let sql_get_school_data = `SELECT * FROM tb_schools`;
        all_schools = true;
            
        db_connection.query(sql_get_school_data, function (err, data) {
            console.log("Data found on schools:")
            console.log(data)
            if (err) {
                res.render('pages/skoler', {
                    error: 'database call failed'
                });
            }
            else {
                res.render('pages/skoler', {
                    all_schools: all_schools,
                    school_data: data
                });
            }
        })
        }
    );

    server.get('/skoler/:school_name', 
        function(req, res) {
            console.log("===== Public Route - Get School ===== ")
            all_schools = false;
            console.log("Scool to find: " +  req.params.school_name)

            let school_name = req.params.school_name;
    
            let sql_get_school_data = `SELECT * FROM tb_schools WHERE school_urlName = '${school_name}'`;
                
            db_connection.query(sql_get_school_data, function (err, data) {
                console.log("Data found on school:")
                console.log(data)
                if (err) {
                    res.render('pages/skoler', {
                        error: 'validering fejlede'
                    });
                }
                else {
                    res.render('pages/skoler', {
                        all_schools: all_schools,
                        school_data: data
                    });
                }
            })

        }
    );
}
