var VistaPerfiles=function()
{
	html="";
	this.contenedor=$("#perfiles");
}
VistaPerfiles.prototype=
{
	getHtml:function()
	{
		var $html=$("<div class='foto'></div>");
		var $img=$("<img src=''/>");
		$html.append($img);
		return $html;
	},
	llenarVista:function(perfiles)
	{
		var html="";
		for(var i=0;i<perfiles.length;i++)
		{
			var idPerfil=perfiles[i].idPerfil;
			var nombrePerfil=perfiles[i].nombrePerfil;
			html+="<div class='perfil' idPerfil='"+idPerfil+"'>";
			//html+="<img src='"+url+"'/>";
			html+="<p>"+nombrePerfil+"</p>";
			html+="<a href='#' idPerfil='"+idPerfil+"' class='borrar'>Borrar</a>";
			html+="</div>";
		}
		this.contenedor.append(html);
	}

}