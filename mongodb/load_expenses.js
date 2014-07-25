var n = db.expenses.count();

if( n == 0 ){
	db.expenses.insert({
		description: "expense 1",
		date: Date.now(),
		amount: 1000
	});
	
	db.expenses.insert({
		description: "expense 2",
		date: Date.now(),
		amount: 300
	});

	db.expenses.insert({
		description: "expense 3",
		date: Date.now(),
		amount: 5430
	});
}