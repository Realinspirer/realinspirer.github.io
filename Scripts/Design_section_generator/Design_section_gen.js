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
class just_title_subtitle_image {
    constructor(title, sub_title, des, img, btn_txt, cl_url) {
        this.title = title;
        this.subtitle = sub_title;
        this.image_url = img;
    }
}
function get_json_design(json_loc_1, id_grid_1) {
    return __awaiter(this, arguments, void 0, function* (json_loc, id_grid, window_argument = "") {
        var response = yield fetch(json_loc);
        var res_ar = yield response.json();
        res_ar.reverse().forEach(res => {
            var items = `<div class="design_item">` +
                `<div class="design_text">` +
                `<p class="design_title">` +
                `${res.title}` +
                `<span>${res.subtitle}<span>` +
                `</p>` +
                `</div>` +
                `<img src="${res.image_url}" alt="design_item">` +
                `</div>`;
            $(`#${id_grid}`).prepend(items);
        });
    });
}
