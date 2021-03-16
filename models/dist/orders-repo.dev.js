"use strict";

var _require = require("../database"),
    db = _require.db;

var _require2 = require("sequelize"),
    QueryTypes = _require2.QueryTypes;

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var salt = 10;

function cleanTables(table1, table2) {
  return regeneratorRuntime.async(function cleanTables$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.query("SET FOREIGN_KEY_CHECKS = 0;"));

        case 2:
          _context.next = 4;
          return regeneratorRuntime.awrap(db.query("truncate ".concat(table1), {
            type: QueryTypes.BULKDELETE
          }));

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(db.query("truncate ".concat(table2), {
            type: QueryTypes.BULKDELETE
          }));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(db.query("SET FOREIGN_KEY_CHECKS = 1;"));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function allItmesByOrder(order_id) {
  var items;
  return regeneratorRuntime.async(function allItmesByOrder$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT\n    items.cantidad,\n    products.name,\n    products.id\n    FROM items\n    INNER JOIN products ON products.id = items.product_id\n    WHERE items.order_id = :order_id\n    ", {
            replacements: {
              order_id: order_id
            },
            type: QueryTypes.SELECT
          }));

        case 2:
          items = _context2.sent;

          if (!(items.length === 0)) {
            _context2.next = 5;
            break;
          }

          throw new Error('The order does not exist');

        case 5:
          return _context2.abrupt("return", items);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function deleteOrderItems(id) {
  return regeneratorRuntime.async(function deleteOrderItems$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(db.query("delete from items where order_id = :id", {
            replacements: {
              id: id
            },
            type: QueryTypes.DELETE
          }));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function insertNewItem(newItem) {
  return regeneratorRuntime.async(function insertNewItem$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    insert into items (product_id, cantidad, order_id)\n                values (:product_id, :cantidad, :order_id)\n", {
            replacements: newItem,
            type: QueryTypes.INSERT
          }));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function insertOrder(order) {
  var result;
  return regeneratorRuntime.async(function insertOrder$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    insert into orders (status, user_id, description, address, payment_method)\n                values (:status, :user_id, :description, :address, :payment_method)\n", {
            replacements: order,
            type: QueryTypes.INSERT
          }));

        case 2:
          result = _context5.sent;
          return _context5.abrupt("return", result[0]);

        case 4:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function orderUpdate(order) {
  return regeneratorRuntime.async(function orderUpdate$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    update orders set status = :status, \n    description = :description, \n    address = :address, \n    payment_method = :payment_method \n    where id = :id\n", {
            replacements: order,
            type: QueryTypes.UPDATE
          }));

        case 2:
        case "end":
          return _context6.stop();
      }
    }
  });
}

module.exports = {
  cleanTables: cleanTables,
  allItmesByOrder: allItmesByOrder,
  deleteOrderItems: deleteOrderItems,
  insertNewItem: insertNewItem,
  insertOrder: insertOrder,
  orderUpdate: orderUpdate
};