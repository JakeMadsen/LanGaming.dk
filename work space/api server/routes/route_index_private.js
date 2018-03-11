module.exports = (server) => {
    /* PRIVATE ROUTES */
    require("./private/admin")(server);
    require("./private/lend")(server);
    require("./private/events")(server);
    require("./private/forum")(server);
    require("./private/check")(server);
}