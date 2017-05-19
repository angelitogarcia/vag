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
    $scope.fotosPerfil=function(perfil){
    	var id=perfil.idPerfil;
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
    	$scope.perfil=data;
    });
    $scope.$on("verTodasFotos",function(event){
    	$scope.cargarFotos();
    })
});