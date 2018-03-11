module.exports = function (server) {
    
    server.get('/events', 
        function(req, res) {
            res.render('public assets/pages/events');
        }
    );
}
