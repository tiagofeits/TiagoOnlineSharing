﻿(function () {
    'use strict';

    angular
        .module('app', [
            'ngRoute',
            'ui.bootstrap'
        ])
        .config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
            $locationProvider.hashPrefix('');

            $routeProvider
                .when('/', {
                    controller: 'userController',
                    templateUrl: '/app/templates/user.html'
                })
                .when('/adduser', {
                    controller: 'userAddController',
                    templateUrl: '/app/templates/userAdd.html'
                })
                .when('/edituser/:id', {
                    controller: 'userEditController',
                    templateUrl: '/app/templates/userEdit.html'
                })
                .otherwise({ redirectTo: '/' });
        }]);
})();