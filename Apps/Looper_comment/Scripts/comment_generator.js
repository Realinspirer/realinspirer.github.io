"use strict";
(function () {
    let initial_comment_text = document.getElementById("initial_comment");
    let replace_word_input = document.getElementById("replace_word_input");
    let decoration_text = document.getElementById("decoration_input");
    let repeating_amount = document.getElementById("repeating_amount");
    let gen_btn = document.getElementById("generate_btn");
    let copy_btn = document.getElementById("copy_btn");
    let result_text = document.getElementById("result_text");
    let prompt = document.querySelector(".prompt");
    let msg = prompt.querySelector("#msg");
    gen_btn.addEventListener("click", generate);
    copy_btn.addEventListener("click", () => {
        navigator.clipboard.writeText(result_text.value);
        show_msg("Comment copied!", "info");
    });
    let prompt_hider;
    function show_msg(info, classes_to_add = null) {
        clearInterval(prompt_hider);
        msg.textContent = info;
        prompt.className = `prompt visible ${classes_to_add}`;
        prompt_hider = setInterval(() => {
            prompt.classList.remove("visible");
        }, 3000);
    }
    function generate() {
        let initial_comment = initial_comment_text.value;
        let repeating_am = 0;
        let repeating_pos = initial_comment.toLowerCase().indexOf(replace_word_input.value.toLowerCase());
        if (repeating_pos < 0) {
            show_msg(`Cannot find \"${replace_word_input.value}\" in the initial comment!`);
            return;
        }
        try {
            repeating_am = parseInt(repeating_amount.value);
        }
        catch (_a) {
            show_msg("Cannot convert to integer!");
            return;
        }
        let final_comment = initial_comment;
        let middle_comment = initial_comment;
        for (let x = 0; x < repeating_am; x++) {
            // final_comment+= initial_comment.substring(0, repeating_pos) + decoration_text.value + initial_comment 
            // + decoration_text.value 
            // + initial_comment.substring(repeating_pos + (replace_word_input.value.length));
            final_comment = initial_comment.substring(0, repeating_pos) +
                decoration_text.value + middle_comment + decoration_text.value +
                initial_comment.substring(repeating_pos + replace_word_input.value.length);
            middle_comment = final_comment;
        }
        result_text.value = final_comment;
    }
})();
