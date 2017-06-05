var app = angular.module('app.admin',[])
function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
app.directive('file', function () {
    return {
        scope: {
            file: '='
        },
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var file = event.target.files[0];
                scope.file = file ? file : undefined;
                scope.$apply();
                product_form.image = file
            });
        }
    };
});
app.controller('adminController',['$scope','svadmin','$http',function($scope,svadmin,$http){
    $scope.productlist = [];
    $scope.product_form = {};
    $scope.loading = true;
    $scope.image = {}
    $scope.formData ={
        name:"",
        type:"",
        manufacturer:""
    }

    $scope.login = function (userform) {
        if (userform.$invalid) {
            return
        }
        svadmin.login($scope);
    }


    svadmin.getProduct().then(function(res){
            $scope.productlist = res.data;
            $scope.loading =false;
            setTimeout(function (data) {
                $("a[rel^='prettyPhoto']").prettyPhoto({animation_speed:'normal',theme:'light_square',slideshow:3000, autoplay_slideshow: true});
            },0)

    })

    $scope.deleteProduct = function(product){
        $scope.loading = true;
        svadmin.deleteProduct(product._id).then(function(data){
            $scope.productlist = data.data;
            $scope.loading = false;
            jQuery('.modal').modal('hide')
        })
    }
    $scope.addProduct = function() {
            var data = {
                'name': $scope.name,
                'type': $scope.type,
                'manufacturer': $scope.manufacturer,
                'photo': $scope.file
            }
            var formData = new FormData();
            angular.forEach(data, function (value, key) {
                formData.append(key, value);
            });

            svadmin.addProduct($scope,formData);

    }
    $scope.editProduct = function(){
        $scope.loading = true;

        var data = {
            'name': $scope.product_form.name,
            'type': $scope.product_form.type,
            'manufacturer': $scope.product_form.manufacturer,
            'photo': $scope.file
        }

        var formData = new FormData();
        angular.forEach(data, function (value, key) {
            formData.append(key, value);
        });

         svadmin.editProduct($scope,formData).then(function(data){
            $scope.productlist = data.data;
            $scope.loading = false;
            jQuery('.modal').modal('hide')
        });

        $scope.loading = false;

        /*     if (file && file.name !== product.image) {
                 $scope.image = file.name
                 var uploadUrl = "/multer";
                 var fd = new FormData();
                 fd.append('file', file);

                 $http.post(uploadUrl,fd, {
                     transformRequest: angular.identity,
                     headers: {'Content-Type': undefined}
                 })
                     .then(function(res){
                         console.log("success!!");
                     }, function(res){
                         product.image = file.name
                         svadmin.editProduct(product._id,product).then(function(data){
                             $scope.productlist = data.data;
                             $scope.loading = false;
                             jQuery('.modal').modal('hide')
                         });
                     });


             }
             else{
                 svadmin.editProduct(product._id,product).then(function(data){
                     $scope.productlist = data.data;
                     $scope.loading = false;
                     jQuery('.modal').modal('hide')
                 });
             }*/
    }

    $scope.fillDataToForm = function(product){
       $scope.product_form = clone(product)
    }
    $scope.fileNameChanged = function (ele) {
        var files = ele.files;
        var l = files.length;
        var namesArr = [];

        for (var i = 0; i < l; i++) {
            namesArr.push(files[i].name);
            $scope.image = files[i].name
        }
    }
}])