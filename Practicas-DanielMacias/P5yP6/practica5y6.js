var practica4 = new function(){
  var init = function(){
    initDraggables();
    initDroppables();
  }

  var initDraggables = function(){
    $(".piezas").draggable();
    $(".respuestas").draggable();
  }

  var initDroppables = function(){
    $("#pregunta1").droppable({
      accept: "#respuesta2",
      drop: function(event, ui){
        var texto = $("#pregunta1").html();
        $("#pregunta1").html(texto+"<p>Correcto!</p>")
      }
    });
    $("#pregunta2").droppable({
      accept: "#respuesta3",
      drop: function(event, ui){
        var texto = $("#pregunta2").html();
        $("#pregunta2").html(texto+"<p>Correcto!</p>")
      }
    });
    $("#pregunta3").droppable({
      accept: "#respuesta1",
      drop: function(event, ui){
        var texto = $("#pregunta3").html();
        $("#pregunta3").html(texto+"<p>Correcto!</p>")
      }
    });
  }
  return{
    init: init,
  }
}

$(document).ready(function($){
  practica4.init();
});
