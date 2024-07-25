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
    constructor(title, des, img, other_imgs, cl_url, win_ar) {
        this.title = title;
        this.description = des;
        this.def_img = img;
        this.other_imgs = other_imgs;
        this.click_url = cl_url;
        this.window_argument = win_ar;
    }
}
function get_json_featured(loc, id) {
    return __awaiter(this, void 0, void 0, function* () {
        // var window_argument:string = "_self";
        var _a;
        var response = yield fetch(loc);
        var res_ar = yield response.json();
        res_ar.forEach(res => {
            var items = `<div class="game_feat" onclick="window.open('${res.click_url}', '${res.window_argument}')">
                <picture>`;
            if (res.other_imgs != null && res.other_imgs.length >= 0) {
                res.other_imgs.forEach(url => {
                    items += `<source srcset="${url.img_url}" media="(max-width: ${url.width}px)"/>`;
                });
            }
            items += `<img src=${res.def_img} alt="cover_img"/> </picture>`;
            items += `<div class="game_grad"></div>
                <h1 class="title">${res.title}
                    <span>${res.description}</span>
                </h1>
    </div>`;
            $(`#${id}`).append(items);
        });
        (_a = document.querySelector(`#${id} .game_feat`)) === null || _a === void 0 ? void 0 : _a.classList.add("game_active");
    });
}
