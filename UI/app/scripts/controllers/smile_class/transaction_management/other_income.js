'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('other_income', function ($scope,$http) {

	$scope.init  = function() {
		$scope.salaryAmount = "";
		$scope.selected ="";
		$scope.description ="";
		$http({
		  method: 'GET',
		  url: 'http://localhost:8084/SmileClass/teacher'
		}).then(function successCallback(response) {
			$scope.tea_names_select = response.data.result;
			$scope.selected = response.data.result[0].teaId;
		}, function errorCallback(response) {
			swal(
			  'Error!',
			  'Something Wrong!',
			  'error'
			)
		});
	};

	$scope.submit  = function(){
		$scope.description = "Photocopy charges";
		$scope.data = {
						"Amount":$scope.salaryAmount,
						"teaid":$scope.selected,
						"description":$scope.description
					  };
		$http({
		  method: 'POST',
		  url: 'http://localhost:8084/SmileClass/otherIncome',
		  data : $scope.data
		}).then(function successCallback(response) {
			swal("Success!", "Photocopy Charges is Successfully Updated" , "success");
			console.log(response);
			$scope.init();
		  }, function errorCallback(response) {
			swal(
			  'Error!',
			  'Something Wrong!',
			  'error'
			);
		  });
	};
	

});