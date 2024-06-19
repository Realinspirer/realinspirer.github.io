"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
class discover_section {
    constructor(title, des, img, sh_txt, cl_url) {
        this.title = title;
        this.subtitle = des;
        this.image_url = img;
        this.click_url = cl_url;
    }
}
get_json_discover();
function get_json_discover() {
    return __awaiter(this, void 0, void 0, function* () {
        var window_argument_discover = "_self";
        var response = yield fetch('/Scripts/Blur_section/Discover_section.json');
        var res_ar = yield response.json();
        res_ar.reverse().forEach(res => {
            var items = `<div class="blur_section_item" onclick="window.open('${res.click_url}','${window_argument_discover}')">` +
                `<img src="${res.image_url}" alt="Item cover">` +
                `<p class="title_section">${res.title}</p>` +
                `<p class="subtitle_section">${res.subtitle}</p>` +
                `</div>`;
            $("#section_discover").prepend(items);
        });
    });
}
