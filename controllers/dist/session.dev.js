"use strict";

var bcrypt = require('bcrypt');

var _require = require("../database"),
    db = _require.db;

var _require2 = require("sequelize"),
    QueryTypes = _require2.QueryTypes;

var jwt = require('jsonwebtoken');

function login(req, res) {
  var _req$body, username, password, user, valid, user_id, token;

  return regeneratorRuntime.async(function login$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _req$body = req.body, username = _req$body.username, password = _req$body.password;
          user = findUserByUsername(username);
          _context.next = 4;
          return regeneratorRuntime.awrap(bcrypt.compare(password, user.password_hash));

        case 4:
          valid = _context.sent;

          if (valid) {
            user_id = user.id;
            token = jwt.sign({
              user_id: user_id
            }, process.env.ACCESS_TOKEN_SECRET);
            res.json({
              token: token
            });
          } else {
            res.status(401).end();
          }

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

function findUserByUsername(username) {
  var users;
  return regeneratorRuntime.async(function findUserByUsername$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(db.query("select * from users where username = :username", {
            replacements: {
              username: username
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

module.exports = {
  login: login
};