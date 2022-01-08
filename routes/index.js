const express = require('express');

const productRouter = require('./products.router');
const usersRouter = require('./users.router');
// const categoriesRouter = require('./categories.router');

function routerApi(app) {
  const router = express.Router();
  app.use('/api/v1',router);
  router.use('/products',productRouter);
  router.use('/users',usersRouter);
  // app.use('/api/v1/categories',categoriesRouter);
}

module.exports = routerApi;
