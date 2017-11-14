var mysql = require("mysql");
var inquirer = require("inquirer");

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

var table = function() {
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res) {
  	for (var i = 0; i < res.length; i++) {
    	table.push(
      	[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
    	);      
  	}
    // creates tables from res values
    console.log(table.toString());
	}) 	
}

var sale = function() {
	table();
}	

var lowInventory = function() {
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res) {
  	for (var i = 0; i < res.length; i++) {
  		if (res.stock_quantity < 5) {
      	table.push(
        	[res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      	); 
	    }  	     
  	}
    // creates tables from res values
    console.log(table.toString());
	}) 		
}

var addInventory = function() {
  var query = "SELECT item_id, product_name FROM products";
  connection.query(query, function(err, res) {  
    console.log(res);
  	// inquirer.prompt([
   //    {
   //      name: "add",
   //     	type: "rawlist",
   //     	message: "Which would you like to add more too?",
   //     	options: [productsIdsAndNames]
   //    },
   //    {
   //      name: "addNum",
   //     	type: "input",
   //     	message: "How much?"
   //    }
   //  ])	
  	// .then(function(answer) {
  	// 	connection.query("UPDATE products SET ? WHERE ?",
   //      [{
   //        stock_quantity: res[id].stock_quantity + parseInt(answer.addNum)
   //      },
   //      {
   //        item_id: res[id].item_id
   //      }],
   //      function(err, result) {
   //        if (err) throw err;
   //        console.log("Your " + productName + "'s quantity has been changed\n");
   //      }
   //    );
  	// })
  })  	
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
  		connection.query("INSERT INTO products SET ? WHERE ?",
  	    {
  	      product_name: productAdd,
  	      department_name: productDepo,
  	      price: productPrice,
  	      quantity: productQuan
  	    },
  	    function(err, res) {
          if (err) throw err;
  	      console.log(res.changedRows);
  	    }
      )
  	})    
  })
}