CREATE SCHEMA `delilahresto`;
CREATE USER 'delilah' @ 'localhost' IDENTIFIED BY 'D3L1L4HIS@A4R1l6!i8K\'M2m?';
GRANT ALL PRIVILEGES ON delilaresto. * TO 'delilah'@'localhost' WITH GRANT OPTION;

CREATE DATABASE `delilahresto`

USE `delilahresto`

DROP TABLE IF EXISTS `users`
CREATE TABLE users(
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(100) NOT NULL,
    `email` varchar(100) NOT NULL,
    `role` varchar(100) NOT NULL,
    `password_hash`  varchar(2056) NOT NULL,
    `username`  varchar(100) NOT NULL,
  PRIMARY KEY (`id`)
    admin tinyint(1)
)

DROP TABLE IF EXISTS `products`
CREATE TABLE products( 
    `id` int NOT NULL AUTO_INCREMENT,
    `name` varchar(45) NOT NULL,
    `price` DECIMAL(10,2) NOT NULL,
    `product_description` VARCHAR(64) 
    )

DROP TABLE IF EXISTS `orders`
CREATE TABLE orders( 
    `id` int NOT NULL AUTO_INCREMENT,
    `user_id` int NOT NULL,
    `status` varchar(50) NOT NULL,
    `description` varchar(200) NOT NULL,
    `address` varchar(200) NOT NULL,
    `payment_method` varchar(100) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (`user_id`) REFERENCES users (id)
)

DROP TABLE IF EXISTS `payment_method`
CREATE TABLE payment_method( 
    `id` INT(10) NOT NULL AUTO_INCREMENT, 
    `payment_method` VARCHAR(64),
    PRIMARY KEY (`id`)
)

INSERT INTO `payment_method`(`payment_method`) 
VALUES ('efectivo'),
    ('credito'),
    ('debito')

DROP TABLE IF EXISTS `items`;
CREATE TABLE `items` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` int NOT NULL,
  `order_id` int NOT NULL,
  `cantidad` DECIMAL(10,2) NOT NULL,
  PRIMARY KEY (`id`),
  FOREIGN KEY (`product_id`) REFERENCES products (id),
  FOREIGN KEY (`order_id`) REFERENCES orders (id)
);

