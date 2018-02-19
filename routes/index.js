module.exports = (server) => {
    /* PUBLIC ROUTES */
    require("./home")(server);
    

    /* ADMIN CPANEL ROUTES */
    require("./admin")(server);
    require("./cables")(server);
    require("./events")(server);
    require("./forum")(server);
    require("./check")(server);
}