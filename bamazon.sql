DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE greatBay_DB;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL
);

INSERT INTO products (product_name, department_name, price, stock_quantity);
VALUES ("Somewhat warm Pizza", "Food-Depo", 20, 500), ("Dull Hair Trimmers", "Health-Depo", 2, 500000000), ("A pickle that can be used as a tv remote", "TV-Depo", 4, 3200);
