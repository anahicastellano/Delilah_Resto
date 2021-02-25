"use strict";

var express = require('express');

var app = express();

var helmet = require('helmet');

var rateLimit = require('express-rate-limit');

var jwt = require('Jsonwebtoken');

var bcrypt = require('bcrypt');

var dotenv = require('dotenv').config(); // Settings


app.set('port', process.env.PORT || 3000);

var _require = require("./database"),
    getUser = _require.getUser;

var authorizePassword = process.env.AuthPassword;

function checkToken(req, res, next) {
  console.log(req.headers.authorization);
  var token = req.headers.authorization.split(' ')[1];
  console.log(token);

  try {
    jwt.verify(token, authorizePassword);
    next();
  } catch (error) {
    res.status(401).send(error);
  }
}

var limiter = rateLimit({
  windowMs: 60 * 60 * 1000,
  max: 5
}); // Middlewares

app.use(express.json());
app.use(helmet()); //Login

app.post('/login', limiter, function _callee2(req, res) {
  var loginRequest, pswRequest, user, objetUser, objetPsw;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          loginRequest = {
            user: req.body.user
          };
          pswRequest = req.body.password;
          _context2.next = 4;
          return regeneratorRuntime.awrap(getUser(loginRequest));

        case 4:
          user = _context2.sent;

          if (user.length === 0) {
            req.status(400).send("invalid user or password");
          } else {
            objetUser = user[0];
            objetPsw = objetUser.password;
            console.log(objetPsw);
            console.log(pswRequest);
            bcrypt.compare(passwordRequest, objectPassword, function _callee(err, result) {
              var userToken;
              return regeneratorRuntime.async(function _callee$(_context) {
                while (1) {
                  switch (_context.prev = _context.next) {
                    case 0:
                      if (result) {
                        userToken = jwt.sign({
                          user: user
                        }, authorizationPassword);
                        console.log(userToken);
                        res.status(200).json(userToken);
                      } else {
                        res.status(400).send("invalid user or password");
                      }

                    case 1:
                    case "end":
                      return _context.stop();
                  }
                }
              });
            });
          }

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app.use(checkToken); //Create User

app.post('/signup', limiter, userAlreadyExists, validateSignUpInformation, function (req, res) {
  var user = {
    user: req.body.user,
    fullName: req.body.fullName,
    email: req.body.email,
    telephone: req.body.telephone,
    address: req.body.address,
    password: req.body.password
  };
  var saltRounds = 10;
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(user.password, salt, function (err, hash) {
      if (err) throw res.status(400).send("An error has happened");else {
        Object.defineProperty(user, 'hash', {
          value: hash
        });
        createUser(user);
        res.status(200).send("user created");
      }
    });
  });
}); //Get Products List

app.get('/products', function _callee3(req, res) {
  var productsList;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(getProductsList());

        case 2:
          productsList = _context3.sent;
          res.status(200).send(productsList);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}); //Get Product Information

app.get('/products/:id', function _callee4(req, res) {
  var product, getOneProduct;
  return regeneratorRuntime.async(function _callee4$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          product = {
            id: +req.params.id
          };
          _context4.next = 3;
          return regeneratorRuntime.awrap(seeProduct(product));

        case 3:
          getOneProduct = _context4.sent;

          if (getOneProduct.length === 0) {
            res.status(404).send("Product not found");
          } else {
            res.status(200).send(getOneProduct);
          }

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}); //Make An Order

app.post('/orders', validateOrderingInformation, function _callee5(req, res) {
  var token, user, userId, order, orderPosted;
  return regeneratorRuntime.async(function _callee5$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          token = req.headers.authorization.split(' ')[1];
          user = jwt.verify(token, authorizationPassword);
          userId = user.user[0].id;
          order = {
            total_payment: +req.body.total_payment,
            payment: +req.body.payment,
            productsList: req.body.productsList,
            deliveryAddress: req.body.deliveryAddress
          };
          _context5.next = 6;
          return regeneratorRuntime.awrap(makeAnOrder(userId, order));

        case 6:
          orderPosted = _context5.sent;

          if (orderPosted == false) {
            res.status(400).send("An error has occurred");
          } else {
            res.status(201).send('We received your order');
          }

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
}); //Get Orders List

app.get('/orders', filterAdmin, function _callee6(req, res) {
  var ordersList;
  return regeneratorRuntime.async(function _callee6$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(getOrdersList());

        case 2:
          ordersList = _context6.sent;
          res.status(200).send(ordersList);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}); //Post New Product

app.post('/products', filterAdmin, validateNewProductInformation, function _callee7(req, res) {
  var product, newProduct;
  return regeneratorRuntime.async(function _callee7$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          product = {
            name: req.body.name,
            price: +req.body.price,
            product_description: req.body.product_description
          };
          _context7.next = 3;
          return regeneratorRuntime.awrap(addNewProduct(product));

        case 3:
          newProduct = _context7.sent;
          res.status(201).send(newProduct);

        case 5:
        case "end":
          return _context7.stop();
      }
    }
  });
}); //Update Product

