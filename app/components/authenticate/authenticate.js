angular
	.module('app.authenticate', [])
	.controller('AuthenticateController', ['User', '$rootScope', '$state', 'lodash', AuthenticateController]);

function AuthenticateController(User, $rootScope, $state, lodash) {
	var authenticate = this;

	// create the objects for our forms
	authenticate.signupData = {};
	authenticate.loginData  = {
		email: 'ben@learnt.global',
		password: 'password'
	};

	// bind the functions to our controller
	authenticate.signup = signup;
	authenticate.login  = login;

	/**
	 * Sign a user up and bind their info to $rootScope 
	 */
	function signup() {
		User.signup(authenticate.signupData)
			.then(function(data) {
				if (!lodash.isEmpty(data)) {
					$rootScope.currentUser.id    = data._id;
					$rootScope.currentUser.name  = data.displayName;
					$rootScope.currentUser.image = data.profileImg;

					// redirect the user
          			$state.go('home');
				}
			});
	}

	/**
	 * Use the User factory to log a user in
	 * Bind the user's information to $rootScope
	 */
	function login() {
		User.login(authenticate.loginData)
			.then(function(data) {
				if (!lodash.isEmpty(data)) {
					$rootScope.currentUser.id    = data._id;
					$rootScope.currentUser.name  = data.displayName;
					$rootScope.currentUser.image = data.profileImg;

					// redirect the user
          			$state.go('home');
				}
			});
	}
}