class section_class{
    title: string;
    description: string;
    image_url: string;
    shadow_text: string;
    click_url: string;
    window_argument: string;
    constructor(title:string, des:string,
         img:string, sh_txt:string, cl_url:string, win_ar:string){
        this.title = title;
        this.description = des;
        this.image_url = img;
        this.shadow_text = sh_txt;
        this.click_url = cl_url;
        this.window_argument = win_ar;
    }
}

async function get_json_featured() {
    // var window_argument:string = "_self";

    var response = await fetch('/Scripts/Featured_section_things/Section_thing.json');
    var res_ar:Array<section_class> = await response.json();

    res_ar.reverse().forEach(res => {
        var items = 
    `<div class=\"grid_item\" onclick="window.open('${res.click_url}','${res.window_argument}')">` +
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