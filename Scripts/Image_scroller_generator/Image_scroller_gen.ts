// const img_scroller_child_added_event
const Populate_image_scroller = (function(){
    let added_event = new Event("Added_children");

    class img_scroller_class{
        img_path:string;
        custom_style:string;
        other_imgs:string|null;
        click_url:string|null;
        window_argument:string|null;

        constructor(img_path:string,
        custom_style:string, other_imgs:string|null,
         click_url:string|null, window_argument:string|null){
            this.img_path = img_path;
            this.custom_style = custom_style;
            this.other_imgs = other_imgs;
            this.click_url = click_url;
            this.window_argument = window_argument;
        }
    }
    
    return async function(json_path:string, id:string, count:number=8){

    var response = await fetch(json_path);
    var res_ar_b:Array<img_scroller_class> = await response.json();
    let res_ar = res_ar_b.slice(0, count);

    var parent_to_add = document.querySelector(`#${id}`);

    
    res_ar.forEach(res => {

        let cu_style = `style="${res.custom_style}"`;
        let ot_imgs = `data-other_imgs="${res.other_imgs}"`;

        let win_arg = ""
        let click_url = ""
        if(res.custom_style == null){
            cu_style = "";
        }
        if(res.other_imgs == null){
            ot_imgs = "";
        }
        if(res.click_url != null && res.click_url != ""){
            click_url = `data-click_url="${res.click_url}"`;
            if(res.window_argument != null && res.window_argument != ""){
                win_arg = `data-window_argument="${res.window_argument}"`;
            }
        }
        // let back_thing;
        // if(cu_style.includes("url")){
        //     if
        // }
        let to_add = `<div class="sc_img">`+
                                `<img src="${res.img_path}" ${cu_style} ${ot_imgs} ${click_url} ${win_arg} alt="design_item">` +
                     `</div>`;
        parent_to_add?.insertAdjacentHTML("beforeend", to_add);
    });

    parent_to_add?.dispatchEvent(added_event);
    
    }}

)();