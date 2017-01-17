'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('student_assign_to_class', function ($scope, $http) {
    $scope.isStudentSelect = false;
    $(document).ready(function () {
        $scope.learn_class_table = $("#learn_class_table").DataTable();
    });

    //define variables
    $scope.studentname = '';
    $scope.class_fee = null;

    $scope.init = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/studyClass'
        }).then(function successCallback(response) {
            $scope.study_class_select = response.data.result;
            $scope.selected = response.data.result[0].clsId;
        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });

    };

    $scope.update_fee = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/studyClass/' + $scope.selected
        }).then(function successCallback(response) {
            console.log(response.data);
            $scope.class_fee = response.data.clsFee;
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
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/student-exsist/' + $scope.addmision_number
        }).then(function successCallback(response) {
            if (response.data.result) {
                $http({
                    method: 'POST',
                    url: 'http://localhost:8084/SmileClass/student-learn-class',
                    data: {
                        "learnFee": $scope.class_fee,
                        "studentLearnClassPK": {
                            "clsId": $scope.selected,
                            "stuId": $scope.addmision_number
                        },
                        "student": $scope.addmision_number,
                        "studyClass": $scope.selected,
                        "recodeState": 1
                    }
                }).then(function successCallback(response) {
                    //load table
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
                        $scope.isStudentSelect = true;
                    }, function errorCallback(response) {
                        swal(
                                'Error!',
                                'Something Wrong!',
                                'error'
                                )
                    });







                    swal(
                            'Success',
                            'Good!',
                            'success'
                            )
                }, function errorCallback(response) {
                    swal(
                            'Error!',
                            'Registration Number is Already Used!',
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



});