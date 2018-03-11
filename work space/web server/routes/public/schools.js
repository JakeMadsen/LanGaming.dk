const   moment = require('moment'),
        fetch = require('node-fetch'),
        host_settings = require('../../helpers/tools/oop_host')
var host = new host_settings;
var all_schools; 

module.exports = function (server) {
    server.get('/skoler', 
    function(req, res) {
        console.log("===== Public Route - Get All Schools ===== ")
        console.log("School to find: " +  req.params.school_name)
            
        let school_name = req.params.school_name;

        fetch(host.fetch_api + '/skoler')
        .then(function (data) {
            return data.json()
        })
        .then(function(school){
            if (school.data_error == true) {
                console.log("Something went wrong.")
                res.render('public assets/pages/skoler', {
                    error: true
                });
            }
            else if (school.data_error == false){
                console.log("Data found on school:")
                res.render('public assets/pages/skoler', {
                    all_schools: school.all_schools,
                    school_data: school.school_data
                });
            }
        })
        }
    );

    server.get('/skoler/:school_name', 
        function(req, res) {
            console.log("===== Public Route - Get School ===== ")
            console.log("School to find: " +  req.params.school_name)
            
            let school_name = req.params.school_name;

            fetch(host.fetch_api + '/skoler/' + school_name)
            .then(function (data) {
                return data.json()
            })
            .then(function(school){

                if (school.data_error == true) {
                    console.log("Something went wrong.")
                    res.render('public assets/pages/skoler', {
                        error: true
                    });
                }
                else if (school.data_error == false){
                    console.log("Data found on schools:")
                    res.render('public assets/pages/skoler', {
                        all_schools: school.all_schools,
                        school_data: school.school_data
                    });
                }
            })
        }
    );
}
