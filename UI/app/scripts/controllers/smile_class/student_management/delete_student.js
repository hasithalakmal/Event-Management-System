'use strict';

/**
 * @ngdoc function
 * @name dashyAngular.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of dashyAngular
 */
angular.module('dashyAngular').controller('delete_student', function ($scope, $http) {

    $scope.addmision_number = "";

    $scope.init = function () {
        /* $http({
         method: 'GET',
         url: 'http://localhost:8084/SmileClass/student'
         }).then(function successCallback(response) {
         $scope.student_names_select = response.data.result;
         $scope.selected = $scope.student_names_select[0].stuId;
         }, function errorCallback(response) {
         swal(
         'Error!',
         'Something Wrong!',
         'error'
         )
         }); */
    };


    $scope.submit = function () {
        $http({
            method: 'GET',
            url: 'http://localhost:8084/SmileClass/student-exsist/' + $scope.addmision_number
        }).then(function successCallback(response) {
            $http({
                method: 'DELETE',
                url: 'http://localhost:8084/SmileClass/student/' + $scope.addmision_number
            }).then(function successCallback(response) {
                swal(
                        'Success!',
                        'Student is Successfully Deleted!',
                        'success'
                        )
                $scope.addmision_number = '';
                $scope.init();

            }, function errorCallback(response) {
                swal(
                        'Error!',
                        'Student Registration Number is Not Exist!',
                        'error'
                        )
            });



        }, function errorCallback(response) {
            swal(
                    'Error!',
                    'Something Wrong!',
                    'error'
                    )
        });







    };
});
'use strict';

