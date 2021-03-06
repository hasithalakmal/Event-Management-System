'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_all_students', function ($scope, $http, $sce) {

    $(document).ready(function () {
        $scope.stusertable = $("#AllStudentTypeSearchResultByName").DataTable();
    });

    $scope.init = function () {



        // Simple GET request example:
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/student'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#allStuSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#allStuSerchTableBody").append("<tr><td>" + response.data.result[i].stuId + "</td><td>"
                        + response.data.result[i].stuName + "</td><td>"
                        + response.data.result[i].stuSchool + "</td><td>"
                        + response.data.result[i].guarName + "</td><td>"
                        + response.data.result[i].stuPhone1 + "</td><td>"
                        /* 	+response.data.result[i].stuPhone2 + "</td><td>" 
                         +response.data.result[i].stuPhone3 + "</td><td>"  */
                        + response.data.result[i].stuAdress + "</td></tr>");
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

});