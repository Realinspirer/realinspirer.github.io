(function(){ let index = 0;

let scroller = document.getElementById('scroll_hor')!;

scroller.scrollTo(0, 0);
function scroll_left(){
    // scroller!.scrollBy({ left: -500, behavior: "smooth"})

    // for (const child of scroller!.children) {
    //     index++;
    //     child.classList.toggle("game_active");
    // }
    index--;
    // scroller!.children[index].scrollIntoView({ behavior:"smooth"});

    if(index < 0){
        index = 0;
        scroll_right();
        return;
    }
    
    let cu_child = scroller!.children[index] as HTMLElement;
    let prev_child = scroller!.children[index + 1] as HTMLElement;

    Scroll_common(cu_child, prev_child);
    // scroller!.children[index].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' })
}
function scroll_right(){
    index++;

    if(index >= scroller!.children.length){
        index -= 1;
        scroll_left();
        return;
    }

    let cu_child = scroller!.children[index] as HTMLElement;
    let prev_child = scroller!.children[index - 1] as HTMLElement;

    Scroll_common(cu_child, prev_child);

    // cu_child.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
}

function Scroll_common(current_child:HTMLElement, previous_child:HTMLElement){
    current_child.classList.toggle("game_active");
    previous_child.classList.toggle("game_active");

    let gap = parseFloat(window.getComputedStyle(scroller!, null).getPropertyValue("gap"));

    var to_calc = 0.5 * (scroller.clientWidth - current_child.clientWidth - (2 * gap));
    scroller!.scrollTo({ left: (current_child.offsetLeft - gap) - to_calc, behavior:"smooth"});

    check_both_scroller();

    timer = 0;
    set_timer_style();
}

function set_timer_style(){
    timer_circle!.style.backgroundImage = `conic-gradient(transparent ${(timer/threshold) * 100}%, 0, var(--controls_color))`;
}


// scroller buttons

let left_btn = document.getElementById("left_scroller");
let right_btn = document.getElementById("right_scroller");

let scroller_child_len = scroller.children.length;

check_both_scroller();
function check_both_scroller(){
    if(index == 0){
        left_btn!.classList.add('rotate');
    }
    else{
        left_btn!.classList.remove('rotate');
    }

    if(scroller != null){
        if(index == scroller_child_len - 1){
            right_btn!.classList.add('rotate');
        }
        else{
            right_btn!.classList.remove('rotate');
        }
    }
    
}

//scroller buttons end

let timer = 0;
let threshold = 10;
let threshold_s = 5;
let threshold_e = 15;

let timer_circle = document.getElementById("timer_circle");

let user_paused = false;
let hover_paused = false;

timer_scroll();
function timer_scroll(){
        if(timer >= threshold){
            if(index < scroller!.children.length - 1){
                scroll_right();
            }
            else{
                let prev_child = scroller!.children[index] as HTMLElement;
                index = 0;
                let cu_child = scroller!.children[index] as HTMLElement;
                
                Scroll_common(cu_child, prev_child);
            }
            timer = 0;
            threshold = Math.floor(Math.random() * (threshold_e - threshold_s + 1) + threshold_s);
        }
        // console.log(document.documentElement.dataset.timer);

        if(!hover_paused && !user_paused){
            timer += 80/1000;
            set_timer_style();
        }
        setTimeout(timer_scroll, 80);
}

left_btn!.addEventListener!('mouseover', () => hover_paused=true);
left_btn!.addEventListener!('mouseout', () => hover_paused = false);
left_btn!.addEventListener('click', scroll_left);

right_btn!.addEventListener!('mouseover', () => hover_paused=true);
right_btn!.addEventListener!('mouseout', () => hover_paused = false);
right_btn!.addEventListener('click', scroll_right);



let sc_button = document.getElementById("sc_button")!;
let sc_button_img = sc_button.querySelector("img")!;
sc_button.addEventListener("click", scroll_button_click_handler);

function scroll_button_click_handler(){
    user_paused = !user_paused;

    if(user_paused){
        sc_button_img.src = "/Images/Symbols/play.png";
    }
    else{
        sc_button_img.src = "/Images/Symbols/pause.png";
    }
}


scroller.addEventListener('touchstart', handleTouchStart, false);        
scroller.addEventListener('touchmove', handleTouchMove, false);

let xDown:any = null;
let yDown:any = null;

function getTouches(evt:any) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}                                                     
                                                                         
function handleTouchStart(evt:any) {
    const firstTouch = getTouches(evt)[0];                                      
    xDown = firstTouch.clientX;                                      
    yDown = firstTouch.clientY;                                      
};                                                
                                                                         
function handleTouchMove(evt:any) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;                                    
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
                                                                         
    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {
        
        if ( xDiff > 0 ) {
            if(index < scroller_child_len - 1){
                scroll_right();
            }
        } else {
            if(index > 0){
                scroll_left();
            }
        }                       
    }
    /* reset values */
    xDown = null;
    yDown = null;                                             
};

})();