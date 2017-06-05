var app = angular.module('app.admin');
app.factory('svadmin',["$http",function($http){

    return {
        login:function(scope){
          return $http.post('/api/login',{
              username:scope.username,
              password:scope.password

          })
              .then(function(res){
                  if(res.data.error == 0 && res.data.user){
                      window.location.href = "/";
                  }
              }, function(err){
                  scope.sai_mat_khau = err.data.message;

              });
        },
        getProduct : function(){
            return $http.get('/api/products');
        },
        addProduct :function(scope,formData){
            return $http.post('/api/addproduct', formData,
                {
                    headers: {
                        'Content-Type': undefined
                    }
                })
                .then(function () {
                    window.location.href = '/product/getlist'
                },function(){
                    scope.gioi_han = 'Admin Only';
                })
        },
        editProduct :function(scope,formData){
            console.log(formData);
            return $http.put('/api/editproduct',{formData:formData}).then(function(data){
                console.log("DATA:",data)
                },
            function (err) {
                console.log("ERR",err)
            })
        },
        deleteProduct :function(id){
            return $http.delete('/api/deleteproduct/'+id);
        }
    }

}])