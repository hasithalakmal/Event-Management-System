'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('register_teacher', function ($scope, $http) {
    //define variables
    $scope.teachername = '';


    $scope.submit = function () {
        // Simple GET request example:
        $http({
            method: 'POST',
            url: 'http://localhost:8084/SmileClass/teacher',
            data: {
                "teaName": $scope.teachername,
                "teaAddress": $scope.teacheraddress,
                "teaPhone1": $scope.phone1,
                "teaPhone2": $scope.phone2,
                "teaPhone3": $scope.phone3,
                "techerSchool": $scope.techerSchool,
                "teaQua": $scope.teacherquality
            }
        }).then(function successCallback(response) {
            swal("Success!", "Teacher Details are Successfully Registered!", "success");
            $scope.teachername = "";
            $scope.teacheraddress = "";
            $scope.phone1 = "";
            $scope.phone2 = "";
            $scope.phone3 = "";
            $scope.techerSchool = "";
            $scope.teacherquality = "";

            console.log($scope.tea_address);

        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });
    };



});