'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('delete_class_type', function ($scope, $http) {

    $scope.grade_select = "";

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/class-type'
        }).then(function successCallback(response) {
            $scope.grade_select = response.data.result;
            $scope.selected = response.data.result[0].clsTypeId;
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
            url: 'http://localhost:8084/SmileClass/class-type/' + $scope.selected
        }).then(function successCallback(response) {
            swal(
                    'Success!',
                    'Class Type is Successfully Deleted!',
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