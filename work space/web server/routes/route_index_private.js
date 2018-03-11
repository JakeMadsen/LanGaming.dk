module.exports = (server) => {
    /* PRIVATE ROUTES */
    require("./private/index")(server); /* Index page for /Cpanel/ */
    require("./private/lend")(server);
    require("./private/events")(server);
    require("./private/forum")(server);
    require("./private/check")(server);
}