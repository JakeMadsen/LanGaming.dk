let server_host = require('ip');

class Host {
    constructor(){
        this.ip_public = server_host.address();
        this.ip_localhost = "localhost";
        this.port_web = "80";
        this.port_api = "3201";
        this.fetch_api = 'http://' + this.ip_localhost + ':' + this.port_api;
    }
}

module.exports = Host