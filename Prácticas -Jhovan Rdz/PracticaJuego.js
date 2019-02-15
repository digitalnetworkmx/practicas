var madera= '<div class="Bmadera"></div>';
var puerta='<div class="Bpuerta"></div>';
var piedra='<div class="Bpiedra"></div>';
var roca='<div class="Broca"></div>';
var ladrillo='<div class="Bladrillo"></div>';
var luminosa='<div class="Bluminosa"></div>';
var lana='<div class="Blana"></div>';
var hojas='<div class="Bhojas"></div>';
$(document).ready(function () {
cuerpo();
acciones();
basura();
});

var cuerpo =function () {
  var imagen='<div>';
  var titulo='<h1>'
  imagen+='<div class="fondo">';
  imagen+='<h1 class="titulo">Ayuda a steve a construir su casa</h1>';
  imagen+='<div class="generar"></div>';
  imagen+='<div class="steve"></div>';
  imagen+='<div class="cesto"></div>';
  imagen+='<div class="botones">';
  imagen+='<div class="madera">';
  imagen+='<h4>Madera</h4>';
  imagen+='<div class="ui button green" id="boton1">Generar Madera</div>';
  imagen+='</div>';
  imagen+='<div class="puerta">';
  imagen+='<h4>Puertas</h4>';
  imagen+='<div class="ui button green" id="boton2">Generar Puertas</div>';
  imagen+='</div>';
  imagen+='<div class="piedra">';
  imagen+='<h4>Piedra</h4>';
  imagen+='<div class="ui button green" id="boton3">Generar Piedra</div>';
  imagen+='</div>';
  imagen+='<div class="roca">';
  imagen+='<h4>Roca</h4>';
  imagen+='<div class="ui button green" id="boton4">Generar Roca</div>';
  imagen+='</div>';
  imagen+='<div class="ladrillo">';
  imagen+='<h4>Ladrillo</h4>';
  imagen+='<div class="ui button green" id="boton5">Generar Ladrillos</div>';
  imagen+='</div>';
  imagen+='<div class="luminosa">';
  imagen+='<h4>Piedra Luminosa</h4>'
  imagen+='<div class="ui button green" id="boton7">Generar GlowStone</div>';
  imagen+='</div>'
  imagen+='<div class="lana">';
  imagen+='<h4>Lana</h4>';
  imagen+='<div class="ui button green" id="boton8">Generar Lana</div>';
  imagen+='</div>';
  imagen+='<div class="hojas">';
  imagen+='<h4>Hojas</h4>';
  imagen+='<div class="ui button green" id="boton9">Generar Hojas</div>';
  imagen+='</div>';
  imagen+='</div>';
  imagen+='<br>';
  imagen+='<br>';
  imagen+='</div>';
  $('body').append(imagen);
}


var acciones=function () {
    $(document).on('click','#boton1',function() {
      $('.generar').append(madera);
      $('.Bmadera').draggable();
    });

    $(document).on('click','#boton2',function () {
      $('.generar').append(puerta);
      $('.Bpuerta').draggable();
    });

    $(document).on('click','#boton3',function () {
      $('.generar').append(piedra);
      $('.Bpiedra').draggable();
    });
    $(document).on('click','#boton4',function() {
      $('.generar').append(roca);
      $('.Broca').draggable();
    });

    $(document).on('click','#boton5',function () {
      $('.generar').append(ladrillo);
      $('.Bladrillo').draggable();
    });

    $(document).on('click','#boton7',function() {
      $('.generar').append(luminosa);
      $('.Bluminosa').draggable();
    });

    $(document).on('click','#boton8',function () {
      $('.generar').append(lana);
      $('.Blana').draggable();
    });

    $(document).on('click','#boton9',function () {
      $('.generar').append(hojas);
      $('.Bhojas').draggable();
    });

}

var basura = function () {
  $('.cesto').droppable({
    drop:function (event,ui) {
    }
  })
}




// $('.contenedorMadera').append(madera);
// $('.madera').draggable();
