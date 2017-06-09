app.controller("FotosCtrl", function($scope, $http,$mdDialog,$mdToast){
	$scope.idPerfil=0;
	$scope.directorioImgs="../../archivos/imagenes/";
	$scope.allTags=[];
	$scope.search="";
	$scope.perfil=undefined;
	$scope.albums=[];
	var $grid;
	$scope.data={
		search:""
	}
	$scope.fotosSeleccionadas=[];



    // ********************************************* //
    //		     C A R G A R   F O T O S		 	 //
    // ********************************************* //

    $scope.$on("actualizarIdPerfil",function(event,data){
    	$scope.perfil=data;
    	$scope.fotosPerfil(data);
    	$scope.fotosSeleccionadas=[];
    	$scope.data.search="";
    });

    $scope.$on("verTodasFotos",function(event){
    	$scope.cargarFotos();
    	$scope.fotosSeleccionadas=[];
    	$scope.data.search="";
    })

    $scope.cargarFotos=function(){
    	$scope.perfil=undefined;
    	$http.get('http://localhost/vag/API/controlador/verFotos.php?limite=100').
	    success(function(data, status, headers, config) {
	      	$scope.fotos = data;
	      	$scope.separarTags();

	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
    };

    $scope.fotosPerfil=function(perfil){
    	var id=perfil.idPerfil;
    	$scope.cargarAlbumsPerfil();
    	$http.get('http://localhost/vag/API/controlador/verFotosPerfil.php',{params:{"idPerfil":id}}).
	    success(function(data, status, headers, config) {
	      	$scope.fotos = data;
	      	$scope.separarTags();
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
    }

    $scope.layoutGrid= function() {
    	$("#grid").gridalicious({
            selector: ".grid-item",
            width: 200,
            gutter:1,
            animate:true
        });
    };

    // ********************************************* //
    //		      A G R E G A R  F O T O S			 //
    // ********************************************* //

    $scope.mostrarAgregarFotos=function(ev,albums){
		$mdDialog.show({
		      contentElement: "#dialogAgregarFotos",
		      parent: angular.element(document.body),
		      targetEvent: ev,
		      clickOutsideToClose:true,
		      fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		})
	}


    // ********************************************* //
    //					A L B U M S 				 //
    // ********************************************* //

    $scope.mostrarModificarAlbums=function(ev){
    	ev.stopPropagation();
    	$mdDialog.show({
	      	controller: modificarAlbumsController,
	      	templateUrl:'template/dialogoModificarAlbums.html',
	      	parent: angular.element(document.body),
	      	targetEvent: ev,
	      	clickOutsideToClose:true,
	      	fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
		})
		.then(function(album){
			$scope.albums.push(album);
		    $scope.modificarAlbums($scope.perfil.idPerfil,$scope.albums);
		}, function() {
		    $scope.status = 'You cancelled the dialog.';
		});
    }

    //crear album
    $scope.modificarAlbums=function(id,albums){
    	var json=JSON.stringify(albums);
    	$http.get('http://localhost/vag/API/controlador/modificarAlbumsPerfil.php',{params:{"idPerfil":id,"albums":json}}).
	    success(function(data, status, headers, config) {
	      	console.log(data);
	    }).
	    error(function(data, status, headers, config){
	    });
    }

    $scope.seleccionarAlbum=function(nombreAlbum){
    	$scope.data.search=nombreAlbum;
    }
    $scope.cargarAlbumsPerfil=function()
    {
    	$scope.albums=JSON.parse($scope.perfil.albums);
    }


    $scope.modificarFotoAlbum=function(nombreAlbum,foto){
	    $http.get('http://localhost/vag/API/controlador/modificarAlbumFoto.php',{params:{"idFoto":foto.idFoto,"album":nombreAlbum}}).
		success(function(data, status, headers, config){
			console.log(data);
		}).error(function(data, status, headers, config){

		});
    }
    $scope.agregarFotosAlbum=function(valid,nombreAlbum,fotos){
    	console.log(nombreAlbum+"");
    	console.log(fotos);
    	if(valid){
	    	for(var i=0;i<fotos.length;i++){
	    		$scope.modificarFotoAlbum(nombreAlbum,fotos[i]);
	    	}
    	}
    }



    // ********************************************* //
    //	     		V E R   F O T O S  				//
    // ********************************************* //

	$scope.mostrarCanvas=function(fotos,directorio,id){
		initCanvasViewer(fotos,id,directorio);
		$("#canvas").show();
	}

    // seleccionar foto con boton derecho 
    $scope.seleccionarFoto=function(foto){
    	foto.seleccionada=!foto.seleccionada;
    	if(foto.seleccionada){
    		$scope.fotosSeleccionadas.push(foto);
    	}else{
    		if(arrayObjectIndexOf($scope.fotosSeleccionadas,foto.idFoto,"idFoto")>=0)
    		{
    			var id=arrayObjectIndexOf($scope.fotosSeleccionadas,foto.idFoto,"idFoto");
    			$scope.fotosSeleccionadas.splice(id,1);
    		}
    	}
    	console.log($scope.fotosSeleccionadas)
    }
    // ********************************************* //
    //					T  A  G  S				     //
    // ********************************************* //

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

    $scope.mostrarModificarFoto=function(ev,_foto){
    	ev.stopPropagation();
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


    // ********************************************* //
    //	  C A M B I A R  F O T O  D E  P E R F I L   //
    // ********************************************* //

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

    $scope.mostrarCambiarFotoPerfil=function(ev,foto){
    	ev.stopPropagation();
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

    // ********************************************* //
    //	          E L I M I N A R   F O T O          //
    // ********************************************* //

    $scope.eliminarFoto=function(id){
    	$http.get('http://localhost/vag/API/controlador/eliminarFoto.php',{params:{"idFoto":id}}).
	    success(function(data, status, headers, config) {
	      	console.log(data);
	    }).
	    error(function(data, status, headers, config){
	      
	    });
    }

    $scope.mostrarEliminarFoto=function(ev,id){
    	ev.stopPropagation();
	    var confirm = $mdDialog.confirm()
	        .title('De verdad deseas eliminar esta foto')
	        .ariaLabel('Lucky day')
	        .targetEvent(ev)
	        .ok('Eliminar')
	        .cancel('Cancelar');

	    $mdDialog.show(confirm).then(function(){
	      	console.log("id:"+id);
	      	$scope.eliminarFoto(id);
	    },function(){
	      
	    });
    }

    $scope.cargarFotos();
});