app.put('/products/:id', filterAdmin, validateUpdatedProductInformation, function _callee8(req, res) {
  var product, validId, updatedProduct;
  return regeneratorRuntime.async(function _callee8$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          product = {
            id: +req.params.id,
            product_description: req.body.product_description,
            price: req.body.price
          };
          _context8.next = 3;
          return regeneratorRuntime.awrap(validateIfExists(product, 'products', 'id_product'));

        case 3:
          validId = _context8.sent;

          if (!(validId.length === 1)) {
            _context8.next = 11;
            break;
          }

          _context8.next = 7;
          return regeneratorRuntime.awrap(updateProduct(product));

        case 7:
          updatedProduct = _context8.sent;
          res.status(200).send(updatedProduct);
          _context8.next = 12;
          break;

        case 11:
          res.status(404).send("Product not found");

        case 12:
        case "end":
          return _context8.stop();
      }
    }
  });
}); //Delete Product

app["delete"]('/products/:id', filterAdmin, function _callee9(req, res) {
  var product, validId, deletedProduct;
  return regeneratorRuntime.async(function _callee9$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          product = {
            id: +req.params.id
          };
          _context9.next = 3;
          return regeneratorRuntime.awrap(validateIfExists(product, 'products', 'id_product'));

        case 3:
          validId = _context9.sent;

          if (!(validId.length === 1)) {
            _context9.next = 11;
            break;
          }

          _context9.next = 7;
          return regeneratorRuntime.awrap(deleteProduct(product));

        case 7:
          deletedProduct = _context9.sent;
          res.status(200).send("Product succesfully deleted");
          _context9.next = 12;
          break;

        case 11:
          res.status(404).send("Product not found");

        case 12:
        case "end":
          return _context9.stop();
      }
    }
  });
}); //Get Order

app.get('/orders/:id', validatePermission, function _callee10(req, res) {
  var orderParameters, validId, order;
  return regeneratorRuntime.async(function _callee10$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          orderParameters = {
            id: +req.params.id
          };
          _context10.next = 3;
          return regeneratorRuntime.awrap(validateIfExists(orderParameters, 'orders', 'order_id'));

        case 3:
          validId = _context10.sent;

          if (!(validId.length === 1)) {
            _context10.next = 11;
            break;
          }

          _context10.next = 7;
          return regeneratorRuntime.awrap(seeOrder(orderParameters));

        case 7:
          order = _context10.sent;
          res.status(201).send(order);
          _context10.next = 12;
          break;

        case 11:
          res.status(404).send("Order not found");

        case 12:
        case "end":
          return _context10.stop();
      }
    }
  });
}); //Update Order

