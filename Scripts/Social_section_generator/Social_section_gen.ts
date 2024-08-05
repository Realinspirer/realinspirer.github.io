class normal_section_class_no_desc{
    title: string;
    subtitle: string;
    image_url: string;
    button_text: string;
    click_url: string;
    constructor(title:string, sub_title:string, des:string,
         img:string, btn_txt:string, cl_url:string){
        this.title = title;
        this.subtitle = sub_title;
        this.image_url = img;
        this.button_text = btn_txt;
        this.click_url = cl_url;
    }
}



async function get_json_social(json_loc:string, id_grid:string) {

    var response = await fetch(json_loc);
    var res_ar:Array<normal_section_class_no_desc> = await response.json();

    res_ar.reverse().forEach(res => {
        var items = 
    `<div class="social_section">` +
        `<img class="social_img" src="${res.image_url}" alt="social_img">` +
        `<div class="back_grad">` +
            `<div class="social_texts">` +
                `<p class="title">${res.title}</p>`+
                `<p class="subtitle">${res.subtitle}</p>`+
                `<a class="normal_button" href="${res.click_url}" target="_blank" rel="noopener">${res.button_text}</a>`+
            `</div>` +
        `</div>` +

    `</div>`

    $(`#${id_grid}`).prepend(items);

    });
    
}