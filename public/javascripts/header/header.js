'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('aromeo')
	.directive('header',function(){
		return {
        templateUrl:'javascripts/header/header.html',
        restrict: 'E',
        replace: true,
    	}
	});


