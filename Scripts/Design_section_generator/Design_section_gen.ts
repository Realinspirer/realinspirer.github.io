class just_title_subtitle_image{
    title: string;
    subtitle: string;
    image_url: string;
    constructor(title:string, sub_title:string, des:string,
         img:string, btn_txt:string, cl_url:string){
        this.title = title;
        this.subtitle = sub_title;
        this.image_url = img;
    }
}


get_json_design("\\Scripts\\Design_section_generator\\Design_section_gen.json", "Designs_section" );
async function get_json_design(json_loc:string, id_grid:string, window_argument:string="") {

    var response = await fetch(json_loc);
    var res_ar:Array<just_title_subtitle_image> = await response.json();

    res_ar.reverse().forEach(res => {
        var items = 
    `<div class="design_item">` +
        `<div class="design_text">` +
            `<p class="design_title">` +
                `${res.title}`+
                `<span>${res.subtitle}<span>`+
            `</p>`+
        `</div>`+
        `<img src="${res.image_url}" alt="design_item">` +
    `</div>`

    $(`#${id_grid}`).prepend(items);

    });
    
}