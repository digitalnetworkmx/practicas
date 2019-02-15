var buscador = new function(){
  var init = function(){
    btnBuscar();
  }

  var btnBuscar = function(){
    $("#enviar").click(function(){
      var texto = $("#cajaBuscador").val();
      $.ajax({
        url: 'https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s='+texto,
        type: 'GET',
        dataType: 'json',
        data:{ },
        beforeSent:function(){
          $("#carga").removeClass("visible");
          $("#carga").addClass("active");
        }
      }).done(function(response){
        //console.log(response.data.images.original.url);
        $("#gif").attr("src", response.data.images.original.url);
      }).fail(function(e){
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
}

$(document).ready(function($){
  buscador.init();
});
