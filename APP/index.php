<html>
<head>
	<title>Prueba Dropzpne php</title>
	<script type="text/javascript" src="js/library/jquery-3.1.0.min.js"></script>
	<script src="js/library/dropzone.js"></script>
	<link rel="stylesheet" href="https://rawgit.com/enyo/dropzone/master/dist/dropzone.css">
	<script type="text/javascript">
		  /*$('#add').on('click',function(e){
		    e.preventDefault();
		    myDropzone.processQueue();  
		  });  */
Dropzone.autoDiscover = false;
	var myDropzone;
	$(document).ready(function(){

			myDropzone = new Dropzone("form#fotos", {
				autoProcessQueue: false,
				paramName:"file",
				uploadMultiple: true,
				maxFiles: 100,
				parallelUploads: 100,
				addRemoveLinks: true,
				success: function(file, response) {
		    	  console.log(response);
		    	},

				error: function(file, response) {
					console.log(response);
				}
			 });

			console.log(myDropzone);
			$("#submit-all").click(function (e) {
		       e.preventDefault();
		       e.stopPropagation();
		       myDropzone.options.url="../API/controlador/agregarLocalFotos.php?idPerfil=12";
		       myDropzone.processQueue();
		    });
		    $('#auto').change(function(){
			    if(myDropzone.options.autoProcessQueue)
			    {
			    	myDropzone.options.autoProcessQueue=false;
			    	console.log("auto inabilitado");
			    }else{
			    	myDropzone.options.autoProcessQueue=true;
			    	console.log("auto habilitado");
			    }
			});
			$("#quitar").click(function(){
				myDropzone.removeAllFiles();
			})
	})


	</script>
</head>
<body>
    <form action="../API/controlador/agregarLocalFotos.php?idPerfil=12" id="fotos" class="dropzone" enctype="multipart/form-data">
    </form>
    <button id="submit-all">Subir</button>
    <input type="checkbox" name="auto" value="auto" id="auto"> Subida Instantanea
    <button id="quitar">Limpiar area</button>
</body>
</html>