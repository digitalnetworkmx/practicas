var practica1 = new function(){
  var init = function(){
    /*initFormulario();*/
    initCodigoPostal();
    $("#colonia").dropdown();
  }

  var initCodigoPostal = function(){
    $("#CP").change(function(){
      var codigopostal = $("#CP").val(),coloniasOpc="";
      $.ajax({
       	url: 'http://requenadev.swi.mx/some/api/listado-cp/'+codigopostal,
       	type: 'GET',
       	dataType: 'json',
       	data:{ },
        beforeSent:function(){
          $("#carga").removeClass("visible");
          $("#carga").addClass("active");
        }
     	}).done(function(response) {
         	console.log(response);
          $("#Municipio").val(response.municipio);
          $("#Estado").val(response.estado);
          for(var i=0;i<response.colonias.length;i++){
            coloniasOpc+="<option value="+response.colonias[i]+">"+response.colonias[i]+"</option>";
            console.log(response.colonias[i]);
          }
          console.log(coloniasOpc);
          $("#colonia").html(coloniasOpc);
     	}).fail(function(e) {
         	console.error(e);
      }).always(function(){
        $("#carga").removeClass("active");
        $("#carga").addClass("visible");
      });
    });
  }
  
  return{
    init: init,
  }
}();

$(document).ready(function($){
  practica1.init();
});
