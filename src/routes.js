const express = require('express');
const PostController = require('./controllers/PostController');
const TokenController = require('./controllers/TokenController');
const UserController = require('./controllers/UserController');

const routes = new express.Router();

routes.get('/', PostController.markers );
routes.post('/posts', PostController.store);
routes.put('/posts', PostController.alter);
routes.delete('/posts', PostController.remove);


routes.get('/posts', PostController.index );

routes.post('/newProd', TokenController.store);
routes.post('/token', TokenController.validation);

routes.post('/history', UserController.history);
routes.post('/newReg', UserController.newRegister);
routes.post('/newIns', UserController.newInsert);

module.exports = routes;