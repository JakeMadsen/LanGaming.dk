const   express     = require('express'),
        path        = require('path')
        server      = express(),
        bodyParser  = require("body-parser"),
        ip          = require('ip'),
        cors        = require('cors')

var url = ip.address(),
    port = 3200,
    name = "ltu_lan";
server.use(cors())

server.set(
    'view engine', 
    'ejs')
server.set('views', path.join(__dirname, '/public_html/views'));

server.use(express.static('public_html'));
server.use('/static/', express.static('public_html'));
server.use(express.static(path.join(__dirname + 'public_html')));

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

require('./routes/index')(server);



server.listen(port, function () {
    console.log('Server listening at: ' + url+':'+port, '\n' + 'Server name: ' + name);
});