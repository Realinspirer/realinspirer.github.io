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
class section_class {
    constructor(title, des, img, sh_txt, cl_url) {
        this.title = title;
        this.description = des;
        this.image_url = img;
        this.shadow_text = sh_txt;
        this.click_url = cl_url;
    }
}
function get_json_featured() {
    return __awaiter(this, void 0, void 0, function* () {
        var window_argument = "_self";
        var response = yield fetch('/Scripts/Featured_section_things/Section_thing.json');
        var res_ar = yield response.json();
        res_ar.reverse().forEach(res => {
            var items = `<div class=\"grid_item\" onclick="window.open('${res.click_url}','${window_argument}')">` +
                `<p>${res.title}` +
                `<span><br>${res.description}</span>` +
                `</p>` +
                `<img src="${res.image_url}" alt="game_cover">` +
                `<div class="item_shadow">` +
                `<p>${res.shadow_text}</p>` +
                `</div>` +
                `</div>`;
            $("#featured_section").prepend(items);
        });
    });
}
