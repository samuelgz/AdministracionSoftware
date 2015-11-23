angular.module('mainCtrl', [])

.controller('mainController', function($scope,$rootScope, $location, Auth) {
	$scope.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function() {
		Auth.getUsuario()
			.then(function (data) {
				$scope.usuario = data;

			});
	});

	$scope.doLogin = function() {
		Auth.login($scope.loginData.email, $scope.loginData.password)
			.success(function (data) {
				if(data.success)
					$location.path('/home');
				else
					$scope.message = data.message;
				//console.log(data.message);
			});
	};

	$scope.doLogout = function() {
		Auth.logout();

		$scope.usuario = {};
		$location.path('/');
	};

});