'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_category', function ($scope, $http) {
    
    $(document).ready(function () {
        $scope.stusertable = $("#StudentSearchResultByName").DataTable();
    });

    $scope.init = function () {



        // Simple GET request example:
        $http({
            method: 'GET',
            url: 'http://localhost:8084/EventManagement/category'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#stuSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#stuSerchTableBody").append("<tr><td>" + response.data.result[i].categoryId + "</td><td>"
                        + response.data.result[i].categoryName + "</td></tr>");
            }


            //to run data table
            $scope.stusertable = $("#StudentSearchResultByName").DataTable();
            $("#studentSearchingTable").show();
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