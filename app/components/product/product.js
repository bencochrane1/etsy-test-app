angular
	.module('app.product', [])
	.controller('ProductController', ['Product', '$stateParams', ProductController]);

function ProductController(Product, $stateParams) {
	var product = this;
	product.commentData = {};
	product.createComment = createComment;
	product.openCheckout = openCheckout;

	var handler = StripeCheckout.configure({
	  key: 'pk_test_2ZjfGTlQmUB6B3pXaBtHH7rb',
	  image: 'https://stripe.com/img/documentation/checkout/marketplace.png',
	  locale: 'auto',
	  token: function(token) {
	  	console.log('got the token:', token)
	    // You can access the token ID with `token.id`.
	    // Get the token ID to your server-side code for use.
	  }
	});

	window.addEventListener('popstate', function() {
	  handler.close();
	});

	function openCheckout() {
		console.log('in here clicked?????', product.listing);

		handler.open({
			name: product.listing.name,
			description: product.listing.name,
			zipCode: true,
			currency: 'aud',
			amount: product.listing.price * 100
		});
	}



	console.log('stateparams', $stateParams);
	// get the product for this page and bind it to the product.listing object
	Product.get($stateParams.id)
		.then(function(data) {
			// since this is a singular Stamplay model that was returned, we can bind instance directly
			product.listing  = data;
			console.log('the listing is:', data)
			product.pictures = data.pictures;
		});

	// get all the comments and bind to product.comments
	Product.getComments($stateParams.id)
		.then(function(data) {
			product.comments = data;
		});

  /**
   * Create a new comment on this product
   */
  function createComment() {
    Product.comment($stateParams.id, product.commentData)
      .then(function(data) {
        // clear the comment form
        console.log('data backcomment', data)
        product.commentData = {};

        // replace the comments with the new comments returned
        product.listing.actions.comments = data.actions.comments;
      });
  }

}