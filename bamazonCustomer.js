var mysql = require("mysql");
var inquirer = require("inquirer");

// create the connection information for the sql database
var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "",
  database: "bamazon_DB"
});


connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId);
  afterConnection();
});

//Show all of the items that are available
  function afterConnection() {
  connection.query("SELECT item_id, product_name, price FROM products", function(err, res) {
    if (err) throw err;
    console.log("------------------------------ITEMS FOR SALE--------------------------------");
    console.log(res);
    console.log("----------------------------------------------------------------------------");
    start();
  
  });
} 

//Prompt user with two questions

function start(){
	inquirer
	.prompt([
	
	{
		name: "SelectID",
		type: "input",
		message: "What is the ID of the product you wish to purchase?"

	},
	{
		name: "Units",
		type: "input",
		message: "How many units of this product do you wish to purchase?",
		validate: function(value) {
          if (isNaN(value) === false) {
            return true;
          }
          return false;
        }
    }
	
	]).then(function(answer){
		connection.query("SELECT * FROM products WHERE item_id = ?", [answer.SelectID], function(err, res, fields){
			//creating condition statement
			if (err) throw err;
			 for(var i = 0; i < res.length; i++){
			//console.log all of the chosen product information
			console.log("Product Information: ");
			console.log(res);
			//if the user quantity is greater than stock quantity, console.log insufficient quantity
			if([answer.Units] >= res[i].stock_quantity){
    			console.log("----------------------------------------------------------------------------");
				console.log("Insufficient quantity! Cannot purchase.");
				console.log("----------------------------------------------------------------------------");
				start();
			}


			else{
				//creating variable for the updated quantity after user requests
				var updatedQuantity = (res[i].stock_quantity - [answer.Units]);
				//creating variable for the price
				var price = res[i].price;
				//updating the database
				connection.query(

					"UPDATE products SET ? WHERE ?",
					[
					{
						stock_quantity: updatedQuantity
					},
					{
						item_id: [answer.SelectID]
					}

					],
					function(err, res) {
						if (err) throw err;
      					//console.log(res.affectedRows);
    					console.log("----------------------------------------------------------------------------");
      					console.log("Quantity left: "+ updatedQuantity);
    					console.log("----------------------------------------------------------------------------");
      					console.log("Your cost is: " + price + " dollars");
    					console.log("----------------------------------------------------------------------------");
    					connection.destroy();
      				}

					);
				}
			}	
		});		
	})
}











