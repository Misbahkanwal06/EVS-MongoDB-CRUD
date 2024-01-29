
const mongoose = require("./dbs");

const mainRoutes = require('./mainRoutes');

const fastify = require("fastify")
    ({
        logger: true
    });

fastify.register(mainRoutes, { prefix: "/api/v1" });


fastify.listen({ port: 3002 }, function (err, address) {
    if (err) {
        fastify.log.error(err)
        process.exit(1)
    }

})