app.put('/orders/:id', validatePermission, validateUpdatedOrderInformation, function _callee11(req, res) {
  var token, user, adminPrivilege, order, validId, state, orderToModify;
  return regeneratorRuntime.async(function _callee11$(_context11) {
    while (1) {
      switch (_context11.prev = _context11.next) {
        case 0:
          token = req.headers.authorization.split(' ')[1];
          user = jwt.verify(token, authorizationPassword);
          adminPrivilege = user.user[0].admin;
          order = {
            id: +req.params.id
          };
          _context11.next = 6;
          return regeneratorRuntime.awrap(validateIfExists(order, 'orders', 'order_id'));

        case 6:
          validId = _context11.sent;

          if (validId.length === 1) {
            if (adminPrivilege === 1) {
              state = {
                stateId: +req.body.stateId,
                orderId: +req.params.id
              };
              changeOrderState(state);
              res.status(200).send("Order state succesfully updated");
            } else {
              orderToModify = {
                orderId: +req.params.id,
                payment: req.body.payment,
                productsList: req.body.productsList
              };
              updateOrderInformation(orderToModify);
              res.status(200).send("Order state succesfully updated");
            }
          } else {
            res.status(404).send("Order not found");
          }

        case 8:
        case "end":
          return _context11.stop();
      }
    }
  });
}); //Cancel An Order

app["delete"]('/orders/:id', filterAdmin, function _callee12(req, res) {
  var order, validId;
  return regeneratorRuntime.async(function _callee12$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          order = {
            id: req.params.id
          };
          _context12.next = 3;
          return regeneratorRuntime.awrap(validateIfExists(order, 'orders', 'order_id'));

        case 3:
          validId = _context12.sent;

          if (validId.length === 1) {
            cancelOrder(order);
            res.status(201).send("Order cancelled");
          } else {
            res.status(404).send("Order not found");
          }

        case 5:
        case "end":
          return _context12.stop();
      }
    }
  });
});

function filterAdmin(req, res, next) {
  var token = req.headers.authorization.split(' ')[1];
  var user = jwt.verify(token, authorizationPassword);
  var adminPrivilege = user.user[0].admin;
  console.log(adminPrivilege);

  if (adminPrivilege === 1) {
    next();
  } else {
    res.status(403).send('forbidden access');
  }
}

function validatePermission(req, res, next) {
  var token, user, userToCheck, adminPrivilege, orderId, validateUser;
  return regeneratorRuntime.async(function validatePermission$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          token = req.headers.authorization.split(' ')[1];
          user = jwt.verify(token, authorizationPassword);
          userToCheck = user.user[0].id;
          adminPrivilege = user.user[0].admin;
          orderId = req.params.id;
          _context13.next = 7;
          return regeneratorRuntime.awrap(validateUserAccess(userToCheck, orderId));

        case 7:
          validateUser = _context13.sent;

          if (validateUser.length === 0 && adminPrivilege !== 1) {
            res.status(403).send('forbidden access');
          }

          if (validateUser.length === 0 && adminPrivilege === 1) {
            next();
          } else {
            next();
          }

        case 10:
        case "end":
          return _context13.stop();
      }
    }
  });
}

function validateSignUpInformation(req, res, next) {
  return regeneratorRuntime.async(function validateSignUpInformation$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          if (typeof req.body.user !== "string" || req.body.user === null) {
            res.status(400).send("username is an obligatory field. Must be a combination of letters and numbers");
          }

          if (typeof req.body.fullName !== "string" || req.body.fullName === null) {
            res.status(400).send("fullname is an Obligatory field. Must be your real name");
          }

          if (req.body.email.includes("@") === false || req.body.email === null) {
            res.status(400).send("Obligatory field. Must be an email");
          }

          if (typeof req.body.telephone !== "number" || req.body.telephone === null) {
            res.status(400).send("Obligatory field. Must be yout real telephone");
          }

          if (typeof req.body.address !== "string" || req.body.address === null) {
            res.status(400).send("Obligatory field. Must be a real address");
          } else {
            next();
          }

        case 5:
        case "end":
          return _context14.stop();
      }
    }
  });
}

function userAlreadyExists(req, res, next) {
  var user, userSearchEngine;
  return regeneratorRuntime.async(function userAlreadyExists$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          user = {
            user: req.body.user,
            email: req.body.email
          };
          _context15.next = 3;
          return regeneratorRuntime.awrap(alreadyExist(user));

        case 3:
          userSearchEngine = _context15.sent;
          console.log(userSearchEngine.length);

          if (userSearchEngine.length === 0) {
            next();
          } else {
            res.status(409).send('user or email already exists');
          }

        case 6:
        case "end":
          return _context15.stop();
      }
    }
  });
}

