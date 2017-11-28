var app = angular.module('app',[]);

app.controller('etkinlikController',['$scope', '$timeout','$http' , function($scope, $timeout, $http){

    $http({

        method: 'GET',
        url: "/girisVarmi" ,

    })
        .success(function (cevap) {
            if(cevap == "admingirisvar"){

                $scope.cikisyap = false;
                $scope.girisyap = false;
                $scope.admingiris = false;
                $scope.uyeol = true;
                $scope.usersetting = false;
                $scope.etkinlik = true;
            }else if(cevap == "kullanicigirisvar"){
                $scope.cikisyap = false;
                $scope.girisyap = false ;
                $scope.admingiris = true;
                $scope.uyeol = true;
                $scope.usersetting = false;
                $scope.etkinlik = false;
            }else{
                $scope.cikisyap = true;
                $scope.admingiris = true;
                $scope.girisyap = false;
                $scope.uyeol = true;
                $scope.etkinlik = true;
                $scope.usersetting = true;
            }

        })
        .error(function (data) {

        });

    $scope.konu = {};
    $scope.Submit = function () {
        console.log($scope.konu.file["name"]);

        var uploadUrl = '/upload';
        var data = $scope.konu;
        var fd = new FormData();
        for (var key in data)
            fd.append(key, data[key]);

        console.log(fd);
        $http.post(uploadUrl,fd,{

            transformRequest: angular.indentity,
            headers: { 'Content-Type':undefined }

        }).success(function (cevap) {
                if(cevap.Cevap = "success"){
                        $scope.etkinlikpaylas = true;
                    $timeout(function(){

                        $scope.etkinlikpaylas = false;
                        location.href = "/";

                    },3000);
                }

        })
            .error(function (data) {

            });

        console.log("post atildi");

    }










}]);