app.directive('foto',function(){
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
});