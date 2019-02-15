$(document).ready(function(){
  entrada();
  // sistema();
});
  var html="";
  var time;
  var destruido=0;
var entrada = function(){
  html="";
  html+="<div id='principal'>"
  html+="<h2>Bienvenido al destructor del Sistema Solar</h2>"
  html+="<h3 id='record'>Tiempo record:"+localStorage.getItem("final")+"</h3>"
  // html+="<h3 id='record'>Tiempo record:</h3>"
  html+="<input type='button' id='boton' value='jugar'>"
  html+="</div>"

  $('body').append(html);

  $('#boton').on("click",function(){

    time=0;
   var cronometro = setInterval(function(){

     time++;
     $("#tiempo").html(time);
     if (destruido==8) {
       // alerta(true,"funciono");
       clearInterval(cronometro);
       if (localStorage.getItem("final")>time) {
          localStorage.setItem("final",time);
       }
       $('.contenedor').css({"display":"none"});
       entrada();
     }
     console.log(time);
   },1000);


    $('#principal').css({"display":"none"});
    sistema();
  });
}

var sistema = function(){
  console.log("entro a cuerpo");
  html="";
  var clickMercurio=0;
  var clickVenus=0;
  var clickTierra=0;
  var clickMarte=0;
  var clickJupiter=0;
  var clickSaturno=0;
  var clickUrano=0;
  var clickNeptuno=0;


  html+="<h1 id='tiempo'>00</h1>"

  html+="<div class='contenedor'>"

  html+="<div id='aux' class='ui-widget-content'>";
  html+="</div>";

  html+="<div id='sol' class='ui-widget-content'>"
  html+="</div>"

  html+="<div id='mercurio' class='ui-widget-content'>"
  html+="</div>"

  html+="<div id='orbitaMercurio'>";
  html+="</div>";

  html+="<div id='venus' class='ui-widget-content'>"
  html+="</div>"

  html+="<div id='orbitaVenus'>";
  html+="</div>";

  html+="<div id='tierra' class='ui-widget-content'>"
  html+="</div>"

  html+="<div id='orbitaTierra'>";
  html+="</div>";

  html+="<div id='marte' class='ui-widget-content'>"
  html+="</div>"

  html+="<div id='orbitaMarte'>";
  html+="</div>";

  html+="<div id='jupiter' class='ui-widget-content'>"
  html+="</div>"

  html+="<div id='orbitaJupiter'>";
  html+="</div>";

  html+="<div id='saturno' class='ui-widget-content'>"
  html+="</div>"

  html+="<div id='orbitaSaturno'>";
  html+="</div>";

  html+="<div id='urano' class='ui-widget-content'>"
  html+="</div>"

  html+="<div id='orbitaUrano'>";
  html+="</div>";

  html+="<div id='neptuno' class='ui-widget-content'>"
  html+="</div>"

  html+="<div id='orbitaNeptuno'>";
  html+="</div>";

  html+="</div>"

  $('body').append(html);


  $('#mercurio').on("click",function(){
    clickMercurio++;
    console.log(clickMercurio);
    if (clickMercurio==2) {
      $('#mercurio').css({
        "background":"transparent"
      });
      alerta(true,"Ohh Valla!!Has destruido a Mercurio");
      destruido++;
    }
  });

  $('#venus').on("click",function(){
    clickVenus++;
    console.log(clickVenus);
    if (clickVenus==1) {
      $('#venus').css({
        "background":"transparent"
      });
      destruido++;
    }
  });

  $('#tierra').on("click",function(){
    clickTierra++;
    console.log(clickTierra);
    if (clickTierra==1) {
      $('#tierra').css({
        "background":"transparent"
      });
      destruido++;
    }
  });

  $('#marte').on("click",function(){
    clickMarte++;
    console.log(clickMarte);
    if (clickMarte==1) {
      $('#marte').css({
        "background":"transparent"
      });
      destruido++;
    }
  });

  $('#jupiter').on("click",function(){
    clickJupiter++;
    console.log(clickJupiter);
    if (clickJupiter==1) {
      $('#jupiter').css({
        "background":"transparent"
      });
      destruido++;
    }
  });

  $('#saturno').on("click",function(){
    clickSaturno++;
    console.log(clickSaturno);
    if (clickSaturno==1) {
      $('#saturno').css({
        "background":"transparent"
      });
      destruido++;
    }
  });

  $('#urano').on("click",function(){
    clickUrano++;
    console.log(clickUrano);
    if (clickUrano==1) {
      $('#urano').css({
        "background":"transparent"
      });
      destruido++;
    }
  });

  $('#neptuno').on("click",function(){
    clickNeptuno++;
    console.log(clickNeptuno);
    if (clickNeptuno==1) {
      $('#neptuno').css({
        "background":"transparent"
      });
      destruido++;
    }
  });
}
