var seleccionado=null;
var capaActual=null;
var mode;
var canvasActual=null;
function inicio(){
  tiposDeLetra();
  var contenedor = new Konva.Stage({
    container:"drop",
    width:window.innerWidth,
    height:window.innerHeight
  });
  activarContenedor(contenedor);
  agregarTexto();
  btnAgregarTexto(contenedor);
  buscarArchivo();
  var seccion = $("#drop");
  var imagen = $("#btnImagen");
  agregarImagen(contenedor);
  inputs(contenedor);
  pintar(contenedor);
  imagen.click(function(){
    añadirImagen();
  });
  $(".ui.dropdown").dropdown();
  borrarImagen(contenedor);
}
function activarContenedor(contenedor){
  contenedor.on('click tap', function (e) {
    if (e.target === contenedor) {
      mode="none";
      $(".escondible").css("display","none");
      contenedor.find('Transformer').destroy();
      try{
        capaActual.draw();
      }
      catch(e){
      }
      return;
    }
    if (!e.target.hasName('imagen') &&  !e.target.hasName('texto') && !e.target.hasName('dibujo')) {
      mode="none";
      $(".escondible").css("display","none");
      return;
    }
    if(e.target.hasName("dibujo")){
      if(mode=="brush" || mode=="eraser"){
        return;
      }
      contenedor.find('Transformer').destroy();
      $(".escondible").css("display","none");
      $("#basura").css("display","flex");
      agregarOpcionesCanvas(e.target,contenedor);
    }
    mode="none";
    if(e.target.hasName("texto")){
      $(".escondible").css("display","flex");
      $("#datos").css("display","none");
      $("#pincelOpciones").css("display","none");
      contenedor.find('Transformer').destroy();
      try{
        capaActual.draw();
      }
      catch(e){}
      agregarOpcionesTexto(e.target,contenedor);
    }
    if(e.target.hasName("imagen")){
      $(".escondible").css("display","flex");
      $("#textoOpciones").css("display","none");
      $("#pincelOpciones").css("display","none");
      contenedor.find('Transformer').destroy();
      var tr = new Konva.Transformer();
      e.target.parent.add(tr);
      tr.attachTo(e.target);
      e.target.parent.draw();
      try{
        capaActual.draw();
      }
      catch(e){
      }
      capaActual=e.target.parent;
      seleccionado = e.target;
      ponerDatos("imagen");
    }
  });
}
function agregarOpcionesCanvas(e,contenedor){
  capaActual=e.parent;
  seleccionado=e;
  contenedor.find('Transformer').destroy();
  var tr = new Konva.Transformer();
  e.parent.add(tr);
  e.draggable(true);
  tr.attachTo(e);
  e.parent.draw();
}
function agregarImagen(contenedor){
  $("#btnAgregarImagen").click(function(){
    console.log("Hola");
    var tipo="1";
    var tr = new Konva.Transformer({
      anchorStroke: 'black',
      anchorFill: 'gray',
      anchorSize: 10,
      borderStroke: 'gray',
      borderDash: [1, 1],
    });
    var capa = new Konva.Layer();
    var imagen = new Image();
    imagen.onload = function(){
      var img = new Konva.Image({
        x:50,
        y:50,
        image:imagen,
        width:250,
        height:250,
        draggable:true,
        name:"imagen",
        opacity:1,
        blurRadius:0
      });
      capa.add(img);
      contenedor.add(capa);
      img.on('transform', function () {
      ponerDatos("imagen");
      capa.draw();
    });
    }
    capa.draw();
    imagen.src=$("#inputImagen").val();
  });
}
function agregarOpcionesTexto(e,contenedor){
  console.log("hola");
  capaActual=e.parent;
  seleccionado=e;
  contenedor.find('Transformer').destroy();
  var tr = new Konva.Transformer();
  e.parent.add(tr);
  tr.attachTo(e);
  e.parent.draw();
  ponerDatos("texto");
}
function pintar(stage){
  $("#btnPincel").click(function(){
    if(mode=="eraser"){
      mode="brush";
      return;
    }
    if(mode=="brush"){
      mode="none";
      $(".escondible").css("display","none");
      return;
    }
    var layer = new Konva.Layer();
    stage.add(layer);

    // then we are going to draw into special canvas element
    var canvas = document.createElement('canvas');
    canvas.width = stage.width()-20;
    canvas.height = stage.height()-20;
    // created canvas we can add to layer as "Konva.Image" element
    var image = new Konva.Image({
      image: canvas,
      draggable:false,
      x: 10,
      y: 55,
      name:"dibujo",
    });
    layer.add(image);
    stage.draw();

    // Good. Now we need to get access to context element
    var context = canvas.getContext('2d');
    context.strokeStyle = "#000000";
    context.lineJoin = "round";
    context.lineWidth = 5;
    canvas=context;
    var isPaint = false;
    var lastPointerPosition;
    // now we need to bind some events
    // we need to start drawing on mousedown
    // and stop drawing on mouseup
    image.on('mousedown touchstart', function () {
      isPaint = true;
      lastPointerPosition = stage.getPointerPosition();

    });

    // will it be better to listen move/end events on the window?

    image.addEventListener('mouseup touchend', function () {
      isPaint = false;
    });

    // and core function - drawing
    image.addEventListener('mousemove touchmove', function () {
      if (!isPaint) {
        return;
      }
      if(mode=="none"){
        return;
      }
      if (mode === 'brush') {
        context.globalCompositeOperation = 'source-over';
      }
      if (mode === 'eraser') {
        context.globalCompositeOperation = 'destination-out';
      }
      context.beginPath();

      var localPos = {
        x: lastPointerPosition.x - image.x(),
        y: lastPointerPosition.y - image.y()
      };
      context.moveTo(localPos.x, localPos.y);
      var pos = stage.getPointerPosition();
      localPos = {
        x: pos.x - image.x(),
        y: pos.y - image.y()
      };
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();
      lastPointerPosition = pos;
      layer.batchDraw();
    });
    canvasActual=canvas;
    mode="brush";
    $(".escondible").css("display","none");
    $("#pincelOpciones").css("display","flex");
    ponerDatos("canvas");
  });
  $("#btnBorrador").click(function(){
    if(mode=="erase"){
      mode="none";
      $(".escondible").css("display","none");
      return;
    }
    mode="eraser";
    $(".escondible").css("display","none");
    $("#pincelOpciones").css("display","flex");
    ponerDatos("canvas");
  })
}
function ponerDatos(texto){
  if(texto=="canvas"){
    console.log(canvasActual.lineWidth);
    $("#inputColorPincel").val(canvasActual.strokeStyle);
    $("#inputTamañoPincel").val(canvasActual.lineWidth);
    return;
  }
  $("#rotacion").val(seleccionado.rotation()+"");
  $("#anchura").val(seleccionado.width()*seleccionado.scaleY()+"");
  $("#altura").val(seleccionado.height()*seleccionado.scaleX()+"");
  $("#opacity").val(seleccionado.opacity()+"");
  if(texto=="texto"){
    $("#opacityTexto").val(seleccionado.opacity()+"");
    $("#rotacionTexto").val(seleccionado.rotation()+"");
    $("#inputTextoEscrito").val(seleccionado.text()+"");
    $("#inputTamañoTexto").val(seleccionado.fontSize()+"");
    $("#btnColor").css("background-color",seleccionado.fill()+"");
    $("#tiposDeLetra").val(seleccionado.fontFamily()+"");
  }
  capaActual.draw();
}
function añadirImagen(){
  $("#modalImagen").modal("show");
}
function buscarArchivo(){
  $("#btnArchivos").click(function(){
    $("#inputArchivos").click();
    $("#inputArchivos").change(function(event){
      var tmppath = URL.createObjectURL(event.target.files[0]);
      $("#inputImagen").val(tmppath);
    });
  });
}
function tiposDeLetra(){
  var systemFonts = ["Andale Mono", "Arial", "Arial Bold",
                    "Arial Italic", "Arial Bold Italic", "Arial Black",
                    "Comic Sans MS", "Comic Sans MS Bold", "Courier New",
                    "Courier New Bold", "Courier New Italic", "Courier New Bold Italic",
                    "Georgia", "Georgia Bold", "Georgia Italic",
                    "Georgia Bold Italic", "Impact", "Lucida Console",
                    "Lucida Sans Unicode", "Marlett", "Minion Web",
                    "Symbol", "Times New Roman", "Times New Roman Bold",
                    "Times New Roman Italic", "Times New Roman Bold Italic", "Tahoma",
                    "Trebuchet MS", "Trebuchet MS Bold", "Trebuchet MS Italic",
                    "Trebuchet MS Bold Italic", "Verdana", "Verdana Bold",
                    "Verdana Italic", "Verdana Bold Italic", "Webdings",
                    "American Typewriter", "Apple Chancery",
                    "Brush Script","Baskerville", "Big Caslon",
                    "Copperplate", "Gill Sans",
                    "Futura", "Herculanum",
                    "Lucida Grande", "Marker Felt", "Optima",
                    "Palatino", "Times",
                    "Osaka", "Papyrus",
                    "Textile", "Zapf Dingbats", "Zapfino",
                    "Techno", "Hoefler Text", "Skia",
                    "Hoefler Text Ornaments", "Capitals", "Charcoal",
                    "Gadget", "Sand",
                    "Charter", "Clean", "Courier",
                    "Fixed", "Helvetica", "Lucida",
                    "Lucida bright", "Lucida Typewriter", "New Century Schoolbook",
                    "Terminal","Utopia"];
  for(var i in systemFonts){
    $("#tiposDeLetra").append("<option value='"+systemFonts[i]+"'>"+systemFonts[i]+"</option>");
  }
}
function borrarImagen(contenedor){
  $("#basura").click(function(){
    $(".escondible").css("display","none");
    contenedor.find('Transformer').destroy();
    seleccionado.destroy();
    capaActual.draw();
    console.log("me destruyeron");
  });
}
function inputs(contenedor){
  $("input.pincel").change(function(){
    if($(this).data().tipo=="strokeStyle"){
      eval("canvasActual."+$(this).data().tipo+"='"+$(this).val()+"';");
      return;
    }
    var x = "canvasActual."+$(this).data().tipo+"="+$(this).val()+";";
    eval(x);
  });
  $("input.datos").change(function(){
    console.log("Cambio o no cambio");
    if($(this).data().tipo=="fill" || $(this).data().tipo=="text"){
      console.log($(this).val());
      var x = "seleccionado."+$(this).data().tipo+"($(this).val());";
      eval(x);
      capaActual.draw();
      capaActual.batchDraw();
      return;
    }
    var x = "seleccionado."+$(this).data().tipo+"(parseFloat($(this).val()));";
    eval(x);
    console.log($(this).val());
    capaActual.draw();
    console.log(x);
    capaActual.batchDraw();
  });
  $("select.datos").change(function(){
    console.log($(this).val());
    var x = "seleccionado."+$(this).data().tipo+"($(this).val());";
    eval(x);
    capaActual.draw();
    capaActual.batchDraw();
  });
  $("select.figuras").change(function(){
    eval("agregar"+$(this).val()+"(contenedor)");
  });
}
function imagenAcciones(){
  $(".imagen").dblclick(function(){
    if($(this).hasClass("seleccionado")){
      $(this).removeClass("seleccionado");
      cambiarMenuBasura();
      return;
    }
    seleccionada=$(this);
    $(this).addClass("seleccionado");
    cambiarMenuHerramientas();
  });
}
function cambiarMenuHerramientas(){
  $("#basura").css("display","none");
  $("#herramientas").css("display","flex");
}
function cambiarMenuBasura(){
  $("#basura").css("display","flex");
  $("#herramientas").css("display","none");
}
function agregarTexto(){
  $("#btnAbrirModalTexto").click(function(){
    $("#modalTexto").modal("show");
  });
}
function btnAgregarTexto(contenedor){
  $("#btnAgregarTexto").click(function(){
    var text = $("#inputTexto").val();
    var capa = new Konva.Layer();
    var texto = new Konva.Text({
      y:300,
      x:300,
      text:text,
      name:"texto",
      fontSize:30,
      fontFamily: 'Arial',
      fill: 'black',
      draggable:true
    });
    texto.on('transform', function () {
      ponerDatos("texto");
      capa.draw();
    });
    capa.add(texto);
    contenedor.add(capa);
  });
}
function agregarRectangulo(stage){
  var layer = new Konva.Layer();

    var rect = new Konva.Rect({
      x: stage.getWidth() / 2,
      y: stage.getHeight() / 2,
      width: 100,
      height: 50,
      fill: 'green',
      stroke: 'black',
      strokeWidth: 4,
      name:"imagen",
      draggable:true
    });
    // add the shape to the layer
    layer.add(rect);
    // add the layer to the stage
    stage.add(layer);
}
function agregarAnillo(stage){
  var layer = new Konva.Layer();

   var ring = new Konva.Ring({
     x: stage.getWidth() / 2,
     y: stage.getHeight() / 2,
     innerRadius: 40,
     outerRadius: 70,
     fill: 'yellow',
     name:"imagen",
     stroke: 'black',
     strokeWidth: 4,
     draggable:true
   });

   // add the shape to the layer
   layer.add(ring);

   // add the layer to the stage
   stage.add(layer);
}
function agregarEstrella(stage){
  var layer = new Konva.Layer();

    var star = new Konva.Star({
      x: stage.getWidth() / 2,
      y: stage.getHeight() / 2,
      numPoints: 6,
      innerRadius: 40,
      outerRadius: 70,
      name:"imagen",
      fill: 'yellow',
      stroke: 'black',
      strokeWidth: 4,
      draggable:true
    });

    // add the shape to the layer
    layer.add(star);

    // add the layer to the stage
    stage.add(layer);
}
function agregarCirculo(stage){
  var layer = new Konva.Layer();
  var circle = new Konva.Circle({
    x: stage.getWidth() / 2,
    y: stage.getHeight() / 2,
    radius: 70,
    name:"imagen",
    fill: 'red',
    stroke: 'black',
    strokeWidth: 4,
    draggable:true
  });
    // add the shape to the layer
  layer.add(circle);
    // add the layer to the stage
  stage.add(layer);
}
window.onload=inicio;
