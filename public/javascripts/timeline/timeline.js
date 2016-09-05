'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('aromeo')
	.directive('timeline',function() {
    return {
        templateUrl:'javascripts/timeline/timeline.html',
        restrict: 'E',
        replace: true,
    }
  });
