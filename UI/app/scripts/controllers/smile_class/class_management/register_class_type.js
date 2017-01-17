'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('register_class_type', function ($scope, $http) {
    //define variables
    $scope.grade = '';


    $scope.submit = function () {
        // Simple GET request example:
        $http({
            method: 'POST',
            url: 'http://localhost:8084/SmileClass/class-type',
            data: {
                "clsTypeName": $scope.grade,
                "recodeState": 1,
            }
        }).then(function successCallback(response) {
            swal("Success!", "Grade is Successfully Registered!", "success");
            $scope.grade = "";
            console.log(response);
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };



});