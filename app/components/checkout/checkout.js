angular
	.module('app.checkout', [])
	.controller('CheckoutController', ['$stateParams', '$rootScope', 'Product', 'Order', '$state', CheckoutController]);

function CheckoutController($stateParams, $rootScope, Product, Order, $state) {
	var checkout             = this;
	checkout.orderData       = {}; 		// create an empty object to hold order data
	checkout.cardData        = {
		cvc: 123,
		exp_month: 09,
		exp_year: 2020,
		number: 4242424242424242
	};  	// create an empty object to hold credit card data
	checkout.processPurchase = processPurchase;

	// grab the product by the $stateParams.id
	Product.get($stateParams.id)
		.then(function(data) {
			// since this is a singular Stamplay model that was returned, we can bind instance directly
			checkout.product = data;

			// grab the product id and set it to an object called orderData
			checkout.orderData.product = [data._id];
			checkout.orderData.price   = data.price;
		});

	/**
	 * Process the purchase
	 */
	function processPurchase() {
		// clear the success message
		checkout.sucessMessage = '';

		// charge the user first
		console.log('rootscope: ', $rootScope.currentUser.id)
		console.log('price: ', checkout.orderData.price)
		console.log('card data: ', checkout.cardData)

		Order.charge($rootScope.currentUser.id, checkout.orderData.price, checkout.cardData)
			.then(function(data) {
				console.log('charge success: ', data)


				console.log('order crate data in:', checkout.orderData)
				// then we will create the order on successful charge
				Order.create(checkout.orderData)
					.then(function(res) {
						// purchase successful
						checkout.successMessage = 'Thanks for your order! Your order number is #' + res._id;
						setTimeout(function() {
							$state.go('admin');
						}, 2000)
					})
					.catch(function(err) {
						console.error(err);
					});
			})
			.catch(function(err) {
				console.error(err);
			});

	}
}