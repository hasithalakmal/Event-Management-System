'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('daily_report', function ($scope, $http) {
    $(document).ready(function () {
        $scope.cashacc = $("#CashAccountSearchResultByName").DataTable();
        $scope.Profitacc = $("#ProfitAcc").DataTable();
    });
    $scope.isSelected = false;

    $scope.submit = function () {
        var date = $scope.reportDate;
        var day = date.getDate();
        var monthIndex = date.getMonth() + 1;
        var year = date.getFullYear();
        var dateString = year + "-" + monthIndex + "-" + day;
        $scope.data = {
            "start_day": dateString
        };
        console.log($scope.data);
        // Cash Account
        $http({
            method: 'POST',
            data: $scope.data,
            url: 'http://localhost:8084/SmileClass/daily-report-cash'
        }).then(function successCallback(response) {
            $scope.isSelected = true;
            $scope.classess = response.data.result;
            $scope.cashacc.destroy();
            $('#cashSerchTableBody').empty();
            var i = 0;
            $scope.t_creditBal2 = 0;
            $scope.t_debitBal2 = 0;
            $scope.t_forwordBal2 = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $scope.type = response.data.result[i].cashAccBalType;
                if ($scope.type == "credit") {
                    $("#cashSerchTableBody").append("<tr><td>"
                            + response.data.result[i].cashAccStateChgDate + "</td><td>"
                            + response.data.result[i].cashAccDescr + "</td><td>"
                            + "" + "</td><td>"
                            + response.data.result[i].cashAccAmount + "</td></tr>");
                    $scope.t_creditBal2 = $scope.t_creditBal2 + response.data.result[i].cashAccAmount;
                } else {
                    $("#cashSerchTableBody").append("<tr><td>"
                            + response.data.result[i].cashAccStateChgDate + "</td><td>"
                            + response.data.result[i].cashAccDescr + "</td><td>"
                            + response.data.result[i].cashAccAmount + "</td><td>"
                            + "" + "</td></tr>");
                    $scope.t_debitBal2 = $scope.t_debitBal2 + response.data.result[i].cashAccAmount;
                }
            }
            $scope.t_forwordBal2 = $scope.t_debitBal2 - $scope.t_creditBal2;
            $("#cashSerchTableBody").append("<tr><td><b>"
                    + $scope.data.start_day + "</b></td><td><b>"
                    + 'Total' + "</b></td><td><b>"
                    + $scope.t_debitBal2 + "</b></td><td><b>"
                    + $scope.t_creditBal2 + "</b></td></tr>");

            if ($scope.t_forwordBal2 >= 0) {
                $("#cashSerchTableBody").append("<tr><td><b>"
                        + $scope.data.start_day + "</b></td><td><b>"
                        + 'Forward Balance' + "</b></td><td><b>"
                        + $scope.t_forwordBal2 + "</b></td><td><b>"
                        + "" + "</b></td></tr>");
            } else {
                $("#cashSerchTableBody").append("<tr><td><b>"
                        + $scope.data.start_day + "</b></td><td><b>"
                        + 'Forward Balance' + "</b></td><td><b>"
                        + "" + "</b></td><td><b>"
                        + ($scope.t_forwordBal2 * -1) + "</b></td></tr>");
            }

            $scope.cashacc = $("#CashAccountSearchResultByName").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'excel',
                    {
                        extend: 'print',
                        text: 'Print Selected',
                        title: 'Sahas Educational Institute - Daily Report - Cash Account',
                        message: 'This daily report is genarated on ' + $scope.data.start_day + '.\n\n',
                        orientation: 'portrait',
                        pageSize: 'A4',
                        download: 'open',
                        customize: function (win) {
                            $(win.document.body)
                                    .css('font-size', '11pt')
                                    .prepend(
                                            '<img src="http://localhost:9001/images/watermark.png" style="position:absolute; top:0; right:0; width:30%;" />'
                                            );

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                        },
                        exportOptions: {
                            modifier: {
                                selected: true
                            }
                        }


                    },
                    {
                        extend: 'print',
                        text: 'Print',
                        title: 'Sahas Educational Institute - Daily Report - Cash Account',
                        message: 'This daily report is genarated on ' + $scope.data.start_day + '.\n\n',
                        orientation: 'portrait',
                        pageSize: 'A4',
                        download: 'open',
                        customize: function (win) {
                            $(win.document.body)
                                    .css('font-size', '11pt')
                                    .prepend(
                                            '<img src="http://localhost:9001/images/watermark.png" style="position:absolute; top:0; right:0; width:30%;" />'
                                            );

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                        }
                    }
                ],
                select: true
            });
            $("#CashAccountSearchResultByName").show();
            console.log(response);
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    );
        });

        $http({
            method: 'POST',
            data: $scope.data,
            url: 'http://localhost:8084/SmileClass/daily-report-profit'
        }).then(function successCallback(response) {
            $scope.classess = response.data.result;
            $scope.Profitacc.destroy();
            $('#profitTableBody').empty();
            var i = 0;
            $scope.t_creditBal = 0;
            $scope.t_debitBal = 0;
            $scope.t_forwordBal = 0;
            for (i = 0; i < response.data.result.length; i++) {
                $scope.type = response.data.result[i].proAccBalType;
                if ($scope.type == "credit") {
                   $("#profitTableBody").append("<tr><td>"
                            + response.data.result[i].proAccStateChgDate + "</td><td>"
                            + response.data.result[i].proAccDescr + "</td><td>"
                            + response.data.result[i].proAccAmount + "</td><td>"
                            + "" + "</td></tr>");
                    $scope.t_creditBal = $scope.t_creditBal + response.data.result[i].proAccAmount;
                } else {
				  $("#profitTableBody").append("<tr><td>"
                            + response.data.result[i].proAccStateChgDate + "</td><td>"
                            + response.data.result[i].proAccDescr + "</td><td>"
                            + "" + "</td><td>"
                            + response.data.result[i].proAccAmount + "</td></tr>");
                    $scope.t_debitBal = $scope.t_debitBal + response.data.result[i].proAccAmount;
                }
            }
            $scope.t_forwordBal =  $scope.t_creditBal - $scope.t_debitBal
			
            $("#profitTableBody").append("<tr><td><b>"
                    + $scope.data.start_day + "</td></td><td><b>"
                    + 'Total' + "</td></b><td><b>"
                    + $scope.t_creditBal + "</td></b><td><b>"
                    + $scope.t_debitBal + "</td></b></tr>");
            if ($scope.t_forwordBal >= 0) {
                   $("#profitTableBody").append("<tr><td><b>"
                        + $scope.data.start_day + "</td></td><td><b>"
                        + 'Forward Balance' + "</td></b><td><b>"
                        + $scope.t_forwordBal + "</td></b><td><b>"
                        + "" + "</td></b></tr>");
                $scope.balance_type = "Profit";
            } else {
			$("#profitTableBody").append("<tr><td><b>"
                        + $scope.data.start_day + "</td></td><td><b>"
                        + 'Forward Balance' + "</td></b><td><b>"
                        + "" + "</td></b><td><b>"
                        + ($scope.t_forwordBal * -1) + "</td></b></tr>");
                $scope.balance_type = "Loss";
            }

            $scope.Profitacc = $("#ProfitAcc").DataTable({
                dom: 'Bfrtip',
                buttons: [
                    'copy', 'excel',
                    {
                        extend: 'print',
                        text: 'Print Selected',
                        title: 'Sahas Educational Institute - Daily Report - Profit Account',
                        message: 'This daily report is genarated on ' + $scope.data.start_day + '.\n\n',
                        orientation: 'portrait',
                        pageSize: 'A4',
                        download: 'open',
                        customize: function (win) {
                            $(win.document.body)
                                    .css('font-size', '11pt')
                                    .prepend(
                                            '<img src="http://localhost:9001/images/watermark.png" style="position:absolute; top:0; right:0; width:30%;" />'
                                            );

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                        },
                        exportOptions: {
                            modifier: {
                                selected: true
                            }
                        }
                    },
                    {
                        extend: 'print',
                        text: 'Print',
                        title: 'Sahas Educational Institute - Daily Report - Profit Account',
                        message: 'This daily report is genarated on ' + $scope.data.start_day + '.\n\n',
                        orientation: 'portrait',
                        pageSize: 'A4',
                        download: 'open',
                        customize: function (win) {
                            $(win.document.body)
                                    .css('font-size', '11pt')
                                    .prepend(
                                            '<img src="http://localhost:9001/images/watermark.png" style="position:absolute; top:0; right:0; width:30%;" />'
                                            );

                            $(win.document.body).find('table')
                                    .addClass('compact')
                                    .css('font-size', 'inherit');
                        }
                    }
                ],
                select: true
            });
            $("#ProfitAcc").show();
            console.log(response);
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    );
        });
    };


});