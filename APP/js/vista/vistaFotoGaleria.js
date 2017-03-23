var VistaFotoGaleria=function()
{
	fotos;
	html="";
	this.contenedor=$("#fotos");
}
VistaFotoGaleria.prototype=
{
	getHtml:function()
	{
		var $html=$("<div class='foto'></div>");
		var $img=$("<img src=''/>");
		$html.append($img);
		return $html;
	},
	llenarVista:function(fotos)
	{
		var html="";
		for(var i=0;i<fotos.length;i++)
		{
			var url="../../../archivos/imagenes/"+fotos[i].nombrePerfil+"/"+fotos[i].urlFoto;
			var idPerfil=fotos[i].idPerfil;
			var idFoto=fotos[i].idFoto;
			html+="<div class='foto' idFoto='"+idFoto+"' idPerfil='"+idPerfil+"'>";
			html+="<img src='"+url+"'/>";
			html+="<a href='#' idFoto='"+idFoto+"' class='borrar'>Borrar</a>";
			html+="<a href='#' idFoto='"+idFoto+"' class='fotoPerfil'> Usar como foto de Perfil</a>";
			html+="<a href='#' idFoto='"+idFoto+"' class='modificarTags'>Tags</a>";
			//html+="<textarea class='tags'></textarea>";
			html+="</div>";
		};
		this.contenedor.append(html);
		var tags=["c++","php"];
		$(".tags").tagEditor({ 
			initialTags: tags,
			autocomplete:{
      			minLength: 2,
				source:function( request, response ) {
			        $.ajax( {
				        url: "../API/controlador/verTags.php",
				        dataType: "json",
				        success: function(data){
				            var array=$.map(data, function(value, index) {
							    return [value.nombre];
							});
							response($.ui.autocomplete.filter(array, request.term));
				        }
			        });
				}
			}
		});

	},
	mostrarTags:function(tags,contenedor)
	{
		var html="";
		//var tags=["c++","php"];
		//$(".tags").tagEditor({ initialTags: tags });
		var $ul=$("<ul id='tags'></ul>");
		for(var i=0;i<tags.length;i++)
		{
			$ul.append("<li class='definido' idTag='"+tags[i].idTag+"'>"+tags[i].nombre+"</li>");
		}

		$ul.focusout(function(e)
		{
			var input=$(this).find("input.inputTags");
			var texto=input.val();
			if(input.val().length>0)
			{
				$(this).bind("click",function(){
					event.stopPropagation();
					$ul.append("<li><input class='inputTags' type='text'/></li>");
					$(".inputTags").focus();
					$(this).unbind("click");
				});
				$(this).find("li").last().remove();
				$ul.append("<li>"+texto+"</li>");
			}else
			{

			}
			console.log("fad");
		})
		$(document).on("keypress","input.inputTags",function(e) {
		    if(e.which == 13) {
		        var input=$(this);
				var texto=input.val();
				if(input.val().length>0)
				{
					$ul.bind("click",function(){
						event.stopPropagation();
						$ul.append("<li><input class='inputTags' type='text'/></li>");
						$(".inputTags").focus();
						$(this).unbind("click");
					});
					$ul.find("li").last().remove();
					$ul.append("<li>"+texto+"</li>");
				}else
				{

				}
		    }
		});

		$ul.on("click",function(event)
		{
			event.stopPropagation();
			$ul.append("<li><input class='inputTags' type='text'/></li>");
			$(".inputTags").focus();
			$(this).unbind("click");
		});//.off("click");
		contenedor.append($ul);
	}


}