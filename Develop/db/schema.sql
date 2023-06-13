-- DROP DATABASE
DROP DATABASE IF EXISTS ecommerce_db;

-- CREATE DATABASE
CREATE DATABASE ecommerce_db;

-- Category table
CREATE TABLE Category (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  category_name VARCHAR(255) NOT NULL
);

-- Product table
CREATE TABLE Product (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_name VARCHAR(255) NOT NULL,
  price DECIMAL(10, 2) NOT NULL CHECK (price >= 0),
  stock INTEGER NOT NULL DEFAULT 10 CHECK (stock >= 0),
  category_id INTEGER,
  FOREIGN KEY (category_id) REFERENCES Category(id)
);

--Tag table
CREATE TABLE Tag (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  tag_name VARCHAR(255) NOT NULL
);

-- ProductTag table
CREATE TABLE ProductTag (
  id INTEGER PRIMARY KEY AUTO_INCREMENT,
  product_id INTEGER,
  tag_id INTEGER,
  FOREIGN KEY (product_id) REFERENCES Product(id),
  FOREIGN KEY (tag_id) REFERENCES Tag(id)
);
