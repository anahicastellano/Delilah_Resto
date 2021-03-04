"use strict";

var _require = require("sequelize"),
    QueryTypes = _require.QueryTypes;

var _require2 = require("../db"),
    db = _require2.db,
    getResourceById = _require2.getResourceById,
    getAllResources = _require2.getAllResources,
    deleteResoueceById = _require2.deleteResoueceById,
    cleanTable = _require2.cleanTable;

var _require3 = require("../models/products"),
    insertProducts = _require3.insertProducts,
    updateAProduct = _require3.updateAProduct;

function clean() {
  return regeneratorRuntime.async(function clean$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cleanTable('products');

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

;

function findProductById(id) {
  return regeneratorRuntime.async(function findProductById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getResourceById('products', id));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function deleteProductById(id) {
  return regeneratorRuntime.async(function deleteProductById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(deleteResoueceById('products', id));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function listAll(req, res) {
  var products;
  return regeneratorRuntime.async(function listAll$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(getAllResources('products'));

        case 2:
          products = _context4.sent;
          res.json({
            products: products
          }).status(200);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function get(req, res) {
  return regeneratorRuntime.async(function get$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          _context5.t0 = res;
          _context5.next = 4;
          return regeneratorRuntime.awrap(findProductById(Number(req.params.id)));

        case 4:
          _context5.t1 = _context5.sent;

          _context5.t0.json.call(_context5.t0, _context5.t1).status(200);

          _context5.next = 11;
          break;

        case 8:
          _context5.prev = 8;
          _context5.t2 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t2.message
          });

        case 11:
          ;

        case 12:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 8]]);
}

function create(req, res) {
  var products;
  return regeneratorRuntime.async(function create$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          products = {
            name: req.body.name,
            price: req.body.price
          };
          _context6.prev = 1;
          _context6.t0 = res.status(201);
          _context6.next = 5;
          return regeneratorRuntime.awrap(insertProducts(products));

        case 5:
          _context6.t1 = _context6.sent;
          _context6.t2 = {
            id: _context6.t1
          };

          _context6.t0.json.call(_context6.t0, _context6.t2);

          _context6.next = 13;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t3 = _context6["catch"](1);
          res.status(500).json({
            message: _context6.t3.message
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[1, 10]]);
}

function update(req, res) {
  var id, product;
  return regeneratorRuntime.async(function update$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          id = Number(req.params.id);
          _context7.prev = 1;
          _context7.next = 4;
          return regeneratorRuntime.awrap(findProductById(id));

        case 4:
          product = {
            id: id,
            name: req.body.name,
            price: req.body.price
          };
          _context7.next = 7;
          return regeneratorRuntime.awrap(updateAProduct(product));

        case 7:
          res.status(200).end();
          _context7.next = 13;
          break;

        case 10:
          _context7.prev = 10;
          _context7.t0 = _context7["catch"](1);

          if (_context7.t0.message == 'No existe el producto') {
            res.status(404).end();
          } else {
            res.status(500).json({
              message: _context7.t0.message
            });
          }

        case 13:
        case "end":
          return _context7.stop();
      }
    }
  }, null, null, [[1, 10]]);
}

function remove(req, res) {
  return regeneratorRuntime.async(function remove$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(deleteProductById(Number(req.params.id)));

        case 3:
          res.status(200).end();
          _context8.next = 9;
          break;

        case 6:
          _context8.prev = 6;
          _context8.t0 = _context8["catch"](0);
          res.json({
            message: _context8.t0.message
          }).status(500);

        case 9:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 6]]);
}

module.exports = {
  clean: clean,
  listAll: listAll,
  get: get,
  create: create,
  update: update,
  remove: remove
};