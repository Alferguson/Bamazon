var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');
var nameIdData = [];

// creates table
var table = new Table({
  head: ["Item ID", "Product", "Department", "Price", "Stock Quantity"],
  colWidths: [4, 35, 15, 6, 20],
  chars: { 'top': '═' , 'top-mid': '╤' , 'top-left': '╔' , 'top-right': '╗'
    , 'bottom': '═' , 'bottom-mid': '╧' , 'bottom-left': '╚' , 'bottom-right': '╝'
    , 'left': '║' , 'left-mid': '╟' , 'mid': '─' , 'mid-mid': '┼'
    , 'right': '║' , 'right-mid': '╢' , 'middle': '│' }    
});

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "root",
  database: "bamazon_db"
});

connection.connect(function(err) {
	if (err) throw err;
  inquire();
});

var inquire = function() {
	inquirer.prompt([
    {
      name: "question",
     	type: "rawlist",
     	message: "Choose an option",
     	choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
    }
	])
	.then(function(answer) {
		switch (answer.question) {
	    case "View Products for Sale":
        sale();
        break;
	    case "View Low Inventory":
        lowInventory();
        break;
	    case "Add to Inventory":
        addInventory();
        break;
	    case "Add New Product":
        addProduct();
        break;
	  }
  })
}	

var sale = function() {
	var query = "SELECT * FROM products";
  connection.query(query, function(err, res) {
    for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );      
    }
    console.log(table.toString());
  }) 
  connection.end(); 
}	

var lowInventory = function() {
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res) {
  	for (var i = 0; i < res.length; i++) {
  		if (res[i].stock_quantity < 5) {
      	table.push(
        	[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      	); 
	    }  	     
  	}
    // creates tables from res values
    console.log(table.toString());
	})
  connection.end();  		
}

var addInventory = function() {
  var query = "SELECT item_id, product_name FROM products";
  connection.query(query, function(err, res) { 
    for (var i = 0; i < res.length; i++) { 
      nameIdData.push(res[i].item_id.toString());
    } 

  	inquirer.prompt([
      {
        name: "add",
       	type: "list",
       	message: "Which would you like to add more too?",
       	choices: nameIdData
      },
      {
        name: "addNum",
       	type: "input",
       	message: "How much?"
      }
    ])	
  	.then(function(answer) {
      console.log(answer.addNum);
      console.log(answer.add);
      addBoth = res[parseInt(answer.addNum) - 1].stock_quantity + parseInt(answer.addNum);
  		connection.query("UPDATE products SET ? WHERE ?",
        [{
          stock_quantity: addBoth
        },
        {
          item_id: parseInt(answer.add)
        }],
        function(err, result) {
          // if (err) throw err;
          console.log("It has been changed\n");
        }
      );
  	})
  })
  connection.end();   	
}

var addProduct = function() {
  var query = "SELECT item_id, product_name FROM products";
  connection.query(query, function(err, res) {
  	inquirer.prompt([
      {
        name: "productAdd",
       	type: "input",
       	message: "What product would you like to add?"
      },
      {
        name: "productDepo",
       	type: "input",
       	message: "What department will it be in?"
      },
      {
        name: "productPrice",
       	type: "input",
       	message: "What's its price?"
      },
      {
        name: "productQuan",
       	type: "input",
       	message: "How much of it is in stock?"
      }
  	])
  	.then(function(answer) {	
  		connection.query("INSERT INTO products SET ?",
  	    {
  	      product_name: answer.productAdd,
  	      department_name: answer.productDepo,
  	      price: answer.productPrice,
  	      quantity: answer.productQuan
  	    },
        
  	    function(err, res) {
          if (err) throw err;
  	      console.log(res.changedRows);
  	    }
      )
  	})    
  })
}