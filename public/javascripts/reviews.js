'use strict';
/**
 * @ngdoc function
 * @name tango.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the Tango app
 */
//  angular.module('reviewsModule',[])
//  .factory('Review', function($http){
//    return {
//   }
// });

  angular.module('aromeo',[])

  .controller('ReviewsCtrl', ['$scope','$http','$rootScope','auth','Users','$state',
    function($scope,$http,$rootScope,auth,Users,$state){
  
  var currUserID = auth.currentUserID();
  $scope.fileurl = "#";

        $scope.getAssignedSubs = function(id) {
            $http.get('/api/assignedsubs/' + currUserID)
                .success(function(data) {
                        $scope.assignedSubs = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
        };

        // $scope.getSubForReview = function(paper_id) {
        //     Papers.getPaper(paper_id)
        //         .success(function(data) {
        //                 $scope.sub = data;
        //         })
        //         .error(function(data) {
        //                 console.log('Error: ' + data);
        //         });
        // }

        $scope.getPaper = function(paper_id) {
                $http.get('/api/papers/' + paper_id)
                        .success(function(data) {
                                $scope.sub = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        $scope.createReview = function() {
                $http.post('/api/reviews', $scope.reviewData)
                        .success(function(data) {
                                $scope.currReview = data;
                                $state.go('home.listAssignedSubs');
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };

        $scope.getMyReviews = function() {
            $http.get('/api/reviews/' + currUserID)
                .success(function(data) {
                        $scope.myReviews = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
        };

        $scope.getAllReviews = function() {
            $http.get('/api/reviews/')
                .success(function(data) {
                        $scope.AllReviews = data;
                })
                .error(function(data) {
                        console.log('Error: ' + data);
                });
        };

        $scope.updateReview = function(id) {
                $http.put('/api/reviews/' + id, $scope.reviewData)
                        .success(function(data) {
                                $scope.currReview = data;
                        })
                        .error(function(data) {
                                console.log('Error: ' + data);
                        });
        };


        $scope.downloadFile = function(paper_id) {
            $scope.fileurl = "/api/download/" + paper_id;
        }


        // --------------------------------------------------------------

        $scope.saveObject = function(object) {
            $rootScope.object = object;
        };

        $scope.getObject = function() {
            var temp = JSON.parse(JSON.stringify($rootScope.object)); // only return copy of object, not ref
            return temp;
        };


        $scope.prepCreateReview = function(){

            $scope.reviewData.forSubmission = $scope.getPaper();
            
            Users.searchById(currUserID)
                .success(function(data) {
                    $scope.reviewData.reviewer = data;
                    
                    $scope.createReview();
                })
                .error(function(data) {
                    console.log('Error: ' + data);
                });
        }

}]);