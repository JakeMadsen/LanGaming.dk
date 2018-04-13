const db_connection = require('../../config/sql').connect();
const moment = require('moment');

module.exports = function (server) {
    
    server.get('/cPanel/checkIn', function(req, res) {
        let currentDate = moment().format('YYYY-MM-DD', 'dk')
        let success = false;
        let currentLan;
        let sql_get_lend = `SELECT * FROM tb_lan_events`;
        db_connection.query(sql_get_lend, function (err, data) {
            console.log("===== Check In - Get current lan event =====")
            data.forEach(element => {
                let lanDate = JSON.stringify(element.event_dateStart).slice(1,11);
                console.log("Event Day - " + lanDate)
                console.log("Current Day - " + currentDate)

                if(lanDate == currentDate){
                    success = true;
                    currentLan = element;
                }
            });

            console.log("Current Lan Data:")
            console.log(currentLan)

            if(err){
                console.log(err)
                res.render('pages/cPanel/pages_admin/checkIn')
            }else if(success == true){
                res.render('pages/cPanel/pages_admin/checkIn', {
                    lan_info: currentLan,
                    lan_date: currentDate
                });
            }else {
                res.render('pages/cPanel/pages_admin/checkIn', {
                    lan_info: "Der er intet nuværende lan",
                    lan_date: ""
                });            }
        })        
    });

    server.post('/json/checkIn/new', function(req, res){
        console.log("===== Route - Check In New ===== ")

        let check_name      =  req.body.check_name,
            check_phone     =  req.body.check_phone,
            check_cpr       =  req.body.check_cpr,
            check_message   =  req.body.check_message,
            check_email     =  req.body.check_email,
            check_elevPlan  =  req.body.check_elevPlan,
            check_eventId   =  req.body.check_eventId;

        let sql_check_in = `INSERT INTO tb_student_check 
                            SET 
                                student_check_fullName      = '${check_name}', 
                                student_check_phone         = '${check_phone}', 
                                student_check_cpr           = '${check_cpr}', 
                                student_check_message       = '${check_message}', 
                                student_check_email         = '${check_email}', 
                                student_check_elevPlanName  = '${check_elevPlan}', 
                                fk_check_lan_event          = '${check_eventId}'
                            `;

        db_connection.query(sql_check_in, function (err, data) {
            if (err) {
                console.log("Error was encountered:")
                console.log(err);
                res.json(400, err.message = 'validering fejlede' );
            }
            else {
                console.log("Check In Information was added:")
                console.log(sql_check_in)
                res.json(200, sql_check_in);
            }
        })

    });

    server.get('/cPanel/checkShow', function(req, res) {
        res.render('pages/cPanel/pages_admin/checkShow')

        db_connection.query(sql_get_lend, function (err, data) {
            data.forEach(element => {
                var timestamp = element.lend_out_time;
                var fixed = moment(timestamp).format('HH:mm DD-MM-YYYY', 'dk')
                element.lend_out_time = fixed
            });

            if(err){
            }else {
                res.render('pages/cPanel/pages_admin/checkShow', {
                    lend_out: data
                });
            }
        })        
    });
}