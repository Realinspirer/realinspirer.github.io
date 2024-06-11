class section_class{
    title: string;
    description: string;
    image_url: string;
    shadow_text: string;
    click_url: string;
    constructor(title:string, des:string,
         img:string, sh_txt:string, cl_url:string){
        this.title = title;
        this.description = des;
        this.image_url = img;
        this.shadow_text = sh_txt;
        this.click_url = cl_url;
    }
}
var window_argument:string = "";

get_json();
async function get_json() {
    var response = await fetch('/Scripts/Featured_section_things/Section_thing.json');
    var res_ar:Array<section_class> = await response.json();

    res_ar.reverse().forEach(res => {
        var items = 
    `<div class=\"grid_item\" onclick="window.open('${res.click_url}','${window_argument}')">` +
        `<p>${res.title}` +
            `<span><br>${res.description}</span>`+
        `</p>`+
        `<img src="${res.image_url}" alt="game_cover">`+
        `<div class="item_shadow">`+
            `<p>${res.shadow_text}</p>`+
        `</div>` +
    `</div>`

    $("#featured_section").prepend(items);

    });
    
}