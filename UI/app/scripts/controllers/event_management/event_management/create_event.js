'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('create_event', function ($scope, $http) {
   //define variables
	$scope.subject_names_select = "";

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/EventManagement/category'
        }).then(function successCallback(response) {
            $scope.subject_names_select = response.data.result;
            $scope.categoryId = response.data.result[0].categoryId;
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });
    };


    $scope.submit = function () {
        // Simple GET request example:
        $http({
            method: 'POST',
            url: 'http://localhost:8084/EventManagement/event',
            data: {
					  "eventVenue": $scope.eventVenue,
					  "ticketPrice": $scope.ticketPrice,
					  "availableTicket": $scope.releaseTicket,
					  "eventDescription": $scope.eventDescription,
					  "eventTopic": $scope.eventTopic,
					  "categoryId": $scope.categoryId,
					  "eventDate": $scope.eventDate,
					  "eventTime": $scope.eventTime,
					  "releaseTicket": $scope.releaseTicket
					}
        }).then(function successCallback(response) {
            swal("Success!", "Subject is Successfully Registered!", "success");
			            $scope.eventVenue = "";
            console.log(response);
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    };


});