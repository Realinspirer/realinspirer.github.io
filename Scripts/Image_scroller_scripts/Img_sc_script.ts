const Scroller_const = (function() {
    class scroller_elements_class{
        left_button:HTMLElement|null;
        right_button:HTMLElement|null;

        scroller:HTMLElement|null;

        main_img:HTMLImageElement|null;
        images:Array<HTMLImageElement|null>|null;

        pause_play_btn:HTMLElement|null;

        // current_selected_index:number|null;
        #curr_sel:number|null;

        get current_selected_index():number|null{
            return this.#curr_sel;
        }
        set current_selected_index(val){
            this.#curr_sel = val;
            this.#timer = 0;
        }

        #paused_ = false;
        #pause_play_img_element:HTMLImageElement|null|undefined = null;
        
        get paused():boolean{
            return this.#paused_;
        }
        set paused(val:boolean){
            this.#paused_ = val;

            if(this.#pause_play_img_element == null){
                this.#pause_play_img_element = this.pause_play_btn?.querySelector("img");
            }
            this.#pause_play_img_element!.src = this.#paused_ ? "/Images/Symbols/play.png" : "Images/Symbols/pause.png";

            this.#timer = 0;
        }

        current_anim:number|null;


        constructor(left_button:HTMLElement|null, right_button:HTMLElement|null,
             scroller:HTMLElement|null, main_img:HTMLImageElement|null, 
             images:Array<HTMLImageElement|null>|null, pause_play_btn:HTMLElement|null){

            this.left_button = left_button;
            this.right_button = right_button;
            this.scroller = scroller;
            this.main_img = main_img;
            this.images = images;

            this.#curr_sel = null;
            this.current_anim = null;

            this.pause_play_btn = pause_play_btn;
        }
        get current_selected_parent(){
            if(this.current_selected_index == null || this.images == null || this.images.length == 0 ){
                return null;
            }
            else{
                return this.images[this.current_selected_index]?.parentElement;
            }
        }
        get_next_item(){
            if(this.images == null || this.images.length == 0){
                return null;
            }
            if(this.current_selected_index == null || this.current_selected_index >= this.images.length - 1){
                return this.images[0];
            }
            return this.images[this.current_selected_index + 1];
        }
        get_prev_item(){
            if(this.images == null || this.images.length == 0){
                return null;
            }
            if(this.current_selected_index == null){
                return this.images[0];
            }
            if(this.current_selected_index <= 0){
                return this.images[this.images.length - 1];
            }
            return this.images[this.current_selected_index - 1];
        }

        click_next_item(){
            this.get_next_item()?.click();
            this.scroll_scroller_to_middle();
        }
        click_prev_item(){
            this.get_prev_item()?.click();
            this.scroll_scroller_to_middle()
        }

        scroll_scroller_to_middle(){
            let scroller = this.scroller!;
            let current_child = this.current_selected_parent!;
            let gap = parseFloat(window.getComputedStyle(scroller!, null).getPropertyValue("gap"));
            var to_calc = 0.5 * (scroller.clientWidth - current_child.clientWidth - (2 * gap));
            scroller!.scrollTo({ left: (current_child.offsetLeft - gap) - to_calc});
        }


        #timer_:number = 0;
        get #timer(){
            return this.#timer_;
        }
        set #timer(val){
            this.#timer_ = val;
            this.scroller?.style.setProperty('--timer_val', (((this.#timer_/this.#threshold) * 100) + '%').toString());
        }
        #threshold = 10;
        
        start_auto_interval(){

            if(!this.paused){
                this.#timer += 500/1000;
            }
            
            if(this.#timer >= this.#threshold){
                this.click_next_item();
            }

            setTimeout(() => this.start_auto_interval(), 500);
        }
    }

    let all_covers = document.querySelectorAll(".cover_img_sec");
    // let items:Array<scroller_elements_class> = [];

    function add_to_items(cover_img_sec_element:Element){

        let cur_scroller = cover_img_sec_element.querySelector<HTMLElement>(".img_scroller")!;

        console.log(`Child count: ${cur_scroller.children.length}`);
        if(cur_scroller.children != null && cur_scroller.children.length > 0){

            let root_parent = cover_img_sec_element.closest(".discover_item");
            root_parent?.insertAdjacentHTML("afterbegin",`<div class="pause_play_button"><img alt="Pause/Play" src="Images/Symbols/pause.png"></div>`);

            let created_item = new scroller_elements_class(cover_img_sec_element.querySelector(".sc_btn.left"),
                cover_img_sec_element.querySelector(".sc_btn.right"),
                cur_scroller,
                cover_img_sec_element.querySelector(".main_img"),
                Array.from<HTMLImageElement>(cover_img_sec_element.querySelectorAll<HTMLImageElement>(".img_scroller .sc_img img")), 
                root_parent!.querySelector(".pause_play_button")
            );

            created_item.pause_play_btn!.addEventListener("click", function(){
                created_item.paused = !created_item.paused;
            });
    
            created_item.right_button!.addEventListener("click", 
                function() 
                { 
                    created_item.click_next_item();
                });
    
            created_item.left_button!.addEventListener("click", 
                function() 
                { 
                    created_item.click_prev_item();
                });

            let main_img = created_item.main_img!;
            let pic_ele = document.createElement("picture");
            main_img.parentElement!.replaceChild(pic_ele, created_item.main_img!);
            pic_ele.appendChild(main_img);
    
            created_item.images?.forEach(im => {
                
                im!.parentElement!.addEventListener("click", function() {
                    created_item.current_selected_parent?.classList.toggle("active");
    
                    created_item.current_selected_index = created_item.images!.indexOf(im);
                    
                    created_item.current_selected_parent!.classList.toggle("active");

                    main_img.style.opacity = "0";

                    
                    if(created_item.current_anim!=null){
                        clearInterval(created_item.current_anim);
                    }
                    created_item.current_anim = setInterval(function(){
                        if(parseFloat(window.getComputedStyle(main_img).opacity) <= 0){
                            main_img.style.opacity = "1";
                            main_img.style.cssText = im!.dataset.custom_style!;


                            let pa_img = main_img.parentElement!;
                            let prev_sources = pa_img.querySelectorAll("source");
                            if(prev_sources.length > 0){
                                prev_sources.forEach( ch=>
                                    ch.remove()
                                );
                            }

                            let req_imgs = im!.dataset.other_imgs;
                            if(req_imgs != null){
                                let srcs_to_add:string="";
                                let req_array = req_imgs.split(";");
                                
                                req_array.forEach(ele =>{
                                    let computed_size = ele.split(":");
                                    if(computed_size.length == 2){
                                        srcs_to_add += `<source srcset="${computed_size[1]}" media="(max-width: ${computed_size[0]}px)"/>`;
                                    }
                                });
                                main_img.insertAdjacentHTML("beforebegin", srcs_to_add);                                
                            }

                            created_item.main_img!.src = im!.src;
                            clearInterval(created_item.current_anim!);
                        }
                    }, 100);
    
    
                })
            }
    
            );
    
            created_item.click_next_item();
    
            created_item.start_auto_interval();
        }
        else{
            console.warn("Image scroller did not contain any children, added listner!");
            cur_scroller.addEventListener("Added_children", () => add_to_items(cover_img_sec_element));
        }

    }


    all_covers.forEach((item) => {
        add_to_items(item);

    });

    return {
        add_scroller_item(cover_img_sec_element:HTMLElement){
            add_to_items(cover_img_sec_element);
        }
    }


})();