$(document).ready(function(){
  // console.log("ready!");
})

var imagen=false;
var texto=false;
var dibujo=0;
var canvas;

jQuery(function($){
canvas = new fabric.Canvas('c');
var context = canvas.getContext('2d');


$("#addImage").click(function(){
    var url = $("#urls").val();
      fabric.Image.fromURL(""+url+"", function(img){
        var imaeegn = img;
        imagen=true;
        canvas.add(img);
      });
    $("#urls").val("");

  //   var imageUrl = $("#urls").val();
  //
  // // Define
  // canvas.setBackgroundImage(imageUrl, canvas.renderAll.bind(canvas), {
  //     // Optionally add an opacity lvl to the image
  //     backgroundImageOpacity: 0.5,
  //     // should the image be resized to fit the container?
  //     backgroundImageStretch: false
  // });
  });



  $("#texto").click(function(){
    text = new fabric.Text($("#txt").val(), { left: 100, top: 100 });
	  canvas.add(text);
    texto=true;
    $("#txt").val("");
    });

    var click=0;
    $("#dibujar").click(function(imaeegn,text){
      if (click==0) {
        $("#dibujar").css({"background-color":"#CCCCCB"});
        click=1;
        lienzo();
      }else if(click==1){
        $("#dibujar").css({"background-color":"#E8E8E6"});
        click=0;
        lienzo();
      }

  });
});

function lienzo(){
  $(function () {
  if(dibujo==0){
      canvas.backgroundColor = 'white';
      canvas.isDrawingMode= 1;
      canvas.freeDrawingBrush.color = "black";
      canvas.freeDrawingBrush.width = 5;
      canvas.renderAll();
      dibujo=1;
  }else {
    canvas.isDrawingMode= 0;
    dibujo=0;
  }
  });

}

function color(id){
// console.log(id);
canvas.freeDrawingBrush.color = id;
}

function tam(value){
  // console.log(value);
  canvas.freeDrawingBrush.width = value;
}


function download() {
var download = document.getElementById("download");
var image = document.getElementById("c").toDataURL("image/png")
.replace("image/png", "image/octet-stream");
download.setAttribute("href", image);
// download.setAttribute("download","MRH.png");
}


// _canvasObject= new fabric.Canvas('c');
// function dataURLtoBlob(dataurl) {
//     var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
//         bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
//     while(n--){
//         u8arr[n] = bstr.charCodeAt(n);
//     }
//     return new Blob([u8arr], {type:mime});
// }
//
// function download(){
//     var link = document.createElement("a");
//       var imgData = _canvasObject.toDataURL({    format: 'png',
//         multiplier: 4});
//       var strDataURI = imgData.substr(22, imgData.length);
//       var blob = dataURLtoBlob(imgData);
//       var objurl = URL.createObjectURL(blob);
//
//       link.download = "MRh.png";
//
//       link.href = objurl;
//
//      link.click();
// }
