function inicio(){
  var guardar = $("#guardar");
  codigoPostal();
  guardar.click(function(){
    $("#form").submit();
  });
}
function codigoPostal(){
  $("#form").form({
    inline:true,
    fields:{
      codigoPostal:{
        identifier:"codigoPostal",
        rules:[{
          type:"empty",
          prompt:"El campo es requerido"
        },{
          type:"maxLength[5]",
          prompt:"El codigo postal no puede contener mas de 5 caracteres"
        },{
          type:"minLength[5]",
          prompt:"El codigo postal debe contener mas de 5 caracteres"
        }]
      }
    },
    onSuccess: function(event,fields){
      event.preventDefault();
      console.log(fields.codigoPostal);
      ajax(fields.codigoPostal);
    }
  }).submit(function(e){
    e.preventDefault();
  });
}
function estado(resultado){
  $("#estado").val(resultado);
}
function municipio(resultado){
  $("#municipio").val(resultado);
}
function ajax(codigoPostal){
  $.ajax({
    url:"http://requenadev.swi.mx/some/api/listado-cp/"+codigoPostal,
    dataType:"json",
    type:"GET",
    data:{},
    beforeSend:function(){
      $("#modal").modal("show");
      $("#municipio").val("");
      $("#estado").val("");
      $("#dropdown").html("");
    }
  })
  .done(function(respuesta){
    colonias(respuesta.colonias);
    estado(respuesta.estado);
    municipio(respuesta.municipio);
    alerta(true,"listo, ahora se por donde vives :)");
  })
  .fail(function(e){
    alerta(false,"No se pudo conectar");
  })
  .always(function(){
    $("#modal").modal("hide");
  });
}
function colonias(respuesta){
  for(var i in respuesta){
    var texto="<option value="+respuesta[i]+">"+respuesta[i]+"</option>"
    $("#dropdown").append(texto);
  }
}
window.onload=inicio;
