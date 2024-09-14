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



async function get_json_normal(json_loc:string, id_grid:string, window_argument:string="_self") {

    var response = await fetch(json_loc);
    var res_ar:Array<normal_section_class> = await response.json();

    res_ar.reverse().forEach(res => {
        var items = create_string(res);

    $(`#${id_grid}`).prepend(items);

    });
    
}
function create_string(res:normal_section_class){

    return `<div class=\"item_normal\">` +
        `<img src="${res.image_url}" alt="icon">` +
        `<div class="items_text">` +
            `<p class="item_normal_title">${res.title}</p>`+
            `<p class="item_normal_subtitle">${res.subtitle}</p>`+
            `<p class="item_normal_desc">${res.description}</p>`+
            `<a class="normal_button") href="${res.click_url}">${res.button_text}</a>`+
        `</div>` +
    `</div>`;
}

async function get_json_normal_count(json_loc:string, id_grid:string, count:number) {

    var response = await fetch(json_loc);
    var res_ar:Array<normal_section_class> = await response.json();

    res_ar.slice(0, count).reverse().forEach(res => {
        var items = create_string(res);

    $(`#${id_grid}`).prepend(items);

    });
    
}

async function get_json_normal_random(json_loc:string, id_grid:string, count:number, excluded:string|null=null) 
{
    var response = await fetch(json_loc);
    var res_ar:Array<normal_section_class> = await response.json();
    var res_rand:Array<normal_section_class> = new Array<normal_section_class>();

    if(excluded != null){
        let found_item = res_ar.findIndex(x => x.title == excluded);
        res_ar.splice(found_item, 1);
    }

    for (let index = 0; index < count; index++) {
        var rand_index = Math.floor(Math.random()*res_ar.length);
        var item = res_ar[rand_index];
        res_ar.splice(rand_index, 1);
        res_rand.push(item);
    }

    res_rand.reverse().forEach(res => {
        var items = create_string(res);
        $(`#${id_grid}`).prepend(items);
        
    });
}