
-- creating our database --

-- item_id (unique id for each product)

-- product_name (Name of product)

-- department_name

-- price (cost to customer)

-- stock_quantity (how much of the product is available in stores)

-- Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).

DROP DATABASE IF EXISTS bamazon_DB;

CREATE DATABASE bamazon_DB;

USE bamazon_DB;

-- create table of products with columns--

CREATE TABLE products(
	item_id INT NOT NULL AUTO_INCREMENT,
	product_name VARCHAR(50) NOT NULL,
	department_name VARCHAR(50) NULL,
	price DECIMAL(10,2) NOT NULL,
	stock_quantity INT NOT NULL,
	PRIMARY KEY (item_id)
	);

-- create some dummy items to put in the table--

INSERT INTO products(product_name, department_name, price, stock_quantity)
VALUES ("red dress", "princeton", 24.50, 55), ("pug mug", "princeton", 14.95, 200),
("candle set", "metuchen", 30.00, 12), ("candle set", "edison", 21.50, 400),
("mirror", "somerset", 100.00, 100), ("chair", "somerset", 250.00, 4000), 
("large suitcase", "newark", 150.00, 1000), ("waterbottle", "trenton", 18.50, 3000),
("projector", "philadelphia", 450.00, 30), ("black heels", "new york", 35.00, 645);













