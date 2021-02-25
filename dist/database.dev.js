"use strict";

var _require = require("sequelize"),
    Sequelize = _require.Sequelize;

var _require2 = require("sequelize"),
    QueryTypes = _require2.QueryTypes;

var dotenv = require('dotenv').config();

var db = new Sequelize(process.env.DB, process.env.DBUSER, process.env.DBPASS, {
  host: process.env.DBHOST,
  port: process.env.DBPORT,
  dialect: "mysql"
});

function alreadyExist(user) {
  var alreadyExist;
  return regeneratorRuntime.async(function alreadyExist$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM users WHERE (user = :user) OR (email = :email)", {
            type: QueryTypes.SELECT,
            replacements: user
          }));

        case 2:
          alreadyExist = _context.sent;
          return _context.abrupt("return", alreadyExist);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
}

function createUser(user, hash) {
  var inserted, users;
  return regeneratorRuntime.async(function createUser$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO users (user, fullName, email, telephone, address, password, admin)\n    VALUES (:user, :fullName, :email, :telephone, :address, :hash, 0)\n    ", {
            replacements: user,
            hash: hash,
            type: QueryTypes.INSERT
          }));

        case 2:
          inserted = _context2.sent;
          _context2.next = 5;
          return regeneratorRuntime.awrap(db.query("\n    SELECT * from users", {
            type: QueryTypes.SELECT
          }));

        case 5:
          users = _context2.sent;

        case 6:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function getUser(userToLook) {
  var user;
  return regeneratorRuntime.async(function getUser$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM users \n        WHERE (user = :user) OR (email = :user)", {
            type: QueryTypes.SELECT,
            replacements: userToLook
          }));

        case 2:
          user = _context3.sent;
          return _context3.abrupt("return", user);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getProductsList() {
  var products;
  return regeneratorRuntime.async(function getProductsList$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT name, price from products", {
            type: QueryTypes.SELECT
          }));

        case 2:
          products = _context4.sent;
          return _context4.abrupt("return", products);

        case 4:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function getOrdersList() {
  var joinProductQuantity, orders, mappedOrdersArray;
  return regeneratorRuntime.async(function getOrdersList$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          _context5.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT CONCAT(name, ' x ', quantity) AS description, order_id \n    FROM orders_and_products\n    INNER JOIN products \n    ON products.id_product = orders_and_products.id_product\n    ", {
            type: QueryTypes.SELECT
          }));

        case 2:
          joinProductQuantity = _context5.sent;
          _context5.next = 5;
          return regeneratorRuntime.awrap(db.query("\n    SELECT orders.state, \n    orders.hour,\n    orders.order_id,\n    users.address,\n    users.fullName,\n    order_state.state,\n    payment_method.payment_method\n    FROM orders\n    INNER JOIN payment_method ON orders.payment = payment_method.id\n    INNER JOIN users ON users.id = orders.user_id\n    INNER JOIN order_state ON orders.state = order_state.id_state", {
            type: QueryTypes.SELECT
          }));

        case 5:
          orders = _context5.sent;
          mappedOrdersArray = orders.map(function (order) {
            return Object.assign({}, order, {
              description: joinProductQuantity.filter(function (product) {
                return product.order_id === order.order_id;
              }).map(function (product) {
                return product.description;
              }).join(", ")
            });
          });
          return _context5.abrupt("return", mappedOrdersArray);

        case 8:
        case "end":
          return _context5.stop();
      }
    }
  });
}

function addNewProduct(newProduct) {
  var product;
  return regeneratorRuntime.async(function addNewProduct$(_context6) {
    while (1) {
      switch (_context6.prev = _context6.next) {
        case 0:
          _context6.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    INSERT INTO products (name, price)\n    VALUES (:name, :price)\n    ", {
            replacements: newProduct,
            type: QueryTypes.INSERT
          }));

        case 2:
          product = _context6.sent;
          return _context6.abrupt("return", product);

        case 4:
        case "end":
          return _context6.stop();
      }
    }
  });
}

function deleteProduct(product) {
  var deletedproduct;
  return regeneratorRuntime.async(function deleteProduct$(_context7) {
    while (1) {
      switch (_context7.prev = _context7.next) {
        case 0:
          console.log(product);
          _context7.next = 3;
          return regeneratorRuntime.awrap(db.query("\n    DELETE FROM products WHERE id_product = :id\n    ", {
            replacements: product,
            type: QueryTypes.DELETE
          }));

        case 3:
          deletedproduct = _context7.sent;

        case 4:
        case "end":
          return _context7.stop();
      }
    }
  });
}

