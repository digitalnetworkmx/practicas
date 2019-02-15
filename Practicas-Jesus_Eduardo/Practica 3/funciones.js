$('.padre').children().css({
  "color":"red",
  "background-color":"black",
  "border":"1px solid orange",
  "text-align":"center"
});

$('.informacion').find('span').css({
  "color":"purple",
  "font-size":"20px",
  "display":"flex",
  "justify-content":"center"
});

$('.buscar').parent().css({
  "border":"1px solid red",
  "text-align":"center"
});

var z=0;

$('#boton').on("click",function(){
  if (z==0) {
    $('#boton').val("Picame para dejar de ver a los padres del span");
    $('.marcar').html("Ya deja de ver a mis padres");
    $('.marcar').parents().css({
      "border":"1px solid purple",
      "padding":"5px"
    });
    z=1;
  }else{
    $('#boton').val("Picame para ver los padres del span");
    $('.marcar').html("Mira a mis padres");
        $('.marcar').parents().css({
          "border":"none",
          "padding":"5px"
      });
      z=0;
  }
});

$('.cerca').closest('ul').css({
  "border":"1px solid black",
  "padding":"10px",
  "text-align":"center",
  "margin":"10px"
});

$('.parrafo').siblings().css({"border":"2px solid red","color":"red"});

$('#quieras').on("click",function(){
  $('.agregar').append("<p>Lo que quieras</p>")
});

$('#eoh').on("click",function(){
  $('.eoh').prepend("<b>Eeeoooooohhhhhh </b>");
});

var enojado=0;

$('#picar').on("click",function(){
  if (enojado==0) {
    $('#picar').val("Estoy enojado");
    $('#picar').css({
      "border-radius":"15px",
      "background-color":"red",
      "color":"black",
      "padding":"15px"
    });
    $('#calmar').html("Se enojo!!. Vuelvelo a picar para que se relaje");
    enojado=1;
  }else{
    $('#picar').val("Si me picas me enojo");
    $('#picar').css({
      "border-radius":"0px",
      "background-color":"white",
      "color":"black",
      "padding":"0"
    });
    $('#calmar').html("Si lo picas se enoja");
    enojado=0;
  }
});

$('#cambiar').on("click",function(){
  $('#deseo').text("Hola Mundo!!");
});
