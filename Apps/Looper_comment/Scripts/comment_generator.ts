(function(){
   let initial_comment_text:HTMLTextAreaElement = document.getElementById("initial_comment")! as HTMLTextAreaElement;  
    let replace_word_input:HTMLInputElement = document.getElementById("replace_word_input") as HTMLInputElement;
    let decoration_text:HTMLInputElement = document.getElementById("decoration_input") as HTMLInputElement;
    let repeating_amount:HTMLInputElement = document.getElementById("repeating_amount") as HTMLInputElement;

    let gen_btn:HTMLButtonElement = document.getElementById("generate_btn") as HTMLButtonElement;
    let copy_btn:HTMLButtonElement = document.getElementById("copy_btn") as HTMLButtonElement;
    let result_text:HTMLTextAreaElement = document.getElementById("result_text") as HTMLTextAreaElement;

    let prompt:HTMLElement = document.querySelector<HTMLElement>(".prompt")!;
    let msg:HTMLElement = prompt.querySelector<HTMLElement>("#msg")!;


    gen_btn.addEventListener("click", generate);
    copy_btn.addEventListener("click", () =>{
        navigator.clipboard.writeText(result_text.value);
        show_msg("Comment copied!", "info");
    });

    let prompt_hider:number;

    function show_msg(info:string, classes_to_add:string|null = null){
        clearInterval(prompt_hider);
        
        msg.textContent = info;

        prompt.className = `prompt visible ${classes_to_add}`;

        prompt_hider = setInterval(()=>{
            prompt.classList.remove("visible");
        }, 3000);
    }

    function generate(){
        let initial_comment:string = initial_comment_text.value;

        let repeating_am:number = 0;
        let repeating_pos:number = initial_comment.toLowerCase().indexOf(replace_word_input.value.toLowerCase());
        if(repeating_pos < 0){
            show_msg(`Cannot find \"${replace_word_input.value}\" in the initial comment!`)
            return;
        }
        try{
            repeating_am = parseInt(repeating_amount.value);
        }
        catch{
            show_msg("Cannot convert to integer!");
            return;
        }

        let final_comment:string = initial_comment;
        let middle_comment:string = initial_comment;
        for(let x = 0; x < repeating_am; x++){
            // final_comment+= initial_comment.substring(0, repeating_pos) + decoration_text.value + initial_comment 
            // + decoration_text.value 
            // + initial_comment.substring(repeating_pos + (replace_word_input.value.length));

            final_comment = initial_comment.substring(0, repeating_pos) + 
            decoration_text.value + middle_comment +  decoration_text.value + 
            initial_comment.substring(repeating_pos + replace_word_input.value.length);

            middle_comment = final_comment;
            
        }
        result_text.value = final_comment;
    }
})();