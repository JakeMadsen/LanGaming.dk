const db_connection = require('../config/sql').connect();
const moment = require('moment');

module.exports = function (server) {
    
    server.get('/cPanel/kabler', function(req, res) {
        let sql_get_lend = `SELECT lend_out_id, lend_out_student_name, lend_out_time, lend_out_option_name
                                FROM
                                (   tb_lend_out INNER JOIN tb_lend_out_options 
                                     ON fk_lend_out_options = lend_out_option_id )
                                ORDER BY
                                    lend_out_student_name`;
        db_connection.query(sql_get_lend, function (err, data) {
            data.forEach(element => {
                var timestamp = element.lend_out_time;
                var fixed = moment(timestamp).format('HH:mm DD-MM-YYYY', 'dk')
                element.lend_out_time = fixed
            });

            if(err){
                res.render('pages/cPanel/pages_admin/cables')
            }else {
                res.render('pages/cPanel/pages_admin/cables', {
                    lend_out: data
                });
            }
        })        
    });

    server.get('/json/cable/types',function(req, res) {
        console.log("===== Route - Cable Types ===== ")

        let sql_get_cables = `SELECT * FROM tb_lend_out_options`;
        db_connection.query(sql_get_cables, function (err, data) {
            if (err){ 
                console.log("Error was encountered:")

                console.log(err) 
            }else {
                console.log("Lend Types was delivered.")
                res.send(data);
            }
        })
    });

    server.post('/json/cable/lend', (req, res, next) => { 
        console.log("===== Route - Cable Lend ===== ")

        let cable_id = req.body.cable,
            student_name = req.body.student

        let sql_lend = `INSERT INTO tb_lend_out 
                            SET 
                                lend_out_student_name = '${student_name}', 
                                fk_lend_out_options = '${cable_id}'

                            `;

        db_connection.query(sql_lend, function (err, data) {
            if (err) {
                console.log("Error was encountered:")
                console.log(err);
                res.json(400, err.message = 'validering fejlede' );
            }
            else {
                console.log("Lend Out Information was added:")
                console.log(sql_lend)
                res.json(200, sql_lend);
            }
        })

    });

    server.get('/json/cable/lend/out',function(req, res) {
        console.log("===== Route - Cable Lend Out ===== ")

        let sql_get_lend = `SELECT lend_out_id, lend_out_student_name, lend_out_time, lend_out_option_name
                                FROM
                                    (   tb_lend_out INNER JOIN tb_lend_out_options 
                                        ON fk_lend_out_options = lend_out_option_id )`;
        db_connection.query(sql_get_lend, function (err, data) {
            if (err){ 
                console.log("Error was encountered:")
                console.log(err) 
            }else {
                console.log("Lend Out Information was delivered.")
                res.send(data);
            }
        })
    });

    server.post('/json/cable/lend/delete',function(req, res) {
        console.log("===== Route - Cable Lend Delete ===== ")

        let lend_id = req.body.lend_id;

        console.log("Lend ID to be deleted - " + lend_id)

        let sql_delete_lend = `DELETE FROM tb_lend_out WHERE lend_out_id = ${lend_id}`;
        db_connection.query(sql_delete_lend, function (err, data) {
            if (err){ 
                console.log("Error was encountered:")

                console.log(err) 
            }else {
                console.log("Lend ID - " + lend_id + " Was deleted.")
                res.send(data);
            }
        })
    });

}