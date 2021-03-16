"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize;

var _require2 = require("sequelize"),
    QueryTypes = _require2.QueryTypes; // const dotenv = require('dotenv').config();


var db = new Sequelize(process.env.DB, process.env.DBUSER, process.env.DBPASS, {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  dialect: "mysql"
});

function getResourceById(table, id) {
  var resource;
  return regeneratorRuntime.async(function getResourceById$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.query("select * from ".concat(table, " where id = :id"), {
            replacements: {
              id: id
            },
            type: QueryTypes.SELECT
          }));

        case 2:
          resource = _context.sent;

          if (!(resource.length === 0)) {
            _context.next = 5;
            break;
          }

          throw new Error("No existe el recurso en ".concat(table));

        case 5:
          return _context.abrupt("return", resource[0]);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

;

function getAllResources(table) {
  return regeneratorRuntime.async(function getAllResources$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(db.query("select * from ".concat(table), {
            type: QueryTypes.SELECT
          }));

        case 2:
          return _context2.abrupt("return", _context2.sent);

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function deleteResoueceById(table, id) {
  return regeneratorRuntime.async(function deleteResoueceById$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(db.query("delete from ".concat(table, " where id = :id"), {
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

function cleanTable(table) {
  return regeneratorRuntime.async(function cleanTable$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(db.query("SET FOREIGN_KEY_CHECKS = 0;"));

        case 2:
          _context4.next = 4;
          return regeneratorRuntime.awrap(db.query("truncate ".concat(table), {
            type: QueryTypes.BULKDELETE
          }));

        case 4:
          _context4.next = 6;
          return regeneratorRuntime.awrap(db.query("SET FOREIGN_KEY_CHECKS = 1;"));

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  db: db,
  getResourceById: getResourceById,
  getAllResources: getAllResources,
  deleteResoueceById: deleteResoueceById,
  cleanTable: cleanTable
};