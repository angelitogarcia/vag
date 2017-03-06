var ControladorPerfiles=function()
{
	perfil=new Perfil();
	vistaPerfiles=new VistaPerfiles();
	this.eventos();
};
// Foto Galeria, Eliminar foto, tags de cada foto
ControladorPerfiles.prototype=
{
	perfiles:function()
	{
		var perfiles=[];
		perfil.getPerfiles(function(data,res)
		{
			if(res)
			{
				perfiles=data;
				this.vistaPerfiles.llenarVista(perfiles);

			}else
			{
				alert("error");
			}
		})
	},
	eventos:function()
	{
		$(".click").click(function()
		{
			alert("prototype");
		});
		$("#perfiles").on("click",".borrar",function()
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
		})
	}

}