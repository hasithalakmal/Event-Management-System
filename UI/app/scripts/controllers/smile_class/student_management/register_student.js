'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('register_student', function ($scope, $http) {
    //define variables
    $scope.studentname = '';


    $scope.submit = function () {
        // Simple GET request example:
        $http({
            method: 'POST',
            url: 'http://localhost:8084/SmileClass/student',
            data: {
                "stuName": $scope.studentname,
                "dOB": $scope.dob,
                "stuPhone1": $scope.phone1,
                "stuPhone2": $scope.phone2,
                "stuPhone3": $scope.phone3,
                "guarName": $scope.guardianname,
                "stuAdress": $scope.address,
                "stuSchool": $scope.school
            }

        }).then(function successCallback(response) {
            swal("Success!", "Student is Successfully Registered!", "success");
            $scope.studentname = "";
            $scope.dob = "";
            $scope.phone1 = "";
            $scope.phone2 = "";
            $scope.phone3 = "";
            $scope.guardianname = "";
            $scope.address = "";
            $scope.school = "";
            console.log($scope.dob);


        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });
    };



});