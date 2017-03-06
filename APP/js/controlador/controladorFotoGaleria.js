var ControladorFotoGaleria=function()
{
	this.foto=new Foto();
	this.vistaFotoGaleria=new VistaFotoGaleria();
	this.eventos();
};
// Foto Galeria, Eliminar foto, tags de cada foto
ControladorFotoGaleria.prototype=
{
	fotoGaleria:function(id)
	{
		var fotos=[];
		var vista= this.vistaFotoGaleria;
		this.foto.getFotos(id,function(data,res)
		{
			if(res)
			{
				fotos=data;
				vista.llenarVista(fotos);

			}else
			{
				alert("error");
			}
		})
	},
	tagsGaleria:function(id,contenedor)
	{
		var tags=[];

		var tag=new Tag();
		tag.setIdTag("1");
		tag.setNombreTag("c++");
		tags.push(tag);
		var tag2=new Tag();
		tag2.setIdTag("2");
		tag2.setNombreTag("java");
		tags.push(tag2);

		this.vistaFotoGaleria.mostrarTags(tags,contenedor);
	},
	eventos:function()
	{
		var myself=this;
		var cropBoxData;
      	var canvasData;
		$(".click").click(function()
		{
			alert("prototype");
		});
		$("#fotos").on("click",".borrar",function()
		{
			var id=$(this).attr("idFoto");
			foto.borrarFoto(id,function(res)
			{
				if(res)
				{
					alert("se borro la foto correctamente");
				}
				else
				{
					alert("no se pudo borrar");
				}

			});
		});
		/* --------------------------------------------
					CAMBIAR FOTO DE PERFIL 
		---------------------------------------------- */
		$("#fotos").on("click",".fotoPerfil",function()
		{

			var id=$(this).attr("idFoto");
			var url=$(".foto[idFoto="+id+"] img").attr("src");
			var $img=$("<img class='cropper'/>");
			$img.attr("src",url);
			$img.cropper
			({
				aspectRatio: 1 / 1,
				autoCropArea: 0.5,
          		built: function () {
            	$img.cropper('setCanvasData', canvasData);
            	$img.cropper('setCropBoxData', cropBoxData);
          		}
			})
			$("#cropContenedor").prepend($img);
		});
		$("body").on("click",".cortar",function()
		{
			$(".cropper").cropper('getCroppedCanvas').toBlob(function (blob) {
			  var formData = new FormData();
			  formData.append('croppedImage', blob);
			  $.ajax('../API/controlador/modificarFotoPerfil.php',{
			    method: "POST",
			    data: formData,
			    processData: false,
			    contentType: false,
			    success: function (data) {
			      console.log(data);
			    },
			    error: function (error) {
			      console.log(error);
			    }
			  });
			});
        	//$image.cropper('destroy');
		})
		$("#fotos").on("click",".modificarTags",function()
		{
			contenedor=$(this).parent();
			myself.tagsGaleria(19,contenedor);
		})
		/*$("body").on("click",".cortar",function(){
			var result=$(".cropper").cropper('getCroppedCanvas');
			$(".resultadoCrop").html(result);
		})*/

	}

}