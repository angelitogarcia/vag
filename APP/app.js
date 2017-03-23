var app = angular.module("MyApp", []);

app.service("valoresGlobales",function()
{
	var idPerfilSelected=0;
});
app.controller("FotosCtrl", function($scope, $http,valoresGlobales){
	$scope.directorioImgs="../../archivos/imagenes/";
    $scope.CargarFotos=function(){
    	$http.get('http://localhost/vag/API/controlador/verFotos.php?limite=2').
	    success(function(data, status, headers, config) {

	      	$scope.fotos = data;
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
    }
    $scope.$on("fotosPerfil",function(){

    })
    $scope.fotosPerfil=function(id){

    }
    $scope.eliminarFoto=function(id){
    }
})
.controller("PerfilesCtrl",function($scope,$http, valoresGlobales){
	$scope.cargarPerfiles=function(){
		$http.get('http://localhost/vag/API/controlador/verPerfiles.php').
	    success(function(data, status, headers, config) {

	      	$scope.perfiles = data;
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
	}
	$scope.agregarPerfil=function(){
		$http.get("http://localhost/vag/API/controlador/agregarPerfil.php",{params:$scope.formdata}).
		success(function(data, status, headers, config) {
	      	console.log(data);
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
	}
	$scope.eliminarPerfil=function(id){
		$http.get("http://localhost/vag/API/controlador/eliminarPerfil.php",{params:{"idPerfil":id}}).
		success(function(data, status, headers, config) {

	      	console.log(data);
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
	}
	$scope.seleccionarPerfil=function(id)
	{
		console.log(id);
	}
})