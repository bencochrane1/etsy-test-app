angular	
	.module('ProductService', [])
	.factory('Product', ['$stamplay', '$q', '$http', ProductService]);

function ProductService($stamplay, $q, $http) {

	return {
		all: all,
		get: get,
		create: create,
		update: update,
		destroy: destroy,
		getComments: getComments,
		comment: comment,
		createPicture: createPicture,
		getCategories: getCategories
	};


	/** 
	 * Get all the products
	 */
	function all() {
		var def = $q.defer();

		// instantiate a new product collection from the stamplay js sdk
		Stamplay.Object('products').get({populate: true})
		.then(function(res) {
			console.log('res back products: ', res)
			def.resolve(res.data);
		});

		return def.promise;
	}

	/**
	 * Get a single product
	 */
	function get(id) {
		var def = $q.defer();

		// instantiate a new product model from the stamplay js sdk
		Stamplay.Object('products').get({_id: id, populate: true})
		.then(function(res) {
			def.resolve(res.data[0]);
		})
		.catch(function(err) {
			console.error(err);
		});

		return def.promise;
	}

	/**
	 * Create a product
	 */
	function create(data) {
		var def = $q.defer();

		// instantiate a new product model from the stamplay js sdk
		if (!!data.category) data.category = [data.category];
		console.log('data in: ', data);

		// save the object
		Stamplay.Object('products').save(data)
			.then(function(res) {
				def.resolve(res);
			})
			.catch(function(err) {
				def.reject(err);
			});

		return def.promise;
	}

	/**
	 * Update an existing product
	 */
	function update(id, data) {
		var def = $q.defer();

		// instantiate a new product model from the stamplay js sdk
		Stamplay.Object('products').patch({id, data})
			.then(function(res) {
				def.resolve(res.data);
			})
			.catch(function(err) {
				def.reject(err);
			});

		return def.promise;
	}

	/**
	 * DESTROY a product
	 */
	function destroy(id) {
		var def = $q.defer();

		// instantiate a new product model from the stamplay js sdk
		Stamplay.Object('products').remove(id)
			.then(function(res) {
				// return true that the product was deleted
				def.resolve({ 'success': true });
			})
			.catch(function(err) {
				def.resolve(err);
			});

		return def.promise;
	}

	/**
	 * Get all the comments for a specific product
	 */
	function getComments(id) {
		var def = $q.defer();

		// instantiate a new product model from the stamplay js sdk
		Stamplay.Object('products').get({_id: id})
			.then(function(res) {
				def.resolve(res.data);
			})
			.catch(function(err) {
				console.error(err);
			});

		return def.promise;
	}

	/**
	 * `Comment` on a product
	 */
	function comment(id, data) {
		var def = $q.defer();

		console.log('data from comment', data)

		// instantiate a new product model from the stamplay js sdk
		Stamplay.Object('products').comment(id, data.text)
		.then(function(res) {
			console.log('res success comment ADDED', res)
			def.resolve(res);
		})
		.catch(function(err) {
			def.reject(err);
			console.error(err);
		});

		return def.promise;
	}	

	/**
	 * Create a picture
	 */
	function createPicture(files) {
		var def = $q.defer();

		// create an object for the ids
		var pictureIDs = [];

		// loop over the files and upload them via the Stamplay API
		angular.forEach(files, function(file) {

			// create a new formdata
			var fd = new FormData();
			fd.append('photo', file);

			// process the upload
			$http({
				method: 'POST',
				url: 'https://etsyairtasker.stamplayapp.com/api/cobject/v1/pictures',
				data: fd,
				headers: { 'Content-Type': undefined },
				photo: file
			})
				.then(function(response) {
					// push the given id into the pictureIDs array
					pictureIDs.push(response.data.id);
					def.resolve({ pictures: pictureIDs });
				});
		});

		return def.promise;
	}

	/**
	 * Get all the product categories
	 */
	function getCategories() {
		var def = $q.defer();

		// instantiate a new product collection from the stamplay js sdk
		Stamplay.Object('category').get({})
			.then(function(res) {
				def.resolve(res.data);
			})
			.catch(function(err) {
				def.reject(err);
			});

		return def.promise;
	}	

}