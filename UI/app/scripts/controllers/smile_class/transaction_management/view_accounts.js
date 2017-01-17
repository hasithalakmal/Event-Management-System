'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_accounts', function ($scope, $http, $sce) {

    $(document).ready(function () {
        $scope.cashacc = $("#CashAccountSearchResultByName").DataTable();
        $scope.studentacc = $("#StudentAccountSearchResultByName").DataTable();
        $scope.Profitacc = $("#ProfitAcc").DataTable();
        $scope.teacherAcc = $("#teacherAcc").DataTable();
        $scope.otherIncomeAcc = $("#otherIncomeAcc").DataTable();
        $scope.otherExpAcc = $("#otherExpAcc").DataTable();
    });

    $scope.init = function () {
        // Cash Account
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/cash-account'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.cashacc.destroy();
            $('#cashSerchTableBody').empty();
            var i = 0;
            $scope.creditBal = 0;
            $scope.debitBal = 0;
            $scope.forwordBal = 0;
            for (i = 0; i < response.data.result.length; i++) {

                $scope.type = response.data.result[i].cashAccBalType;
                if ($scope.type == "credit") {
                    $("#cashSerchTableBody").append("<tr><td>"
                            + response.data.result[i].cashAccStateChgDate + "</td><td>"
                            + response.data.result[i].cashAccDescr + "</td><td>"
                            + "" + "</td><td>"
                            + response.data.result[i].cashAccAmount + "</td></tr>");
                    $scope.creditBal = $scope.creditBal + response.data.result[i].cashAccAmount;
                } else {
                    $("#cashSerchTableBody").append("<tr><td>"
                            + response.data.result[i].cashAccStateChgDate + "</td><td>"
                            + response.data.result[i].cashAccDescr + "</td><td>"
                            + response.data.result[i].cashAccAmount + "</td><td>"
                            + "" + "</td></tr>");
                    $scope.debitBal = $scope.debitBal + response.data.result[i].cashAccAmount;
                }
            }
            $scope.forwordBal = $scope.debitBal - $scope.creditBal
            $("#cashSerchTableBody").append("<tr><td><b>"
                    + response.data.result[response.data.result.length - 1].cashAccStateChgDate + "</b></td><td><b>"
                    + 'Total' + "</b></td><td><b>"
                    + $scope.debitBal + "</b></td><td><b>"
                    + $scope.creditBal + "</b></td></tr>");

            if ($scope.forwordBal >= 0) {
                $("#cashSerchTableBody").append("<tr><td><b>"
                        + response.data.result[response.data.result.length - 1].cashAccStateChgDate + "</b></td><td><b>"
                        + 'Forward Balance' + "</b></td><td><b>"
                        + $scope.forwordBal + "</b></td><td><b>"
                        + "" + "</b></td></tr>");
            } else {
                $("#cashSerchTableBody").append("<tr><td><b>"
                        + response.data.result[response.data.result.length - 1].cashAccStateChgDate + "</b></td><td><b>"
                        + 'Forward Balance' + "</b></td><td><b>"
                        + "" + "</b></td><td><b>"
                        + ($scope.forwordBal * -1) + "</b></td></tr>");
            }




            $scope.cashacc = $("#CashAccountSearchResultByName").DataTable();
            $("#CashAccountSearchResultByName").show();
            console.log(response);
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    );
        });

        //student-account
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/student-account'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.studentacc.destroy();
            $('#stuSerchTableBody').empty();
            var i = 0;
            $scope.st_creditBal = 0;
            $scope.st_debitBal = 0;
            $scope.st_forwordBal = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $scope.type = response.data.result[i].stuAccBalType;
                if ($scope.type == "credit") {
                    $("#stuSerchTableBody").append("<tr><td>"
                            + response.data.result[i].stuAccPaidDate + "</td><td>"
                            + response.data.result[i].stuAccDescr + "</td><td>"
                            + response.data.result[i].stuAccAmount + "</td><td>"
                            + "" + "</td></tr>");
                    $scope.st_creditBal = $scope.st_creditBal + response.data.result[i].stuAccAmount;
                } else {
				$("#stuSerchTableBody").append("<tr><td>"
                            + response.data.result[i].stuAccPaidDate + "</td><td>"
                            + response.data.result[i].stuAccDescr + "</td><td>"
                            + "" + "</td><td>"
                            + response.data.result[i].stuAccAmount + "</td></tr>");
                    $scope.st_debitBal = $scope.st_debitBal + response.data.result[i].stuAccAmount;
                }
            }

            $scope.st_forwordBal =$scope.st_creditBal -  $scope.st_debitBal
            $("#stuSerchTableBody").append("<tr><td><b>"
                    + response.data.result[response.data.result.length - 1].stuAccPaidDate + "</b></td><td><b>"
                    + 'Total' + "</b></td><td><b>"
                    + $scope.st_creditBal + "</b></td><td><b>"
                    + $scope.st_debitBal + "</b></td></tr>");

            if ($scope.st_forwordBal >= 0) {
                $("#stuSerchTableBody").append("<tr><td><b>"
                        + response.data.result[response.data.result.length - 1].stuAccPaidDate + "</b></td><td><b>"
                        + 'Forward Balance' + "</b></td><td><b>"
                        + $scope.st_forwordBal + "</b></td><td><b>"
                        + "" + "</b></td></tr>");
            } else {
                $("#stuSerchTableBody").append("<tr><td><b>"
                        + response.data.result[response.data.result.length - 1].stuAccPaidDate + "</b></td><td><b>"
                        + 'Forward Balance' + "</b></td><td><b>"
                        + "" + "</b></td><td><b>"
                        + ($scope.st_forwordBal * -1) + "</b></td></tr>");
            }

            $scope.studentacc = $("#StudentAccountSearchResultByName").DataTable();
            $("#StudentAccountSearchResultByName").show();
            console.log(response);
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    );
        });
    };

    //profit-account
    $http({
        method: 'GET',
        url: 'http://localhost:8084/SmileClass/profit-account'
    }).then(function successCallback(response) {
        $scope.classess = response.data.result;
        $scope.Profitacc.destroy();
        $('#profitTableBody').empty();
        var i = 0;
        $scope.pa_creditBal = 0;
        $scope.pa_debitBal = 0;
        $scope.pa_forwordBal = 0;
        for (i = 0; i < response.data.result.length; i++) {
            $scope.type = response.data.result[i].proAccBalType;
            if ($scope.type == "credit") {
				$("#profitTableBody").append("<tr><td>"
                        + response.data.result[i].proAccStateChgDate + "</td><td>"
                        + response.data.result[i].proAccDescr + "</td><td>"
                        + response.data.result[i].proAccAmount + "</td><td>"
                        + "" + "</td></tr>");
                $scope.pa_creditBal = $scope.pa_creditBal + response.data.result[i].proAccAmount;
            } else {
                 $("#profitTableBody").append("<tr><td>"
                        + response.data.result[i].proAccStateChgDate + "</td><td>"
                        + response.data.result[i].proAccDescr + "</td><td>"
                        + "" + "</td><td>"
                        + response.data.result[i].proAccAmount + "</td></tr>");
						$scope.pa_debitBal = $scope.pa_debitBal + response.data.result[i].proAccAmount;
                
            }
        }
        $scope.pa_forwordBal = $scope.pa_creditBal - $scope.pa_debitBal

        $("#profitTableBody").append("<tr><td><b>"
                + response.data.result[response.data.result.length - 1].proAccStateChgDate + "</b></td><td><b>"
                + 'Total' + "</b></td><td><b>"
                + $scope.pa_creditBal + "</b></td><td><b>"
                + $scope.pa_debitBal + "</b></td></tr>");

        if ($scope.pa_forwordBal >= 0) {
            $("#profitTableBody").append("<tr><td><b>"
                    + response.data.result[response.data.result.length - 1].proAccStateChgDate + "</b></td><td><b>"
                    + 'Forward Balance' + "</b></td><td><b>"
                    + $scope.pa_forwordBal + "</b></td><td><b>"
                    + "" + "</b></td></tr>");
                $scope.balance_type = "Profit";

        } else {
            $("#profitTableBody").append("<tr><td><b>"
                    + response.data.result[response.data.result.length - 1].proAccStateChgDate + "</b></td><td><b>"
                    + 'Forward Balance' + "</b></td><td><b>"
                    + "" + "</b></td><td><b>"
                    + ($scope.pa_forwordBal * -1) + "</b></td></tr>");
                $scope.balance_type = "Loss";

        }

        $scope.Profitacc = $("#ProfitAcc").DataTable();
        $("#ProfitAcc").show();
        console.log(response);
    }, function errorCallback(response) {
        swal(
                'Error!',
                'Something Wrong!',
                'error'
                );
    });


    //teacher-account
    $http({
        method: 'GET',
        url: 'http://localhost:8084/SmileClass/teacher-account'
    }).then(function successCallback(response) {
        $scope.classess = response.data.result;
        $scope.teacherAcc.destroy();
        $('#teacherTableBody').empty();
        var i = 0;
        $scope.t_creditBal = 0;
        $scope.t_debitBal = 0;
        $scope.t_forwordBal = 0;
        for (i = 0; i < response.data.result.length; i++) {
            $scope.type = response.data.result[i].teaAccBalType;
            if ($scope.type == "credit") {
			 $("#teacherTableBody").append("<tr><td>"
                        + response.data.result[i].teaAccStateChgDate + "</td><td>"
                        + response.data.result[i].teaAccDes + "</td><td>"
                        + response.data.result[i].teaAccAmount + "</td><td>"
                        + "" + "</td></tr>");
                $scope.t_creditBal = $scope.t_creditBal + response.data.result[i].teaAccAmount;
            } else {
                $("#teacherTableBody").append("<tr><td>"
                        + response.data.result[i].teaAccStateChgDate + "</td><td>"
                        + response.data.result[i].teaAccDes + "</td><td>"
                        + "" + "</td><td>"
                        + response.data.result[i].teaAccAmount + "</td></tr>");
               $scope.t_debitBal = $scope.t_debitBal + response.data.result[i].teaAccAmount;
            }
        }
        $scope.t_forwordBal = $scope.t_creditBal - $scope.t_debitBal
        $("#teacherTableBody").append("<tr><td><b>"
                + response.data.result[response.data.result.length - 1].teaAccStateChgDate + "</b></td><td><b>"
                + 'Total' + "</b></td><td><b>"
                + $scope.t_creditBal + "</b></td><td><b>"
                + $scope.t_debitBal + "</b></td></tr>");
                $scope.balance_type1 = "Payable Amount";

        if ($scope.t_forwordBal >= 0) {
            $("#teacherTableBody").append("<tr><td><b>"
                    + response.data.result[response.data.result.length - 1].teaAccStateChgDate + "</b></td><td><b>"
                    + 'Forward Balance' + "</b></td><td><b>"
                    + $scope.t_forwordBal + "</b></td><td><b>"
                    + "" + "</b></td></tr>");
				 $scope.balance_type1 = "Receivable Amount";

        } else {
            $("#teacherTableBody").append("<tr><td><b>"
                    + response.data.result[response.data.result.length - 1].teaAccStateChgDate + "</b></td><td><b>"
                    + 'Forward Balance' + "</b></td><td><b>"
                    + "" + "</b></td><td><b>"
                    + ($scope.t_forwordBal * -1) + "</b></td></tr>");
        }
        $scope.teacherAcc = $("#teacherAcc").DataTable();
        $("#teacherAcc").show();
        console.log(response);
    }, function errorCallback(response) {
        swal(
                'Error!',
                'Something Wrong!',
                'error'
                );
    });

    //other-income
    $http({
        method: 'GET',
        url: 'http://localhost:8084/SmileClass/other-income'
    }).then(function successCallback(response) {
        $scope.classess = response.data.result;
        $scope.otherIncomeAcc.destroy();
        $('#otherIncomeTableBody').empty();
        var i = 0;
        $scope.oi_creditBal = 0;
        $scope.oi_debitBal = 0;
        $scope.oi_forwordBal = 0;
        for (i = 0; i < response.data.result.length; i++) {
            $scope.type = response.data.result[i].otherIncBalType;
            if ($scope.type == "credit") {
                  $("#otherIncomeTableBody").append("<tr><td>"
                        + response.data.result[i].otherIncStateChgDate + "</td><td>"
                        + response.data.result[i].otherIncDescr + "</td><td>"
                        + response.data.result[i].otherIncAmount + "</td><td>"
                        + "" + "</td></tr>");
                $scope.oi_creditBal = $scope.oi_creditBal + response.data.result[i].otherIncAmount;
            } else {
						$("#otherIncomeTableBody").append("<tr><td>"
                        + response.data.result[i].otherIncStateChgDate + "</td><td>"
                        + response.data.result[i].otherIncDescr + "</td><td>"
                        + "" + "</td><td>"
                        + response.data.result[i].otherIncAmount + "</td></tr>");
                $scope.oi_debitBal = $scope.oi_debitBal + response.data.result[i].otherIncAmount;
            }
        }
        $scope.oi_forwordBal = $scope.oi_creditBal - $scope.oi_debitBal

        $("#otherIncomeTableBody").append("<tr><td><b>"
                + response.data.result[response.data.result.length - 1].otherIncStateChgDate + "</b></td><td><b>"
                + 'Total' + "</b></td><td><b>"
                + $scope.oi_creditBal + "</b></td><td><b>"
                + $scope.oi_debitBal + "</b></td></tr>");

        if ($scope.oi_forwordBal >= 0) {
            $("#otherIncomeTableBody").append("<tr><td><b>"
                    + response.data.result[response.data.result.length - 1].otherIncStateChgDate + "</b></td><td><b>"
                    + 'Forward Balance' + "</b></td><td><b>"
                    + $scope.oi_forwordBal + "</b></td><td><b>"
                    + "" + "</b></td></tr>");
        } else {
            $("#otherIncomeTableBody").append("<tr><td><b>"
                    + response.data.result[response.data.result.length - 1].otherIncStateChgDate + "</b></td><td><b>"
                    + 'Forward Balance' + "</b></td><td><b>"
                    + "" + "</b></td><td><b>"
                    + ($scope.oi_forwordBal * -1) + "</b></td></tr>");
        }
        $scope.otherIncomeAcc = $("#otherIncomeAcc").DataTable();
        $("#otherIncomeAcc").show();
        console.log(response);
    }, function errorCallback(response) {
        swal(
                'Error!',
                'Something Wrong!',
                'error'
                );
    });

    /* 	//other-expense
     $http({
     method: 'GET',
     url: 'http://localhost:8084/SmileClass/other-expense'
     }).then(function successCallback(response) {
     $scope.classess = response.data.result;
     $scope.otherExpAcc.destroy();
     $('#otherExpTableBody').empty();
     var i =0;
     $scope.oe_creditBal =0;
     $scope.oe_debitBal =0;
     $scope.oe_forwordBal =0;
     for (i = 0; i < response.data.result.length; i++) {
     $scope.type = response.data.result[i].otherExpBalType;
     if($scope.type == "credit"){
     $("#otherExpTableBody").append("<tr><td>" 
     + response.data.result[i].otherExpStateChgDate + "</td><td>" 
     + response.data.result[i].otherExpDescr + "</td><td>" 
     + "" + "</td><td>" 
     +response.data.result[i].otherExpAmount + "</td></tr>" );
     $scope.oe_creditBal = $scope.oe_creditBal+response.data.result[i].otherExpAmount;
     }else{
     $("#otherExpTableBody").append("<tr><td>" 
     + response.data.result[i].otherExpStateChgDate + "</td><td>" 
     + response.data.result[i].otherExpDescr + "</td><td>" 
     +response.data.result[i].otherExpAmount+ "</td><td>" 
     +"" + "</td></tr>" );
     $scope.oe_debitBal = $scope.oe_debitBal+response.data.result[i].otherExpAmount;
     }
     }
     $scope.oe_forwordBal = $scope.oe_debitBal - $scope.oe_creditBal
     $scope.otherExpAcc = $("#otherExpAcc").DataTable();
     $("#otherExpAcc").show();
     console.log(response);			
     }, function errorCallback(response) {
     swal(
     'error!',
     'something wrong!',
     'error'
     );
     });
     
     */
















});