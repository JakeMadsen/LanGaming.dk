/* Requires all needed node_modules for the API server. */
const   express     = require('express'),
        path        = require('path'),
        server      = express(),
        bodyParser  = require("body-parser"),
        ip          = require('ip');


/* Usefull variables for the API server. */
var server_ip   = ip.address(),
    server_port = 3001,
    server_name = "langaming.dk - API server";


/* Setting up API server functionality. */
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());


/* Requires all private and public API routes. */
require('./routes/route_index_public')(server);
require('./routes/route_index_private')(server);


/* Executes listening function for API server. */
server.listen(server_port, function () {
    console.log('======== SERVER - RUNNING ========' +  '\n' + 
                'Server name: ' + server_name        +  '\n' + 
                'Server listening at: ' + 'http://'+server_ip+':'+server_port);
});