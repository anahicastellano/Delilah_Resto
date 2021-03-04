"use strict";

var _require = require("sequelize"),
    QueryTypes = _require.QueryTypes;

var _require2 = require("./db"),
    db = _require2.db;

var bcrypt = require('bcrypt');

var jwt = require('jsonwebtoken');

var salt = 10;

function insert(user) {
  var result, user_id, token;
  return regeneratorRuntime.async(function insert$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(bcrypt.hash(user.password, salt));

        case 2:
          user.password_hash = _context.sent;
          _context.next = 5;
          return regeneratorRuntime.awrap(db.query("\n    insert into users (name, email, username, password_hash, role) values (:name, :email, :username, :password_hash, :role)\n", {
            replacements: user,
            type: QueryTypes.INSERT
          }));

        case 5:
          result = _context.sent;
          user_id = result[0];
          token = jwt.sign({
            user_id: user_id
          }, process.env.ACCESS_TOKEN_SECRET);
          return _context.abrupt("return", {
            user_id: user_id,
            token: token
          });

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

function findUserById(id) {
  var users;
  return regeneratorRuntime.async(function findUserById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(db.query("select id, name, username, email from users where id = :id", {
            replacements: {
              id: id
            },
            type: QueryTypes.SELECT
          }));

        case 2:
          users = _context2.sent;

          if (!(users.length === 0)) {
            _context2.next = 5;
            break;
          }

          throw new Error('No existe el usuario');

        case 5:
          return _context2.abrupt("return", users[0]);

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getUsersData() {
  return regeneratorRuntime.async(function getUsersData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(db.query("select id, name, username, email from users", {
            type: QueryTypes.SELECT
          }));

        case 2:
          return _context3.abrupt("return", _context3.sent);

        case 3:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function updateUserData(user) {
  return regeneratorRuntime.async(function updateUserData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    update users set name = :name, email = :email where id = :id\n", {
            replacements: user,
            type: QueryTypes.UPDATE
          }));

        case 2:
        case "end":
          return _context4.stop();
      }
    }
  });
}

module.exports = {
  insert: insert,
  findUserById: findUserById,
  getUsersData: getUsersData,
  updateUserData: updateUserData
};