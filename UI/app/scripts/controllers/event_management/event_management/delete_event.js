'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('delete_event', function ($scope, $http) {
	$scope.subject_names_select = "";

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/EventManagement/event'
        }).then(function successCallback(response) {
            $scope.subject_names_select = response.data.result;
            $scope.selected = response.data.result[0].eventId;
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
            url: 'http://localhost:8084/EventManagement/event/' + $scope.selected
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