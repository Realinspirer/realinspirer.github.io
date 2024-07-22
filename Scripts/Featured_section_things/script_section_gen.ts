class section_class{
    title: string;
    description: string;
    image_url: string;
    click_url: string;
    window_argument: string;
    constructor(title:string, des:string,
         img:string, sh_txt:string, cl_url:string, win_ar:string){
        this.title = title;
        this.description = des;
        this.image_url = img;
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
                <img src="${res.image_url}" alt="game_cover">
                <div class="game_grad"></div>
                <h1 class="title">${res.title}
                    <span>${res.description}</span>
                </h1>
    </div>`
    $(`#${id}`).append(items);

    });
    document.querySelector(`#${id} .game_feat`)?.classList.add("game_active");
    
}