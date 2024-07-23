// const img_scroller_child_added_event
const Populate_image_scroller = (function(){
    let added_event = new Event("Added_children");

    return async function(json_path:string, id:string){

    var response = await fetch(json_path);
    var res_ar:Array<string> = await response.json();

    var parent_to_add = document.querySelector(`#${id}`);

    res_ar.forEach(res => {
        let to_add = `<div class="sc_img">
                                <img src="${res}" alt="design_item">
                            </div>`;
        parent_to_add?.insertAdjacentHTML("beforeend", to_add);
    });

    parent_to_add?.dispatchEvent(added_event);
    
    }}

)();