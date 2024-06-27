class normal_section_class{
    title: string;
    subtitle: string;
    description: string;
    image_url: string;
    button_text: string;
    click_url: string;
    constructor(title:string, sub_title:string, des:string,
         img:string, btn_txt:string, cl_url:string){
        this.title = title;
        this.subtitle = sub_title;
        this.description = des;
        this.image_url = img;
        this.button_text = btn_txt;
        this.click_url = cl_url;
    }
}



async function get_json_normal(json_loc:string, id_grid:string, window_argument:string="") {

    var response = await fetch(json_loc);
    var res_ar:Array<normal_section_class> = await response.json();

    res_ar.reverse().forEach(res => {
        var items = 
    `<div class=\"item_normal\">` +
        `<img src="${res.image_url}" alt="icon">` +
        `<div class="items_text">` +
            `<p class="item_normal_title">${res.title}</p>`+
            `<p class="item_normal_subtitle">${res.subtitle}</p>`+
            `<p class="item_normal_desc">${res.description}</p>`+
            `<a class="normal_button" onclick="window.open('${res.click_url}','${window_argument}')">${res.button_text}</a>`+
        `</div>` +
    `</div>`

    $(`#${id_grid}`).prepend(items);

    });
    
}