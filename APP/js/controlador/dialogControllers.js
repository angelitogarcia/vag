app.controller("agregarFotosCtrl",function($scope){
	$scope.$on('$includeContentLoaded', function(event) {
        initDropzone();
    });
});

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