app.controller("agregarFotosCtrl",function($scope, $mdDialog){
	$scope.data={
		album:""
	}
	$scope.$on('$includeContentLoaded', function(event) {
        initDropzone();
    });
    $scope.$on("cargarAlbumsEnAgregarController",function(event,albums,perfil){
    	$scope.albums=albums;
    	$scope.perfil=perfil;
    })
    $scope.updateAlbum=function(album,id){
    	myDropzone.options.url="../API/controlador/agregarLocalFotos.php?idPerfil="+id+"&album="+album;
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
function modificarAlbumsController($scope,$mdDialog){
	$scope.accion="Crear";
	$scope.album={
		nombre:"",
		caratulaAlbum:""
	};
	$scope.cancel=function(){
		$mdDialog.cancel();
	}
	$scope.accept=function(){
		$mdDialog.hide($scope.album);
	}
}
function agregarTagSeleccionadasController($scope,$mdDialog,fotos){
	$scope.fotos=fotos;
	$scope.tags=[];
	$scope.cancel=function(){
		$mdDialog.cancel();
	}
	$scope.accept=function(){
		for(var i=0;i<$scope.fotos.length;i++){
			$scope.fotos[i].tagsArr=$scope.fotos[i].tagsArr.concat($scope.tags);
			$scope.fotos[i].tags=$scope.fotos[i].tagsArr.toString();
		}
		$mdDialog.hide($scope.fotos);
	}
}