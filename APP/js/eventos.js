$("#btn-agregar-perfil").click(function(){
	$("#agregar-perfil-form").show();
	$("#transparencia-negra").show();
})
$(".close").click(function(){
	$(this).parent().hide();
	$("#transparencia-negra").hide();
})
$("#btn-agregar-fotos").click(function(){
	$("#agregar-fotos").show();
	$("#transparencia-negra").show();
})