'use strict';


// Declare app level module which depends on filters, and services
var samajseva =  angular.module('samajseva', ['ngGrid']);

samajseva.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/home.html'});
    $routeProvider.when('/viewmembers', {templateUrl: 'partials/membership.html'});
	$routeProvider.when('/activities', {templateUrl: 'partials/activities.html'});
	$routeProvider.when('/aboutus', {templateUrl: 'partials/aboutus.html'});
	$routeProvider.when('/contactus', {templateUrl: 'partials/contactus.html'});
	$routeProvider.when('/membership', {templateUrl: 'partials/form.html',controller: 'FormCtrl'});
    
    $routeProvider.otherwise({redirectTo: '/home'});
    $locationProvider.html5Mode(true);
  
  }]);


samajseva.factory('AdminMemberForm', function($rootScope) {
    return {
        broadcast: function(tempObj) {
            $rootScope.$broadcast('NewMemberShow', tempObj);
        }
    };
});

samajseva.factory('MemberLogin', function($rootScope) {
    return {
        broadcast: function(tempObj) {
            $rootScope.$broadcast('MemberLoginShow', tempObj);
        }
    };
});

samajseva.factory('sessionInfo', function($rootScope) {
    return {
        broadcast: function(tempObj) {
            return ($rootScope.$broadcast('getSessionInformation', tempObj));
        }
    };
});





