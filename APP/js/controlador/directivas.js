app.directive('foto',function($timeout){
	return {
		restrict:'A',
		scope:{
			foto:'=',
			directorio:'@',
			mostrarEliminarFoto:'&',	
			mostrarCambiarFotoPerfil:'&',
			mostrarModificarFoto:'&',
			modificarFotoAlbum:'&',
			album:'@',
			last:'=',
			layoutGrid:'&'
		},
		templateUrl: "directives/fotoDirective.html",
		link:{ 
			pre:function(scope, element, attr){
				//console.log("hola");
			},
			post:function (scope, element, attr){
				$(element).show();
				scope.$watch('last',function(){
					//console.log("last");
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
app.directive('ngRightClick', function($parse) {
    return function(scope, element, attrs) {
        var fn = $parse(attrs.ngRightClick);
        element.bind('contextmenu', function(event) {
            scope.$apply(function() {
                event.preventDefault();
                $(element).toggleClass("seleccionada");
                fn(scope, {$event:event});
            });
        });
    };
})
app.directive('layout',function(){
	return function(scope,element,attrs){
		
	}
})
$('#grid').bind("DOMSubtreeModified",function(){
  console.log('changed');
});