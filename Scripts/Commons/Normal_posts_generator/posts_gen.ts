const posts_gen = (function(){

    let parent = document.querySelector("#posts")!;
    let query = new URLSearchParams(window.location.search);
    let req_title = query.get("title");
    let req_page = Number.parseInt(query.get("page") ?? "1");
    let req_tag = query.get("tag");

    let viewer_parent = document.querySelector("#viewer")!;
    let close_btn = viewer_parent.querySelector<HTMLButtonElement>(".close_btn")!;
    let main_img = viewer_parent.querySelector<HTMLImageElement>(".main_img")!;

    let viewer_co:number|null;
    close_btn.addEventListener("click", () => {
        if(viewer_co != null){
            clearInterval(viewer_co);
        }
        
        viewer_parent.classList.remove("visible");
        viewer_co = setTimeout(() => {
            viewer_parent.classList.add("hidden");
            document.documentElement.classList.remove("viewer_active");
            viewer_co = null;
        }, 300);
    });

    let query_met = false;

    let posts_per_page = 5;

    let previous_btn = document.querySelector<HTMLLinkElement>(".page_btn.previous")!;
    let next_btn = document.querySelector<HTMLLinkElement>(".page_btn.next")!;
    let home_btn = document.querySelector<HTMLLinkElement>(".page_btn.home")!;
    let page_text = document.querySelector(".page_indicator_text")!;

    async function generate(data_path:string, ...tag:Array<string>){

        var response = await fetch(data_path);
        var data_raw:Array<Data_class_multiple_imgs_btn> = await response.json();

        let data;
        if(req_tag != null && req_tag != ""){
            data = await post_tag_searcher.return_found_tagged_items_searched(data_raw, 0, [req_tag], ...tag);
            document.getElementById("clear_query")?.classList.remove("hidden");
        }
        else{
            data = await post_tag_searcher.return_found_tagged_items(data_raw, 0, ...tag);
        }

        //sorting
        data.sort( (x,y) => {

            let req_regex = new RegExp("th|rd|nd", "i")

            let first_date = (x.date ?? "").replace(req_regex, "");
            let second_date = (y.date ?? "").replace(req_regex, "");
            var first = Date.parse(first_date);
            var second = Date.parse(second_date);

            if(first < second){
                return 1;
            }
            else if(first > second){
                return -1;
            }
            else{
                return 0;
            }
            
        });

        //sorting end

        if(req_title != null){
            let req_index = data.findIndex(x => x.title == req_title);
            if(req_index != -1){
                var req_element = data.splice(req_index, 1)[0];
                data.splice(0, 0, req_element);

                document.getElementById("clear_query")?.classList.remove("hidden");
            }
            else{
                window.location.href = "/404.html";
            }
        }

        if(req_page <= 0){ req_page = 1; }
        let post_count = (req_page - 1) * posts_per_page;
        
        let total_pages = Math.ceil(data.length/posts_per_page);
        page_text.textContent = `Viewing page ${req_page} of ${total_pages}`;
        if(req_page <= 1){
            previous_btn.classList.add("disabled");
        }
        else{
            previous_btn.href = return_page_url(req_page - 1);
        }
        if(total_pages <= 1 || req_page >= total_pages){
            next_btn.classList.add("disabled");
        }
        else{
            next_btn.href = return_page_url(req_page + 1);
        }
        home_btn.href = return_page_url(0);

        for (let count = 0; count < posts_per_page; count++) 
        {
            if(post_count >= data.length && data.length != 0){
                if(count == 0){
                    window.location.href = ".";
                }
                return;
            }
            let post_data = data[post_count];

            let card =  document.createElement("div");
            card.classList.add("card", "fading_element_card");
            parent.appendChild(card);
            
            let post_img_sc = document.createElement("div");
            post_img_sc.classList.add("post_image_scroller");
            card.appendChild(post_img_sc);

            let left_btn = document.createElement("button");
            left_btn.classList.add("sc_button", "left", "mid");
            left_btn.type = "button";
            left_btn.title = "Scroll left"
            post_img_sc.appendChild(left_btn);

            let left_sym = document.createElement("img");
            left_sym.src = "/Images/Symbols/down.png";
            left_sym.alt = "";
            left_btn.appendChild(left_sym);

            let right_btn = document.createElement("button");
            right_btn.classList.add("sc_button", "right", "mid");
            right_btn.type = "button";
            right_btn.title = "Scroll right"
            post_img_sc.appendChild(right_btn);

            let right_sym = document.createElement("img");
            right_sym.src = "/Images/Symbols/down.png";
            right_sym.alt = "";
            right_btn.appendChild(right_sym);

            let images_post = document.createElement("div");
            images_post.classList.add("images_post", "no_scroll_bar");
            post_img_sc.appendChild(images_post);

            right_btn.addEventListener("click", () => images_post.scrollBy(window.outerHeight * 0.25, 0));
            left_btn.addEventListener("click", () => images_post.scrollBy(-window.outerHeight * 0.25, 0));

            if(post_data.imgs != null){
                post_data.imgs.forEach(img =>{
                    let post_img = document.createElement("div");
                    post_img.classList.add("post_img");

                    post_img.addEventListener("click", () => posts_viewer(img));

                    images_post.appendChild(post_img);

                    let im = document.createElement("img");
                    im.src = img;
                    im.alt = "";
                    post_img.appendChild(im);

                    let full_screen_prompt = document.createElement("div");
                    full_screen_prompt.classList.add("full_screen_prompt");
                    post_img.appendChild(full_screen_prompt);

                    let full_text = document.createElement("p");
                    full_text.classList.add("full_text");
                    full_text.textContent = "Click to Expand";
                    full_screen_prompt.appendChild(full_text);

                    let symbol = document.createElement("img");
                    symbol.classList.add("symbol");
                    symbol.src = "/Images/Symbols/Full_screen.png";
                    symbol.alt = "";
                    full_screen_prompt.appendChild(symbol);
                })

                post_count++;
            }



            let post_text = document.createElement("div");
            post_text.classList.add("post_text");
            card.appendChild(post_text);

            if(post_data.date != null){
                let date = document.createElement("p");
                date.classList.add("date");
                date.textContent = post_data.date;
                post_text.appendChild(date);
            }

            let title = document.createElement("h2");
            title.classList.add("title");
            title.textContent = post_data.title;
            post_text.appendChild(title);

            let hash_anchor = document.createElement("button");
            hash_anchor.classList.add("hash_anchor");
            hash_anchor.type = "button";
            hash_anchor.textContent = "#";
            hash_anchor.title = "Copy link to this post";
            hash_anchor.addEventListener("click", () => copy_post_url(post_data.title))
            title.appendChild(hash_anchor);

            let desc = document.createElement("p");
            desc.classList.add("desc");
            desc.textContent = post_data.subtitle ?? "";
            post_text.appendChild(desc);

            let tags = document.createElement("p");
            tags.classList.add("tags");
            tags.textContent = "Tags: "
            post_text.appendChild(tags);
            
            post_data.tags?.split(",").forEach(tag => {
                if(tag.length > 0){
                    let ele = document.createElement("a");
                    ele.textContent = "#" + tag.trim();
                    let tag_to_search = tag;
                    ele.href = return_tag_url(tag_to_search);
                    tags.appendChild(ele);
                }
            });
            
            let btn_holder = document.createElement("div");
            btn_holder.classList.add("btn_holder");
            post_text.appendChild(btn_holder);

            if(post_data.btns != null){
                        
                post_data.btns.forEach(btn => {
                    
                    
                    let bt = document.createElement("a");
                    bt.classList.add("normal_button", "main_btn");
                    bt.textContent = btn.btn_string ?? "";

                    if(btn.custom_data == "other"){
                        bt.classList.add("other_btn");   
                    }
                    else{

                        if(btn.custom_data != "no_icon"){
                            bt.classList.add("with_icon");
                            
                            let external_symbol = document.createElement("img");
                            external_symbol.classList.add("external_symbol");
                            external_symbol.alt = "";

                            if(btn.external){
                                external_symbol.src = "/Images/Symbols/external.png";
                            }
                            else{
                                external_symbol.src = "/Images/Symbols/arrow_dark.png";
                            }

                            bt.appendChild(external_symbol);
                        }
                    }
                    if(btn.click_url != null){
                        bt.href = btn.click_url;
                        if(btn.external){
                            bt.target = "_blank";
                            bt.rel = "noopener";
                        }
                    }

                    btn_holder.appendChild(bt);
                });
            }
            let share_btn = document.createElement("button");
            share_btn.classList.add("normal_button", "main_btn", "other_btn", "with_icon", "shared");
            share_btn.textContent = "Copy Post URL"

            let external_symbol = document.createElement("img");
            external_symbol.classList.add("external_symbol");
            external_symbol.alt = "";
            external_symbol.src = "/Images/Symbols/share.png";

            share_btn.appendChild(external_symbol);


            let fader_anim:number|null = null;
            share_btn.addEventListener("click", () => {

                copy_post_url(post_data.title)

                if(fader_anim != null){
                    clearInterval(fader_anim);
                }
                share_btn.classList.add("active");

                fader_anim = setTimeout(() => {
                    fader_anim = null;
                    share_btn.classList.remove("active");
                }, 2000);
            });
            
            btn_holder.appendChild(share_btn);


            if(post_data.title == req_title && !query_met){
                query_met = true;
                var more_header = document.createElement("h2");
                more_header.classList.add("Middle_section_text", "more_header", "small", "fading_element_card");
                more_header.textContent = "Check out more"

                parent.appendChild(more_header);

                card.scrollIntoView({block:"center",inline:"center"});
            }
            if(req_tag != null && req_tag != null && count == 0){
                card.scrollIntoView({block:"center", inline:"center"})
            }


            let checker = setInterval(() => {
                check_sc_btns(images_post, checker, right_btn, left_btn);
            }, 700);

        };
    }
    
    function check_sc_btns(sc_ele:HTMLElement, checker:number, ...to_hide_elements:HTMLElement[]){
        if(sc_ele.offsetWidth < sc_ele.scrollWidth){
            to_hide_elements.forEach(x => x.classList.remove("hidden"));
            clearInterval(checker);
        }
        else{
            to_hide_elements.forEach(x => x.classList.add("hidden"));
        }
    }

    function copy_post_url(title:string){
        let search_params = new URLSearchParams();
        
        search_params.append("title", title);
        
        let req_url = window.location.protocol + '//' + window.location.host + window.location.pathname + "?" + search_params;

        navigator.clipboard.writeText(req_url)
    }
    function return_page_url(page_num:number):string{
        let search_params = new URLSearchParams();
        
        if(page_num != 0){
            search_params.append("page", page_num.toString());
        }
        if(req_tag != null && req_tag != ""){
            search_params.append("tag", req_tag);
        }
        let req_url;
        if(search_params != null && search_params.size != 0){
            req_url = window.location.protocol + '//' + window.location.host + window.location.pathname + "?" + search_params;
        }
        else{
            req_url = window.location.protocol + '//' + window.location.host + window.location.pathname;
        }
        return req_url;
    }
    function return_tag_url(tag:string):string{
        let search_params = new URLSearchParams();
        
        search_params.append("tag", tag);
        
        let req_url = window.location.protocol + '//' + window.location.host + window.location.pathname + "?" + search_params;
        return req_url;
    }

    function posts_viewer(img_url:string){
        main_img.src = img_url;

        viewer_parent.classList.remove("hidden");

        setTimeout(() => {
            viewer_parent.classList.add("visible");
        });
        document.documentElement.classList.add("viewer_active");
    }

    return{
        generate:generate
    }
    
})();


// const posts_viewer = (function(){
    
    
//     let viewer_co:number|null;
//     close_btn.addEventListener("click", () => {
//         if(viewer_co != null){
//             clearInterval(viewer_co);
//         }
        
//         viewer_parent.classList.remove("visible");
//         viewer_co = setTimeout(() => {
//             viewer_parent.classList.add("hidden");
//             document.documentElement.classList.remove("viewer_active");
//             viewer_co = null;
//         }, 300);
//     });

//     return function show_img(img_url:string){
//         main_img.src = img_url;

//         viewer_parent.classList.remove("hidden");

//         setTimeout(() => {
//             viewer_parent.classList.add("visible");
//         });
//         document.documentElement.classList.add("viewer_active");
//     }
// })();