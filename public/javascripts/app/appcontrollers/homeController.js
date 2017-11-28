var app =angular.module('app',[]);
    app.controller('homeController',['$scope', '$timeout','$http', '$filter', function($scope, $timeout, $http ,$filter){
    $scope.chat = true;
    $scope.etkinlikler = [{}];
    $scope.etkinlik = [{}];
    $scope.yorumlarr = [{}];
        $scope.username = "";
        $scope.yorumual = "";

       $scope.a = function(){
           console.log("a geldim");
           $scope.username = "";
           $scope.yorumual = "";

       }


         $scope.currentPage = 2;
         $scope.pageSize = 5;
         $scope.data = [];
         $scope.q = '';
        $scope.sayi;


         var degerler2  = new Array();
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



        $scope.Chat = function(){

            $http({
                method: 'GET',
                url: "/chat"

            })
                .success(function()  {


                })
                .error(function () {

                });


        }

    $http({
        method: 'POST',
        url: "/verial" ,

    })
        .success(function (cevap) {

                console.log(cevap.cevap.length);
                console.log(cevap.cevap[0]["etkinlik_KayitTarih"]);

                    var katsayi= cevap.cevap.length;
                    $scope.sayi = katsayi;
                    console.log($scope.sayi);

                    var degerler  = new Array();
                    var bas = parseInt(cevap.cevap.length)-1;

                    console.log(bas);
                    var sayfa = 5;
                    for(i=bas;i>=0;i--) {


                        cevap.cevap[i]["etkinlik_KayitTarih"] = cevap.cevap[i]["etkinlik_KayitTarih"].substring(0,10);
                        degerler[i] = cevap.cevap[i];
                        console.log(degerler[i]);
                    }
                     var basss = bas+1;
                     var bass = Math.ceil(basss/$scope.pageSize);
                     $scope.etkinlikler = degerler;
                     for (var i=0; i<$scope.pageSize*bass; i++) {
                         $scope.data.push("Item "+i);
                    }
                 console.log(degerler2[0]);

        })
        .error(function (data) {

        });




             $scope.getData = function () {
                 // needed for the pagination calc
                 // https://docs.angularjs.org/api/ng/filter/filter
                 return $filter('filter')($scope.data, $scope.q)
                 /*
                  // manual filter
                  // if u used this, remove the filter from html, remove above line and replace data with getData()

                  var arr = [];
                  if($scope.q == '') {
                  arr = $scope.data;
                  } else {
                  for(var ea in $scope.data) {
                  if($scope.data[ea].indexOf($scope.q) > -1) {
                  arr.push( $scope.data[ea] );
                  }
                  }
                  }
                  return arr;
                  */
             }

             $scope.numberOfPages=function(){
                 return Math.ceil($scope.getData().length/$scope.pageSize);
             }


                $scope.yorumlar = function(yorumid){
                    $scope.a();

                if($scope.goster == true && $scope.yorum == true){
                $scope.goster = false;
                $scope.yorum = false;
                }else{
                $scope.goster = true;
                $scope.yorum = true;
                }

                etkinlikBilgileri = {

                    "etkinlik_ID" : yorumid

                }

                $http({
                    method: 'POST',
                    url: "/yorumal" ,
                    data : etkinlikBilgileri,
                    header : {'Content-Type': 'Content-Type: application/json'}

                })
                    .success(function (cevap) {
                        var katsayi= cevap.cevap.length;
                        $scope.sayi = katsayi;
                        var degerler  = new Array();
                        var bas = parseInt(cevap.cevap.length)-1;

                        for(i=bas;i>=0;i--) {

                            cevap.cevap[i]["yorum_Tarih"] = cevap.cevap[i]["yorum_Tarih"].substring(0,10);
                            degerler[i] = cevap.cevap[i];

                        }
                        $scope.yorumlarr = degerler;

                    })
                    .error(function (data) {

                    });




            }


           $scope.YorumYap = function(yorum,ID,yorumyapan){
                console.log(yorumyapan);

               yorumBilgileri = {

                   "yorum_Yapan" : yorumyapan,
                   "yorum" : yorum,
                   "yorum_EtkinlikID": ID

               }

               $http({
                   method: 'POST',
                   url: "/yorumyap" ,
                   data : yorumBilgileri,
                   header : {'Content-Type': 'Content-Type: application/json'}

               })
                   .success(function (cevap) {
                       if(cevap.Cevap == "success"){
                           console.log("yorum yapýldý.");

                       $scope.a();
                       $scope.goster = true;
                       $scope.yorum = true;
                       $scope.yorumlar(ID);

                       }



                   })
                   .error(function (data) {
                       alert("Bir sorun olustu yorum yapamadýnýz.");

                   });




           }



//We already have a limitTo filter built-in to angular,
//let's make a startFrom filter


}]);
 app.filter('startFrom', function() {
     return function (input, start) {
         start = +start; //parse to int
         return input.slice(start);
     }
 });