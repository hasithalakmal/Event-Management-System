'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('search_not_paid_students', function ($scope, $http, $sce) {
    $scope.isStudentSelect = false;
    $(document).ready(function () {
        $scope.stusertable = $("#AllStudentTypeSearchResultByName").DataTable();
        $scope.stusertable2 = $("#AllStudentTypeSearchResultByName2").DataTable();
    });
    $scope.study_class_select = "";

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/studyClass'
        }).then(function successCallback(response) {
            $scope.study_class_select = response.data.result;
			$scope.selected = response.data.result[0].clsId;
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });


        // Simple GET request example:
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/not-paid-students'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#allStuSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#allStuSerchTableBody").append("<tr><td>"
                        + response.data.result[i].stuID + "</td><td>"
                        + response.data.result[i].sname + "</td><td>"
                        + response.data.result[i].phone + "</td><td>"
                        + response.data.result[i].class_name + "</td><td>"
                        + response.data.result[i].teacher_name + "</td><td>"
                        + response.data.result[i].payable_year + "</td><td>"
                        + response.data.result[i].payable_month + "</td><td>"
                        + response.data.result[i].class_fees + "</td></tr>");
            }


            //to run data table
            $scope.stusertable = $("#AllStudentTypeSearchResultByName").DataTable();
            $("#subjectSearchingTable").show();
            console.log(response);

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
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/not-paid-students/' + $scope.selected
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable2.destroy();
            $('#allStuSerchTableBody2').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#allStuSerchTableBody2").append("<tr><td>"
                        + response.data.result[i].stuID + "</td><td>"
                        + response.data.result[i].sname + "</td><td>"
                        + response.data.result[i].phone + "</td><td>"
                        /* +response.data.result[i].class_name + "</td><td>"  */
                        + response.data.result[i].teacher_name + "</td><td>"
                        + response.data.result[i].payable_year + "</td><td>"
                        + response.data.result[i].payable_month + "</td><td>"
                        + response.data.result[i].class_fees + "</td></tr>");
            }


            //to run data table
            $scope.stusertable2 = $("#AllStudentTypeSearchResultByName2").DataTable();
            $("#subjectSearchingTable2").show();
            $scope.isStudentSelect = true;
            console.log(response);

        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });
    };


});