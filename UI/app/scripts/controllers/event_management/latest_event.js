'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('latest_event', function ($scope, $http, $sce, $compile) {
    $scope.isStudentSelect = "xxxx";
	
	$scope.eventTopic = "";
	$scope.eventDescription = "";
	$scope.eventDate = "";
	$scope.eventTime = "";
	$scope.eventVenue = "";
	$scope.releaseTicket = "";
	$scope.availableTicket = "";
	$scope.ticketPrice = 0;
	$scope.numberOftickets = 1;

	$scope.checkOut = function(eventID){
		$scope.selectedEvent = eventID;
		$scope.eventListShell = false;
		$scope.checkoutpannel = true;
		
		//Set Form details
		 $http({
            method: 'GET',
            url: 'http://localhost:8084/EventManagement/event/'+$scope.selectedEvent
        }).then(function successCallback(response) {
			$scope.eventTopic = response.data.eventTopic;
			$scope.eventDescription = response.data.eventDescription;
			$scope.eventDate = response.data.eventDate;
			$scope.eventTime = response.data.eventTime;
			$scope.eventVenue = response.data.eventVenue;
			$scope.releaseTicket = response.data.releaseTicket;
			$scope.availableTicket = response.data.availableTicket;
			$scope.ticketPrice = response.data.ticketPrice;
			
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    );
        });
	}
	
	
	
	$scope.submit = function(){
		$scope.totalPrice = $scope.numberOftickets*$scope.ticketPrice;
		//Set Form details
		 $http({
            method: 'POST',
			data :{
				  "eventId": $scope.selectedEvent,
				  "amountOfTicket": $scope.ticketPrice,
				  "userId": $scope.userID,
				  "totalAmountOfTickets": $scope.totalPrice,
				  "noOfTickets": $scope.numberOftickets
				},
            url: 'http://localhost:8084/EventManagement/ticketing'
        }).then(function successCallback(response) {
			swal(
                    'Success!',
                    'Your Tickets are perchaced... Now pay it with Paypal',
                    'success'
                    );
			$scope.init();
        }, function errorCallback(response) {
            swal(
                 'Error!',
                 'Something Wrong!',
                 'error'
                );
        });
	};
	
	
	

	$scope.init = function () {
		$scope.userID = sessionStorage.getItem("userID");
		$scope.eventListShell = true;
		$scope.checkoutpannel = false;
        $http({
            method: 'GET',
            url: 'http://localhost:8084/EventManagement/event'
        }).then(function successCallback(response) {
            $scope.eventList = response.data.result;
            var i = 0;
			var tblBody = "";
            for (i = 0; i < response.data.result.length; i++) {
				tblBody = tblBody +"<div class=\"col-sm-6\">\n"
                + "            <div class=\"panel panel-info\" >\n"
                + "                <div class=\"panel-heading\">\n"
                + "                    <h1 class=\"panel-title\">"+response.data.result[i].eventTopic+"</h1>\n"
                + "                </div>\n"
                + "                <div class=\"panel-body\" icon=\"eye\" >\n"
                + "					<h3>Date : "+response.data.result[i].eventDate+"</h3>\n"
                + "					<h3>Time : "+response.data.result[i].eventTime+"</h3>\n"
                + "					<h3>Venue : "+response.data.result[i].eventVenue+"</h3>\n"
                + "					<h3>Event ID : "+response.data.result[i].eventId+"</h3>\n"
                + "					<h3>Description : </h3><p>"+response.data.result[i].eventTopic+"</p>\n"
                + "					<h3>Category : "+response.data.result[i].categoryId.categoryName+"</h3>\n"
                + "					<stats \n"
                + "						bgclass=\"warning\" \n"
                + "						icon=\"eye\" \n"
                + "						value=\"Ticket Price = "+response.data.result[i].ticketPrice+"\" \n"
                + "						text=\"Release Tickets = "+response.data.result[i].releaseTicket+" and available Tickets = "+response.data.result[i].availableTicket+"\">\n"
                + "					</stats>\n"
                + "					<button class=\"btn btn-default\" ng-click=\"checkOut('"+response.data.result[i].eventId+"')\">Go to Check Out</button>\n"
                + "                </div>\n"
                + "            </div>\n"
                + "        </div>";
                
            }
			$scope.input_feilds = $sce.trustAsHtml(tblBody);
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });
    };

});