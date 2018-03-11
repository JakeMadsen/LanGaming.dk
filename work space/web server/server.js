/* Requires all needed node_modules for the WEB server. */
const   express     = require('express'),
        path        = require('path'),
        server      = express(),
        bodyParser  = require("body-parser"),
        ip          = require('ip');

/* Usefull variables for the WEB server. */
var server_ip   = ip.address(),
    server_port = 3000,
    server_name = "langaming.dk - WEB server";


/* Setting up WEB server functionality. */
server.set(
    'view engine', 
    'ejs')
server.set('views', path.join(__dirname, '/public/views'));

server.use(express.static('public'));
server.use('/static/', express.static('public'));
server.use(express.static(path.join(__dirname + 'public')));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

/* Requires all private and public WEB routes. */
require('./routes/route_index_public')(server);
require('./routes/route_index_private')(server);


/* Executes listening function for WEB server. */
server.listen(server_port, function () {
    console.log('======== SERVER - RUNNING ========' +  '\n' + 
                'Server name: ' + server_name        +  '\n' + 
                'Server listening at: ' + 'http://'+server_ip+':'+server_port);
});