
$(document).ready(function () {
  child();
  find();
  parent();
  parents();
  closest();
  siblings();
  append();
  prepend();
  html();
  text();
})

var child=function () {
 $(document).on('click','#Boton1',function () {
   $('li').children().css({"color":"red"});
 });
}

var find =function () {
  $(document).on('click','#Boton2',function () {
    $('li').find("span").css({"color":"red"});
  });
}

var parent= function () {
  $(document).on('click','#Boton3',function () {
    $("p").parent(".pariente").css({"color":"white"});
  });
}

var parents =function () {
  $(document).on('click','#Boton4',function () {
    $(".hijo").parents().css({"background-color":"blue"});
  });
}
var closest =function () {
  $(document).on('click','#Boton5',function () {
    $("span").closest("ul").css({"color":"blue"});
  });
}
var siblings =function () {
  $(document).on('click','#Boton6',function () {
    $(".hola").siblings().css({"color":"blue"});
  });
}
var append=function () {
  $(document).on('click','#Boton7',function () {
    $(".padre2").append('<p>Hola soy el hijo del papá</p>');
  });
}
var prepend=function () {
  $(document).on('click','#Boton8',function () {
    $("p.mensaje").prepend('<b>Mucho Gusto </b>');
  });
}
var html=function () {
  $(document).on('click','#Boton9',function () {
    $("p.mensaje2").html('Aqui dice otra xd');
  })
}
var text = function () {
  $(document).on('click','#Boton10',function () {
    $('p.mensaje3').text('Hola tío shaval');
  });
}
