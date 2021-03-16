"use strict";

var _require = require("sequelize"),
    QueryTypes = _require.QueryTypes;

var _require2 = require("../database"),
    db = _require2.db,
    getResourceById = _require2.getResourceById,
    deleteResoueceById = _require2.deleteResoueceById,
    getAllResources = _require2.getAllResources;

var _require3 = require("../models/orders-repo"),
    cleanTables = _require3.cleanTables,
    allItmesByOrder = _require3.allItmesByOrder,
    deleteOrderItems = _require3.deleteOrderItems,
    insertNewItem = _require3.insertNewItem,
    insertOrder = _require3.insertOrder,
    orderUpdate = _require3.orderUpdate;

function clean() {
  return regeneratorRuntime.async(function clean$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(cleanTables('orders', 'items'));

        case 2:
        case "end":
          return _context.stop();
      }
    }
  });
}

function findOrderById(id) {
  var order;
  return regeneratorRuntime.async(function findOrderById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(getResourceById('orders', id));

        case 2:
          order = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(allItmesByOrder(id));

        case 5:
          order.items = _context2.sent;
          return _context2.abrupt("return", order);

        case 7:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function deleteOrdersById(id) {
  return regeneratorRuntime.async(function deleteOrdersById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(deleteOrderItems(id));

        case 2:
          _context3.next = 4;
          return regeneratorRuntime.awrap(deleteResoueceById('orders', id));

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function listAll(req, res) {
  var orders;
  return regeneratorRuntime.async(function listAll$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(getAllResources('orders'));

        case 2:
          orders = _context4.sent;
          res.json({
            orders: orders
          }).status(200);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function insertItems(order_id, items) {
  var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, item, newItem;

  return regeneratorRuntime.async(function insertItems$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _iteratorNormalCompletion = true;
          _didIteratorError = false;
          _iteratorError = undefined;
          _context5.prev = 3;
          _iterator = items[Symbol.iterator]();

        case 5:
          if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
            _context5.next = 13;
            break;
          }

          item = _step.value;
          newItem = {
            product_id: item.product_id,
            cantidad: item.cantidad,
            order_id: order_id
          };
          _context5.next = 10;
          return regeneratorRuntime.awrap(insertNewItem(newItem));

        case 10:
          _iteratorNormalCompletion = true;
          _context5.next = 5;
          break;

        case 13:
          _context5.next = 19;
          break;

        case 15:
          _context5.prev = 15;
          _context5.t0 = _context5["catch"](3);
          _didIteratorError = true;
          _iteratorError = _context5.t0;

        case 19:
          _context5.prev = 19;
          _context5.prev = 20;

          if (!_iteratorNormalCompletion && _iterator["return"] != null) {
            _iterator["return"]();
          }

        case 22:
          _context5.prev = 22;

          if (!_didIteratorError) {
            _context5.next = 25;
            break;
          }

          throw _iteratorError;

        case 25:
          return _context5.finish(22);

        case 26:
          return _context5.finish(19);

        case 27:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[3, 15, 19, 27], [20,, 22, 26]]);
}

function create(req, res) {
  var order, items, order_id;
  return regeneratorRuntime.async(function create$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          order = {
            status: 'new',
            user_id: req.user_id,
            description: req.body.description,
            address: req.body.address,
            payment_method: req.body.payment_method
          };
          items = req.body.items;
          _context6.prev = 2;
          _context6.next = 5;
          return regeneratorRuntime.awrap(insertOrder(order));

        case 5:
          order_id = _context6.sent;
          insertItems(order_id, items);
          res.status(201).json({
            id: order_id
          });
          _context6.next = 13;
          break;

        case 10:
          _context6.prev = 10;
          _context6.t0 = _context6["catch"](2);
          res.status(500).json({
            message: _context6.t0.message
          });

        case 13:
        case "end":
          return _context6.stop();
      }
    }
  }, null, null, [[2, 10]]);
}

function get(req, res) {
  return regeneratorRuntime.async(function get$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.t0 = res;
          _context7.next = 3;
          return regeneratorRuntime.awrap(findOrderById(Number(req.params.id)));

        case 3:
          _context7.t1 = _context7.sent;

          _context7.t0.json.call(_context7.t0, _context7.t1).status(200);

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function update(req, res) {
  var order;
  return regeneratorRuntime.async(function update$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.prev = 0;
          _context8.next = 3;
          return regeneratorRuntime.awrap(findOrderById(Number(req.params.id)));

        case 3:
          order = _context8.sent;
          order.status = req.body.status;
          order.description = req.body.description;
          order.address = req.body.address;
          order.payment_method = req.body.payment_method;
          _context8.next = 10;
          return regeneratorRuntime.awrap(orderUpdate(order));

        case 10:
          res.status(200).end();
          _context8.next = 16;
          break;

        case 13:
          _context8.prev = 13;
          _context8.t0 = _context8["catch"](0);

          if (_context8.t0.message == 'No existe la orden') {
            res.status(404).end();
          } else {
            res.status(500).json({
              message: _context8.t0.message
            });
          }

        case 16:
        case "end":
          return _context8.stop();
      }
    }
  }, null, null, [[0, 13]]);
}

function remove(req, res) {
  return regeneratorRuntime.async(function remove$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(deleteOrdersById(Number(req.params.id)));

        case 2:
          res.status(200).end();

        case 3:
        case "end":
          return _context9.stop();
      }
    }
  });
}

module.exports = {
  clean: clean,
  listAll: listAll,
  get: get,
  create: create,
  update: update,
  remove: remove
};