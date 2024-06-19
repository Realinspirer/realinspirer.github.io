class discover_section{
    title: string;
    subtitle: string;
    image_url: string;
    click_url: string;
    constructor(title:string, des:string,
         img:string, sh_txt:string, cl_url:string){
        this.title = title;
        this.subtitle = des;
        this.image_url = img;
        this.click_url = cl_url;
    }
}

get_json_discover();
async function get_json_discover() {
    var window_argument_discover:string = "_self";
    var response = await fetch('/Scripts/Blur_section/Discover_section.json');
    var res_ar:Array<discover_section> = await response.json();

    res_ar.reverse().forEach(res => {
        var items = 
    `<div class="blur_section_item" onclick="window.open('${res.click_url}','${window_argument_discover}')">` +
        `<img src="${res.image_url}" alt="Item cover">`+
        `<p class="title_section">${res.title}</p>`+
        `<p class="subtitle_section">${res.subtitle}</p>`+
    `</div>`;

    $("#section_discover").prepend(items);

    });
    
}