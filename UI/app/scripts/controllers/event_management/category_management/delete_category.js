'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('delete_category', function ($scope, $http) {
	$scope.subject_names_select = "";

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/EventManagement/category'
        }).then(function successCallback(response) {
            $scope.subject_names_select = response.data.result;
            $scope.selected = response.data.result[0].categoryId;
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });
    };


    $scope.submit = function () {
        $http({
            method: 'DELETE',
            url: 'http://localhost:8084/EventManagement/category/' + $scope.selected
        }).then(function successCallback(response) {
            swal(
                    'Success!',
                    'Subject is successfully deleted!',
                    'success'
                    )

            $scope.init();

        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });
    };

});