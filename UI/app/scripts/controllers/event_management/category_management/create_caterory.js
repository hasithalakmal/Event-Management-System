'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('create_category', function ($scope, $http) {
    //define variables
    $scope.categoryName = "";


    $scope.submit = function () {
        // Simple GET request example:
        $http({
            method: 'POST',
            url: 'http://localhost:8084/EventManagement/category',
            data: {
                "categoryName": $scope.categoryName
            }
        }).then(function successCallback(response) {
            swal("Success!", "Subject is Successfully Registered!", "success");
			$scope.categoryName = "";
            console.log(response);
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                );
        });
    };


});