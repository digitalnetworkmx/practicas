$(document).ready(function(){
  // $("div .imagen").children().css({"border": "3px solid "});
  console.log("ready!");
});

var con=0;
$(document).on("click", "#im1", function() {
  if(con==0){
    $("div .imagen").children().css({"border": "5px purple solid "});
    con+=1;
  }else if (con==1){
    $("div .imagen").children().css({"border": "none "});
    con-=1;
  }

});

$(document).on("click","#find", function(){
  if(con==0){
    $(".divs").find(".con2").css({"border": "5px red solid "});
    con+=1;
  }else if(con==1){
    $(".divs").find(".con2").css({"border": "none"});
    con-=1;

  }
});

$(document).on("click", "#paren", function() {
  if(con==0){
    $("div #paren").parent().css({"border": "5px solid "});
    con+=1;
  }else if (con==1){
    $("div #paren").parent().css({"border": "none"});
    con-=1;
  }

});

$(document).on("click", "#im2", function() {
  if(con==0){
    $("div .imagen").parents().css({"border": "5px solid "});
    con+=1;
  }else if (con==1){
    $("div .imagen").parents().css({"border": "none"});
    con-=1;
  }

});

$(document).on("click", "#cols", function(){
  if(con==0){
      $("#cols").closest("div .contClos2").css({"color": "red", "border": "2px solid red"});
    con+=1;
  }else if (con==1){
    $("#cols").closest("div .contClos2").css({"color": "red", "border": "none"});
    con-=1;
  }

});

$(document).on("click", "#sibl", function(){
  if(con==0){
     $("div .sib2").siblings().css({"color": "red", "border": "2px solid red"});
    con+=1;
  }else if (con==1){
     $("div .sib2").siblings().css({"color": "red", "border": "none"});
    con-=1;
  }

});

$(document).ready(function(){
  console.log("ready!");
});


$(document).on("click","#boton", function(){
  $(".apeend").append(" Mundo ");
});

$(document).on("click","#boton2", function(){
  $(".prendd").prepend("Hola ");
});

$(document).on("click","#boton3", function(){
  $(".htmml").html("This is HTML xdxd");
});

$(document).on("click", "#boton4", function(){
  $(".textt").text("Mundooo xd");
})
