var Conexion=function(){

}
Conexion.prototype=
{
	getFotosPerfil:function(callback)
	{
		var fotos=[];
		$.ajax({
			type:'GET',
			url:'../API/controlador/verFotosPerfil.php?idPerfil=19',
			//data:{get_param,:value},
			dataType:'json',
			success:function(data){
				var $fotos=$("#fotos");
				var html="";
				for(var i=0;i<data.length;i++)
				{
					var foto=new Foto(
					data[i].idFoto,
					data[i].urlFoto,
					data[i].ancho,
					data[i].alto,
					data[i].proporcion,
					data[i].idFbFoto,
					data[i].ranking,
					data[i].idPerfil,
					data[i].nombrePerfil
					);
					fotos.push(foto);
				}
				//$fotos.append(html);
				callback(fotos);
			},
			error:function(error)
			{
				alert("error: "+error);
			}
		});
		
	}
}