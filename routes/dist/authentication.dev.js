"use strict";

var jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  if (req.path === '/login' || req.path === '/users' && req.method === 'POST') {
    next();
    return;
  }

  var authHeader = req.headers['authorization'];
  var token = authHeader && authHeader.split(' ')[1];
  if (token == null) return res.sendStatus(401);
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, function (err, payload) {
    if (err) return res.sendStatus(403);
    req.user_id = payload.user_id;
    req.role = findUserRole(req.user_id);
    next();
  });
}

function filterAdmin(req, res, next) {
  if (req.role === 'admin') {
    next();
  } else {
    res.status(403).end();
  }
}

function findUserRole(id) {
  var users;
  return regeneratorRuntime.async(function findUserRole$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.query("select rol from users where id = :id", {
            replacements: {
              id: id
            },
            type: QueryTypes.SELECT
          }));

        case 2:
          users = _context.sent;

          if (!(users.length === 0)) {
            _context.next = 5;
            break;
          }

          throw new Error('No existe el usuario');

        case 5:
          return _context.abrupt("return", users[0].role);

        case 6:
        case "end":
          return _context.stop();
      }
    }
  });
}

module.exports = {
  authenticateToken: authenticateToken,
  filterAdmin: filterAdmin
};