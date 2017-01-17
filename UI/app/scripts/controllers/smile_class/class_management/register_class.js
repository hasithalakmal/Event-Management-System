'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('register_class', function ($scope, $http) {

    $scope.teacher_names_select = "";

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/teacher'
        }).then(function successCallback(response) {
            $scope.teacher_names_select = response.data.result;
            $scope.teaId = response.data.result[0].teaId;
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    );
        });



        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/subject'
        }).then(function successCallback(response) {
            $scope.subject_names_select = response.data.result;
            $scope.subId = response.data.result[0].subId;
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    );
        });


        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/class-type'
        }).then(function successCallback(response) {
            $scope.class_type_names_select = response.data.result;
            $scope.clsTypeId = response.data.result[0].clsTypeId;
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    );
        });


    };

    $scope.cls_name = '';

    $scope.submit = function () {

        $http({
            method: 'POST',
            url: 'http://localhost:8084/SmileClass/studyClass',
            data: {
                "subId": $scope.subId,
                "payPeriod": "monthly",
                "percentage": $scope.percentage,
                "clsName": $scope.cls_name,
                "clsTypeId": $scope.clsTypeId,
                "teaId": $scope.teaId,
                "clsFee": $scope.cls_fees
            }
        }).then(function successCallback(response) {
            swal("Success!", "Class is Successfully Registered!", "success");
            $scope.cls_name = "";
            $scope.percentage = "";
            $scope.cls_fees = "";
            console.log(response);
        }, function errorCallback(response) {
            swal(
                    'error!',
                    'something wrong!',
                    'error'
                    );
        });
    };

});