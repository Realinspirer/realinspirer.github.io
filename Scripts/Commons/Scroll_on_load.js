"use strict";
const scroll_to_id = (function () {
    class Key_value_pair {
        constructor() {
            this.key = null;
            this.value = null;
        }
    }
    const req_converters = [{ key: "3D", value: "Animations" }];
    window.addEventListener("load", scroll_to_id);
    function hook_to_hashchange() {
        window.addEventListener("hashchange", scroll_to_id);
    }
    function scroll_to_id() {
        setTimeout(() => {
            const url = window.location;
            if (url != null) {
                const hash = converter(url.hash);
                if (hash != null && hash != "") {
                    document.documentElement.scrollTo(0, document.querySelector(hash).offsetTop - 30);
                }
            }
        }, 300);
    }
    function hook_to_elements(...btns) {
        btns.forEach(x => x.addEventListener("click", scroll_to_id));
    }
    function converter(to_convert) {
        const req = req_converters.filter(x => `#${x.key}` == to_convert);
        if (req != null && req.length > 0) {
            return `#${req[0].value}`;
        }
        else {
            return to_convert;
        }
    }
    return {
        hook_to_elements: hook_to_elements,
        hook_to_hashchange: hook_to_hashchange
    };
})();
