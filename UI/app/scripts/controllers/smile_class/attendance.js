'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('attendance', function ($scope, $http, ngAudio) {
    $scope.isStudentSelect = false;
    $scope.audio = ngAudio.load('audio/alarm2.mp3');

    $scope.validationOptions = {
        rules: {
            addmision_number: {
                required: true,
                number: true
            }
        },
        messages: {
            addmision_number: {
                required: "Please Enter Student Registration Number",
                number: "Your Registration Number must be in the format of 111"
            }
        }
    };

    $(document).ready(function () {
        $scope.stusertable = $("#StudentSearchResultByName").DataTable({});
    });

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


    $scope.submit = function (form) {
        if (form.validate()) {
            $http({
                method: 'GET',
                url: 'http://localhost:8084/SmileClass/student-exsist/' + $scope.addmision_number
            }).then(function successCallback(response) {
                console.log($scope.addmision_number);
                console.log(response.data.result);
                $scope.isStudentSelect = true;
                if (response.data.result) {
                    $http({
                        method: 'POST',
                        url: 'http://localhost:8084/SmileClass/attendance',
                        data: {
                            "addmision_number": $scope.addmision_number,
                            "class_id": $scope.selected
                        }
                    }).then(function successCallback(response) {
                        console.log(response.data.msg);
                        var state = response.data.msg;
                        if (state == 'not_learn') {
                            swal('Not Learn', 'Student not learn in this class', 'error');
                        } else if (state == 'have_to_pay') {
                            swal('Have to pay', 'Mark Attendence, and you have to pay fees', 'warning');
                        } else if (state == 'should_pay') {
                            swal({
                                title: "Can't Attend to Class!!!",
                                text: "You will not be able attend class without Teacher's authorization!",
                                type: "error",
                                showCancelButton: true,
                                confirmButtonColor: "#DD6B55",
                                confirmButtonText: "Authorization",
                                cancelButtonText: "Skip Attendance",
                                closeOnConfirm: false,
                                closeOnCancel: false
                            },
                                    function (isConfirm) {
                                        if (isConfirm) {
                                            swal({
                                                title: "Authorization Code",
                                                text: "Enter serial number of chit issued by class teacher.",
                                                type: "input",
                                                showCancelButton: true,
                                                closeOnConfirm: false,
                                                animation: "slide-from-top",
                                                inputPlaceholder: "Authorization Code"
                                            },
                                                    function (inputValue) {
                                                        if (inputValue === false)
                                                            return false;

                                                        if (inputValue === "") {
                                                            swal.showInputError("You need to write something!");
                                                            return false
                                                        }

                                                        swal("Mark Attendance", "We Marked Attendance, You Should pay fees on next day.", "warning");
                                                    });

                                        } else {
                                            swal("Cancelled", "Attendence is not marked. Just skipped", "error");
                                        }
                                    });


                            $scope.audio.play();

                        } else if (state == 'welcome') {
                            swal('Success', 'Mark Attendence, and welcome to the class', 'success');
                        } else if (state == 'problem') {
                            swal('Error!', 'Some Technical Error', 'error');
                        } else {
                            swal('Error!', 'Something Wrong!', 'error');
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
                                $("#stuSerchTableBody").append("<tr><td>"
                                        + response.data.result[i].stuAccTid + "</td><td>"
                                        + response.data.result[i].stuAccPaybleYear + "</td><td>"
                                        + response.data.result[i].stuAccPaybleMonth + "</td><td>"
                                        + response.data.result[i].lid.studyClass.clsName + "</td><td>"
                                        + response.data.result[i].lid.studyClass.teaId.teaName + "</td><td>"
                                        + response.data.result[i].lid.learnFee + "</td></tr>");
                                $scope.creditBal = $scope.creditBal + response.data.result[i].lid.learnFee;
                            }
                            $scope.stusertable = $("#StudentSearchResultByName").DataTable({});



                            $("#studentSearchingTable").show();

                        }, function errorCallback(response) {
                            swal(
                                    'Error!',
                                    'Something Wrong!',
                                    'error'
                                    );
                        });
                        $scope.addmision_number = '';
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
                        'Student Registration Number is Not Exist',
                        'error'
                        );
            });

        }



    };



});