 // **************** PERFILES ********************* //
 app.filter("mostrarSolo",function(){
 	return function(perfiles,ids){
 		filtrados=[];
 		$.each(perfiles,function(i,perfil){
 			if(ids.indexOf(perfil.idPerfil)>=0) filtrados.push(perfil);
 		})
 		return filtrados;
 	}
 })
 app.controller("PerfilesCtrl",function($scope,$http,$mdDialog,$mdToast,orderByFilter){
 	$scope.favoritos=[];
	$scope.ordenarPor="nombrePerfil";
	$scope.directorioImgs="../../archivos/imagenes/";
	$scope.allTags=[];
	$scope.historial=[]
	$scope.vistas={
		idPerfil:"",
		numVistas:""
	}

	perfilesHistorial=[];
	$scope.cargarPerfiles=function(){
		$http.get('http://localhost/vag/API/controlador/verPerfiles.php').
	    success(function(data, status, headers, config) {

	      	$scope.perfiles = data;
			$scope.perfiles = orderByFilter($scope.perfiles, $scope.ordenarPor, false);
			$scope.separarTags();
			angular.forEach($scope.perfiles, function(perfil, key){
				perfil.imgPerfil=perfil.imgPerfil+"?_ts=" + new Date().getTime();
			})
			$scope.actualizarHistorial();
	    }).
	    error(function(data, status, headers, config){
	      // log error
	    });
	}
	$scope.actualizarFavoritos=function(){
		var json = localStorage.getItem("favoritos");
		$scope.favoritos=JSON.parse(json);
	}
	$scope.borrarFavoritos=function(){
		var emptyArray=[];
		var json=JSON.stringify(emptyArray);
		localStorage.setItem("favoritos",json);
		$scope.actualizarFavoritos();
	}
	$scope.borrarHistorial=function(){
		var emptyArray=[];
		var json=JSON.stringify(emptyArray);
		localStorage.setItem("historial",json);
		$scope.actualizarHistorial();
	}
	$scope.actualizarHistorial=function(){
		if (localStorage.getItem("historial")!== null) {
		  	var json=localStorage.getItem("historial");
			$scope.historial=JSON.parse(json);
			$scope.perfilesHistorial=$scope.filtrarIdsHistorial($scope.historial,$scope.perfiles);
			console.log($scope.perfilesHistorial);
		}
	}
	$scope.filtrarIdsHistorial=function(historial,perfiles){
		filtrados=[];
 		$.each(perfiles,function(i,perfil){
 			if(arrayObjectIndexOf(historial,perfil.idPerfil,"id")>=0){
 				var indice=arrayObjectIndexOf(historial,perfil.idPerfil,"id");
 				perfil.horaVisita=historial[indice].hora;
 				filtrados.push(perfil);
 			} 
 		})
 		return filtrados;
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
		ev.stopPropagation() 
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
		ev.stopPropagation();
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
			$scope.seleccionarPerfil(perfil,perfil.idPerfil,perfil.title);
		}
	}
	$scope.verTodasFotos=function(){
		$scope.$parent.$broadcast("verTodasFotos");
	}
	$scope.seleccionarPerfil=function(perfil,id,nombre)
	{
		// ---- Guardar en historial ---------- //
		//si no esta guardado en el historial
		if(arrayObjectIndexOf($scope.historial,id,"id")===-1){
			var d=new Date();
			var f=d.toLocaleString();
			var historico={id:id,hora:f};
			$scope.historial.push(historico);
			var json=JSON.stringify($scope.historial);
			localStorage.setItem("historial",json);
		}else{
			var indice=arrayObjectIndexOf($scope.historial,id,"id");
			$scope.historial.splice(indice,1);
			var d=new Date();
			var f=d.toLocaleString();
			var historico={id:id,hora:f};
			$scope.historial.push(historico);
			var json=JSON.stringify($scope.historial);
			localStorage.setItem("historial",json);
		}
		$scope.actualizarHistorial();
		$("#perfilSeleccionado").text(nombre);
		$scope.$parent.$broadcast("actualizarIdPerfil",perfil);
		myDropzone.options.url="../API/controlador/agregarLocalFotos.php?idPerfil="+id;
		console.log($scope);
	}

	$scope.eliminarFavorito=function(id){
		var index=$scope.favoritos.indexOf(id);
		$scope.favoritos.splice(index,1);
		var json=JSON.stringify($scope.favoritos);
		localStorage.setItem("favoritos",json);
	}
	$scope.guardarFavorito=function(ev,id){
		ev.stopPropagation();
		if(window.localStorage){
			if($scope.favoritos.indexOf(id)<0){
				$scope.favoritos.push(id);
				var json=JSON.stringify($scope.favoritos);
				localStorage.setItem("favoritos",json);
			}
		}
		else{
			alert("Este navegador no soporta local storage");
		}
		$scope.actualizarFavoritos();
	}

	$scope.ordenarPerfiles=function(filtro){
		$scope.perfiles = orderByFilter($scope.perfiles, filtro, true);
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
	$scope.actualizarFavoritos();

	

});