function seeOrder(order) {
  var joinProductQuantity, seenOrder, mappedOrderArray;
  return regeneratorRuntime.async(function seeOrder$(_context8) {
    while (1) {
      switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    SELECT CONCAT(name, ' x ', quantity) AS description, order_id \n    FROM orders_and_products\n    INNER JOIN products \n    ON products.id_product = orders_and_products.id_product\n    WHERE (order_id = :id)\n    ", {
            type: QueryTypes.SELECT,
            replacements: order
          }));

        case 2:
          joinProductQuantity = _context8.sent;
          _context8.next = 5;
          return regeneratorRuntime.awrap(db.query("SELECT \n        orders.order_id,\n        order_state.state,\n        orders.total_payment,\n        payment_method.payment_method,\n        users.address\n        FROM orders \n        INNER JOIN order_state ON orders.state = order_state.id_state\n        INNER JOIN payment_method ON orders.payment = payment_method.id\n        INNER JOIN users ON users.id = orders.user_id\n        WHERE (order_id = :id) ", {
            type: QueryTypes.SELECT,
            replacements: order
          }));

        case 5:
          seenOrder = _context8.sent;
          mappedOrderArray = seenOrder.map(function (order) {
            return Object.assign({}, order, {
              description: joinProductQuantity.filter(function (product) {
                return product.order_id === order.order_id;
              }).map(function (product) {
                return product.description;
              }).join(", ")
            });
          });
          return _context8.abrupt("return", mappedOrderArray);

        case 8:
        case "end":
          return _context8.stop();
      }
    }
  });
}

function cancelOrder(order) {
  var cancelOrder, cancelProductsOrder;
  return regeneratorRuntime.async(function cancelOrder$(_context9) {
    while (1) {
      switch (_context9.prev = _context9.next) {
        case 0:
          _context9.next = 2;
          return regeneratorRuntime.awrap(db.query("\n    DELETE FROM orders WHERE order_id= :id\n    ", {
            replacements: order,
            type: QueryTypes.DELETE
          }));

        case 2:
          cancelOrder = _context9.sent;
          _context9.next = 5;
          return regeneratorRuntime.awrap(db.query("\n    DELETE FROM orders_and_products WHERE order_id= :id\n    ", {
            replacements: order,
            type: QueryTypes.DELETE
          }));

        case 5:
          cancelProductsOrder = _context9.sent;

        case 6:
        case "end":
          return _context9.stop();
      }
    }
  });
}

function changeOrderState(orderState) {
  var state;
  return regeneratorRuntime.async(function changeOrderState$(_context10) {
    while (1) {
      switch (_context10.prev = _context10.next) {
        case 0:
          _context10.next = 2;
          return regeneratorRuntime.awrap(db.query("UPDATE orders\n        SET state = :stateId\n        WHERE order_id = :orderId", {
            type: QueryTypes.UPDATE,
            replacements: orderState
          }));

        case 2:
          state = _context10.sent;
          console.table(state);

        case 4:
        case "end":
          return _context10.stop();
      }
    }
  });
}

function makeAnOrder(userId, order) {
  var transformOrderData, orderData, orderInformation, orderId, postOrder;
  return regeneratorRuntime.async(function makeAnOrder$(_context12) {
    while (1) {
      switch (_context12.prev = _context12.next) {
        case 0:
          transformOrderData = function _ref(order) {
            var orderArray, productsArray;
            return regeneratorRuntime.async(function transformOrderData$(_context11) {
              while (1) {
                switch (_context11.prev = _context11.next) {
                  case 0:
                    orderArray = Object.values(order);
                    productsArray = orderArray[2];
                    console.log(productsArray);
                    return _context11.abrupt("return", productsArray);

                  case 4:
                  case "end":
                    return _context11.stop();
                }
              }
            });
          };

          _context12.prev = 1;
          _context12.next = 4;
          return regeneratorRuntime.awrap(transformOrderData(order));

        case 4:
          orderData = _context12.sent;
          console.log(orderData);
          _context12.next = 8;
          return regeneratorRuntime.awrap(db.query("\n        INSERT INTO orders (state, payment, user_id, total_payment, delivery_address)\n        VALUES (1, :payment, :userId, :totalPrice, :deliveryAddress)\n        ", {
            replacements: {
              'userId': userId,
              'payment': order.payment,
              'totalPrice': order.total_payment,
              'deliveryAddress': order.deliveryAddress
            },
            type: QueryTypes.INSERT
          }));

        case 8:
          orderInformation = _context12.sent;
          console.log(orderInformation);
          orderId = orderInformation[0];
          console.log(orderId);
          _context12.next = 14;
          return regeneratorRuntime.awrap(Promise.all(orderData.map(function (product) {
            return db.query("\n            INSERT INTO orders_and_products (order_id, id_product, quantity)\n            VALUES (:order_id, :id_product, :quantity)\n            ", {
              replacements: {
                'order_id': orderId,
                'id_product': product.id,
                'quantity': product.quantity
              },
              type: QueryTypes.INSERT
            });
          })));

        case 14:
          postOrder = _context12.sent;
          _context12.next = 20;
          break;

        case 17:
          _context12.prev = 17;
          _context12.t0 = _context12["catch"](1);
          return _context12.abrupt("return", false);

        case 20:
        case "end":
          return _context12.stop();
      }
    }
  }, null, null, [[1, 17]]);
}

