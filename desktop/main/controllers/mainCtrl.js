angular.module('mainCtrl', ['ordenService', 'authService'])

.controller('mainController', function($scope,$rootScope, $location, Auth) {
	$scope.loggedIn = Auth.isLoggedIn();

	$rootScope.$on('$routeChangeStart', function() {
		Auth.getUsuario()
			.then(function (data) {
				$scope.usuario = data.data;
				console.log($scope.usuario);
			});
	});

	$scope.doLogin = function() {
		Auth.login($scope.loginData.email, $scope.loginData.password)
			.success(function (data) {
				if(data.success)
					$location.path('/home');
				else
					$scope.message = data.message;
			});
	};

	$scope.doLogout = function() {
		Auth.logout();
		$scope.usuario = {};
		$location.path('/');
	};

})

.controller('homeController', function($scope, $interval, Orden) {
	$scope.callAtInterval = function() {
        console.log("$scope.callAtInterval - Interval occurred");
    }

    $interval( function(){ $scope.callAtInterval(); }, 3000);
});

