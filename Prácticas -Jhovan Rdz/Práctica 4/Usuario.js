var Preguntas = function(){
  var preguntas=[];
  var arreglo2=[];
  var correcta=null;
  var longitud=0;
  var puntaje=0;
  var llevadas=0;
  var numero=null;
  var init = function(){
    obtenerPreguntas();
    setTimeout(function(){
      resto();
      $('#modal').modal("hide");
    },6000)
  }
  var resto = function(){
    arreglo2.push(preAleatorias());
    llevadas++;
    var id=arreglo2[llevadas-1];

    // var id=getId();
    $('#question').html(getPregunta(id));
    var arreglo=[];
    for (var i = 1; i <= 4; i++) {
      arreglo.push(resAleatoria(arreglo));
      if (arreglo[i-1]==4) {
        $('#respuesta_'+i).html(getCorrecta(id));
      }
      else {
        var funcion="getRespuesta" + arreglo[i-1];
        $('#respuesta_'+i).html(eval(funcion+"("+id+")"));

      }
    }
    correcta=getCorrecta(id);
    comparacion();
    final();
  }


  var final=function () {
    if (llevadas==11) {
      $('.contenedor').css("display","none");
      $('.Mensaje').css("display","block");
      $('#puntaje').html('Su puntaje es de'+" : "+puntaje);

    }else {
      $('.Mensaje').css("display","none");
      $('.contenedor').css("display","block");
    }
  }

  var comparacion= function () {
    $(document).on('click','.cuadro',function () {

      var boton= $(this).attr('id');
      var respuestaUsuario= $("#"+ boton+ " .respuesta").html();

      if (respuestaUsuario == correcta) {
        $(this).css("background-color","green");
        puntaje+=1;
        $("#numero").html(puntaje+"");
      }else {
        $(this).css("background-color","red");
      }
      $(document).unbind('click');
      setTimeout(function () {
        volver();
        resto();
      },3000);
    });
  }
  var volver=function(){
    $('.cuadro').css('background-color','#261477');
  }
  var getPregunta=function(id){
    return preguntas[id].pregunta;

  }
  var getRespuesta1=function(id){
    return preguntas[id].respuesta_1;
  }
  var getRespuesta2= function(id){
    return preguntas[id].respuesta_2;
  }
  var getRespuesta3=function(id){
    return preguntas[id].respuesta_3;
  }
  var getCorrecta=function(id){
    return preguntas[id].respuesta_correcta;
  }
  var getPreguntas = function(){
    return longitud;
  }
  var getArrayLength = function(){
    return preguntas.length;
  }

  var resAleatoria= function (arreglo) {
    do{
      var aleatoria= Math.floor(Math.random()*4)+1;

    }while(arreglo.includes(aleatoria));

    return aleatoria;
  }

  var preAleatorias=function() {
    do{
      var aleatorio=Math.floor(Math.random()*longitud);


    }while(arreglo2.includes(aleatorio))

    return aleatorio;
  }


  var obtenerPreguntas = function(){
    $("#modal").modal("show");
    $.ajax({
      url:"https://borregodev.swi.mx/some/preguntas_list",
      type:"GET",
      dataType:"json"
    })
    .done(function(res){
      preguntas = res.datos;
      longitud = res.datos.length;

    }).fail(function(e){

    }).always(function(){
      // $("#modal").modal("hide");
    });
  }
  return{
    init:init
  }
}();
window.onload=function(){
  Preguntas.init();


}