function updateProduct(product) {
  var set, query, updatedProduct;
  return regeneratorRuntime.async(function updateProduct$(_context13) {
    while (1) {
      switch (_context13.prev = _context13.next) {
        case 0:
          set = Object.keys(product).filter(function (key) {
            return product[key] != null && key != "id";
          }).map(function (key) {
            return "".concat(key, " = :").concat(key);
          }).join(",");
          console.log(product);
          query = "UPDATE products SET ".concat(set, " WHERE id_product = :id");
          _context13.next = 5;
          return regeneratorRuntime.awrap(db.query(query, {
            type: QueryTypes.UPDATE,
            replacements: product
          }));

        case 5:
          updatedProduct = _context13.sent;
          console.log(updatedProduct);

        case 7:
        case "end":
          return _context13.stop();
      }
    }
  });
}

function seeProduct(product) {
  var shownProduct;
  return regeneratorRuntime.async(function seeProduct$(_context14) {
    while (1) {
      switch (_context14.prev = _context14.next) {
        case 0:
          _context14.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT name, price, product_description FROM products \n        WHERE (id_product = :id)", {
            type: QueryTypes.SELECT,
            replacements: product
          }));

        case 2:
          shownProduct = _context14.sent;
          return _context14.abrupt("return", shownProduct);

        case 4:
        case "end":
          return _context14.stop();
      }
    }
  });
}

function validateUserAccess(id, orderId) {
  var isValidate;
  return regeneratorRuntime.async(function validateUserAccess$(_context15) {
    while (1) {
      switch (_context15.prev = _context15.next) {
        case 0:
          _context15.next = 2;
          return regeneratorRuntime.awrap(db.query("SELECT \n        user_id,\n        order_id\n        FROM orders \n        WHERE (user_id = :id) AND (order_id = :order_id)", {
            type: QueryTypes.SELECT,
            replacements: {
              'id': id,
              'order_id': orderId
            }
          }));

        case 2:
          isValidate = _context15.sent;
          console.log(isValidate);
          return _context15.abrupt("return", isValidate);

        case 5:
        case "end":
          return _context15.stop();
      }
    }
  });
}

function updateOrderInformation(order) {
  var set, query, updatedOrder, newProductsList, deleteOldProducts, addNewProducts;
  return regeneratorRuntime.async(function updateOrderInformation$(_context16) {
    while (1) {
      switch (_context16.prev = _context16.next) {
        case 0:
          set = Object.keys(order).filter(function (key) {
            return order[key] != null && key != "orderId" && key != "productsList";
          }).map(function (key) {
            return "".concat(key, " = :").concat(key);
          }).join(",");

          if (!(set != "")) {
            _context16.next = 7;
            break;
          }

          query = "UPDATE orders SET ".concat(set, " WHERE (order_id = :orderId)");
          console.log(query);
          _context16.next = 6;
          return regeneratorRuntime.awrap(db.query(query, {
            type: QueryTypes.UPDATE,
            replacements: order
          }));

        case 6:
          updatedOrder = _context16.sent;

        case 7:
          newProductsList = order.productsList;

          if (!(order.productsList != null)) {
            _context16.next = 15;
            break;
          }

          _context16.next = 11;
          return regeneratorRuntime.awrap(db.query("DELETE FROM orders_and_products\n            WHERE (order_id = :orderId)", {
            type: QueryTypes.DELETE,
            replacements: order
          }));

        case 11:
          deleteOldProducts = _context16.sent;
          _context16.next = 14;
          return regeneratorRuntime.awrap(Promise.all(newProductsList.map(function (product) {
            return db.query("\n            INSERT INTO orders_and_products (order_id, id_product, quantity)\n            VALUES (:order_id, :id_product, :quantity)\n            ", {
              replacements: {
                'order_id': order.orderId,
                'id_product': product.id,
                'quantity': product.quantity
              },
              type: QueryTypes.INSERT
            });
          })));

        case 14:
          addNewProducts = _context16.sent;

        case 15:
        case "end":
          return _context16.stop();
      }
    }
  });
}

function validateIfExists(id, table, column_name) {
  var idToLook;
  return regeneratorRuntime.async(function validateIfExists$(_context17) {
    while (1) {
      switch (_context17.prev = _context17.next) {
        case 0:
          console.log(id);
          _context17.next = 3;
          return regeneratorRuntime.awrap(db.query("SELECT * FROM ".concat(table, " WHERE (").concat(column_name, " = :id)"), {
            type: QueryTypes.SELECT,
            replacements: id
          }));

        case 3:
          idToLook = _context17.sent;
          return _context17.abrupt("return", idToLook);

        case 5:
        case "end":
          return _context17.stop();
      }
    }
  });
}

module.exports = {
  createUser: createUser,
  alreadyExist: alreadyExist,
  getProductsList: getProductsList,
  getUser: getUser,
  getOrdersList: getOrdersList,
  addNewProduct: addNewProduct,
  deleteProduct: deleteProduct,
  cancelOrder: cancelOrder,
  seeOrder: seeOrder,
  validateUserAccess: validateUserAccess,
  changeOrderState: changeOrderState,
  makeAnOrder: makeAnOrder,
  seeProduct: seeProduct,
  updateProduct: updateProduct,
  updateOrderInformation: updateOrderInformation,
  validateIfExists: validateIfExists
};