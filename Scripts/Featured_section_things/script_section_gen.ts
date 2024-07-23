class Image_with_viewport{
    img_url:string;
    width:number;
    constructor(img_url:string, width:number){
        this.img_url = img_url;
        this.width = width;
    }
}

class section_class{
    title: string;
    description: string;
    def_img: string;
    other_imgs: Array<Image_with_viewport>|null;
    click_url: string;
    window_argument: string;
    constructor(title:string, des:string,
        img:string, other_imgs:Array<Image_with_viewport>|null,
         cl_url:string, win_ar:string){

        this.title = title;
        this.description = des;
        this.def_img = img;
        this.other_imgs = other_imgs;
        this.click_url = cl_url;
        this.window_argument = win_ar;
    }
}

async function get_json_featured(loc:string, id:string) {
    // var window_argument:string = "_self";

    var response = await fetch(loc);
    var res_ar:Array<section_class> = await response.json();

    res_ar.forEach(res => {
        var items = 
    `<div class="game_feat" onclick="window.open('${res.click_url}', '${res.window_argument}')">
                <picture>`;
            if(res.other_imgs != null && res.other_imgs!.length >= 0){
                res.other_imgs.forEach(url => {
                    items += `<source srcset="${url.img_url}" media="(max-width: ${url.width}px)"/>`;
                });
            }
            items += `<img src=${res.def_img} alt="cover_img"/> </picture>`;

            items += `<div class="game_grad"></div>
                <h1 class="title">${res.title}
                    <span>${res.description}</span>
                </h1>
    </div>`
    $(`#${id}`).append(items);

    });
    document.querySelector(`#${id} .game_feat`)?.classList.add("game_active");
    
}