'use strict';
/**
 * @ngdoc overview
 * @name aromeo
 * @description
 * # aromeo
 *
 * Main module of the application.
 */
angular.module('aromeo', [
    'oc.lazyLoad',
    'ui.router',
    'ui.bootstrap',
    'angular-loading-bar',
  ])
  .config(['$stateProvider','$urlRouterProvider','$ocLazyLoadProvider',function ($stateProvider,$urlRouterProvider,$ocLazyLoadProvider) {

    $ocLazyLoadProvider.config({
      debug:false,
      events:true,
    });

    $urlRouterProvider.otherwise('/login');

    $stateProvider
      .state('home', {
        url:'/home',
        templateUrl: 'pages/main.html',
        resolve: {
            loadMyDirectives:function($ocLazyLoad){
                return $ocLazyLoad.load(
                {
                    name:'aromeo',
                    files:[
                    'javascripts/header/header.js',
                    'javascripts/header/header-notification/header-notification.js',
                    'javascripts/sidebar/sidebar.js'
                                        ]
                }),
                $ocLazyLoad.load(
                {
                   name:'toggle-switch',
                   files:["bower_components/angular-toggle-switch/angular-toggle-switch.min.js",
                          "bower_components/angular-toggle-switch/angular-toggle-switch.css"
                      ]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngFileUpload',
                  files:["bower_components/ng-file-upload/ng-file-upload.js",
                         "bower_components/ng-file-upload/ng-file-upload.min.js",
                         "bower_components/ng-file-upload/ng-file-upload-shim.min.js"]
                }),
                $ocLazyLoad.load(
                {
                  name:'ngAnimate',
                  files:['bower_components/angular-animate/angular-animate.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngCookies',
                  files:['bower_components/angular-cookies/angular-cookies.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngResource',
                  files:['bower_components/angular-resource/angular-resource.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngSanitize',
                  files:['bower_components/angular-sanitize/angular-sanitize.js']
                })
                $ocLazyLoad.load(
                {
                  name:'ngTouch',
                  files:['bower_components/angular-touch/angular-touch.js']
                })
            }
        }
    })
      .state('home.dashboard',{
        url:'/dashboard',
        controller: 'MainCtrl',
        templateUrl:'pages/home.html',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              'javascripts/main.js',
              'javascripts/timeline/timeline.js',
              'javascripts/notifications/notifications.js',
              'javascripts/chat/chat.js',
              'javascripts/dashboard/stats/stats.js'
              ]
            })
          }
        }
      })
      .state('home.startsprint',{
        templateUrl:'pages/startSprint.html',
        url:'/startsprint'

    })
    .state('home.editprofile',{
      templateUrl:'pages/editprofile.html',
      url:'/edituser'

  })
    .state('home.sprinthome',{
      templateUrl:'pages/sprintbacklog.html',
      url:'/sprintbacklog'

  })
  .state('home.project',{
       templateUrl:'pages/project.html',
       url:'/project',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              
              
              'javascripts/notifications/notifications.js',
              'javascripts/timeline/timeline.js',
              'javascripts/dashboard/stats/stats.js'
              ]
            })
          }
        }
   })

     .state('home.productBacklog',{
       templateUrl:'pages/productBacklog.html',
       url:'/productBacklog'
   })
   .state('home.sprintselect',{
     templateUrl:'pages/sprintselect.html',
     url:'/sprintselect'
 })

     .state('home.createProject',{
       templateUrl:'pages/createProject.html',
       url:'/createProject'
   })
      .state('home.createtask',{
        templateUrl:'pages/createTask.html',
        url:'/createTask'
    })
      .state('login',{
        templateUrl:'pages/login.html',
        url:'/login',
        controller:'AuthCtrl',
        resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              
              'javascripts/angularApp.js',
              'javascripts/auth.js'
              ]
            })
          }
        }
    })
    
      .state('home.taskshome',{
        templateUrl:'pages/taskshome.html',
        url:'/taskshome'
    })

      .state('home.createSub',{
       templateUrl:'pages/createSub.html',
       url:'/createSub',
       controller:'PapersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              'javascripts/main.js',
              'javascripts/papers.js',
              'javascripts/autocomplete/autocomplete.js',
              'javascripts/autocomplete/autocomp.js',
              'javascripts/users.js',
              'javascripts/auth.js'
              ]
            })
          }
        }
   })

      .state('home.listMySubs',{
       templateUrl:'pages/listMySubs.html',
       url:'/listMySubs',
       controller:'PapersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              'javascripts/main.js',
              'javascripts/papers.js'
              ]
            })
          }
        }
   })
.state('home.listAllSubs',{
       templateUrl:'pages/listAllSubs.html',
       url:'/listAllSubs',
       controller:'PapersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              'javascripts/main.js',
              'javascripts/papers.js'
              ]
            })
          }
        }
   })


      .state('home.authorProfile',{
       templateUrl:'pages/authorProfile.html',
       url:'/authorProfile'
   })

      .state('home.viewSub',{
       templateUrl:'pages/viewSub.html',
       url:'/viewSub',
       controller:'PapersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              'javascripts/main.js',
              'javascripts/papers.js'
              ]
            })
          }
        }
   })

       .state('home.editSub',{
       templateUrl:'pages/editSub.html',
       url:'/editSub',
       controller:'PapersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              'javascripts/main.js',
              'javascripts/papers.js',
              'javascripts/autocomplete/autocomplete.js',
              'javascripts/autocomplete/autocomp.js',
              'javascripts/users.js',
              'javascripts/auth.js'
              ]
            })
          }
        }
   })

       .state('home.users',{
       templateUrl:'pages/users.html',
       url:'/users',
       controller:'UsersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              'javascripts/main.js',
              'javascripts/users.js'
              ]
            })
          }
        }
   })

       .state('home.authors',{
       templateUrl:'pages/listAuthors.html',
       url:'/authors',
       controller:'PapersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              'javascripts/main.js',
              'javascripts/papers.js'
              ]
            })
          }
        }
   })

       .state('home.reviewers',{
       templateUrl:'pages/reviewers.html',
       url:'/reviewers',
       controller:'PapersCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              'javascripts/main.js',
              'javascripts/papers.js'
              ]
            })
          }
        }
   })

       .state('home.reviews',{
       templateUrl:'pages/reviews.html',
       url:'/reviews',
       controller:'ReviewsCtrl',
       resolve: {
          loadMyFiles:function($ocLazyLoad) {
            return $ocLazyLoad.load({
              name:'aromeo',
              files:[
              'javascripts/main.js',
              'javascripts/reviews.js'
              ]
            })
          }
        }
   })

  }]);
