

const userRoutes = require('./user/userRoutes');

const mainRoutes = (fastify,options,done)=>{
   fastify.register( userRoutes , {prefix: "/user"});
done();
}

module.exports = mainRoutes;

