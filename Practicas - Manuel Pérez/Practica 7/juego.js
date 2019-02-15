function inicio(){
  html();
  personajes();
}
function personajes(){
  $("#gallina").draggable();
  $("#canasta").droppable({
    drop:function(evento, ui){
      var obj = ui.draggable;
      if(obj.attr("id")=="gallina"){
        alerta(false,"no se puede eliminar la gallina");
      }
      else if(obj.hasClass("roto")){
        alerta(false,"no se puede meter a la canasta un huevo roto");
      }
      else if(obj.hasClass("cocido")){
          alerta(false,"no se puede meter a la canasta un huevo roto");
      }
      else if(obj.hasClass("frito")){
          alerta(false,"no se puede meter a la canasta un huevo frito");
      }
      else if(obj.attr("id")=="rostizado"){
          alerta(false,"no se puede meter un pollo rostizado a la canasta");
      }
      else{
        obj.css("display","none");
      }
    }
  });
  $("#sarten").droppable({
    drop:function(evento,ui){
      var obj = ui.draggable;
      if(obj.attr("id")=="gallina"){
        obj.attr("id","rostizado");
        alerta(false,"ups perdiste el juego, no puedes hacer mas huevos");
      }
      else if(!obj.hasClass("roto")){
        obj.attr("class","huevo cocido");
      }
      else if(!obj.hasClass("cocido") && obj.hasClass("roto")){
        obj.attr("class","huevo frito");
      }
      obj.unbind("click");
    }
  })
  $("#gallina").click(function(){
    insertarHuevo();
    $(".huevo").draggable();
    $(".huevo").click(function(){
      $(this).addClass("roto");
    })
  });
}
function insertarHuevo(){
  var etiqueta = "<div class='huevo'></div>";
  $("#contenedor").append(etiqueta);
}
function html(){
  var etiquetas ="<div id='gallina' class='caja'></div><div id='contenedor' class='contenedor'></div><div class='contenedor2'><div id='canasta'></div><div id='sarten'></div></div>";
  $("body").append(etiquetas);
}
window.onload=inicio;
