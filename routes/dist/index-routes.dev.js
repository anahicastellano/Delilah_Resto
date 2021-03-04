"use strict";

var user = require('../controllers/user');

var products = require('../controllers/products');

var orders = require('../controllers/orders');

var session = require('../controllers/session');

var _require = require("./authentication.js"),
    filterAdmin = _require.filterAdmin;

function routes(app) {
  app.get('/users', user.listAll, filterAdmin);
  app.get('/users/:id', user.get);
  app.post('/users', user.create);
  app.put('/users/:id', user.update);
  app["delete"]('/users/:id', user.remove, filterAdmin);
  app.post('/users/:id/favoritos', user.createFavorite);
  app["delete"]('/users/:id/favoritos', user.removeFavorites);
  app.get('/products', products.listAll);
  app.get('/products/:id', products.get);
  app.put('/products/:id', products.update, filterAdmin);
  app.post('/products', products.create, filterAdmin);
  app["delete"]('/products/:id', products.remove, filterAdmin);
  app.get('/orders', orders.listAll, filterAdmin);
  app.get('/orders/:id', orders.get);
  app.post('/orders', orders.create);
  app["delete"]('/orders/:id', orders.remove, filterAdmin);
  app.put('/orders/:id', orders.update, filterAdmin);
  app.post('/login', session.login);
}

module.exports = routes;