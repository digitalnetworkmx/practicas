function inicio(){
  var buscar= $("#buscar");
  formulario();
  buscar.click(function(){
    $("#form").submit();
  });
}
function formulario(){
  $("#form").form({
    inline:true,
    fields:{
      palabra:{
        identifier:"palabra",
        rules:[{
          type:"empty",
          prompt:"Es necesario llenar este campo",
        },{
          type:"maxLength[20]",
          prompt:"Es muy larga la palabra"
        },{
          type:"minLength[3]",
          prompt:"Es muy corta la palabra"
        }]
      }
    },
    onSuccess:function(event, fields){
      event.preventDefault();
      ajax(fields.palabra);
    }
  }).submit(function(e){
    e.preventDefault();
  });
}
function ajax(palabra){
  console.log("hola");
  $.ajax({
    url:"https://api.giphy.com/v1/gifs/translate?api_key=bb2006d9d3454578be1a99cfad65913d&s="+palabra,
    type:"GET",
    dataType:"json",
    data:{},
    beforeSend:function(){
      $("#modal").modal("show");
    }
  }).done(function(res){
    ponerGifs(res);
    alerta(true,"Listo");
  }).fail(function(e){
    alerta(false,"no se pudo obtener el gif");
  }).always(function(){
    $("#modal").modal("hide");
  });
}
function ponerGifs(resultado){
  var texto = "<img 'width=200px' src='"+resultado.data.images.original.url+"'/>"
  $("#resultado").html(texto);
}
window.onload=inicio;
