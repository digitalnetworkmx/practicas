
$( function() {
  $( "#draggable" ).draggable();
  $("#draggable").draggable({
                  containment: ".contenedor",
                  scroll: false
  });
  $( "#draggable2" ).draggable();
  $("#draggable2").draggable({
    containment: ".contenedor",
    scroll: false
  });

} );
