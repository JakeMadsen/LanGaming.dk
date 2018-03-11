module.exports = function (server) {
    
    server.get('/cPanel/', 
        function(req, res) {
            res.render('admin assets/pages/index');
        }
    );
}
