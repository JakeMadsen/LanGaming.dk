const db_connection = require('../../config/sql').connect();
const moment = require('moment');

module.exports = function (server) {
    
    server.get('/cPanel/events', function(req, res) {
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
                res.render('pages/cPanel/pages_admin/events')
            }else {
                res.render('pages/cPanel/pages_admin/events', {
                    lend_out: data
                });
            }
        })        
    });
}