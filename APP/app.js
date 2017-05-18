var app = angular.module("MyApp", ['angucomplete-alt','angular.filter','ngMaterial']);

var cropBoxData;
var canvasData;

app.controller("FotosCtrl", function($scope, $http,$mdDialog,$mdToast){
	$scope.idPerfil=0;
	$scope.directorioImgs="../../archivos/imagenes/";
	$scope.allTags=[];
    $scope.cargarFotos=function(){
    	$http.get('http://localhost/vag/API/controlador/verFotos.php?limite=100').
	    success(function(data, status, headers, config) {

	      	$scope.fotos = data;
	      	$scope.separarTags();
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
	      	$scope.separarTags();
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
    }
    $scope.separarTags=function(){
		var temp=[];
		for(var i=0;i< $scope.fotos.length;i++){
			$scope.fotos[i].tagsArr=[];
			if($scope.fotos[i].tags!=null){
			$scope.fotos[i].tagsArr=$scope.fotos[i].tags.split(",");
			temp=temp.concat($scope.fotos[i].tagsArr);
			}
		}
		$.each(temp, function(i, el){
		    if($.inArray(el, $scope.allTags) === -1) $scope.allTags.push(el);
		});
	}
    $scope.modificarFoto=function(foto){
    	$http.get('http://localhost/vag/API/controlador/modificarTagsFoto.php',{params:foto}).
	    success(function(data, status, headers, config) {
	      	console.log(data);
	    }).
	    error(function(data, status, headers, config){
	      
	    });
    }
    $scope.eliminarFoto=function(id){
    	$http.get('http://localhost/vag/API/controlador/eliminarFoto.php',{params:{"idFoto":id}}).
	    success(function(data, status, headers, config) {
	      	console.log(data);
	    }).
	    error(function(data, status, headers, config){
	      
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
			viewMode:0,
			minContainerWidth:500,
			minContainerHeight:500,
      		built: function () {
        		$img.cropper('setCanvasData', canvasData);
        		$img.cropper('setCropBoxData', cropBoxData);
      		}
		})
		$("#cropContenedor").prepend($img);
    }
    $scope.mostrarModificarFoto=function(ev,_foto){
    	$mdDialog.show({
			locals:{foto:_foto},
	      	controller: modificarFotoController,
	      	templateUrl: 'template/dialogoModificarFoto.html',
	      	parent: angular.element(document.body),
	      	targetEvent: ev,
	      	clickOutsideToClose:true,
	      	fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    })
	    .then(function(foto) {
	      	$scope.modificarFoto(foto);
	    }, function() {
	      	$scope.status = 'You cancelled the dialog.';
	    });
    }
    $scope.mostrarCambiarFotoPerfil=function(ev,foto){
    	$scope.cambiarFotoPerfil($scope.directorioImgs+foto.nombrePerfil+"/"+foto.urlFoto,
    							foto.idPerfil,foto.nombrePerfil);
		$mdDialog.show({
	      contentElement: "#dialogCortar",
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    })
	}
	$scope.mostrarAgregarFotos=function(ev){
		$mdDialog.show({
		      contentElement: "#dialogAgregarFotos",
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.

		})
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
					$scope.$parent.$broadcast("actualizarPerfiles");
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
.controller("PerfilesCtrl",function($scope,$http,$mdDialog,$mdToast,orderByFilter){
	$scope.ordenarPor="nombrePerfil";
	$scope.directorioImgs="../../archivos/imagenes/";
	$scope.allTags=[];
	$scope.cargarPerfiles=function(){
		$http.get('http://localhost/vag/API/controlador/verPerfiles.php').
	    success(function(data, status, headers, config) {

	      	$scope.perfiles = data;
			$scope.perfiles = orderByFilter($scope.perfiles, $scope.ordenarPor, false);
			$scope.separarTags();
			angular.forEach($scope.perfiles, function(perfil, key){
				perfil.imgPerfil=perfil.imgPerfil+"?_ts=" + new Date().getTime();
			})

	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
	}
	$scope.separarTags=function(){
		var temp=[];
		for(var i=0;i< $scope.perfiles.length;i++){
			$scope.perfiles[i].tagsArr=$scope.perfiles[i].tags.split(",");
			temp=temp.concat($scope.perfiles[i].tagsArr);
		}
		$.each(temp, function(i, el){
		    if($.inArray(el, $scope.allTags) === -1) $scope.allTags.push(el);
		});
	}
	$scope.mostrarAgregarPerfil=function(ev){
		$mdDialog.show({
	      controller: agregarPerfilController,
	      templateUrl: 'template/dialogo.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    })
	    .then(function(perfil) {
	      console.log("nombre:" + perfil.nombre +",urlFb:"+perfil.urlFb+",tags:"+perfil.tags);
	      $scope.agregarPerfil(perfil);
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	}
	$scope.mostrarModificarPerfil=function(ev,_perfil){
		$mdDialog.show({
			locals:{perfil:_perfil},
	      controller: modificarPerfilController,
	      templateUrl: 'template/dialogo.html',
	      parent: angular.element(document.body),
	      targetEvent: ev,
	      clickOutsideToClose:true,
	      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
	    })
	    .then(function(perfil) {
	      console.log("nombre:" + perfil.nombre +",urlFb:"+perfil.urlFb+",tagsArr:"+perfil.tags);
	      $scope.modificarPerfil(perfil);
	    }, function() {
	      $scope.status = 'You cancelled the dialog.';
	    });
	}
	$scope.mostrarEliminarPerfil = function(ev,perfil) {
	    // Appending dialog to document.body to cover sidenav in docs app
	    var confirm = $mdDialog.confirm()
	          .title('De verdad deseas eliminar a '+perfil.nombrePerfil+' con el id '+perfil.idPerfil)
	          .ariaLabel('Lucky day')
	          .targetEvent(ev)
	          .ok('Eliminar')
	          .cancel('Cancelar');

	    $mdDialog.show(confirm).then(function(){
	      	console.log("id:"+perfil.idPerfil);
	      	$scope.eliminarPerfil(perfil.idPerfil);
	    }, function() {
	      
	    });
	};
	$scope.agregarPerfil=function(perfil){
		$http.get("http://localhost/vag/API/controlador/agregarPerfil.php",{params:perfil}).
		success(function(data, status, headers, config) {
	      	console.log(data);
	      	$scope.cargarPerfiles();
	      	$scope.mostrarToast("Se agrego correctamente el perfil");
	    }).
	    error(function(data, status, headers, config){
	      	$scope.mostrarToast("Error al agregar: "+data);
	    });
	}
	$scope.modificarPerfil=function(perfil){
		$http.get("http://localhost/vag/API/controlador/modificarPerfil.php",{params:perfil}).
		success(function(data, status, headers, config) {
	      	console.log(data);
	      	$scope.cargarPerfiles();
	      	$scope.mostrarToast("Se modifico correctamente el perfil");
	    }).
	    error(function(data, status, headers, config){
	      	$scope.mostrarToast("Error al modificar: "+data);
	    });		
	}
	$scope.eliminarPerfil=function(id){
		$http.get("http://localhost/vag/API/controlador/eliminarPerfil.php",{params:{"idPerfil":id}}).
		success(function(data, status, headers, config) {
	      	console.log(data);
	      	$scope.cargarPerfiles();
	      	$scope.mostrarToast("Se elimino correctamente el perfil");
	    }).
	    error(function(data, status, headers, config){
	      // log error
	      $scope.mostrarToast("No se pudo eliminar el perfil");
	    });
	}
	$scope.seleccionarPerfilBusqueda=function(perfil){
		if(perfil!=undefined)
		{
		$scope.seleccionarPerfil(perfil.idPerfil,perfil.title);
		}
	}
	$scope.seleccionarPerfil=function(id,nombre)
	{
		$("#perfilSeleccionado").text(nombre);
		$scope.$parent.$broadcast("actualizarIdPerfil",id);
		myDropzone.options.url="../API/controlador/agregarLocalFotos.php?idPerfil="+id;
		console.log($scope);
	}
	$scope.mostrarToast=function(message){
		$mdToast.show(
      		$mdToast.simple()
        	.textContent(message)
	        .hideDelay(3000)
	    );
	}
	// --------- EVENTOS ---------- //
	$scope.actualizarPerfiles=function(){
		$scope.cargarPerfiles();
	}
	$scope.$on("actualizarPerfiles",function(event){
    	$scope.cargarPerfiles();
    });
	$scope.cargarPerfiles();
	

}).controller("agregarFotosCtrl",function($scope){
	$scope.$on('$includeContentLoaded', function(event) {
        initDropzone();
    });
}).
directive('foto',function(){
	return {
		restrict:'E',
		scope:{
			foto:'=',
			directorio:'@',
			eliminarFoto:'&',	
			mostrarCambiarFotoPerfil:'&',
			mostrarModificarFoto:'&'
		},
		templateUrl: "directives/fotoDirective.html",
	}
})

function agregarPerfilController($scope, $mdDialog) {
	$scope.accion="Agregar";
	$scope.perfil={
		tagsArr:[],
		tags:""
	}
	$scope.readonly = false;
    $scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.accept = function() {
    	$scope.perfil.tags=$scope.perfil.tagsArr.toString();
      	$mdDialog.hide($scope.perfil);
    };
  }
function modificarPerfilController($scope, $mdDialog,perfil){
	$scope.accion="Modificar";
	$scope.perfil=perfil;
	$scope.perfil.nombreAnterior=perfil.nombrePerfil;
	$scope.cancel = function() {
      $mdDialog.cancel();
    };

    $scope.accept = function(){
    	$scope.perfil.tags=$scope.perfil.tagsArr.toString();
      	$mdDialog.hide($scope.perfil);
    };
}
function modificarFotoController($scope, $mdDialog,foto){
	$scope.foto=foto;
	$scope.cancel=function(){
		$mdDialog.cancel();
	}
	$scope.accept=function(){
		$scope.foto.tags=$scope.foto.tagsArr.toString();
		$mdDialog.hide($scope.foto);
	}
}

/* -------------------------------------------------------------------------
******************* D I R E C T I V A S ************************************
-------------------------------------------------------------------------- */


