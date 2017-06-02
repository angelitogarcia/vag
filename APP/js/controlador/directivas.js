app.directive('foto',function($timeout){
	return {
		restrict:'A',
		scope:{
			foto:'=',
			directorio:'@',
			eliminarFoto:'&',	
			mostrarCambiarFotoPerfil:'&',
			mostrarModificarFoto:'&',
			album:'@',
			last:'=',
			layoutGrid:'&'
		},
		templateUrl: "directives/fotoDirective.html",
		link:{ 
			pre:function(scope, element, attr){
				$("#grid .galcolumn").remove();
				$(element).hide();
			},
			post:function (scope, element, attr){
				$(element).show();
				scope.$watch('last',function(){
					if (scope.last === true) {
						$timeout(function () {
							scope.layoutGrid();
						});
					}
				})
			}
		}
	}
})