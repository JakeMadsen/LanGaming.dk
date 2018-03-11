const   moment = require('moment'),
        fetch = require('node-fetch'),
        host_settings = require('../../helpers/tools/oop_host')
var host = new host_settings;

module.exports = function (server) {
    
    server.get('/cPanel/lend', function(req, res) {
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
                res.render('pages/cPanel/pages_admin/lend')
            }else {
                res.render('pages/cPanel/pages_admin/lend', {
                    lend_out: data
                });
            }
        })        
    });

    server.get('/json/lend/type/all',function(req, res) {
        console.log("===== Route - Get all - Lend Types ===== ")

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

    server.post('/json/lend/type/new',function(req, res) {
        console.log("===== Route - Post New - Lend Type ===== ")

        let new_lend_type_name = req.body.new_lend_name;

        let sql_new_lend_type = `INSERT INTO tb_lend_out_options
                                    SET lend_out_option_name = '${new_lend_type_name}'`;

        console.log(new_lend_type_name)
        
        db_connection.query(sql_new_lend_type, function (err, data) {
            if (err) {
                console.log("Error was encountered:")
                console.log(err);
                res.json(400, err.message = 'validering fejlede' );
            }
            else {
                console.log("Lend Out Information was added:")
                console.log(data)
                res.json(200, data);
            }
        })
    });

    server.put('/json/lend/type/edit',function(req, res) {
        console.log("===== Route - Put Edit - Lend Type ===== ")

        let lend_type_id        = req.body.lend_type_id,
            new_lend_type_name  = req.body.new_lend_name;

        let sql_edit_lend_type = `UPDATE tb_lend_out_options
                                    SET lend_out_option_name = '${new_lend_type_name}'
                                    WHERE lend_out_option_id = '${lend_type_id}'`;

        console.log(lend_type_id, new_lend_type_name)
        
        db_connection.query(sql_edit_lend_type, function (err, data) {
            if (err) {
                console.log("Error was encountered:")
                console.log(err);
                res.json(400, err.message = 'validering fejlede' );
            }
            else {
                console.log("Lend out - " + lend_type_id + " Was edited.")
                console.log(data)
                res.json(200, data);
            }
        })
    });

    server.post('/json/lend/type/delete',function(req, res) {
        console.log("===== Route - Delete Lend Type===== ")

        let lend_type_id = req.body.lend_type_id;

        console.log("Lend type ID to be deleted - " + lend_type_id)

        let sql_delete_lend_type = `DELETE FROM tb_lend_out_options WHERE lend_out_option_id = ${lend_type_id}`;
        db_connection.query(sql_delete_lend_type, function (err, data) {
            if (err){ 
                console.log("Error was encountered:")

                console.log(err) 
            }else {
                console.log("Lend type ID - " + lend_type_id + " Was deleted.")
                res.send(data);
            }
        })
    });

    server.post('/json/lend/new', (req, res, next) => { 
        console.log("===== Route - Post New Lend ===== ")

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

    server.get('/json/lend/get',function(req, res) {
        console.log("===== Route - Get All - Lends ===== ")

        let sql_get_lend = `SELECT lend_out_id, lend_out_student_name, lend_out_time, lend_out_option_name, fk_lend_out_options
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

    server.post('/json/lend/delete',function(req, res) {
        console.log("===== Route - Delete Lend ===== ")

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