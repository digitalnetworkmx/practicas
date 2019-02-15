var Preguntas = new function(){
var id=0;

  var init = function(){
      initTabla();
      initFormulario();
      initFormularioAgregar();
      initBtnEditar();
      initBtnEliminar();
      initBtnGuardarPregunta();
      initBtnAbrir();
      initBtnGuardar();
      initCerrar();
  }

  var initBtnEditar = function(){
    $(document).on("click","#btnEditar", function(){
      var key = $(this).data();
      id=key.id;

      $.ajax({
        url: 'httpss://borregodev.swi.mx/some/preguntas_list',
        type: 'GET',
        dataType: 'json',
        data: { },
      }).done(function(response){
        // console.log(response);
        for(var i=0;i<response.datos.length;i++){
          if(response.datos[i].id==id){
            $("#xdddd").val(response.datos[i].pregunta);
            $("#respuestaC").val(response.datos[i].respuesta_correcta);
            $("#respuesta1").val(response.datos[i].respuesta_1);
            $("#respuesta2").val(response.datos[i].respuesta_2);
            $("#respuesta3").val(response.datos[i].respuesta_3);
          }
        }
      }).fail(function(e){
        console.error(e);
      }).always(function(){
      });
      abrirModal();
    });
  }

  var initBtnEliminar = function(){
    $('#tabla tbody').on('click', '#btnEliminar', function(){
      var codigo=($(this).data("id"));

      eliminarPregunta(codigo);

    });
  }

  var eliminarPregunta = function(codigo){

    $.ajax({
   	url: 'https://borregodev.swi.mx/some/preguntas_delete',
   	type: 'GET',
   	dataType: 'json',
   	data:{
      id:codigo
     }
 	}).done(function(response) {
    $('#'+codigo).remove();
   	// console.log(response)
 	}).fail(function(e) {
   	console.error(e);
}).always(function(){
 	});

  }

  var initCerrar = function(){
    $('#cancelar').on("click",function(){
        $("#modalagregar").modal("hide");
    });
  }

  var cerrarModal = function(){
  $("#modalEditar").modal("hide");
  $("#modalagregar").modal("hide");
}

  var abrirModal = function(){
    $("#modalEditar").modal({
      closable: false,
      autofocus: false
    }).modal("show");
  }

  var initBtnGuardarPregunta = function(){
   $("#btnGuardar").click(function(){
     $("#formPregunta").submit();

     cerrarModal();
   });
 }

  var initFormulario = function(){
   $("#formPregunta").form({
     inline: true,
     fields: {
       pregunta:{
         identifier: "pregunta",
         rules: [{
             type: "empty",
             prompt: "El campo Pregunta es requerido."
           },
           {
             type: 'maxLength[100]',
             prompt: 'El campo nombre solo permite 100 caracteres.'
           }
         ]
       },
       respuestaC:{
         identifier: "respuestaC",
         rules: [{
             type: "empty",
             prompt: "El campo es requerido."
           },
           {
             type: 'maxLength[40]',
             prompt: 'El campo solo permite 40 caracteres.'
           }
         ]
       },
       respuesta1: {
         identifier:'respuesta1',
         rules: [{
             type: "empty",
             prompt: "El campo es requerido"
           },
           {
             type: 'maxLength[40]',
             prompt: 'El campo solo permite 40 caracteres.'
           }
         ]
       },
       respuesta2: {
         identifier:'respuesta2',
         rules: [{
             type: "empty",
             prompt: "El campo es requerido"
           },
           {
             type: 'maxLength[40]',
             prompt: 'El campo solo permite 40 caracteres.'
           }
         ]
       },
       respuesta3: {
         identifier:'respuesta3',
         rules: [{
             type: "empty",
             prompt: "El campo es requerido"
           },
           {
             type: 'maxLength[40]',
             prompt: 'El campo solo permite 40 caracteres.'
           }
         ]
       }
     },
     onSuccess: function(event, fields){
       event.preventDefault();
       $.ajax({
         url: 'https://borregodev.swi.mx/some/preguntas_save',
         type: 'GET',
         dataType: 'json',
         data: {
           id:id,
           pregunta:fields.pregunta,
           respuesta_correcta: fields.respuestaC,
           respuesta_1: fields.respuesta1,
           respuesta_2: fields.respuesta2,
           respuesta_3: fields.respuesta3,
           activo: '1'
         }
       }).done(function(response){
         // console.log(response);
       }).fail(function(e){
         console.error(e);
       }).always(function(){
         initTabla();
         cerrarModal();
       });
     }
   }).submit(function(e){
     e.preventDefault();
   });
 }

  var initBtnAbrir = function(){
    $('#pregunta').on("click",function(){
      $('#newPregunta').val("");
      $('#newRespuestaC').val("");
      $('#newRespuesta1').val("");
      $('#newRespuesta2').val("");
      $('#newRespuesta3').val("");
      $("#modalagregar").modal({
        closable: false,
        autofocus: false
      }).modal("show");
    });
  }

  var initFormularioAgregar = function(){
  $("#formulario").form({
    inline: true,
    fields:{
      newPregunta: {
        identifier: 'newPregunta',
        rules: [{
            type:"empty",
            prompt: "El campo es requerido"
          },
          {
            type:"maxLength[100]",
            prompt: "El campo solo permite 100 caracteres"
          }
        ]
      },
      newRespuestaC: {
        identifier: 'newRespuestaC',
        rules: [{
            type:"empty",
            prompt: "El campo es requerido"
          },
          {
            type:"maxLength[40]",
            prompt: "El campo solo permite 40 caracteres"
          }
        ]
      },
      newRespuesta1: {
        identifier: 'newRespuesta1',
        rules: [{
            type:"empty",
            prompt: "El campo es requerido"
          },
          {
            type:"maxLength[40]",
            prompt: "El campo solo permite 40 caracteres"
          }
        ]
      },
      newRespuesta2: {
        identifier: 'newRespuesta2',
        rules: [{
            type:"empty",
            prompt: "El campo es requerido"
          },
          {
            type:"maxLength[40]",
            prompt: "El campo solo permite 40 caracteres"
          }
        ]
      },
      newRespuesta3: {
        identifier: 'newRespuesta3',
        rules: [{
            type:"empty",
            prompt: "El campo es requerido"
          },
          {
            type:"maxLength[30]",
            prompt: "El campo solo permite 30 caracteres"
          }
        ]
      },
    },
    onSuccess: function(event, fields){
      event.preventDefault();
      $.ajax({
        url: 'https://borregodev.swi.mx/some/preguntas_save',
        type: 'GET',
        dataType: 'json',
        data:{
          pregunta: fields.newPregunta,
          respuesta_correcta: fields.newRespuestaC,
          respuesta_1: fields.newRespuesta1,
          respuesta_2: fields.newRespuesta2,
          respuesta_3: fields.newRespuesta3,
          activo: '1',
        }
      }).done(function(response){
        // console.log(response);

      }).fail(function(e){

      }).always(function(){
        initTabla();
        cerrarModal();
      });
    }
  }).submit(function(e){
    e.preventDefault();
  });
}

  var initBtnGuardar = function(){
  $("#enviar").click(function(){
    $("#formulario").submit();
  });
}

  var initTabla = function(){
      $.ajax({
       	url: ' https://borregodev.swi.mx/some/preguntas_list',
       	type: 'GET',
       	dataType: 'json',
       	data:{ }
     	}).done(function(response) {
        // console.log(response.datos);
        var arreglo=[];
        arreglo=(response.datos);
        var contenido=[];

        var tabla="";
        for (var i = 0; i < response.datos.length; i++) {
          contenido=(arreglo[i]);

            var accion="<div class='ui icon dropdown'>";
            accion+="<i class='acciones bars icon'></i>";
            accion+="<div class='menu'>";
            // accion+="<div class='item' id='btnEditar' data-key='"+key+"' data-nombre='"+value.nombre+"' data-paterno='"+value.paterno+"' data-materno='"+value.materno+"' data-correo='"+value.correo+"' data-fecha='"+value.fecha+"' data-activo='"+value.activo+"'><i class='edit icon'></i> Editar</div>";
            accion+="<div class='item' id='btnEditar' data-id='"+contenido.id+"'><i class='edit icon'></i> Editar</div>";
            // accion+="<div class='item' id='btnEliminar' data-key='"+key+"' data-activo='"+value.activo+"'><i class='delete icon'></i> Eliminar</div>";
            accion+="<div class='item' id='btnEliminar' data-id='"+contenido.id+"'><i class='delete icon'></i> Eliminar</div>";
            accion+="</div></div>";
            tabla+="<tr id='"+contenido.id+"'><td>"+i+"</td><td>"+contenido.pregunta+"</td><td>"+contenido.respuesta_correcta+"</td><td>"+contenido.respuesta_1+"</td><td>"+contenido.respuesta_2+"</td><td>"+contenido.respuesta_3+"</td><td>"+contenido.created_at+"</td><td>"+accion+"</td></tr>"

        }

        $("#tabla tbody").html(tabla);
        $('.ui.dropdown').dropdown();

     	}).fail(function(e) {
       	console.error(e);
    }).always(function(){
     	});

  }

  return {
    init: init,
  }
  }();

  $(document).ready(function($) {
    Preguntas.init();
  });
