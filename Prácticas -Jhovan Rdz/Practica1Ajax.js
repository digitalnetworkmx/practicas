// $('.ui.dropdown')
//   .dropdown()
// ;

$(document).ready(function($) {
buscar();

});


function buscar() {
  $(document).on('click','#buscar',function () {
    var codigo= $('#codigo').val();

    $.ajax({
       	url: 'http://requenadev.swi.mx/some/api/listado-cp/'+ codigo,
       	type: 'GET',
       	dataType: 'json',

     	}).done(function(response) {
        alerta(true,"Ha sido un exito");
        $('#Estado').val(response.estado);
        $('#municipio').val(response.municipio);
        dibujar(response.colonias);
       	console.log(response)
     	}).fail(function(e) {
        alerta(false,"No se puede");
       	console.error(e);
    }).always(function(){
     	});
  })
}


var dibujar= function (colonias) {
  $.each(colonias, function( key, value ) {
    $("#colonia").append('<option value=1>'+value+'</option>');
    console.log(value);
 });

 $('.ui.dropdown').dropdown();
}























//   var initForm= function () {
  //     $('#formulario').form({
    //       inline: true,
    //       fields: {
      //         codigo: {
        //           identifier: 'codigo',
        //           rules: [{
          //             type: 'empty',
          //             prompt: 'El campo "Código Postal" es requerido.'
          //           },
          //           {
            //             type: 'maxLength[6]',
            //             prompt: 'El campo "Código Postal" solo permite 6 caracteres.'
            //           }
            //         ]
            //       },
            //       Estado:{
              //         identifier:'Estado',
              //         rules:[{
                //           type:'empty',
                //           prompt:'El campo "Estado" es requerido'
                //         }]
                //       }
                //   }
                // });
                //
                // };
