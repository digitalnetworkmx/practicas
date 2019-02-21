var color= $('#color').val();
$(document).ready(function () {
  clicks();
  imagenes();
  $('.ui.dropdown').dropdown()
;
});
var tri = new fabric.Rect();
tri.set({
  width:100,
  height:100
})

var clicks = function () {
  $(document).on('click','.imagen1',function () {
    $('#modal').modal('show');
  });
  var canvas = new fabric.Canvas('canvas');
  $(document).on('click','#subir',function () {
    var url = $('#url').val();
    fabric.Image.fromURL(""+url,function(myImage) {
      var img=myImage.set({left:0,top:0});
      canvas.add(img);
    });
    $('#modal').modal('hide');
    $('#url').val("");
  });
  $(document).on('click','.imagen2',function () {
    $('#modal2').modal('show');
  });
  $(document).on('click','#boton',function () {
    $('#file').trigger('click');
  });
  $(document).on('click','#subir2',function () {
    var url2 = $('#url2').val();
    console.log(url2);
    fabric.Image.fromURL(url2,function(myImage) {
      var img2=myImage.set({left:50,top:50});
      canvas.add(img2);
    });
    $('#modal2').modal('hide');
    $('#url2').val("");
  });
  $(document).on('click','#cancelar2',function () {
    $('url2').val("");
  });
  $(document).on('click','#cancelar',function () {
    $('url').val("");
  });
  $(document).on('click','.imagen3',function () {
    $('#modal3').modal('show');
  })
  $(document).on('click','#cancelar3',function () {
    $('#color').value("");
  });
  $(document).on('click','#subir3',function () {
    color= $('#color').val();
    console.log(color);
    $('#modal3').modal('hide');
    canvas.backgroundColor = color;
    canvas.freeDrawingBrush.color =color;
    $('#color').val("");
  });
  $(document).on('click','.imagen4',function () {
    $('#modal4').modal('show');
  });
  $(document).on('click','#subir4',function () {
    var texto= $('#texto').val();
    console.log(texto);
    var text = new fabric.Text(texto, { left: 100, top: 100 });
    canvas.add(text);
    $('#modal4').modal('hide');
    $('#texto').val("");
    // $('.lista').css("display","block");
    // $('#cambiar').css("display","block");
});
  $(document).on('click','.imagen5',function () {
    $('#modal5').modal('show');
 });
  $(document).on('click','#subir5',function () {
  colorLapiz= $('#color2').val();
  $(function () {
   canvas.backgroundColor = color;
   canvas.isDrawingMode= 1;
   canvas.freeDrawingBrush.color = colorLapiz;
   canvas.freeDrawingBrush.width = 1;
   canvas.renderAll();
   dibujo=1;
 });
 $('.pintar').css("display","flex");
 $('#modal5').modal('hide');
 $('#color2').val("");
});
  $(document).on('click','#lapiz',function () {
    canvas.freeDrawingBrush.width = 5;
  })
  $(document).on('click','#marcador',function () {
    canvas.freeDrawingBrush.width = 10;
  });
  $(document).on('click','#brocha',function () {
    canvas.freeDrawingBrush.width = 15;
  });
  $(document).on('click','#borrar',function () {
    $(function () {
     canvas.backgroundColor = color;
     canvas.isDrawingMode= 1;
     canvas.freeDrawingBrush.color =color;
     canvas.freeDrawingBrush.width = 15;
     canvas.renderAll();
     dibujo=1;
   });
  });
  $(document).on('click','#regresar',function () {
      canvas.isDrawingMode= 0;
      $('.pintar').css("display","none");
  });
  $(document).on('click','#basura',function () {
	if(canvas.getActiveObject()){
		canvas.remove(canvas.getActiveObject());
	}
  });
  // $(document).on('click','#cambiar',function () {
  //   var tipo = $('#selector').val();
  //   console.log(tipo);
  //   // text=fontFamily:tipo;
  // });
}


var imagenes = function () {
  $(document).on('click','#file',function () {
    $('#file').change(function(e) {
      console.log(e);
      //Guardamos el achivo en una variable
      var file = e.target.files[0],
      imageType = /image.*/;

      //	Validamos que sea una imagen
      if (!file.type.match(imageType)){
        return;
      }
      var fuente = URL.createObjectURL(file);
      console.log(fuente);
      $('#url2').val(fuente);
    });
  });
}
