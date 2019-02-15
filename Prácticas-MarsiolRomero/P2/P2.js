$(document).ready(function(){
  console.log("ready!");
})

var xd= "";
$(document).on("click", "#botonBuscar", function(){
  console.log("buscando");
  var valor = $('#codigo').val();
  $.ajax({
     	url: 'https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s='+valor,
     	type: 'GET',
     	dataType: 'json',
     	data:{ }
   	}).done(function(response) {
      $('#codigo').val(xd);

     	// console.log(response.data);

      console.log(response.data.images);

    var hope =  response.data.images.original.url;

  console.log("1");
    console.log(hope);


        $('#imag').append($('<img>', {

        id: "iam",
        src: hope,

      }));



   	}).fail(function(e) {
     	console.error(e);

  }).always(function(){
   	});


});
