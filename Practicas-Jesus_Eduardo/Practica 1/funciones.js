var direccion="";


$('#botoncodigo').on('click',function(){
  var codigo=$('#codigo').val();
  $('#estado').val("");
  $('#municipio').val("");
  $('select option').remove();
  direccion="http://requenadev.swi.mx/some/api/listado-cp/"+codigo;
  console.log(codigo);
  $.ajax({
      url: direccion,
      type: 'GET',
      dataType: 'json',
      data:{ }
    }).done(function(response) {
      console.log(response)
      $('#estado').val(response.estado);
      $('#municipio').val(response.municipio);

      var arreglo=[];
      arreglo=response.colonias;

      for (var i = 0; i < arreglo.length; i++) {
             $('#colonia').append($('<option>', {
            value: i,
            text: arreglo[i]
          }));
      }



    }).fail(function(e) {
      console.error(e);
  }).always(function(){
    });

});
