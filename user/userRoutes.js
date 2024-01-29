

const  userController = require('./userController');
const userRoutes = ( fastify, options, done )=>{
      fastify.post('/create',userController.userCreate);
      fastify.get('/view-all', userController.viewAll);
      fastify.get('/view/:id', userController.userView);
      fastify.post('/update/:id', userController.userUpdate);
      fastify.delete('/delete/:id', userController.userDelete);
      fastify.post('/login',userController.userlogin);
      fastify.get('/verify', userController.tokenVerification);
       done();
}

module.exports = userRoutes;



