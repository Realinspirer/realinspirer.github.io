//navigation menu thing

function open_close_nav() {
  var verticle_nav = document.getElementById("verticle_nav");
  var ham_icon = document.getElementById("ham_icon");
  ham_icon.classList.toggle("active");
  if(verticle_nav.classList.contains("not_visible")){
    verticle_nav.className="ver_vis";
  }
  else{
    verticle_nav.className="not_visible";
  }
}

function Hide_nav() {
  if(!document.getElementById("verticle_nav").classList.contains("not_visible")){
    open_close_nav();
  }
  
};
//navigation menu thing end