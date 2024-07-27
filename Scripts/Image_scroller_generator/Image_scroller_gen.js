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
// const img_scroller_child_added_event
const Populate_image_scroller = (function () {
    let added_event = new Event("Added_children");
    class img_scroller_class {
        constructor(img_path, custom_style, other_imgs, click_url, window_argument) {
            this.img_path = img_path;
            this.custom_style = custom_style;
            this.other_imgs = other_imgs;
            this.click_url = click_url;
            this.window_argument = window_argument;
        }
    }
    return function (json_path, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield fetch(json_path);
            var res_ar = yield response.json();
            var parent_to_add = document.querySelector(`#${id}`);
            res_ar.forEach(res => {
                let cu_style = `style="${res.custom_style}"`;
                let ot_imgs = `data-other_imgs="${res.other_imgs}"`;
                let win_arg = "";
                let click_url = "";
                if (res.custom_style == null) {
                    cu_style = "";
                }
                if (res.other_imgs == null) {
                    ot_imgs = "";
                }
                if (res.click_url != null && res.click_url != "") {
                    click_url = `data-click_url="${res.click_url}"`;
                    if (res.window_argument != null && res.window_argument != "") {
                        win_arg = `data-window_argument="${res.window_argument}"`;
                    }
                }
                // let back_thing;
                // if(cu_style.includes("url")){
                //     if
                // }
                let to_add = `<div class="sc_img">` +
                    `<img src="${res.img_path}" ${cu_style} ${ot_imgs} ${click_url} ${win_arg} alt="design_item">` +
                    `</div>`;
                parent_to_add === null || parent_to_add === void 0 ? void 0 : parent_to_add.insertAdjacentHTML("beforeend", to_add);
            });
            parent_to_add === null || parent_to_add === void 0 ? void 0 : parent_to_add.dispatchEvent(added_event);
        });
    };
})();
