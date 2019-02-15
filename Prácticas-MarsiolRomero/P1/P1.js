$(document).ready(function(){
  console.log("ready!");
});

$('.ui.dropdown').dropdown();

var xd="";

$(document).on("click","#botonBuscar", function(){
console.log("click");
var valor = $('#codigo').val();

$("#estado").val(xd);
$("#mun").val(xd);
$('select option').remove();


console.log(valor);
  $.ajax({
    url: 'http://requenadev.swi.mx/some/api/listado-cp/'+valor,
    type: 'GET',
    dataType: 'json',
    data:{ }
  }).done(function(data){
    console.log(data);

    console.log(data.estado);
    console.log(data.municipio);

    $("#estado").val(data.estado);
    $("#mun").val(data.municipio);


    console.log(data.colonias);



  var ah = [];

  ah = data.colonias;
  console.log("Ah "+ah);

      console.log("d");

      for(var i=0; i<ah.length; i++){
        $('#mySelect').append($('<option>', {
      value: i,
      text: ah[i]
    }));
      }
  //
  //     $('#mySelect').append($('<option>', {
  //   value: 1,
  //   text: 'My option'
  // }));





  }).fail(function(e){
    console.log(e);
  }).always(function () {

  });

})
