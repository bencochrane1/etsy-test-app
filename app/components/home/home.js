angular
	.module('app.home', [])
	.controller('HomeController', ['Product', HomeController]);

function HomeController(Product) {
	var home = this;

	// get all the products and bind them to home.products
	Product.all()
		.then(function(data) {
			console.log('home data', data)
			home.products = data;
		});

}