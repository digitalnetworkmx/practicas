$( function() {
  $( "#draggable" ).draggable();
  $( "#draggable2" ).draggable();
  $( "#draggable3" ).draggable();
  $( "#draggable4" ).draggable();
  // $( "#draggable5" ).draggable();
  $( "#draggable6" ).draggable();

  $( "#droppable" ).droppable({
    drop: function( event, ui ) {
      $( this )
        .addClass("colorRosaD");
        $("#draggable").remove();
    }

  });

  $( "#droppable1" ).droppable({
    drop: function( event, ui ) {
      $( this )
        .addClass("colorCieloD");
        $("#draggable3").remove();
    }

  });

  $( "#droppable3" ).droppable({
    drop: function( event, ui ) {
      $( this )
        .addClass("colorVerdeD");
        $("#draggable2").remove();
    }

  });

  $( "#droppable4" ).droppable({
    drop: function( event, ui ) {
      $( this )
        .addClass("colorCafeD");
        $("#draggable4").remove();
    }

  });

  $( "#droppable5" ).droppable({
    drop: function( event, ui ) {
      $( this )
        .addClass("colorVerdeBajoD");
        $("#draggable6").remove();
    }

  });

} );
