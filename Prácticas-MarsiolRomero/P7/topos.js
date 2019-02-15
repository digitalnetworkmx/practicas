$(document).ready(function(){
  console.log("ready!");
  inicio();
})

var inicio = function(){
  xdd= localStorage.getItem("maxp")
  console.log("Record: "+xdd);
  html="";
  html+="<div class='prin'>"
  html+="<h1> Aplasta al topo </h1>";
  html+="<h2 id='hope'>Partida anterior: "+xdd+" puntos</h2>";
  html+="<button id='jugar'>Jugar</button>";
  html+="</div>";
  $('body').append(html);
}

  var time=0;
$(document).on("click","#jugar", function(){
time=50;
  $(this).css({"display":"none"});
  $("h1").css({"display":"none"});
  $(".prin").css({"display":"none"});
  cuerpo();


  var txd=  setInterval(function(){
      time--;
      $("#tiempo").html("Tiempo: "+time);
      console.log(time);
      if(time==0){
         clearInterval(txd);
         $(".play").css({"display":"none"});
         inicio();
      }
    },1000);
})


var cuerpo = function(){
  html="";
  html+="<div class='play'>";
  html+="<div class='hea'>";
  html+="<h2 id='puntos'>Puntos: </h2>";
  html+="<h2 id='tiempo'>Tiempo: "+time+"</h2>"
  html+="</div>";
  html+="<div class='contenedor'>";
  for(var i=0;i<12;i++){
    html+="<div class='pers'>"
    html+="<div class='hueco'></div>";
    html+="<div onclick='topoClick();' class='topo'></div>";
    html+="</div>";
  }
  html+="</div>";
  html+="</div>";
  $('body').append(html);
}

var tiempo = setInterval(function(){
  ale();
},500);


var ale = function(){
  var num = parseInt(Math.random()*9);
  $(".pers").removeClass("salta");
  $(".pers:nth-child("+num+")").addClass("salta");
  // $(".pers").find(num).addClass("salta");
}

var puntos=0;
var xdd;
var topoClick = function(){
  var max=0;
  puntos+=1;
  max=puntos;
  localStorage.setItem("maxp", max);
  // console.log("Puntos: "+puntos);
  $("#puntos").text("Puntos: "+puntos);
  $(".pers").removeClass("salta");
  if(time==0){
    alert("bye");
  }
}
