var app = angular.module("MyApp", []);

var cropBoxData;
var canvasData;

app.controller("FotosCtrl", function($scope, $http){
	$scope.idPerfil=0;
	$scope.directorioImgs="../../archivos/imagenes/";
    $scope.cargarFotos=function(){
    	$http.get('http://localhost/vag/API/controlador/verFotos.php?limite=100').
	    success(function(data, status, headers, config) {
	      	$scope.fotos = data;
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
    };
    $scope.cargarFotos();
    $scope.fotosPerfil=function(id){
    	$http.get('http://localhost/vag/API/controlador/verFotosPerfil.php',{params:{"idPerfil":id}}).
	    success(function(data, status, headers, config) {
	      	$scope.fotos = data;
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
    }
    $scope.eliminarFoto=function(id){
    	$http.get('http://localhost/vag/API/controlador/eliminarFoto.php',{params:{"idFoto":id}}).
	    success(function(data, status, headers, config) {
	      	console.log(data);
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
    }
    $scope.cambiarFotoPerfil=function(url,id,nombrePerfil){
		var $img=$("<img class='cropper'/>");
		$img.attr("src",url);
		myDropzone.idPerfil=id;
		myDropzone.nombrePerfil=nombrePerfil;
		$img.cropper
		({
			aspectRatio: 1 / 1,
			autoCropArea: 0.5,
      		built: function () {
        	$img.cropper('setCanvasData', canvasData);
        	$img.cropper('setCropBoxData', cropBoxData);
      		}
		})
		$("#cropContenedor").prepend($img);
    }
    $scope.cortarImg=function(){
    	$(".cropper").cropper('getCroppedCanvas').toBlob(function (blob) {
			var formData = new FormData();
			formData.append('croppedImage', blob);
			formData.append('nombrePerfil',myDropzone.nombrePerfil);
			formData.append('idPerfil',myDropzone.idPerfil);
			$.ajax('../API/controlador/modificarFotoPerfil.php',{
			   	method: "POST",
			    data: formData,
			    processData: false,
			    contentType: false,
			    success: function (data) {
			      console.log(data);
			    },
			    error: function (error) {
			      console.log(error);
			    }
			});
		});
    }
    // --------- EVENTOS ---------- //
    $scope.$on("actualizarIdPerfil",function(event,data){
    	$scope.fotosPerfil(data);
    	$scope.idPerfil=data;
    });
}) // **************** PERFILES ********************* //
.controller("PerfilesCtrl",function($scope,$http){
	$scope.directorioImgs="../../archivos/imagenes/";
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
	      	$scope.cargarPerfiles();
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
	}
	$scope.eliminarPerfil=function(id){
		$http.get("http://localhost/vag/API/controlador/eliminarPerfil.php",{params:{"idPerfil":id}}).
		success(function(data, status, headers, config) {
	      	console.log(data);
	      	$scope.cargarPerfiles();
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
	}
	$scope.seleccionarPerfil=function(id)
	{
		$scope.$parent.$broadcast("actualizarIdPerfil",id);
		myDropzone.options.url="../API/controlador/agregarLocalFotos.php?idPerfil="+id;
		console.log($scope);
	}
	$scope.cargarPerfiles();
})