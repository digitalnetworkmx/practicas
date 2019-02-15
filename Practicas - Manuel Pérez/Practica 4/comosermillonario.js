var Controlador=function(){
  var id=0;
  var objeto=null;
  var init=function(){
    verPreguntas();
    btnAñadir();
    btnGuardar();
    formularioNuevo();
    initDropdown();
    btnEditar();
    btnBorrar();
    btnEliminar();
  }
  var btnEliminar=function(){
    $(document).on("click","#btnBorrar",function(){
      borrarPregunta($(objeto).data().id);
    });
  }
  var initDropdown=function(){
    $(".ui.dropdown").dropdown();
  }
  var btnEditar=function(){
    $(document).on("click",".btnEditar",function(){
      editarRegistro(this);
    })
  }
  var btnBorrar = function(){
    $(document).on("click",".btnEliminar",function(){
      $(".ui.basic.modal").modal("show");
      objeto=$(this);
    })
  }
  var editarRegistro = function(obj){
    var data = $(obj).data();
    id = data.id;
    $("#pregunta").val(data.pregunta);
    $("#respuesta_1").val(data.respuesta_1);
    $("#respuesta_2").val(data.respuesta_2);
    $("#respuesta_3").val(data.respuesta_3);
    $("#respuesta_correcta").val(data.respuesta_correcta);
    $("#modalAgregar").attr("data-tipo","editar");
    $("#modalAgregar").modal("show");
  }
  var btnGuardar = function(){
    $(document).on("click","#btnGuardar",function(){
      $("#formNuevo").submit();
    })
  }
  var formularioNuevo = function(){
    $("#formNuevo").form({
      inline:true,
      fields:{
        pregunta:{
          identifier:"pregunta",
          rules:[{
            type:"empty",
            prompt:"Este campo es necesario"
          },{
            type:"minLength[7]",
            prompt:"La pregunta debe de tener mas de 6 caracteres"
          }]
        },
        respuesta_correcta:{
          identifier:"respuesta_correcta",
          rules:[{
            type:"empty",
            prompt:"Este campo es necesario"
          },{
            type:"minLength[3]",
            prompt:"La respuesta debe de contener mas de 2 caracteres"
          }]
        },
        respuesta_1:{
          identifier:"respuesta_1",
          rules:[{
            type:"empty",
            prompt:"Este campo es necesario"
          },{
            type:"minLength[3]",
            prompt:"La respuesta debe de contener mas de 2 caracteres"
          }]
        },
        respuesta_2:{
          identifier:"respuesta_2",
          rules:[{
            type:"empty",
            prompt:"Este campo es necesario"
          },{
            type:"minLength[3]",
            prompt:"La respuesta debe de contener mas de 2 caracteres"
          }]
        },
        respuesta_3:{
          identifier:"respuesta_3",
          rules:[{
            type:"empty",
            prompt:"Este campo es necesario"
          },{
            type:"minLength[3]",
            prompt:"La respuesta debe de contener mas de 2 caracteres"
          }]
        }
      },onSuccess:function(event, fields){
        event.preventDefault();
        var date = new Date();
        var fecha = date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear();
        if($("#modalAgregar").data().tipo!="editar"){
          guardarPregunta(fields.pregunta,fields.respuesta_1,fields.respuesta_2,fields.respuesta_3,fields.respuesta_correcta,fecha);
        }
        else{
          actualizarPregunta(id,fields.pregunta,fields.respuesta_1,fields.respuesta_2,fields.respuesta_3,fields.respuesta_correcta,fecha);
        }
      }
    }).submit(function(e){
      e.preventDefault();
    });
  }
  function formatear(cadena){
    while(cadena.includes("<") || cadena.includes(">")){
      cadena = cadena.replace("<","&lt;");
      cadena=cadena.replace(">","&gt;");
    }
    return cadena;
  }
  var btnAñadir=function(){
    $(document).on("click","#btnNuevo",function(){
      $("#modalAgregar").attr("data-tipo","nuevo");
      $("#pregunta").val("");
      $("#respuesta_1").val("");
      $("#respuesta_2").val("");
      $("#respuesta_3").val("");
      $("#respuesta_correcta").val("");
      $('#modalAgregar').modal('show');
    });
  }
  var guardarPregunta= function(pregunta,respuesta1,respuesta2,respuesta3,correcta,fecha){
    pregunta = formatear(pregunta);
    respuesta1 = formatear(respuesta1);
    respuesta2=formatear(respuesta2);
    respuesta3 = formatear(respuesta3);
    correcta = formatear(correcta);
    $("#cargando").modal("show");
    $.ajax({
      url:"http://borregodev.swi.mx/some/preguntas_save",
      data:{"created_at":fecha,"updated_at":fecha,"pregunta":pregunta,"respuesta_1":respuesta1,"respuesta_2":respuesta2,"respuesta_3":respuesta3,"respuesta_correcta":correcta,"activo":1},
      type:"GET",
      dataType:"json"
    })
    .done(function(res){
      alerta(true,"se guardo exitosamente la pregunta");
    }).fail(function(e){
      alerta(false,"No se pudo guardar la preguna");
    }).always(function(){
      $("#modalAgregar").modal("hide");
      $("#cargando").modal("hide");
    });
  }
  var borrarPregunta = function(id){
    $("#cargando").modal("show");
    $.ajax({
      url:"http://borregodev.swi.mx/some/preguntas_delete",
      data:{"id":id},
      type:"GET",
      dataType:"json",
    })
    .done(function(res){
      alerta(true,"Ya se ha borrado el registro");
      $(objeto).parent().parent().parent().parent().hide();
    })
    .fail(function(e){
      alerta(false,"Parece que ocurrio un error");
    })
    .always(function(){
        $("#cargando").modal("hide");
    });
  }
  var actualizarPregunta = function(id,pregunta,respuesta1,respuesta2,respuesta3,correcta,fecha){
    $("#cargando").modal("show");
    $.ajax({
      url:"http://borregodev.swi.mx/some/preguntas_save",
      data:{"updated_at":fecha,"id":id,"fecha":fecha,"pregunta":pregunta,"respuesta_1":respuesta1,"respuesta_2":respuesta2,"respuesta_3":respuesta3,"respuesta_correcta":correcta,"activo":1},
      type:"GET",
      dataType:"json",
    })
    .done(function(res){
      alerta(true,"se guardo exitosamente la pregunta");
    }).fail(function(e){
      alerta(false,"No se pudo guardar la preguna");
    }).always(function(){
      $("#modalAgregar").modal("hide");
      $("#cargando").modal("hide");
    });
  }
  var verPreguntas = function(){
    $.ajax({
      url:"http://borregodev.swi.mx/some/preguntas_list",
      type:"GET",
      dataType:"json"
    })
    .done(function(respuesta){
      var tabla = $("#preguntas tbody");
      var datos = respuesta.datos;
      for(var i in datos){
        var fila = "<tr><td>"+datos[i].pregunta+"</td>";
        fila+="<td>"+datos[i].respuesta_correcta+"</td>";
        fila+="<td>"+datos[i].respuesta_1+"</td>";
        fila+="<td>"+datos[i].respuesta_2+"</td>";
        fila+="<td>"+datos[i].respuesta_3+"</td>";
        //acciones
        var accion="<td><div class='ui icon dropdown'>";
        accion+="<i class='bars icon'></i>";
        accion+="<div class='menu'>";
        accion+="<div data-respuesta_correcta='"+datos[i].respuesta_correcta+"' data-id='"+datos[i].id+"' data-pregunta='"+datos[i].pregunta+"' data-respuesta_1='"+datos[i].respuesta_1+"' data-respuesta_2='"+datos[i].respuesta_2+"' data-respuesta_3='"+datos[i].respuesta_3+"' class='item btnEditar'><i class='edit icon'></i> Editar</div>";
        accion+="<div data-id='"+datos[i].id+"' class='item btnEliminar'><i class='delete icon'></i> Eliminar</div>";
        accion+="</div></div></td></tr>";
        fila+=accion;
        if(datos[i].activo==1){
            tabla.append(fila);
        }
      }
      $(".ui.dropdown").dropdown();
    })
    .fail(function(e){})
    .always();
  }
return {
  init: init
}
}();
window.onload=function(){
  Controlador.init();
}
