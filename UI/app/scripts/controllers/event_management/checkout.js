'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('checkout', function ($scope, $http) {
    $scope.isStudentSelect = false;


    $scope.validationOptions = {
        rules: {
            addmision_number: {
                required: true,
                number: true,
				min : 1
            }
        },
        messages: {
            addmision_number: {
                required: "Please Enter Student Registration Number",
                number: "Your Registration Number must be in the format of 111",
				min : "Cant enter negative numbers"
            }
        }
    };

    $(document).ready(function () {
        $scope.stusertable = $("#StudentSearchResultByName").DataTable({
            columnDefs: [{
                    orderable: false,
                    className: 'select-checkbox',
                    targets: 0
                }],
            select: {
                style: 'os',
                selector: 'td:first-child'
            },
            order: [[1, 'asc']]
        });
    });

    $scope.submit = function (form) {
        if (form.validate()) {
            $http({
                method: 'GET',
                url: 'http://localhost:8084/SmileClass/student-exsist/' + $scope.addmision_number
            }).then(function successCallback(response) {
                if (response.data.result) {
                    $http({
                        method: 'GET',
                        url: 'http://localhost:8084/SmileClass/fees/' + $scope.addmision_number
                    }).then(function successCallback(response) {
					          //  $scope.addmision_number = "";

                        $scope.classess = response.data.result;
                        $scope.stusertable.destroy();
                        $('#stuSerchTableBody').empty();
                        var i = 0;
						$scope.creditBal = 0;
                        for (i = 0; i < response.data.result.length; i++) {
                            $("#stuSerchTableBody").append("<tr><td></td><td>"
                                    + response.data.result[i].stuAccTid + "</td><td>"
                                    + response.data.result[i].stuAccPaybleYear + "</td><td>"
                                    + response.data.result[i].stuAccPaybleMonth + "</td><td>"
                                    + response.data.result[i].lid.studyClass.clsName + "</td><td>"
                                    + response.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                    + response.data.result[i].lid.learnFee + "</td></tr>");
									 $scope.creditBal = $scope.creditBal + response.data.result[i].lid.learnFee;
                        }
                        $scope.stusertable = $("#StudentSearchResultByName").DataTable({
                            columnDefs: [{
                                    orderable: false,
                                    className: 'select-checkbox',
                                    targets: 0
                                }],
                            select: {
                                style: 'multi',
                                selector: 'td:first-child'
                            },
                            order: [[1, 'asc']]
                        });
                        $("#studentSearchingTable").show();
                        $scope.isStudentSelect = true;
                    }, function errorCallback(response) {
                        swal(
                                'Error!',
                                'Something Wrong3333!',
                                'error'
                                )
                    });

                } else {
                    swal(
                            'Error!',
                            'Student Registration Number is Not Exist',
                            'error'
                            );
                }
            }, function errorCallback(response) {
                swal(
                        'Error!',
                        'Something Wrong4444!',
                        'error'
                        );
            });
        }
        ;
    };




    $scope.pay_fee = function () {
        console.log($scope.stusertable.rows('.selected').data());
		if($scope.stusertable.rows('.selected').data().length == 0){
			 swal(
                        'Error!',
                        'Select Fees',
                        'error'
                        );
		}else{
			var i = 0;
			for (i = 0; i < $scope.stusertable.rows('.selected').data().length; i++) {
				var selectedRecodeID = $scope.stusertable.rows('.selected').data()[i][1];
				console.log('hello');
				console.log(selectedRecodeID);
				// Simple GET request example:
				$http({
					method: 'POST',
					url: 'http://localhost:8084/SmileClass/fees',
					data: {
						"stuAccTid": selectedRecodeID
					}
				}).then(function successCallback(response) {
					
					console.log(response.data);
				}, function errorCallback(response) {
					swal(
							'Error!',
							'Something Wrong!11111',
							'error'
							);
				});
			}
			
			$http({
						method: 'GET',
						url: 'http://localhost:8084/SmileClass/fees/' + $scope.addmision_number
					}).then(function successCallback(response) {
						$scope.classess = response.data.result;
						$scope.stusertable.destroy();
						$('#stuSerchTableBody').empty();
						var i = 0;
						$scope.creditBal = 0;
						for (i = 0; i < response.data.result.length; i++) {
							$("#stuSerchTableBody").append("<tr><td></td><td>"
									+ response.data.result[i].stuAccTid + "</td><td>"
									+ response.data.result[i].stuAccPaybleYear + "</td><td>"
									+ response.data.result[i].stuAccPaybleMonth + "</td><td>"
									+ response.data.result[i].lid.studyClass.clsName + "</td><td>"
									+ response.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
									+ response.data.result[i].lid.learnFee + "</td></tr>");
						 $scope.creditBal = $scope.creditBal + response.data.result[i].lid.learnFee;

						}
						$scope.stusertable = $("#StudentSearchResultByName").DataTable({
							columnDefs: [{
									orderable: false,
									className: 'select-checkbox',
									targets: 0
								}],
							select: {
								style: 'multi',
								selector: 'td:first-child'
							},
							order: [[1, 'asc']]
						});
						$("#studentSearchingTable").show();
					}, function errorCallback(response) {
						swal(
								'Error!',
								'Something Wrong22222!',
								'error'
								);
					});

			swal(
                'Success!',
                'Student Fees Payment is Successfully Updated!',
                'success'
                );
		}
		
        


    };


});