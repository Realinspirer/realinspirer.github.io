(function() {
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
    let items:Array<scroller_elements_class> = [];

    all_covers.forEach((item) => {

        let root_parent = item.closest(".discover_item");
        root_parent?.insertAdjacentHTML("afterbegin",`<div class="pause_play_button"><img alt="Pause/Play" src="Images/Symbols/pause.png"></div>`);

        items.push( new scroller_elements_class(item.querySelector(".sc_btn.left"),
            item.querySelector(".sc_btn.right"),
            item.querySelector(".img_scroller"),
            item.querySelector(".main_img"),
            Array.from<HTMLImageElement>(item.querySelectorAll(".sc_img img")), 
            root_parent!.querySelector(".pause_play_button")
        ));
    });

    items.forEach((item) => {

        item.pause_play_btn!.addEventListener("click", function(){
            item.paused = !item.paused;
        });

        item.right_button!.addEventListener("click", 
            function() 
            { 
                item.click_next_item();
            });

        item.left_button!.addEventListener("click", 
            function() 
            { 
                item.click_prev_item();
            });

        item.images?.forEach(im => 
            im!.parentElement!.addEventListener("click", function() {
                item.current_selected_parent?.classList.toggle("active");

                item.current_selected_index = item.images!.indexOf(im);
                
                item.current_selected_parent!.classList.toggle("active");

                let main_img = item.main_img!;

                main_img.style.opacity = "0";
                
                if(item.current_anim!=null){
                    clearInterval(item.current_anim);
                }
                item.current_anim = setInterval(function(){
                    if(parseFloat(window.getComputedStyle(main_img).opacity) <= 0){
                        item.main_img!.src = im!.src;
                        main_img.style.opacity = "1";
                        clearInterval(item.current_anim!);
                    }
                }, 80);


            })

        );

        item.click_next_item();

        item.start_auto_interval();
    });


})();