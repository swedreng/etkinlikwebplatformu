var app = angular.module('app',[]);

app.controller('hakkimizdaController',['$scope', '$timeout','$http' , function($scope, $timeout, $http){

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


}]);