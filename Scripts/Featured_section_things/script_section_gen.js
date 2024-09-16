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
        var parent_ele = document.getElementById(id);
        res_ar.forEach(res => {
            var game_feat = document.createElement("div");
            game_feat.classList.add("game_feat");
            game_feat.addEventListener("click", () => window.open(`${res.click_url}`, `${res.window_argument}`));
            var picture = document.createElement("picture");
            game_feat.appendChild(picture);
            if (res.other_imgs != null && res.other_imgs.length >= 0) {
                res.other_imgs.forEach(url => {
                    var img_src = document.createElement("source");
                    img_src.srcset = url.img_url;
                    img_src.media = `(max-width:${url.width}px)`;
                    picture.appendChild(img_src);
                });
            }
            var img = document.createElement("img");
            img.src = res.def_img;
            img.alt = "cover_img";
            picture.appendChild(img);
            var game_grad = document.createElement("div");
            game_grad.classList.add("game_grad");
            game_feat.appendChild(game_grad);
            var title = document.createElement('h1');
            title.classList.add("title");
            title.textContent = res.title;
            game_feat.appendChild(title);
            var sub = document.createElement("span");
            sub.textContent = res.description;
            title.appendChild(sub);
            parent_ele.appendChild(game_feat);
        });
        (_a = document.querySelector(`#${id} .game_feat`)) === null || _a === void 0 ? void 0 : _a.classList.add("game_active");
    });
}
