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
function get_json_normal(json_loc_1, id_grid_1) {
    return __awaiter(this, arguments, void 0, function* (json_loc, id_grid, window_argument = "_self") {
        var response = yield fetch(json_loc);
        var res_ar = yield response.json();
        res_ar.reverse().forEach(res => {
            var items = create_string(res);
            $(`#${id_grid}`).prepend(items);
        });
    });
}
function create_string(res) {
    return `<div class=\"item_normal\">` +
        `<img src="${res.image_url}" alt="icon">` +
        `<div class="items_text">` +
        `<p class="item_normal_title">${res.title}</p>` +
        `<p class="item_normal_subtitle">${res.subtitle}</p>` +
        `<p class="item_normal_desc">${res.description}</p>` +
        `<a class="normal_button") href="${res.click_url}">${res.button_text}</a>` +
        `</div>` +
        `</div>`;
}
function get_json_normal_count(json_loc, id_grid, count) {
    return __awaiter(this, void 0, void 0, function* () {
        var response = yield fetch(json_loc);
        var res_ar = yield response.json();
        res_ar.slice(0, count).reverse().forEach(res => {
            var items = create_string(res);
            $(`#${id_grid}`).prepend(items);
        });
    });
}
function get_json_normal_random(json_loc_1, id_grid_1, count_1) {
    return __awaiter(this, arguments, void 0, function* (json_loc, id_grid, count, excluded = null) {
        var response = yield fetch(json_loc);
        var res_ar = yield response.json();
        var res_rand = new Array();
        if (excluded != null) {
            let found_item = res_ar.findIndex(x => x.title == excluded);
            res_ar.splice(found_item, 1);
        }
        for (let index = 0; index < count; index++) {
            var rand_index = Math.floor(Math.random() * res_ar.length);
            var item = res_ar[rand_index];
            res_ar.splice(rand_index, 1);
            res_rand.push(item);
        }
        res_rand.reverse().forEach(res => {
            var items = create_string(res);
            $(`#${id_grid}`).prepend(items);
        });
    });
}
