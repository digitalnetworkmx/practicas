function inicio(){
  var button1 = $("#button1");
  var button2 = $("#button2");
  var button3 = $("#button3");
  var button4 = $("#button4");
  var button5 = $("#button5");
  var button6 = $("#button6");
  var button7 = $("#button7");
  var button8=$("#button8");
  var button9=$("#button9");
  var button10=$("#button10");
  button1.click(function(){
    var lista=$("#opcion1");
    lista.children().children().css("color","blue");
    alerta(true,"Todos los hijos se pusieron en azul");
  });
  button2.click(function(){
    $("#opcion2").find(".ladron").css("color","red");
    alerta(true,"Todos los ladrones se pusieron en rojo");
  });
  button3.click(function(){
    $("#opcion3").parent().css("color","blue");
    alerta(true,"Todos los padre con hijos se pusieron en color azul");
  });
  button4.click(function(){
    $("#opcion4").parents().css("background-color","gray");
    alerta(true,"Todos mis padres se pusieron de color gris");
  });
  button5.click(function(){
    $("#opcion5").closest(".padre").css("background-color","red");
    alerta(true,"El div con clase padre mas cercano ahora es rojo");
  });
  button6.click(function(){
    $("#opcion6").siblings().css("background-color","green");
    alerta(true,"Todos mis compañeros son de color verde");
  });
  button7.click(function(){
    var valor = $("#entrada1").val();
    $("#opcion7").append("<img style='margin-right:.5em' width='100px'src='"+valor+"'/>");
  });
  button8.click(function(){
    $("#opcion8").prepend("<br>");
  });
  button9.click(function(){
    $("#opcion9").html($("#entrada2").val());
  });
  button10.click(function(){
    alert($("#opcion10").text());
  })
}
window.onload=inicio;
