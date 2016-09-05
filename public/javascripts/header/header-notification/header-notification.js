'use strict';

/**
 * @ngdoc directive
 * @name izzyposWebApp.directive:adminPosHeader
 * @description
 * # adminPosHeader
 */
angular.module('aromeo')
	.directive('headerNotification',function(){
		return {
        templateUrl:'javascripts/header/header-notification/header-notification.html',
        restrict: 'E',
        replace: true,
    	}
	});


