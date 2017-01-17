'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('search_event', function ($scope, $http) {
   
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
            url: 'http://localhost:8084/EventManagement/event'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#stuSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $("#stuSerchTableBody").append("<tr><td>" 
				+ response.data.result[i].eventId + "</td><td>" 
				+ response.data.result[i].eventTopic + "</td><td>" 
				+ response.data.result[i].eventDate + "</td><td>" 
				+ response.data.result[i].ticketPrice + "</td><td>" 
				+ response.data.result[i].releaseTicket + "</td><td>" 
				+ response.data.result[i].eventVenue + "</td><td>" 
				+ response.data.result[i].eventDescription + "</td></tr>");
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