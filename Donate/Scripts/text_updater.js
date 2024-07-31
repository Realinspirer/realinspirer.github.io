"use strict";
// function([string1, string2],target id,[color1,color2]) 
(function () {
    class text_and_font {
        constructor() {
            this.text = "";
        }
    }
    let def_font = 1;
    consoleText([
        { text: "Support a creator", font_size: 0.97 },
        { text: 'Support a carrer' },
        { text: "Support creativity", font_size: 0.955 },
        { text: "Support a developer", font_size: 0.835 },
        { text: "Support Realinspirer", font_size: 0.84 },
        { text: "Support a programmer", font_size: 0.75 }
    ], 'title_text');
    function consoleText(words, id) {
        var letterCount = 1;
        var x = 1;
        var waiting = false;
        var target = document.getElementById(id);
        set_target_font(target, words[0].font_size);
        setInterval(function () {
            if (letterCount === 0 && waiting === false) {
                waiting = true;
                target.innerHTML = words[0].text.substring(0, letterCount);
                setTimeout(function () {
                    var usedWord = words.shift();
                    words.push(usedWord);
                    x = 1;
                    set_target_font(target, words[0].font_size);
                    letterCount += x;
                    waiting = false;
                }, 200);
            }
            else if (letterCount === words[0].text.length + 1 && waiting === false) {
                waiting = true;
                setTimeout(function () {
                    x = -1;
                    letterCount += x;
                    waiting = false;
                }, 3000);
            }
            else if (waiting === false) {
                target.innerHTML = words[0].text.substring(0, letterCount);
                letterCount += x;
            }
        }, 120);
    }
    function set_target_font(target, size) {
        if (size != null) {
            target.parentElement.style.setProperty("--font_cus", `${size}em`);
        }
        else {
            target.parentElement.style.setProperty("--font_cus", `${def_font}em`);
        }
    }
})();
