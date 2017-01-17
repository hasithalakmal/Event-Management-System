'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_class', function ($scope, $http, $sce) {

    $(document).ready(function () {
        $scope.stusertable = $("#StudentSearchResultByName").DataTable();
    });

    $('button').on('click', function () {
        var divToPrint = document.getElementById("printTable");
        var newWin = window.open("");
        newWin.document.write(divToPrint.outerHTML);
        newWin.print();
        newWin.close();
    });
    $scope.init = function () {



        // Simple GET request example:
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/studyClass'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#stuSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#stuSerchTableBody").append("<tr><td>" + response.data.result[i].clsId + "</td><td>" + response.data.result[i].subId.subName + "</td><td>" + response.data.result[i].percentage + "</td><td>"
                        + response.data.result[i].clsName + "</td><td>" + response.data.result[i].teaId.teaName + "</td><td>"
                        + response.data.result[i].clsFee + "</td></tr>");
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