'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular')
  .controller('LoginCtrl', function($scope, $location, $http) {
  
	$scope.submitRegister = function (){
		
		console.log($scope.userName);
		console.log($scope.email);
		if($scope.password == $scope.password2){
			$http({
            method: 'POST',
			data :{
			  "password": $scope.password,
			  "address": $scope.Address,
			  "fullName": $scope.fullName,
			  "userName": $scope.userName,
			  "email": $scope.email
			},
            url: 'http://localhost:8084/EventManagement/user'
        }).then(function successCallback(response) {
			if(response.data.result == "success"){
				swal('Successfully Registerd!','User is Register Successfully','success');
				$scope.user_name = $scope.userName;
				$scope.user_pw = $scope.password;
				$scope.submit();
			}else{
				swal('Error!','User Name is Alredy Exsist','error');
			}
			
        }, function errorCallback(response) {
            swal('Error!','Server has been shutted down!','error');
        });
		}else{
			swal('Error!!!', 'Your passwords are not matched.','error');
		}
	}
  

    $scope.submit = function() {
		console.log($scope.user_name);
		console.log($scope.user_pw);
		 $http({
            method: 'POST',
			data :{
			  "password": $scope.user_pw,
			  "userName": $scope.user_name
			},
            url: 'http://localhost:8084/EventManagement/login'
        }).then(function successCallback(response) {
			console.log(response.data)
			$scope.userID = response.data.userId;
			$scope.userName = response.data.userName;
			$scope.email = response.data.email;
			$scope.fullName = response.data.fullName;
			$scope.apikey = response.data.apikey;
			$scope.userType = response.data.userType;
			console.log($scope.userType);
			if($scope.userType=="admin"){
				$location.path('/dashboard/smile_class/latest_event');
				sessionStorage.setItem("userLevel", "admin");
				sessionStorage.setItem("userName", $scope.userName);
				sessionStorage.setItem("fullName", $scope.fullName);
				sessionStorage.setItem("apikey", $scope.apikey);
				sessionStorage.setItem("userID", $scope.userID);
			}else if($scope.userType=="public_user"){
				$location.path('/dashboard/smile_class/latest_event');
				sessionStorage.setItem("userLevel", "user");
				sessionStorage.setItem("userName", $scope.userName);
				sessionStorage.setItem("fullName", $scope.fullName);
				sessionStorage.setItem("apikey", $scope.apikey);
				sessionStorage.setItem("userID", $scope.userID);
			}else{
				swal('Error!!!', 'Check Your User Name & Password.','error');
			}
			
        }, function errorCallback(response) {
            swal('Error!','Server has been shutted down!','error');
        });
		
    }

  });
