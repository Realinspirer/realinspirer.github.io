class Image_with_viewport{
  img_url:string;
  width:number;
  constructor(img_url:string, width:number){
      this.img_url = img_url;
      this.width = width;
  }
}



//navigation menu thing
$(Loaded);
let verticle_nav : HTMLElement;

function Loaded(){
  set_current_year();
  verticle_nav = $("#verticle_menu")[0];
  $(window).on("click", Hide_nav);
}
function open_close_nav() {
  let ham_icon = $("#ham_icon");
  ham_icon?.toggleClass("active");
  if(verticle_nav?.classList.contains("not_visible")){
    verticle_nav.className = "ver_vis";
  }
  else{
    if(verticle_nav){
        verticle_nav.className ="not_visible";
    }
  }
}

function set_current_year(){
  var copyright_thing = document.querySelector<HTMLSpanElement>(".copyright_thing_footer span")!;
  
  copyright_thing.innerText = `\n ©️ Realinspirer ${new Date().getFullYear()}, All rights reserved`;
}

function Hide_nav(element:any) {

    if(!verticle_nav?.contains(element.target) && !$("#nav_bar").has(element.target).length){
      if(!verticle_nav?.classList.contains("not_visible")){
        open_close_nav();
      }
  }
  
};
//navigation menu thing end