'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('view_student', function ($scope, $http, $sce) {
    $scope.isStudentSelect = false;
    $(document).ready(function () {
        $scope.learn_class_table = $("#learn_class_table").DataTable();
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
        $scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({});
    });

    $scope.submit = function () {
        // Simple GET request example:
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/student-exsist/' + $scope.addmision_number
        }).then(function successCallback(response) {
            if (response.data.result) {
                $scope.isStudentSelect = true;
                //personal details
                $http({
                    method: 'GET',
                    url: 'http://localhost:8084/SmileClass/student/' + $scope.addmision_number
                }).then(function successCallback(response) {
                    $scope.student_personaldata = response.data;
                }, function errorCallback(response) {
                    swal(
                            'Error!',
                            'Something Wrong!',
                            'error'
                            )
                });

                //need to pay fees
                $http({
                    method: 'GET',
                    url: 'http://localhost:8084/SmileClass/fees/' + $scope.addmision_number
                }).then(function successCallback(response) {
                    $scope.classess = response.data.result;
                    $scope.stusertable.destroy();
                    $('#stuSerchTableBody').empty();
                    var i = 0;
                    $scope.st_Bal = 0;
                    for (i = 0; i < response.data.result.length; i++) {
                        $("#stuSerchTableBody").append("<tr><td></td><td>"
                                + response.data.result[i].stuAccTid + "</td><td>"
                                + response.data.result[i].stuAccPaybleYear + "</td><td>"
                                + response.data.result[i].stuAccPaybleMonth + "</td><td>"
                                + response.data.result[i].lid.studyClass.clsName + "</td><td>"
                                + response.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                + response.data.result[i].lid.learnFee + "</td></tr>");

                        $scope.st_Bal = $scope.st_Bal + response.data.result[i].lid.learnFee;
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
                            'Something Wrong!',
                            'error'
                            )
                });

                $http({
                    method: 'GET',
                    url: 'http://localhost:8084/SmileClass/fees-history/' + $scope.addmision_number
                }).then(function successCallback(response2) {
                    console.log(response2.data);
                    $scope.classess2 = response2.data.result;
                    $scope.stusertable2.destroy();
                    $('#stuSerchTableBody2').empty();
                    var i = 0;
                    for (i = 0; i < response2.data.result.length; i++) {
                        $("#stuSerchTableBody2").append("<tr><td>"
                                + response2.data.result[i].stuAccTid + "</td><td>"
                                + response2.data.result[i].stuAccPaybleYear + "</td><td>"
                                + response2.data.result[i].stuAccPaybleMonth + "</td><td>"
                                + response2.data.result[i].lid.studyClass.clsName + "</td><td>"
                                + response2.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                + response2.data.result[i].stuAccPaidDate + "</td><td>"
                                + response2.data.result[i].lid.learnFee + "</td></tr>");
                    }
                    $scope.stusertable2 = $("#StudentSearchResultByName2").DataTable({});
                    $("#StudentSearchResultByName2").show();
                }, function errorCallback(response) {
                    swal(
                            'Error!',
                            'Something Wrong!',
                            'error'
                            )
                });



























                //Learn Class table
                $http({
                    method: 'GET',
                    url: 'http://localhost:8084/SmileClass/student-all-learn-classes/' + $scope.addmision_number
                }).then(function successCallback(response1) {
                    $scope.classess = response1.data.result;
                    $scope.learn_class_table.destroy();
                    $('#learn_class_table_body').empty();
                    var i = 0;
                    for (i = 0; i < response1.data.result.length; i++) {
                        $("#learn_class_table_body").append("<tr><td>"
                                + response1.data.result[i].studyClass.clsName + "</td><td>"
                                + response1.data.result[i].studyClass.subId.subName + "</td><td>"
                                + response1.data.result[i].studyClass.clsTypeId.clsTypeName + "</td><td>"
                                + response1.data.result[i].studyClass.teaId.teaName + "</td><td>"
                                + response1.data.result[i].learnFee + "</td></tr>");
                    }


                    //to run data table
                    $scope.learn_class_table = $("#learn_class_table").DataTable();
                    $("#learn_class_table").show();

                }, function errorCallback(response) {
                    swal(
                            'Error!',
                            'Something Wrong!',
                            'error'
                            )
                });
            } else {
                swal(
                        'Error!',
                        'Student Registration Number is Not Exist!',
                        'error'
                        );
            }
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    );
        });
    };



    $scope.pay_fee = function () {
        console.log($scope.stusertable.rows('.selected').data());
        var i = 0;
        for (i = 0; i < $scope.stusertable.rows('.selected').data().length; i++) {
            var selectedRecodeID = $scope.stusertable.rows('.selected').data()[i][1];
            // Simple GET request example:
            $http({
                method: 'POST',
                url: 'http://localhost:8084/SmileClass/fees',
                data: {
                    "stuAccTid": selectedRecodeID
                }
            }).then(function successCallback(response) {
                $http({
                    method: 'GET',
                    url: 'http://localhost:8084/SmileClass/fees/' + $scope.addmision_number
                }).then(function successCallback(response) {
                    console.log('first');
                    $scope.classess = response.data.result;
                    $scope.stusertable.destroy();
                    $('#stuSerchTableBody').empty();
                    var i = 0;
                    for (i = 0; i < response.data.result.length; i++) {
                        $("#stuSerchTableBody").append("<tr><td></td><td>"
                                + response.data.result[i].stuAccTid + "</td><td>"
                                + response.data.result[i].stuAccPaybleYear + "</td><td>"
                                + response.data.result[i].stuAccPaybleMonth + "</td><td>"
                                + response.data.result[i].lid.studyClass.clsName + "</td><td>"
                                + response.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                + response.data.result[i].lid.learnFee + "</td></tr>");
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
                    console.log('aaaa');
                }, function errorCallback(response) {
                    swal(
                            'Error!',
                            'Something Wrong!',
                            'error'
                            )
                });






                console.log(response.data);
            }, function errorCallback(response) {
                swal(
                        'Error!',
                        'Something Wrong!',
                        'error'
                        );
            });
        }

        swal(
                'Success!',
                'Good!',
                'success'
                );


    };

});