'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_subject', function ($scope, $http, $sce) {

    $(document).ready(function () {
        $scope.stusertable = $("#SubjectTypeSearchResultByName").DataTable();
    });

    $scope.init = function () {



        // Simple GET request example:
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/subject'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#subSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#subSerchTableBody").append("<tr><td>" + response.data.result[i].subId + "</td><td>"
                        + response.data.result[i].subName + "</td></tr>");
            }


            //to run data table
            $scope.stusertable = $("#SubjectTypeSearchResultByName").DataTable();
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