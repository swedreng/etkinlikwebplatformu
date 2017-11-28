angular.module('app').directive('fileModel',['$parse',function($parse){

    return {
        restric : 'A' ,
        link : function($scope, element ,attrs){
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            console.log("geldi");
            element.bind('change',function(){

                $scope.$apply(function(){


                    modelSetter($scope, element[0].files[0]);

                })

            })

        }

    }



}]);