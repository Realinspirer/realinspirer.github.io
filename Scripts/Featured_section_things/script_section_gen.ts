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

    var parent_ele = document.getElementById(id)!;
    res_ar.forEach(res => {

        var game_feat = document.createElement("div");
        game_feat.classList.add("game_feat");
        game_feat.addEventListener("click", () => window.open(`${res.click_url}`, `${res.window_argument}`));

        var picture = document.createElement("picture");
        game_feat.appendChild(picture);
        if(res.other_imgs != null && res.other_imgs!.length >= 0){
        
            res.other_imgs.forEach(url => {
                var img_src = document.createElement("source");
                img_src.srcset = url.img_url;
                img_src.media = `(max-width:${url.width}px)`;
                picture.appendChild(img_src);
            })
        }

        var img = document.createElement("img");
        img.src = res.def_img;
        img.alt = "cover_img";
        picture.appendChild(img);

        var game_grad = document.createElement("div");
        game_grad.classList.add("game_grad");
        game_feat.appendChild(game_grad);

        var title = document.createElement('h1');
        title.classList.add("title");
        title.textContent = res.title;
        game_feat.appendChild(title);

        var sub = document.createElement("span");
        sub.textContent = res.description;
        title.appendChild(sub);

        parent_ele.appendChild(game_feat);
    });
    document.querySelector(`#${id} .game_feat`)?.classList.add("game_active");
    
}