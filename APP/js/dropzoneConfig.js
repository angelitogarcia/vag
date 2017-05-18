Dropzone.autoDiscover = false;
var myDropzone;

function initDropzone(){
	myDropzone = new Dropzone("#fotosContenedor", {
		autoProcessQueue: false,
		paramName:"file",
		uploadMultiple: true,
		maxFiles: 100,
		parallelUploads: 100,
		addRemoveLinks: true,
		url: "../API/controlador/agregarLocalFotos.php?idPerfil=1",
		success: function(file, response) {
    		console.log(response);
    	},

		error: function(file, response) {
			console.log(response);
		}
	 });
	$("#submit-all").click(function (e) {
	   e.preventDefault();
	   e.stopPropagation();
	   
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
};

