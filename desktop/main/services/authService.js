// servicio para implementar el login en el cliente
angular.module('authService', [])
//factory que permite enviar los datos mediante el formulario de login
.factory('Auth',function($http, $q, AuthToken) {
    var authFactory = {};

    /* 	se generan los argumentos que se pasaran 
     	a la peticion post y en caso de que la operacion
     	sea exitosa, obtendremos un token que se almacenara
     	en el local storage
     */
    authFactory.login = function(email, password) {
      return $http.post('http://104.236.247.213/api/authenticate', {
        email:    email,
        password: password
      })
        .success(function(data){
          console.log(data);
          if(data.admin == true){
            AuthToken.setToken(data.token);
            return data;
          }else{
            return false;
          }
        });
    };

    /* 	funcion para finalizar la sesion
    	lo que hace es eliminar el token
    	la funciona setToken() de AuthToken 
    	limpia el token del local storage
    */
    authFactory.logout = function(){
      AuthToken.setToken();
    };
    /*
		Comprobar si el usuario esta loggeado
    */
    authFactory.isLoggedIn = function(){
      if(AuthToken.getToken())
        return true;
      else
        return false;
    };
    /*
		Funcion que se utiliza para obtener los datos del usuario actual
    */
    authFactory.getUsuario = function() {
      if(AuthToken.getToken())
        return $http.get('http://104.236.247.213/api/usuarioOn');
      else
        return $q.reject({ message: 'el usuario no tiene token'});
    };

    return authFactory;
  })


.factory('AuthToken', function($window) {
      var authTokenFactory = {};

      // devuelve el token que se encuntra en local storage
      authTokenFactory.getToken = function() {
        return $window.localStorage.getItem('token');
      };

      /*
		Cuando esta funcion es llamada con un argumento (token valido generado por la api)
		lo almacena en local storage, en caso de llamarse sin argumentos remueve el token
		del local storage
      */
      authTokenFactory.setToken = function(token) {
        if(token)
          $window.localStorage.setItem('token',token);
        else
          $window.localStorage.removeItem('token');
      };

      return authTokenFactory;
  })

	
.factory('AuthInterceptor', function($q,$location,AuthToken){
    var interceptorFactory = {};

    // funcion para utilizar el token en una peticion
    interceptorFactory.request = function(config){
      var token = AuthToken.getToken();

      if(token){
        config.headers['x-access-token'] = token;
      }
      else{
        $location.path('/');
      }

      return config;
    };

    interceptorFactory.responseError = function(response) {
      
      if(response.status == 403){
        AuthToken.setToken();
        $location.path('/');
      }
      return $q.reject(response);
    };

    return interceptorFactory; 
  });
