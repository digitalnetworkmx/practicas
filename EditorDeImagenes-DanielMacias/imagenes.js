var editor = new function(){
  var fuente="";
  var lienzo, context,isPaint=false,lastPointerPosition,mode = 'brush';
  var imagenesAgregadas = new Array();
  var textosAgregados = new Array();
  var shapesAgregados = new Array();
  var temporalDesign="",otherTemporalDesign="";
  var temporalNodo="",othertemporalNodo="",propiedades= new Array();
  var temporalShape="",otherTemporalShape="",trans;

  var init = function(){
    initDrawing();
    initAccionesDraw();
    $('.ui.dropdown').dropdown();
    initFormulario();
    initBtnSubirImagen();
    initBtnAgregarTexto();
    initBtnBorrarImg();
    initAñadirArchivo();
    initAñadirTexto();
    initInputSA();
    initInputURLExtern();
    conjuntoS();

    initBtnBorrarTxt();
    initBtnRestablecerTxt();
    initBtnNormal();
    initBtnItalic();
    initBtnNegritas();
    initLittleFormulario();

    initBtnInvertirImg();
    initBtnRestablecerImg();
    initBtnEscalaGris();
    initSliderBrillo();
    initSliderContraste();
    initSliderPixel();
    initBtnLimpiar();
    initBtnDownload();
  }

  //Descargar imagene

  var downloadURI = function(uri, name) {
    var link = document.createElement("a");
    link.download = name;
    link.href = uri;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    delete link;
  }

  var initBtnDownload = function(){
    $("#descargar").click(function(){
      var dataURL = lienzo.toDataURL();
      downloadURI(dataURL, 'lienzo.png');
    });
  }

//Controller para las interacciones con los elementos
  var initDrawing = function(){
    lienzo = new Konva.Stage({
      container: 'lienzo',
      width:700,
      height:700
    });
    var canvas = document.createElement('canvas');
    canvas.width = lienzo.width();
    canvas.height = lienzo.height();

    context = canvas.getContext("2d");
    context.strokeStyle = "#df4b26";
    context.lineJoin = "round";
    context.lineWidth = 8;
    var layer = new Konva.Layer();
    var image = new Konva.Image({image: canvas,x: 0,y: 0});
    layer.add(image);
    lienzo.add(layer);
    lienzo.draw();
    $("#dibujarEnImagen").click(function(){
      $("#barraDerecha").hide(1000);
      $("#barraIzquierda").hide(1000);
      $("#barraSuperior").show(1000);
      initDrawInteraction(image,layer);
    });

    $("#leaveDraw").click(function(){
      $("#barraSuperior").hide(1000);
      image.off("mousedown touchstar");
      lienzo.off("mouseup touchend");
      lienzo.off("mousemove touchmov");
    });
  }

  var initDrawInteraction = function(img,layer){
    img.on('mousedown touchstart', function () {
      isPaint = true;
      lastPointerPosition = lienzo.getPointerPosition();
    });

    img.on('mouseup touchend', function () {
      isPaint = false;
    });
    img.on("mousemove touchmove",function(){
      if (!isPaint) {
        return;
      }
      if (mode === 'brush') {
        context.globalCompositeOperation = 'source-over';
      }else if (mode === 'eraser') {
        context.globalCompositeOperation = 'destination-out';
      }
      context.beginPath();

      var localPos = {
        x: lastPointerPosition.x - img.x(),
        y: lastPointerPosition.y - img.y()
      };
      context.moveTo(localPos.x, localPos.y);
      var pos = lienzo.getPointerPosition();
      localPos = {
        x: pos.x - img.x(),
        y: pos.y - img.y()
      };
      context.lineTo(localPos.x, localPos.y);
      context.closePath();
      context.stroke();

      lastPointerPosition = pos;
      layer.batchDraw();
    });
  }

  var initAccionesDraw = function(){
    $("#sizeP").on("input", function(){
      context.lineWidth = $(this).val();
      lienzo.draw();
    });
    $("#colorP").change(function(){
      context.strokeStyle = $(this).val();
      lienzo.draw();
    });
    $("#PincelEdit").change(function(){
      mode = $(this).val();
      lienzo.draw();
    })
  }

  var initInteraccionEL = function(layer,elemento){
    lienzo.on('click tap', function (e) {
      // si da click a una espacio en blanco del lienzo, quitar el Transformer

      // no hace nada si da click en otro elemento
      if (!e.target.hasName('imgs')&&!e.target.hasName("txt")&&!e.target.hasName("circulo")&&!e.target.hasName('rect')&&!e.target.hasName('polygon')&&!e.target.hasName('star')) {
        lienzo.find('Transformer').destroy();
        $("#barraDerecha").hide(1000);
        $("#barraIzquierda").hide(1000);
        $("#barraSuperiorFigura").hide(1000);
        layer.draw();
        return;
      }else if(e.target.hasName('imgs')){
        $("#barraIzquierda").hide(1000);
        $("#barraSuperiorFigura").hide(1000);
        lienzo.find('Transformer').destroy();
        //console.log(imagen);
        var tr = new Konva.Transformer();
        layer.add(tr);
        tr.attachTo(e.target);
        //Iniciar el formulario con los valores del nuevo elemento seleccionado
        $("#sliderBrillo").val(elemento.brightness());
        $("#sliderContraste").val(elemento.contrast());
        $("#sliderPixelado").val(elemento.pixelSize());
        $("#barraDerecha").show(1000);
        temporalDesign="";
        otherTemporalDesign ="";
        temporalDesign = layer;
        otherTemporalDesign = elemento;
        $("#barraDerecha").css("display","flex");
        layer.draw();

      }else if(e.target.hasName('txt')){
        $("#barraDerecha").hide(1000);
        $("#barraSuperiorFigura").hide(1000);
        lienzo.find('Transformer').destroy();
        var tr = new Konva.Transformer({
          node: elemento,
          centeredScaling: true,
          rotationSnaps: [0, 90, 180, 270],
          resizeEnabled: false
        });
        layer.add(tr);
        tr.attachTo(e.target);
        //Iniciar el formulario con los valores del nuevo elemento seleccionado
        temporalNodo="";
        othertemporalNodo ="";
        propiedades.length = 0;
        $("#nodoTextoEdit").val(elemento.getAttr("text"));
        $("#fontsizeEdit").val(elemento.getAttr("fontSize"));
        $("#tF").html(elemento.getAttr("fontFamily"));
        propiedades.push(elemento.getAttr("text"),elemento.getAttr("fontSize"),elemento.getAttr("fill"),elemento.getAttr("fontFamily"));
        $("#barraIzquierda").show(1000);
        temporalNodo = layer;
        othertemporalNodo = elemento;
        $("#barraIzquierda").css("display","flex");
        layer.draw();
      }else if(e.target.hasName('circulo')||e.target.hasName('rect')||e.target.hasName('polygon')||e.target.hasName('star')){
        $("#barraDerecha").hide(1000);
        $("#barraIzquierda").hide(1000);
        lienzo.find('Transformer').destroy();
        var MAX_WIDTH = 400;
        trans = new Konva.Transformer();
        layer.add(trans);
        trans.attachTo(e.target);

        temporalShape="";
        otherTemporalShape ="";
        propiedades.length = 0;

        $("#colorF").val(elemento.getAttr("fill"));
        $("#colorStroke").val(elemento.getAttr("stroke"));
        propiedades.push(elemento.getAttr("fill"),elemento.getAttr("stroke"));
        $("#barraSuperiorFigura").show(1000);
        temporalShape=layer;
        otherTemporalShape =elemento;
        $("#barraSuperiorFigura").css("display","flex");
        layer.draw();
      }
    });
  }

  var initBtnLimpiar = function(){
    $("#limpiar").click(function(){
      lienzo.destroyChildren();
      lienzo.clearCache();
      initDrawing();
      $("#barraDerecha").hide(1000);
      $("#barraIzquierda").hide(1000);
      $("#barraSuperiorFigura").hide(1000);
      $("#barraSuperior").hide(1000);
    })
  }


  //Métodos para la creación de figuras
  var conjuntoS = function(){
    initBtnCreateShape();
    initBtnGuardarFigura();
    initBtnBorrarShape();
    initBtnRestablecerShape();
    initFills();
  }
  var initBtnCreateShape = function(){
    $("#addShapes").click(function(){
      $("#modalShape").modal({
        closable:false,
        autofocus:false
      }).modal("show");
    })
  }

  var initBtnGuardarFigura = function(){
    $("#grdShape").click(function(){
      var option = $("#shapeChoose").val();
      if(option!=""){
        switch (option) {
          case "circle":
            var layer = new Konva.Layer();
            var circle = new Konva.Circle({
              name:"circulo",
              x: lienzo.getWidth() / 2,
              y: lienzo.getHeight() / 2,
              radius: 70,
              fill: 'blue',
              stroke: 'gray',
              strokeWidth: 2,
              draggable: true
            });
            circle.on('mouseover', function() {
              document.body.style.cursor = 'pointer';
            });
            circle.on('mouseout', function() {
              document.body.style.cursor = 'default';
            });
            layer.add(circle);
            layer.on('click', function(){
              initInteraccionEL(this,circle);
            });
            lienzo.add(layer);
            break;
          case "rect":
            var layer = new Konva.Layer();
            var rect = new Konva.Rect({
              name:"rect",
              x: 10,
              y: 10,
              width: 100,
              height: 50,
              fill: 'blue',
              stroke: 'black',
              strokeWidth: 2,
              draggable:true
            });
            rect.on('mouseover', function() {
              document.body.style.cursor = 'pointer';
            });
            rect.on('mouseout', function() {
              document.body.style.cursor = 'default';
            });
            layer.add(rect);
            layer.on('click', function(){
              initInteraccionEL(this,rect);
            });
            lienzo.add(layer);
            break;
          case "polygon":
            var layer = new Konva.Layer();
            var polygon = new Konva.RegularPolygon({
              name:"polygon",
              x: 100,
              y: 110,
              sides: 5,
              radius: 70,
              fill: 'blue',
              stroke: 'black',
              strokeWidth: 2,
              draggable:true
            });
            polygon.on('mouseover', function() {
              document.body.style.cursor = 'pointer';
            });
            polygon.on('mouseout', function() {
              document.body.style.cursor = 'default';
            });
            layer.add(polygon);
            layer.on('click', function(){
              initInteraccionEL(this,polygon);
            });
            lienzo.add(layer);
            break;
          case "star":
            var layer = new Konva.Layer();
            var star = new Konva.Star({
              name:"star",
              x: lienzo.getWidth() / 2,
              y: lienzo.getHeight() / 2,
              numPoints: 5,
              innerRadius: 40,
              outerRadius: 70,
              fill: 'blue',
              stroke: 'black',
              strokeWidth: 2,
              draggable:true
            });
            star.on('mouseover', function() {
              document.body.style.cursor = 'pointer';
            });
            star.on('mouseout', function() {
              document.body.style.cursor = 'default';
            });
            layer.add(star);
            layer.on('click', function(){
              initInteraccionEL(this,star);
            });
            lienzo.add(layer);
            break;
        }
      }
      $("#modalShape").modal("hide");
    });
  }

  var initBtnBorrarShape = function(){
    $("#borrarShape").click(function(){
      temporalShape.destroy();
      $("#barraSuperiorFigura").hide(1000);
    });
  }

  var initBtnRestablecerShape = function(){
    $("#restablecerShape").click(function(){
      otherTemporalShape.setAttr("fill",propiedades[0]);
      otherTemporalShape.setAttr("stroke",propiedades[1]);
      temporalShape.draw();
    });
  }

  var initFills = function(){
    $("#colorF").change(function(){
      var c =$("#colorF").val();
      otherTemporalShape.fill(c);
      temporalShape.draw();
    });
    $("#colorStroke").change(function(){
      var cS = $("#colorStroke").val();
      otherTemporalShape.setAttr("stroke",cS);
      temporalShape.draw();
    });
  }

//Métodos para agregar imagenes
  var initBtnSubirImagen = function(){
    $("#subirImagen").click(function(){
      $("#seleccionarE").modal({
        closable: false,
        autofocus: false,
      }).modal("show");
    });
  }

  var initInputSA = function(){
    $("#archivo").change(function(e){
      fuente="";
      $("#urlIma").val("");
      var file = e.target.files[0];
      imageType = /image.*/;

      if (!file.type.match(imageType)){
       return;
      }
      fuente = URL.createObjectURL(file);
      console.log(fuente);
    });
  }

  var initInputURLExtern = function(){
    $("#urlIma").change(function(e){
      $("#archivo").val("");
      fuente="";
      fuente=$("#urlIma").val();
      console.log(fuente);
    });
  }

  var initAñadirArchivo = function(){
    $("#grdCambios").click(function(){
      if(fuente!=""){
        var img = new Image();
        img.src = fuente;
        img.onload = function(){
          dibujarImagen(this);
        }
        $("#seleccionarE").modal("hide");
      }
    });
  }

  var dibujarImagen = function(imagen){
    var layer = new Konva.Layer();
    var imgT="";
    //imagen
    imagenesAgregadas.push(new Konva.Image({
      image:imagen,
      x: lienzo.getWidth() / 2 - 400 / 2,
      y: lienzo.getHeight() / 2 - 297 / 2,
      width: 400,
      height: 297,
      draggable: true,
      name: "imgs"
    }));

    imgT = imagenesAgregadas[imagenesAgregadas.length-1];

    imgT.cache();
    imgT.filters([Konva.Filters.Brighten,Konva.Filters.Contrast,Konva.Filters.Pixelate]);
    imgT.brightness(0);
    imgT.contrast(0);
    imgT.pixelSize(1);

    console.log(imagenesAgregadas);
    imgT.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
    });
    imgT.on('mouseout', function() {
      document.body.style.cursor = 'default';
    });
    layer.add(imgT);

    layer.on('click', function(){
      initInteraccionEL(this,imgT);
    });
    lienzo.add(layer);
  }


