module.exports = (server) => {
    /* PUBLIC ROUTES */
    require("./home")(server);
    require("./public_routes/schools")(server)
    

    /* ADMIN CPANEL ROUTES */
    require("./admin")(server);
    require("./lend")(server);
    require("./events")(server);
    require("./forum")(server);
    require("./check")(server);
}