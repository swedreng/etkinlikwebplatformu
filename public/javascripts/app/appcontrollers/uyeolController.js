var app = angular.module('app',[]);

app.controller('uyeolController', function($scope, $timeout ,$http) {

    $scope.cikisyap = true;

    $scope.uyeKayit = function (ad, soyad, username, password, email, tel) {

        $scope.alert = false;

        $scope.uyeBilgileri = {

            uye_Adi: "",
            uye_Soyadi: "",
            uye_Username: "",
            uye_Password: "",
            uye_Email: "",
            uye_Tel: ""

        }

        var uyeBilgileri = $scope.uyeBilgileri;
        console.log(ad, soyad);

        uyeBilgileri = {

            "uye_Adi": ad,
            "uye_Soyadi": soyad,
            "uye_Username": username,
            "uye_Password": password,
            "uye_Email": email,
            "uye_Tel": tel

        }
        console.log(uyeBilgileri.uye_Adi);
        $http({
            method: 'POST',
            url: "/uyeKayit",
            data: {

                uye_Adi: uyeBilgileri.uye_Adi,
                uye_Soyadi: uyeBilgileri.uye_Soyadi,
                uye_Username: uyeBilgileri.uye_Username,
                uye_Password: uyeBilgileri.uye_Password,
                uye_Email: uyeBilgileri.uye_Email,
                uye_Tel: uyeBilgileri.uye_Tel,

            },
            header: {'Content-Type': 'Content-Type: application/json'}

        })
            .success(function (cevap) {

                if (cevap.Cevap == "üyeVar") {

                    $scope.uyevar = true;
                    $timeout(function () {

                        $scope.uyevar = false;


                    }, 3000);

                } else {

                    if (cevap.Cevap == "success") {
                        $scope.alert = true;
                        $timeout(function () {

                            $scope.alert = false;

                        }, 3000);

                    } else {

                    }
                }

            })
            .error(function (data) {

            });
    }

});