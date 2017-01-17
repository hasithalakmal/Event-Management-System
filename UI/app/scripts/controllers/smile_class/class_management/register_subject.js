'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('register_subject', function ($scope, $http) {
    //define variables
    $scope.subjectname = '';


    $scope.submit = function () {
        // Simple GET request example:
        $http({
            method: 'POST',
            url: 'http://localhost:8084/SmileClass/subject',
            data: {
                "subName": $scope.subjectname,
                "recordAdded": 1
            }
        }).then(function successCallback(response) {
            swal("Success!", "Subject is Successfully Registered!", "success");
			            $scope.subjectname = "";
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