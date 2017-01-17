'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('delete_subject', function ($scope, $http) {

    $scope.subject_names_select = "";

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/subject'
        }).then(function successCallback(response) {
            $scope.subject_names_select = response.data.result;
            $scope.selected = response.data.result[0].subId;
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
            url: 'http://localhost:8084/SmileClass/subject/' + $scope.selected
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