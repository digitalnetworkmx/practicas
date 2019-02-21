

var tamaño=5;
var aux=0;
var color="black";
var color1;
var color2;
$('#color1').val(1);
$('#color1').css({
  "background-color":"rgba(0,0,255,0.2)",
  "border":"1px solid blue"
});

$(document).on('change', '#px', function(event) {
     tamaño=$("#px option:selected").val();
     canvas.freeDrawingBrush.width = tamaño;
});



$( function() {
  $( "#output" ).draggable();
  $( "#output" ).draggable({
    containment:'.hoja',
    scroll:'false'
  });
} );

var canvas = new fabric.Canvas('c');


function download() {
  //console.log("entro");
var download = document.getElementById("botonDescargar");
//console.log(download);
var image = document.getElementById("c").toDataURL("image/png")
.replace("image/png", "image/octet-stream");
//console.log(image);
download.setAttribute("href", image);
// download.setAttribute("download","JECR.png");
}

$('#agregarUrl').on("click",function(){
  var url = $('#url').val();
  fabric.Image.fromURL(""+url,function(myImage){
    var img=myImage.set({ left: 0, top: 0});
    canvas.add(img);
  });
$('#url').val("");
});

$('#agregarTexto').on("click",function(){
  var texto = $('#texto').val();
  //console.log(texto);
  var text = new fabric.Text(""+texto, {left: 100, top: 100 });
  canvas.add(text);
});

$('#dibujar').on("click",function(){
  $(function () {
    if (aux==0) {
      //console.log("estas dibujando");
        canvas.backgroundColor = 'white';
        canvas.isDrawingMode= 1;
        canvas.freeDrawingBrush.color = color;
        canvas.freeDrawingBrush.width = tamaño;
        canvas.renderAll();
        aux=1;
    }else{
      //console.log("ya no estas dibujando");
      canvas.isDrawingMode= 0;
      aux=0;
    }


  });
});

$('#color1').on("click",function(){
  $('#color1').val(1);
canvas.freeDrawingBrush.color = color1;
  //console.log($('#color1').val());
  if ($('#color2').val()==1) {
    $('#color2').val(0);
    $('#color1').css({
      "background-color":"rgba(0,0,255,0.2)",
      "border":"1px solid blue"
    });
    $('#color2').css({
      "background-color":"#CDCCCC",
      "border":"transparent"
    });
    $("#color2").hover(function(){
  $(this).css({"background-color":"rgba(0,0,255,0.2)","border":"1px solid lightblue"});
  }, function(){
        $(this).css("background-color", "transparent");
});
  }else{
    $('#color1').css({
      "background-color":"rgba(0,0,255,0.2)",
      "border":"1px solid blue"
    });
  }
});

$('#color2').on("click",function(){
  $('#color2').val(1);
  canvas.freeDrawingBrush.color = color2;
  console.log($('#color2').val());
  if ($('#color1').val()==1) {
    $('#color1').val(0);
    $('#color2').css({
      "background-color":"rgba(0,0,255,0.2)",
      "border":"1px solid blue"
    });
    $('#color1').css({
      "background-color":"#CDCCCC",
      "border":"transparent"
    });

    $("#color1").hover(function(){
  $(this).css({"background-color":"rgba(0,0,255,0.2)","border":"1px solid lightblue"});
  }, function(){
  $(this).css("background-color", "transparent");
});
  }else{
    $('#color2').css({
      "background-color":"rgba(0,0,255,0.2)",
      "border":"1px solid blue"
    });
  }
});

function colores(id){

  if($('#color1').val()==1){
    color=id;
canvas.freeDrawingBrush.color = id;
color1=id;
    $('.cuadro1').css({
      "background-color":""+id+""
    });
  }

  if ($('#color2').val()==1) {
    color=id;
    color2=id;
    canvas.freeDrawingBrush.color = id;
    $('.cuadro2').css({
      "background-color":""+id+""
    });
  }
}
