var app =angular.module('app',[]);
 app.controller('girisController', function($scope, $timeout ,$http){
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
                $scope.uyeol = false;
                $scope.etkinlik = true;
                $scope.usersetting = true;
            }

        })
        .error(function (data) {

        });

    console.log("post atildi");

    $scope.uyeGiris = function (username,password){

        $scope.admin = false;
        $scope.kullanici = false;

        $scope.uyeBilgileri = {

            uye_Username : "" ,
            uye_Password : "",

        }

        var uyeBilgileri = $scope.uyeBilgileri ;
        console.log(username,password);



        uyeBilgileri = {

            "uye_Username" : username ,
            "uye_Password" : password ,

        }
       $scope.yorumyapankisi = username;



        console.log($scope.yorumyapankisi+"ben geldim aq");
        $http({
            method: 'POST',
            url: "/uyeGiris" ,
            data : uyeBilgileri,
            header : {'Content-Type': 'Content-Type: application/json'}

        })
            .success(function (cevap) {
                if (cevap.Cevap == "Admin" || cevap.Cevap == "kullanici") {
                    console.log(cevap.Cevap);
                    if(cevap.Cevap == "Admin"){

                    $scope.admin = true;
                    console.log("uyeVar");

                    $timeout(function(){

                    $scope.admin = false;
                        location.href = "/";

                    },3000);

                    }else if(cevap.Cevap == "kullanici"){
                        $scope.kullanici = true;
                        console.log("uyeVar");

                        $timeout(function(){

                            $scope.kullanici = false;
                            location.href = "/";

                        },3000);

                    }

                } else {
                    console.log("uyeYok");
                    $scope.basarisiz = true;
                    $timeout(function(){

                    $scope.basarisiz = false;

                    },3000);

                }

            })
            .error(function (data) {

            });

        console.log("post atildi");

    }

});