'use strict';
/**
 * @ngdoc function
 * @name aromeo.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Agileromeo app
 */
angular.module('aromeo')
  .factory('auth', ['$http','$window', function($http,$window){
  	var auth={};

  	auth.saveToken=function(token){
  		$window.localStorage['aromeo-token']=token;
  	}

  	auth.getToken=function(token){
  		return $window.localStorage['aromeo-token'];
  	}

  	auth.isLoggedIn = function(){
  		var token = auth.getToken();

  		if(token){
    		var payload = JSON.parse($window.atob(token.split('.')[1]));

    		return payload.exp > Date.now() / 1000;
  		}
  		else {
    		return false;
  		}
	};
	auth.currentUser = function(){
  		if(auth.isLoggedIn()){
   			var token = auth.getToken();
  			var payload = JSON.parse($window.atob(token.split('.')[1]));

   			return payload.username;
 		 }
	};
	auth.register = function(user){
 		 return $http.post('/register', user).success(function(data){
  		  auth.saveToken(data.token);
 		 });

	};

//To provide ObjectID of the logged in user
  auth.currentUserID = function(){
    if(auth.isLoggedIn()){
      return auth.currentUserObjID;
    }

  };
  
	// auth.logIn = function(user){
 // 		 return $http.post('/login', user).success(function(data){
 //   		 auth.saveToken(data.token);
 // 		 });
	// };

auth.logIn = function(user){
     return $http.post('/login', user).success(function(data){
       auth.saveToken(data.token);
       auth.currentUserObjID=data.uid;
       console.log(auth.currentUserObjID);
       
     });
  };

	auth.logOut = function(){
  		$window.localStorage.removeItem('aromeo-token');
	};
  	return auth;
  		
  	}

  ]);


angular.module('aromeo').controller('AuthCtrl', ['$scope','$state','auth', function($scope,$state,auth){
	$scope.user={};
	$scope.register=function(){
		auth.register($scope.user).error(function(error){
		$scope.error=error;
	}).then(function(){
		$state.go('home');
	});
	};
	$scope.login=function(){
		auth.logIn($scope.user).error(function(error){
			$scope.error=error;
		}).then(function(){
			$state.go('home');
		})
	};
}

]);