function validateOrderingInformation(req, res, next) {
  var productsList, isAnArray, validProducts;
  return regeneratorRuntime.async(function validateOrderingInformation$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          productsList = req.body.productsList;
          isAnArray = Array.isArray(productsList);

          if (isAnArray == true) {
            validProducts = productsList.every(function (item) {
              return item.id && item.quantity > 0;
            });

            if (validProducts === false || productsList.length === 0) {
              res.status(400).send("Invalid order information");
            } else {
              if (typeof req.body.total_payment !== "number" || req.body.total_payment === null) {
                res.status(400).send("Total amount must be a number");
              }

              if (typeof req.body.payment !== "number" || req.body.payment === null) {
                res.status(400).send("Invalid payment method");
              }

              if (typeof req.body.deliveryAddress !== "string" || req.body.deliveryAddress === null) {
                res.status(400).send("Delivery address is an obligatory field. Must be a combination of letters and numbers");
              } else {
                next();
              }
            }
          }

        case 3:
        case "end":
          return _context16.stop();
      }
    }
  });
}

function validateNewProductInformation(req, res, next) {
  return regeneratorRuntime.async(function validateNewProductInformation$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          if (typeof req.body.name !== "string" || req.body.name === null) {
            res.status(400).send("product name is an obligatory field. Must be a character string");
          }

          if (typeof req.body.price !== "number" || req.body.price === null) {
            res.status(400).send("product price is an obligatory field. Must be a number");
          }

          if (typeof req.body.product_description !== "string" && req.body.product_description != null) {
            res.status(400).send("Product description must be a character string");
          }

          if (req.body.product_description == null) {
            next();
          } else {
            next();
          }

        case 4:
        case "end":
          return _context17.stop();
      }
    }
  });
}

function validateUpdatedProductInformation(req, res, next) {
  return regeneratorRuntime.async(function validateUpdatedProductInformation$(_context18) {
    while (1) {
      switch (_context18.prev = _context18.next) {
        case 0:
          if (typeof req.body.product_description !== "string" && req.body.product_description != null) {
            res.status(400).send("Product description must be a character string");
          }

          if (typeof req.body.price !== "number" && req.body.price != null) {
            res.status(400).send("Product price must be a number");
          }

          if (req.body.product_description == null || req.body.price == null) {
            next();
          } else {
            next();
          }

        case 3:
        case "end":
          return _context18.stop();
      }
    }
  });
}

app.use(function (err, req, res, next) {
  console.log("Error");
  res.status(400).end();
});

function validateUpdatedOrderInformation(req, res, next) {
  var productsList, isAnArray, validProducts;
  return regeneratorRuntime.async(function validateUpdatedOrderInformation$(_context19) {
    while (1) {
      switch (_context19.prev = _context19.next) {
        case 0:
          productsList = req.body.productsList;
          isAnArray = Array.isArray(productsList);

          if (typeof req.body.stateId !== "number" && req.body.stateId != null) {
            res.status(400).send("Order state reference invalid");
          }

          if (typeof req.body.payment !== "number" && req.body.payment != null) {
            res.status(400).send("Order state reference invalid");
          }

          if (typeof req.body.total_payment !== "number" && req.body.total_payment != null) {
            res.status(400).send("Product price must be a number");
          }

          if (productsList != null && isAnArray == true) {
            validProducts = productsList.every(function (item) {
              return item.id && item.quantity > 0;
            });

            if (validProducts === false || productsList.length === 0) {
              res.status(400).send("Invalid order information");
            }
          }

          if (productsList != null && isAnArray == false) {
            res.status(400).send("Invalid order information");
          } else {
            next();
          }

        case 7:
        case "end":
          return _context19.stop();
      }
    }
  });
} // Start the server


app.listen(app.get('port'), function () {
  console.log('Server on port', app.get('port'));
});