//Botones de acciones para la edición de la imagen
  var initBtnBorrarImg = function(){
    $("#borrarImagen").click(function(){
      console.log(temporalDesign);
      temporalDesign.destroy();
      $("#barraDerecha").hide(1000);
    });
  }

  var initBtnRestablecerImg = function(){
    $("#restablecerImagen").click(function(){
      otherTemporalDesign.filters([Konva.Filters.Brighten,Konva.Filters.Contrast,Konva.Filters.Pixelate]);
      otherTemporalDesign.brightness(0);
      otherTemporalDesign.contrast(0);
      otherTemporalDesign.pixelSize(1);
      temporalDesign.draw();
    });
  }

  var initBtnInvertirImg = function(){
    $("#invertirImagen").click(function(){
      //console.log(otherTemporalDesign.getAttr("filters"));
      var sos = otherTemporalDesign.getAttr("filters");
      var comprobar = false;
      for (var i = 0; i < sos.length; i++) {
        if (sos[i]==Konva.Filters.Invert) {
          comprobar=true;
        }
      }
      if(!comprobar){
        sos.push(Konva.Filters.Invert)
        otherTemporalDesign.cache();
        otherTemporalDesign.filters(sos);
        temporalDesign.draw();
      }
    });
  }

  var initBtnEscalaGris = function(){
    $("#grisesImagen").click(function(){
      console.log(otherTemporalDesign.getAttr("filters"));
      var sos = otherTemporalDesign.getAttr("filters");
      var comprobar = false;
      for (var i = 0; i < sos.length; i++) {
        if (sos[i]==Konva.Filters.Grayscale) {
          comprobar=true;
        }
      }
      if(!comprobar){
        sos.push(Konva.Filters.Grayscale)
        otherTemporalDesign.cache();
        otherTemporalDesign.filters(sos);
        temporalDesign.draw();
      }
    });
  }

  var initSliderBrillo = function(){
    $("#sliderBrillo").on('input', function(){
      //console.log(otherTemporalDesign);
      otherTemporalDesign.brightness($(this).val());
      temporalDesign.batchDraw();
      temporalDesign.draw();
    });
  }

  var initSliderContraste = function(){
    $("#sliderContraste").on('input', function(){
      //console.log(otherTemporalDesign);
      otherTemporalDesign.contrast($(this).val());
      temporalDesign.batchDraw();
      temporalDesign.draw();
    });
  }

  var initSliderPixel = function(){
    $("#sliderPixelado").on('input', function(){
      otherTemporalDesign.pixelSize($(this).val());
      temporalDesign.batchDraw();
    });
  }

  //Métodos para agregar texto
  var initBtnAgregarTexto = function(){
    $("#addLetras").click(function(){
      $("#formTexto").form("clear");
      $("#modalTexto").modal({
        closable:false,
        autofocus:false
      }).modal("show");
    });
  }

  var initAñadirTexto = function(){
    $("#grdCambiosTxt").click(function(){
      $("#formTexto").submit();
    });
  }

  var initFormulario = function(){
    $("#formTexto").form({
      inline: true,
      fields: {
        nodoTexto: {
          identifier: 'nodoTexto',
          rules: [{
              type: 'empty',
              prompt: 'Es necesario no dejar el campo vacío'
            },
            {
              type: 'maxLength[150]',
              prompt: 'No puede sobrepasar tal lúmite de caracteres'
            }
          ]
        },
        fontsize: {
          identifier: 'fontsize',
          rules: [{
              type: 'empty',
              prompt: 'Es necesario no dejar el campo vacío'
            }
          ]
        },
        estiloTexto: {
          identifier: 'estiloTexto',
          rules: [{
              type: 'empty',
              prompt: 'Es necesario no dejar el campo vacío'
            }
          ]
        },
        fontTexto: {
          identifier: 'fontTexto',
          rules: [{
              type: 'empty',
              prompt: 'Es necesario no dejar el campo vacío'
            }
          ]
        },
      },
      onSuccess: function(event, fields){
        event.preventDefault();
        crearNodoTexto(fields.nodoTexto,fields.fontsize,fields.estiloTexto,fields.fontTexto);
        $("#modalTexto").modal("hide");
      }
    }).submit(function(e){
      e.preventDefault();
    });
  }

  var crearNodoTexto = function(txt,ft=12,style="normal",family="Arial"){
    var layer = new Konva.Layer();
    var txtT = "";

    textosAgregados.push(new Konva.Text({
      x: 50,
      y: 70,
      fontSize: ft,
      text: txt,
      fontFamily: family,
      fontStyle: style,
      draggable: true,
      name:"txt"
    }));
    console.log(textosAgregados);

    txtT = textosAgregados[textosAgregados.length-1];

    txtT.on('mouseover', function() {
      document.body.style.cursor = 'pointer';
    });
    txtT.on('mouseout', function() {
      document.body.style.cursor = 'default';
    });
    layer.add(txtT);
    layer.on('click', function(){
      initInteraccionEL(this,txtT);
    });
    lienzo.add(layer);
  }

  //Botones de acciones para la edición de la imagene
  var initBtnBorrarTxt = function(){
    $("#borrarTexto").click(function(){
      console.log(temporalNodo);
      temporalNodo.destroy();
      $("#barraIzquierda").hide(1000);
    });
  }

  var initBtnNegritas = function(){
    $("#boldTexto").click(function(){
      console.log(othertemporalNodo);
      othertemporalNodo.setAttr("fontStyle","bold");
      temporalNodo.draw();
    });
  }

  var initBtnItalic = function(){
    $("#italicTexto").click(function(){
      console.log(othertemporalNodo);
      othertemporalNodo.setAttr("fontStyle","italic");
      temporalNodo.draw();
    });
  }

  var initBtnNormal = function(){
    $("#normalTexto").click(function(){
      console.log(othertemporalNodo);
      othertemporalNodo.setAttr("fontStyle","normal");
      temporalNodo.draw();
    });
  }

  var initBtnRestablecerTxt = function(){
    $("#restablecerTexto").click(function(){
      othertemporalNodo.setAttr("text",propiedades[0]);
      othertemporalNodo.setAttr("fontSize",propiedades[1]);
      othertemporalNodo.setAttr("fill",propiedades[2]);
      othertemporalNodo.setAttr("fontFamily",propiedades[3]);
      temporalNodo.draw();
    });
  }

  var initLittleFormulario = function(){
    $("#nodoTextoEdit").change(function(){
      var t = $("#nodoTextoEdit").val();
      othertemporalNodo.setAttr("text",t);
      temporalNodo.draw();
    });
    $("#fontsizeEdit").change(function(){
      var s = $("#fontsizeEdit").val();
      othertemporalNodo.setAttr("fontSize",s);
      temporalNodo.draw();
    });
    $("#colorFontEdit").change(function(){
      var c =$("#colorFontEdit").val();
      othertemporalNodo.fill(c);
      temporalNodo.draw();
    });
    $("#fontTextoEdit").change(function(){
      var fa =$("#fontTextoEdit").val();
      othertemporalNodo.setAttr("fontFamily",fa);
      temporalNodo.draw();
    });
  }

  return{
    init:init,
  }
}

$(document).ready(function($){
  editor.init();
});
