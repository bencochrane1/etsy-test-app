angular
	.module('UserService', [])
	.factory('User', ['$stamplay', '$q', 'lodash', UserService]);

function UserService($stamplay, $q, lodash) {

	// return an object with all our functions
	return {
		getCurrent: getCurrent,
		signup: signup,
		login: login,
		logout: logout
	};

	/**
	 * Get the current logged in user
	 */
	function getCurrent() {
		var def = $q.defer();

		// instantiate a new user model from the stamplay js sdk
		Stamplay.User.currentUser()
			.then(function(res) {
				def.resolve(res);
			});

		return def.promise;
	}

	/**
	 * Register a user with their name, email, and password
	 */
	function signup(data) {
		var def = $q.defer();

		// instantiate a new user model from the stamplay js sdk
		var user = $stamplay.User().Model;
		user.signup(data)
			.then(function() {
				// send the entire user model back
				def.resolve(user);
			})

		return def.promise;
	}

	/**
	 * Log a user in with their email and password
	 */
	function login(data) {
		var def = $q.defer();

		Stamplay.User.login(data)
			.then(function(res) {
				console.log('res login', res)
				def.resolve(res) 
			})
			.catch(function(err) { console.error(err) });

		return def.promise;
	}

	/**
	 * Log the current user out
	 * Will also redirect the browser to the logout url (home)
	 */
	function logout() {
		Stamplay.User.logout();
	}

}