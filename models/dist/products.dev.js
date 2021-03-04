"use strict";

var _require = require("sequelize"),
    QueryTypes = _require.QueryTypes;

var _require2 = require("../db"),
    db = _require2.db;

function insertProducts(products) {
  var result;
  return regeneratorRuntime.async(function insertProducts$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    insert into products (name, price) values (:name, :price)\n", {
            replacements: products,
            type: QueryTypes.INSERT
          }));

        case 2:
          result = _context.sent;
          return _context.abrupt("return", result[0]);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

;

function updateAProduct(product) {
  return regeneratorRuntime.async(function updateAProduct$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(db.query("\n        update products set name = :name, price = :price where id = :id\n    ", {
            replacements: product,
            type: QueryTypes.UPDATE
          }));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}

module.exports = {
  insertProducts: insertProducts,
  updateAProduct: updateAProduct
};