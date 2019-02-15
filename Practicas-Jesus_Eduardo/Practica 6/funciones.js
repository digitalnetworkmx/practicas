$( function() {
  $( "#carpeta" ).draggable();
  $('#doc').draggable();


  $( "#droppable" ).droppable({
    drop: function( event, ui ) {
      ui.draggable;

ui.draggable.css({
          "display":"none"
        });


    }
  });




} );
