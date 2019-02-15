$(document).ready(function(){
 console.log("ready!");
});

var myArray = ['1','2','3','4'];
var ale = function(){
 var h,j,k;
 for (h = myArray.length; h; h--) {
   j = Math.floor(Math.random() * h);
   k = myArray[h - 1];
   myArray[h - 1] = myArray[j];
   myArray[j] = k;
 }
}

var xd = [];

$(document).ready(function(){

 $.ajax({
   url: ' http://gabydev.swi.mx/some/preguntas_list',
   type:'GET',
   dataType: 'json',
   data:{ }
 }).done(function(data){

   xd=(data.datos);
   console.log(xd);
   // console.log("xd ", xd);

   start();

 }).fail(function(e){
   console.log(e);
 }).always(function(){

 });
});

var pasar=false;
var xdx =0;
var resC;
var preguntasAleatoras = new Array();
var start = function(){

 console.log(xd.length);
 var aux = false;
 do{
   xdx=Math.floor(Math.random()*xd.length);
   // alert(xdx);
   for(var i=0;i<preguntasAleatoras.length;i++){
     if(xdx==preguntasAleatoras[i]){
       xdx=true;
     }
   }
 }while(aux);
 if(preguntasAleatoras.length==xd.length){
   alert("end");
 }else{
   var hope = [];
   console.log(xd);
   hope= (xd[xdx]);
   console.log(hope.pregunta);
   console.log(hope.respuesta_correcta);
   for(var a=0; a<4; a++){
     if($("#r"+myArray[a]+"").hasClass("respuestaCorrecta")){
       $("#r"+myArray[a]+"").removeClass("respuestaCorrecta");
     }
   }

   ale();
   $("#preg").html(hope.pregunta);

   $("#r"+myArray[0]+"").html(hope.respuesta_correcta);
   resC=(hope.respuesta_correcta);

   $("#r"+myArray[0]+"").addClass("respuestaCorrecta");
   $("#r"+myArray[1]+"").html(hope.respuesta_1);
   $("#r"+myArray[2]+"").html(hope.respuesta_2);
   $("#r"+myArray[3]+"").html(hope.respuesta_3);

   // xdx +=1;
   preguntasAleatoras.push(xdx);
   console.log(xdx);

 }


}

var vidas=1;
var muerte=0;
var monedas=0;
var clickV = function(id){
 console.log(id);
 console.log(resC);
 var xd = $("#"+id+"").text();

 console.log(xd);

 if($("#"+id+"").text()==resC){
   console.log("Si");
   start();
   monedas+=5;

   $('h1').html("Monedas: "+monedas);


 }else{
   $("#v"+vidas+"").removeClass("vida");
   console.log("no");
   vidas+=1;
   muerte+=1;
 }

 if(muerte==3){




   window.location.href = "millon.html";
 }


}


var lim = function(){

   $("#preg").html("");
   $("#r"+myArray[0]+"").html("");
   $("#r"+myArray[1]+"").html("");
   $("#r"+myArray[2]+"").html("");
   $("#r"+myArray[3]+"").html("");
   start();
}
