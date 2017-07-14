const mysql = require("mysql");
const inq = require("inquirer");


//Create connection info to MySQL bamazon database
const connection = mysql.createConnection({	
	host: "localhost",
	port: 3306,
	user: "user",
	password: "password",
	database: "bamazon"
});


//Connect to MySQL database and query bamazon for what it normally stocks

connection.connect(function(err) {

	if(err) throw err;

	connection.query("SELECT * FROM products", function(err, res) {

		if(err) throw err;

		//try to set variables to grab the item being chosen
		var iId;
		var iName;
		var iCost;
		var iQnty;
		var buyQnty;

		for(let i = 0; i < res.length; i++) {
			console.log("\n" + res[i].itemId + "  | " +  res[i].itemName + " | " +  res[i].deptName + " | " + res[i].cost);
		};

		inq.prompt([
			{
				name: "item",
				message: "Please enter the ID of the item you are interested in:\n\n"
			}
		]).then(function(reply) {

			iId = parseInt(reply.item.trim());
			iId -=1;


			inq.prompt([
				{
					name: "quantity",
					message: "How many would you like to purchase?"
				} 
			]).then(function(reply2) {

				buyQnty = parseInt(reply2.quantity.trim());

			});

		});

		if(iId != null) {

		iName = res[iId].itemName;
		iCost = parseFloat(res[iId].itemCost);
		iQnty = res[iId].stkQnty;

		};

		processPurchase(iName, iCost, buyQnty, iQnty);

	});

});



function processPurchase(name, cost, qnty, stkQnty) {

	if(stkQnty > 0) {

		let total = cost * qnty;

		console.log("You have purchased " + qnty + " " + name + " for $" + total + ". Thank you for your business!");

	};

};
