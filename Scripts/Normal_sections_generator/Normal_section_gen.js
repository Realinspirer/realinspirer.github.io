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
class normal_section_class {
    constructor(title, sub_title, des, img, btn_txt, cl_url) {
        this.title = title;
        this.subtitle = sub_title;
        this.description = des;
        this.image_url = img;
        this.button_text = btn_txt;
        this.click_url = cl_url;
    }
}
get_json_normal("\\Scripts\\More_apps_generator\\More_apps_gen.json", "more_apps_section");
get_json_normal("\\Scripts\\More_games_section\\More_games_gen.json", "more_games_section");
function get_json_normal(json_loc, id_grid, window_argument = "") {
    return __awaiter(this, void 0, void 0, function* () {
        var response = yield fetch(json_loc);
        var res_ar = yield response.json();
        res_ar.reverse().forEach(res => {
            var items = `<div class=\"item_normal\">` +
                `<img src="${res.image_url}" alt="icon">` +
                `<div class="items_text">` +
                `<p class="item_normal_title">${res.title}</p>` +
                `<p class="item_normal_subtitle">${res.subtitle}</p>` +
                `<p class="item_normal_desc">${res.description}</p>` +
                `<a class="normal_button" onclick="window.open('${res.click_url}','${window_argument}')">${res.button_text}</a>` +
                `</div>` +
                `</div>`;
            $(`#${id_grid}`).prepend(items);
        });
    });
}
