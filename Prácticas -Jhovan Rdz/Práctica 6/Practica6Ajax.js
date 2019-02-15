$(document).ready(function () {
  vaca();
});


var vaca= function () {
  $('#vaca').draggable();
  $('#establo').droppable({
    drop: function (event,ui) {
      $('.contenido').css("display","block");
    }
  })
}
