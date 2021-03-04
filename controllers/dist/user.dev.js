"use strict";

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

var _require = require("sequelize"),
    QueryTypes = _require.QueryTypes;

var _require2 = require("../db"),
    db = _require2.db,
    cleanTable = _require2.cleanTable,
    deleteResoueceById = _require2.deleteResoueceById;

var _require3 = require("../models/user"),
    insert = _require3.insert,
    findUserById = _require3.findUserById,
    getUsersData = _require3.getUsersData,
    updateUserData = _require3.updateUserData;

function clean() {
  return regeneratorRuntime.async(function clean$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          cleanTable('users');

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
}

function deleteUserById(id) {
  return regeneratorRuntime.async(function deleteUserById$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(deleteResoueceById('users', id));

        case 2:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function listAll(req, res) {
  var users;
  return regeneratorRuntime.async(function listAll$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getUsersData());

        case 2:
          users = _context3.sent;
          res.json({
            users: users
          }).status(200);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function get(req, res) {
  var _ref, password_hash, user;

  return regeneratorRuntime.async(function get$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(findUserById(Number(req.params.id)));

        case 2:
          _ref = _context4.sent;
          password_hash = _ref.password_hash;
          user = _objectWithoutProperties(_ref, ["password_hash"]);
          res.json(user).status(200);

        case 6:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function create(req, res) {
  var user, _ref2, user_id, token;

  return regeneratorRuntime.async(function create$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.prev = 0;
          user = {
            name: req.body.name,
            email: req.body.email,
            username: req.body.username,
            password: req.body.password,
            role: 'customer'
          };
          _context5.next = 4;
          return regeneratorRuntime.awrap(insert(user));

        case 4:
          _ref2 = _context5.sent;
          user_id = _ref2.user_id;
          token = _ref2.token;
          res.status(201).json({
            id: user_id,
            token: token
          });
          _context5.next = 13;
          break;

        case 10:
          _context5.prev = 10;
          _context5.t0 = _context5["catch"](0);
          res.status(500).json({
            message: _context5.t0.message
          });

        case 13:
        case "end":
          return _context5.stop();
      }
    }
  }, null, null, [[0, 10]]);
}

function update(req, res) {
  var id, user;
  return regeneratorRuntime.async(function update$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          id = Number(req.params.id);
          _context6.next = 3;
          return regeneratorRuntime.awrap(findUserById(id));

        case 3:
          user = {
            id: id,
            name: req.body.name,
            email: req.body.email
          };
          _context6.next = 6;
          return regeneratorRuntime.awrap(updateUserData(user));

        case 6:
          res.status(200).end();

        case 7:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function remove(req, res) {
  return regeneratorRuntime.async(function remove$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          _context7.next = 2;
          return regeneratorRuntime.awrap(deleteUserById(Number(req.params.id)));

        case 2:
          res.status(200).end();

        case 3:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function createFavorite(req, res) {
  var favorite = {
    favorite: req.body.favorite,
    userId: req.body.userId
  };
  favorites.push(favorite);
  res.status(201).json(favorite);
}

function deleteUserFavorite(id) {
  favorites = favorites.filter(function (it) {
    return it.userId === id;
  });
}

function removeFavorites(req, res) {
  deleteUserFavorite(req.body.id);
  res.status(201).json(favorite);
}

module.exports = {
  clean: clean,
  listAll: listAll,
  get: get,
  create: create,
  update: update,
  remove: remove,
  createFavorite: createFavorite,
  removeFavorites: removeFavorites,
  insert: insert
};