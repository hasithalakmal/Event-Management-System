'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('other_payment', function ($scope, $http) {
    //define variables



    $scope.submit = function () {
        $scope.object = {
            "Amount": $scope.ammount,
            "otherexpense": $scope.description
        };
        // Simple GET request example:
        $http({
            method: 'POST',
            url: 'http://localhost:8084/SmileClass/otherExpense',
            data: JSON.stringify($scope.object)
        }).then(function successCallback(response) {
            swal("Success!", "Database is Succesfully Created", "success");
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