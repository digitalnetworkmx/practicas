var direccion="";

$('#boton').on('click',function(){

  var palabra=$('#palabra').val();
  console.log(palabra);
  direccion="https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s="+palabra;
  console.log(direccion);
  $.ajax({
     	url: direccion,
     	type: 'GET',
     	dataType: 'json',
     	data:{ }
   	}).done(function(response) {
      console.log(response.data.images.original.url);

      dibujar(response.data.images.original.url);

   	}).fail(function(e) {
     	console.error(e);
  }).always(function(){
   	});
});

var dibujar = function(value){
  $('#agregar').append('<img src="'+value+'" width="281px" height="281px">');
  console.log("agrego imagen");
}
