DROP DATABASE IF EXISTS bamazon_DB;
CREATE DATABASE bamazon_DB;

USE bamazon_DB;

CREATE TABLE products(
  item_id INTEGER(11) AUTO_INCREMENT PRIMARY KEY NOT NULL,
  product_name VARCHAR(100) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price INT NOT NULL,
  stock_quantity INT NOT NULL
);

INSERT INTO products 
	(product_name, department_name, price, stock_quantity)
VALUES ("Somewhat Warm Pizza", "Food-Depo", 20, 500), 
	("Dull Hair Trimmers", "Health-Depo", 2, 500000000), 
	("A pickle that can be used as a tv remote", "TV-Depo", 4, 3200), 
	("Gnarly pickles", "Food-Depo", 2, 100), 
	("An in-depth analysis of the Bee Movie", "DVD-Depo", 5000, 4), 
	("A cake with salami in it", "Food-Depo", 60, 75), 
	("Knack", "VideoGame-Depo", 100, 9500), 
	("A pair of shoes but both are lefties", "Clothes-Depo", 6, 17), 
	("Invisible lizards", "Pet-Depo", 40, 2000500), 
	("lil wayne's YEEEAAAHHHHH", "???-Depo", 64, 1);
