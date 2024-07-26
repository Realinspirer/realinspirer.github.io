// const img_scroller_child_added_event
const Populate_image_scroller = (function(){
    let added_event = new Event("Added_children");

    class img_scroller_class{
        img_path:string;
        custom_style:string;
        other_imgs:string;

        constructor(img_path:string,
        custom_style:string,
        other_imgs:string){
            this.img_path = img_path;
            this.custom_style = custom_style;
            this.other_imgs = other_imgs;
        }
    }
    
    return async function(json_path:string, id:string){

    var response = await fetch(json_path);
    var res_ar:Array<img_scroller_class> = await response.json();

    var parent_to_add = document.querySelector(`#${id}`);

    
    res_ar.forEach(res => {

        let cu_style = `style="${res.custom_style}"`;
        let ot_imgs = `data-other_imgs="${res.other_imgs}"`;
        if(res.custom_style == null){
            cu_style = "";
        }
        if(res.other_imgs == null){
            ot_imgs = "";
        }
        // let back_thing;
        // if(cu_style.includes("url")){
        //     if
        // }
        let to_add = `<div class="sc_img">`+
                                `<img src="${res.img_path}" ${cu_style} ${ot_imgs} alt="design_item">` +
                     `</div>`;
        parent_to_add?.insertAdjacentHTML("beforeend", to_add);
    });

    parent_to_add?.dispatchEvent(added_event);
    
    }}

)();