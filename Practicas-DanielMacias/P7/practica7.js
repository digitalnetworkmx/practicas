var juego = new function(){
  var piezas="",piezasColocadas=0,lol=0,pzasPut=new Array();
  var rutaImagenes = ["pieza1.png","pieza2.png","pieza3.png","pieza4.png","pieza5.png","pieza6.png","pieza7.png","pieza8.png","pieza9.png"];

  var init = function(){
    initTablaRompecabezas();
    initPiezas();
    initBtnReiniciar();
    initDroppable();
    initDraggable();
  }

  var initTablaRompecabezas = function(){
    var cuerpo = $("body"),aux="";
    aux+="<div class='ui container'><div class='ui fluid container' style='margin:30px 0px'><h2 class='header'>Rompecabezas</h2></div>";
    aux+="<div class='ui fluid container' id='contenido'><div class='ui fluid container id='titulo'><h3 class='ui dividing header'>Arma tu oveja y obten un gif animado del animal</h3>";
    aux+="<button class='ui labeled icon button left floated' id='btnReiniciar'><i class='redo icon'></i>Reiniciar</button></div>";

    var tablero = "<div class='fila'><div class='cuadro'></div><div class='cuadro'></div><div class='cuadro'></div></div>";
    tablero += "<div class='fila'><div class='cuadro'></div><div class='cuadro'></div><div class='cuadro'></div></div>";
    tablero += "<div class='fila'><div class='cuadro'></div><div class='cuadro'></div><div class='cuadro'></div></div>";

    aux+="<div id='tablero' style='margin:20px auto'>"+tablero+"</div>";
    aux+="<div  id='contenedorPiezas'></div></div></div>"

    cuerpo.html(aux);
  }

  var initBtnReiniciar = function(){
    $("#btnReiniciar").click(function(){
      init();
    });
  }

  var initPiezas = function(){
    var comprobar=true;
    var aux2="";
    var indexImagenes = new Array();

    for(var i=0;i<9;i++){
      aux2+="<div class='pieza'></div>";
    }
    piezas.length = 0;
    $("#contenedorPiezas").html(aux2);
    piezas = $(".pieza");

    for(var i=0;i<rutaImagenes.length;){
      comprobar=true;
      var numIm = Math.floor(Math.random()*9);
      // alert(numIm);
      for(var j=0;j<indexImagenes.length;j++){
        if(indexImagenes[j]==numIm){
          comprobar=false;
        }
      }
      if(comprobar){
        piezas.eq(i).css({"background-image":"url('imagenes/"+rutaImagenes[numIm]+"')","background-size":"cover"});
        piezas.eq(i).attr("data-id","C"+(numIm+1));
        i++;
        indexImagenes.push(numIm);
      }
    }
    //console.log(piezas);

  }

  var initDraggable = function(){
    $(".pieza").draggable({snap: ".cuadro", snapMode: "inner"});
  }

  var initDroppable = function(){
    var cuadritos = $(".cuadro");
    for(var i=0;i<cuadritos.length;i++){
      cuadritos.eq(i).attr("id","C"+(i+1));
      // console.log(cuadritos.eq(i).attr("id"));
    }

    console.log(cuadritos);
    for(var i=0;i<cuadritos.length;i++){
      var id=cuadritos.eq(i).attr("id");
      var piezaTemporal;
      for(var j=0;j<piezas.length;j++){
        if(id==piezas.eq(j).attr("data-id")){
          piezaTemporal=piezas.eq(j);
        }
      }

      $("#"+id).droppable({
        tolerance: "pointer",
        accept: piezaTemporal,
        drop: function(event, ui){
          piezasColocadas++;
          var pza = ui.draggable;
          //pza.draggable({revert: "invalid"});
          pza.draggable("disable");
          comprobar();
        }
      });
    }
  }

  var comprobar = function(){
    if(piezasColocadas==9){
      alert("Ha ganado");
      $.ajax({
        url: "https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s=oveja",
        type: "GET",
        dataType: "json",
        data: {}
      }).done(function(response){
        var gif = "<img class='ui image larger' id='imgGanador'>";
        $("#contenedorPiezas").html(gif);
        $("#imgGanador").attr("src",response.data.images.original.url);
      }).fail(function(e){
        console.error(e);
      }).always(function(){

      });
    }
    console.log(piezasColocadas);
  }

  return{
    init: init,
  }
}

$(document).ready(function($){
  juego.init();
});
