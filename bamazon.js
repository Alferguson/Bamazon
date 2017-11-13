var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require('cli-table2');

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
  startUp();

});

// displays table of data
var startUp = function() {
	var query = "SELECT * FROM products";
	connection.query(query, function(err, res) {
  	for (var i = 0; i < res.length; i++) {
      table.push(
        [res[i].item_id, res[i].product_name, res[i].department_name, res[i].price, res[i].stock_quantity]
      );      
  	}
    // creates tables from res values
    console.log(table.toString());
    inquire();
  }) 	

}

var inquire = function() {
	inquirer.prompt([
    {
      name: "productID",
      type: "input",
     	message: "What product ID would you like to choose?"
    },
    {
    	name: "units",
      type: "input",
     	message: "How much of this item would you like to purchase?"
    }
  ])
  .then(function(answer) {

    connection.query("SELECT item_id, product_name, stock_quantity FROM products", function(err, res) {
      for (var j = 0; j < res.length; j++) {
        if (res[j].item_id === parseInt(answer.productID)) {
          if (res[j].stock_quantity >= parseInt(answer.units)) {
            productName = res[j].product_name;
            quanDif = res[j].stock_quantity - parseInt(answer.units);
            id = res[j].item_id;
            connection.query("UPDATE products SET ? WHERE ?",
              [{
                stock_quantity: quanDif
              },
              {
                item_id: id
              }],
              function(err, result) {
                if (err) throw error;
                console.log("Your " + productName + " will arrive in 7 days, thank you for your purchase!\n");
              }
            );
          }
          else {
            console.log("Sorry, not enough of that item exists");
          }
        }
      }  
    connection.end();
    });  
  })  
}   

// var update = function() {
//   connection.query("SELECT item_id, product_name, stock_quantity FROM products", function(err, res) {
//     for (var j = 0; j < res.length; j++) {
//       if (res[j].item_id === parseInt(answer.productID)) {
//         if (res[j].stock_quantity >= parseInt(answer.units)) {
//           console.log(res[j].product_name);
//           var query = connection.query("UPDATE products SET ? WHERE ?",
//             {
//               stock_quantity: res[j].stock_quantity - parseInt(answer.units)
//             },
//             function(err, res) {
//               // console.log(res.changedRows);
//               // console.log("Your " + res[j].product_name + " will arrive in 7 days, thank you for your purchase!\n");
//             }
//           );
//         }
//         else {
//           console.log("Sorry, not enough of that item exists");
//         }
//       }
//     }  
//   console.log("eh");
//   });
// connection.end();      
// }