angular	
	.module('OrderService', [])
	.factory('Order', ['$stamplay', '$q', '$http', OrderService]);

function OrderService($stamplay, $q, $http) {

	return {
		create: create,
		charge: charge,
		history: history
	};

	/**
	 * Create a new order
	 */
	// function create(data) {
	// 	var def = $q.defer();

	// 	// instantiate a new order model from the stamplay js sdk
	// 	Stamplay.Object('orders').Model;		
		
	// 	// loop over the fields in data and update the order
	// 	angular.forEach(data, function(value, key) {
	// 		order.set(key, value);
	// 	});
		
	// 	// save the object
	// 	order.save()
	// 		.then(function() {
	// 			def.resolve(order);
	// 		});

	// 	return def.promise;
	// }



	function create(order) {
		var deferred = $q.defer();
		order.product = order.product[0];

		console.log('orders in service: ', order)

        Stamplay.Object('orders').save(order)
        .then(function(res) {
        	deferred.resolve(res)
        })
        .catch(function(err) {
        	console.error(err);
        	deferred.reject(err);
        });

		return deferred.promise;
	}	

	/**
	 * Charge a customer
	 */
	function charge(userID, price, cardData) {
		var def = $q.defer();

		console.log('data in ', cardData);

		// create the card token
		Stripe.card.createToken(cardData, function(status, response) {
			// we now have the card token
			var token = response.id;
			console.log('create token status: ', status)
			console.log('create token response: ', response)

			// charge the customer
			price = price * 100; // turn the price into pennies
			Stamplay.Stripe.charge(userID, token, price, 'AUD')
				.then(function(res) {
					console.log('charge user res: ', res)
					def.resolve(res);
				})
				.catch(function(err) {
					def.reject(err);
					console.error(err);
				});

		});

		return def.promise;
	}

	/**
	 * View all the orders for one user
	 */
	function history(userID) {
		var def = $q.defer();

		// instantiate a new orders collection from the stamplay js sdk
		Stamplay.Object('orders').get({populate: true})
			.then(function(res) {
				def.resolve(res.data);
			})
			.catch(function(err) {
				def.reject(err);
			});

		return def.promise;
	}

}