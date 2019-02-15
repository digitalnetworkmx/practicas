
$(document).ready(function () {
insertar();
});

var insertar=function () {
  $(document).on('click','#buscar',function () {
    var buscar=$('#buscador').val();
    console.log(buscar);
    $.ajax({
   	url: 'https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s='+buscar,
   	type: 'GET',
   	dataType: 'json',
   	data:{ }
 	}).done(function(response) {
    // $("#contenedor").html(response.data.images.original.url);
    dibujar(response.data.images.original.url);
   	console.log(response)
 	}).fail(function(e) {
   	console.error(e);
}).always(function(){
 	});
  })
}
var dibujar= function (value) {
    $("#contenedor").html('<img src="'+value+'">');
    console.log(value);

}
