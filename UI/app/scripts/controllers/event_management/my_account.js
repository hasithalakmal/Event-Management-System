'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('my_account', function ($scope, $http) {
    $(document).ready(function () {
        $scope.stusertable = $("#StudentSearchResultByName").DataTable();
    });

    $scope.init = function () {
		$scope.userID = sessionStorage.getItem("userID");

        $http({
            method: 'GET',
            url: 'http://localhost:8084/EventManagement/ticketing-by-user/'+$scope.userID
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.stusertable.destroy();
            $('#stuSerchTableBody').empty();
            var i = 0;
            for (i = 0; i < response.data.length; i++) {
                $("#stuSerchTableBody").append("<tr><td>" 
				+ response.data[i].eventId.eventTopic + "</td><td>" 
				+ response.data[i].eventId.eventDate + "</td><td>" 
				+ response.data[i].eventId.eventTime + "</td><td>" 
				+ response.data[i].eventId.eventVenue + "</td><td>" 
				+ response.data[i].amountOfTicket + "</td><td>" 
				+ response.data[i].noOfTickets + "</td><td>" 
				+ response.data[i].totalAmountOfTickets + "</td></tr>");
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