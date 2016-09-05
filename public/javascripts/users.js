'use strict';
/**
 * @ngdoc function
 * @name aromeo.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Agileromeo app
 */
 var app = angular.module('tango',[]);
 // angular.module('tango',[])
 app.factory('Users', function($http){
   return {
    get : function() {
      return $http.get('/api/users');
    },

    searchById : function(id) {
      return $http.get('/api/users/' + id);
    },

    searchByAuthor : function(papersAuthored) {
      return $http.get('/api/users/search' + papersAuthored);
      
    },

    searchByName : function(username) {
      return $http.get('/api/users/search/' + username);
    }
  }
});


  // angular.module('tango',[])
  app.controller('UsersCtrl', function($scope,$http){
  
  $scope.formData = {};

        // when landing on the page, get all todos and show them
        $http.get('/api/users')
                .success(function(data) {
                        $scope.users = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });

        $scope.searchById = function(userid) {
          $http.get('/api/users/' + userid)
                  .success(function(data) {
                          $scope.user = data;
                  })
                  .error(function(data) {
                          console.log('Error: ' + data);
                  });
        };

        $scope.searchByName = function(username) {
          $http.get('/api/users/search/' + username)
                  .success(function(data) {
                          $scope.currentUser = data;
                  })
                  .error(function(data) {
                          console.log('Error: ' + data);
                  });
        }

        $scope.searchByAuthor = function(papersAuthored) {
          $http.get('/api/users/search/' + papersAuthored)
                  .success(function(data) {
                          $scope.user = data;                  })
                  .error(function(data) {
                          console.log('Error: ' + data);
                  });
        }

});