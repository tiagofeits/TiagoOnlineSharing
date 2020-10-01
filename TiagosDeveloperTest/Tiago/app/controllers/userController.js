(function () {
    'use strict';

    angular
        .module('app')
		//query user
        .controller('userController', ['$scope', '$filter', 'dataService', function ($scope, $filter, dataService) {
            $scope.users = [];
            $scope.currentPage = 1;
            $scope.itemsPerPage = 5;

            getData();

            function getData() {
                dataService.getUsers().then(function (result) {
                    $scope.$watch('searchText', function (term) {
                        $scope.users = $filter('filter')(result, term);
                    });
                });
            }

            $scope.deleteUser = function (id) {
                var internalButtons = "<div style='clear:both;margin-top:10px;'>";
                internalButtons += "<div style='margin-left:15%;margin-right:5%;float:left;'>";
                internalButtons += "<button type='button' id='confirmDelete' class='btn btn-warning'>Yes</button>";
                internalButtons += "</div><div style='margin-left:5%;float:left;'>";
                internalButtons += "<button type='button' class='btn btn-warning'>No</button>";
                internalButtons += "</div ></div >";
                toastr.warning(internalButtons, 'Are you sure you want to delete this User?',
                    {
                        positionClass: 'toast-top-right',
                        closeButton: false,
                        allowHtml: true,
                        onShown: function (toast) {
                            $("#confirmDelete").click(function () {
                                dataService.deleteUser(id).then(function () {
                                    toastr.success('User deleted successfully');
                                    getData();
                                }, function () {
                                    toastr.error('Error while deleting user with Id: ' + id);
                                });
                            });
                        }
                    });
            };

            $scope.sortBy = function (column) {
                $scope.sortColumn = column;
                $scope.reverse = !$scope.reverse;
            };
        }])
		//create new
        .controller('userAddController', ['$scope', '$location', 'dataService', function ($scope, $location, dataService) {
            $scope.createUser = function (user) {
                dataService.addUser(user).then(function () {
                    toastr.success('User created successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error while creating user');
                });
            };
        }])
		
		//edit existing
        .controller('userEditController', ['$scope', '$routeParams', '$location', 'dataService', function ($scope, $routeParams, $location, dataService) {
            $scope.user = {};
            $scope.states = {
                showUpdateButton: false
            };

            dataService.getUserById($routeParams.id).then(function (result) {
                $scope.user = result;
                $scope.states.showUpdateButton = true;
            }, function () {
                toastr.error('Error while fetching user with Id: ' + $routeParams.id);
            });

            $scope.updateUser = function (user) {
                dataService.editUser(user).then(function () {
                    toastr.success('User updated successfully');
                    $location.path('/');
                }, function () {
                    toastr.error('Error while updating user');
                });
            };
        }]);
})();