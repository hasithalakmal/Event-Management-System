'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_class_type', function ($scope, $http, $sce) {

    $(document).ready(function () {
        $scope.stusertable = $("#ClassTypeSearchResultByName").DataTable({});
    });

    $scope.init = function () {



        // Simple GET request example:
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/class-type'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#clsSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#clsSerchTableBody").append("<tr><td>" + response.data.result[i].clsTypeId + "</td><td>"
                        + response.data.result[i].clsTypeName + "</td></tr>");
            }


            //to run data table
            $scope.stusertable = $("#ClassTypeSearchResultByName").DataTable({});
            $("#classTypeSearchingTable").show();
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