module.exports = (server) => {
    /* PUBLIC ROUTES */
    require("./public_routes/home")(server);
    require("./public_routes/events")(server);
    require("./public_routes/schools")(server)
    

    /* ADMIN CPANEL ROUTES */
    require("./admin_routes/admin")(server);
    require("./admin_routes/lend")(server);
    require("./admin_routes/events")(server);
    require("./admin_routes/forum")(server);
    require("./admin_routes/check")(server);
}