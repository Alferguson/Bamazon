var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

var inquire = function() {
	inquirer.prompt([
    {
      	name: "question",
     	type: "rawlist",
     	message: "Choose an option",
     	options: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
  	])
  	.then(function(answer) {
		switch (answer) {
		    case 0:
		        day = "View Products for Sale";
		        break;
		    case 1:
		        day = "View Low Inventory";
		        break;
		    case 2:
		        day = "Add to Inventory";
		        break;
		    case 3:
		        day = "Add New Product";
		        break;
		}
	}	