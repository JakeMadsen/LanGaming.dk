module.exports = function (server) {
    
    server.get('/cPanel/', 
        function(req, res) {
            res.render('pages/cPanel/pages_admin/index');
        }
    );
}
