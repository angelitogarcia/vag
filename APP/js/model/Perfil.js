var Perfil=function()
{
	this.idPerfil;
	this.urlFb;
	this.nombrePerfil;
	this.imgPerfil;
	this.idFb;
	this.insta;
	this.ranking;
	this.vistas;
	this.descripcion;
};
Perfil.prototype={
	getPerfiles:function(callback)
	{
		var perfiles=[];
		$.ajax({
			type:'GET',
			url:'../API/controlador/verPerfiles.php',
			//data:{get_param,:value},
			dataType:'json',
			success:function(data){
				for(var i=0;i<data.length;i++)
				{
					var perfil=new Perfil();
					perfil.idPerfil=data[i].idPerfil;
					perfil.urlFb=data[i].urlFb;
					perfil.nombrePerfil=data[i].nombrePerfil;
					perfil.imgPerfil=data[i].imgPerfil;
					perfil.idFb=data[i].idFb;
					perfil.insta=data[i].insta;
					perfil.ranking=data[i].ranking;
					perfil.vistas=data[i].vistas;
					perfil.descripcion=data[i].descripcion;
					perfiles.push(perfil);
				}
				callback(perfiles,true);
			},
			error:function(error)
			{
				callback(false);
			}
		});
	},
}
