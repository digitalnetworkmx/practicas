var practica = new function(){

  var init = function(){
    initFuncion1();
    initFuncion2();
    initFuncion3();
    initFuncion4();
    initFuncion5();
    initFuncion6();
    initFuncion7();
    initFuncion8();
    initFuncion9();
    initFuncion10();
  }

  var initFuncion1 = function(){
    var hijos = $("#children").children();
    hijos.addClass("red");
    hijos.css("margin","10px");
  }
  var initFuncion2 = function(){
    var lista = $("#lista").find(".sub");
    lista.html("hola, me encontraron con find()");
  }
  var initFuncion3 = function(){
    $("#btnParent").click(function(){
      $("#btnParent").parent().css("background-color", "green");
    });
  }
  var initFuncion4 = function(){
    $("#btnParents").click(function(){
      $("#btnParents").parents().css("color","#7D3C98");
    });
  }
  var initFuncion5 = function(){
    $("#btnClosest").click(function(){
      $("#btnClosest").closest("div").css({"background-image":"url(https://www.anipedia.net/imagenes/que-comen-los-perros.jpg)", "background-size":"cover"});
    });
  }
  var initFuncion6 = function(){
    $("#btnSiblings").click(function(){
      $("#btnSiblings").siblings().css("font-size","30px");
    });
  }
  var initFuncion7 = function(){
    $("#btnAppend").click(function(){
      $("#appendContenedor").append("<img class='ui large image' src='https://www.anipedia.net/imagenes/que-comen-los-perros.jpg'>");
    });
  }
  var initFuncion8 = function(){
    $("#btnPrepend").click(function(){
      $("#prependContenedor").prepend("<img class='ui large image' src='https://www.anipedia.net/imagenes/que-comen-los-perros.jpg'>");
    });
  }
  var initFuncion9 = function(){
    $("#btnHTML").click(function(){
      var formulario = $("#btnHTML").parent().html();
      formulario += "<form class='ui small form'>";
      formulario+="<div class='field'>";
      formulario+="<label>Tu nombre</label>";
      formulario+="<input type='text' placeholder='Tu nombre'>";
      formulario+="</div></form>";
      $("#btnHTML").parent().html(formulario);
    });
  }

  var initFuncion10 = function(){
    $("#btnText").click(function(){
      $("#btnText").siblings().text("Haz cambiado mi contenido");
    });
  }


  return{
    init: init,
  }
}();

$(document).ready(function($){
  practica.init();
});
