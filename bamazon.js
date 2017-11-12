var mysql = require("mysql");
var inquirer = require("inquirer");

var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_DB"
});

connection.connect(function(error) {
  if (error) throw error;
  startUp();
});

// displays table of data
var startUp = function() {
	var query = "SELECT * FROM bamazon_DB";
  	connection.query(query, function(error, res) {
    	for (var i = 0; i < res.length; i++) {
      		console.log (
        		"Item ID: " +
          		res[i].item_id +
          		" || Product: " +
          		res[i].product_name +
          		" || Department: " +
          		res[i].department_name +
          		" || Price: " +
          		res[i].price +          		
          		" || Stock Quantity: " +
          		res[i].stock_quantity
      		);
    	}
    connection.end();
    }	
}

// inquirer
var inquire = function() {
	inquirer
	    .prompt(
	    {
	      	name: "productID",
	      	type: "input",
	     	message: "What product ID would you like to choose?"
	    }
	    {
	    	name: "units",
	      	type: "input",
	     	message: "How much of this item would you like to purchase?"
	    }
	    )
	    .then(function(answer) {
	      // based on their answer, either call the bid or the post functions
	      if (answer.postOrBid.toUpperCase() === "POST") {
	        postAuction();
	      }
	      else {
	        bidAuction();
	      }
	    });
}    