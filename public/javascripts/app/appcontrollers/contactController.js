var app = angular.module('app',[]);


app.controller('contactController', function($scope, $timeout ,$http){


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





        $scope.cikisyap=true;
        $scope.Yolla = function(adsoyad,email,tel,mesaj){

        $scope.basarili = false;
        $scope.basarisiz = false;

        $scope.uyeBilgileri = {

            ad_soyad : "" ,
            email: "",
            tel: "",
            mesaj: "",

        }

        var uyeBilgileri = $scope.uyeBilgileri ;


        uyeBilgileri = {

            "ad_Soyad" : adsoyad ,
            "email" : email ,
            "tel" : tel ,
            "mesaj" : mesaj ,

        }
        console.log(uyeBilgileri.tel);

        $http({
            method: 'POST',
            url: "/uyeMesaj" ,
            data : uyeBilgileri,
            header : {'Content-Type': 'Content-Type: application/json'}

        })
            .success(function (cevap) {
                console.log("gelmiyor amk");
                if (cevap.Cevap == "success") {
                    $scope.ad_Soyad = "";
                    $scope.email = "";
                    $scope.tel = "";
                    $scope.mesaj = "";
                    console.log(cevap.Cevap);
                    console.log("geldiiii");
                        $scope.basarili = true;
                    console.log($scope.basarili);
                    $timeout(function(){

                        $scope.basarili = false;


                    },3000);


                } else if(cevap.Cevap == "error") {
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