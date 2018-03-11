module.exports = (server) => {
    /* PUBLIC ROUTES */

    require("./public/index")(server);
    require("./public/events")(server);
    require("./public/schools")(server);
}