angular
  .module('ionicApp')
  .config(config);

function config($stateProvider, $urlRouterProvider,$httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
    $stateProvider
  /////////Tabs/
    .state('tab', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
      })
  ///////////Vistas//////////////////////
    .state('login', {
      url: '/login',
      cache : false,
      templateUrl: 'templates/login.html',
      controller: 'loginCtrl'
    })

    .state('register',{
      url:'/register',
      templateUrl: 'templates/register.html',
      controller : 'registerCtrl'
    })

    .state('recover',{
      url:'/recover',
      templateUrl: 'templates/recover.html'
    })

    .state('tab.menu',{
      url:'/menu',
      views: {
        'tab-menu': {
          templateUrl: 'templates/menu.html',
          controller: 'menuCtrl'
        }
      }

    })

    .state('tab.carrito',{
      url:'/carrito',
      cache : false,
      views: {
        'tab-carrito': {
          templateUrl: 'templates/carrito.html',
          controller: 'carritoCtrl'
        }
      }
    })

    .state('tab.settings',{
      url:'/settings',
      views: {
        'tab-settings': {
          templateUrl: 'templates/settings.html',
          controller : 'settingsCtrl'
        }
      }
    })

    .state('tab.historial',{
      url:'/settings/historial',
      cache : false,
      views: {
        'tab-settings': {
          templateUrl: 'templates/historial.html',
          controller: 'historialCtrl'
        }
      }

    })

    .state('tab.home',{
      url:'/home',
      views: {
        'tab-home': {
          templateUrl: 'templates/home.html',
          controller: 'homeCtrl'
        }
      }
    })

    .state('tab.compra',{
      url:'/carrito/compra',
      cache : false,
      views: {
        'tab-carrito': {
          templateUrl: 'templates/compra.html',
          controller: 'compraCtrl'
        }
      }

    })





    .state('tab.platillo',{
      url: '/menu/:idPlatillo',
        views: {
          'tab-menu' : {
            templateUrl: 'templates/platillo.html',
            controller : 'platilloCtrl'
          }
        }

    });

    $urlRouterProvider.otherwise("/tab/home");
}
