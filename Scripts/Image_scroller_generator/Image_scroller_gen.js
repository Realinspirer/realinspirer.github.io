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
    return function (json_path, id) {
        return __awaiter(this, void 0, void 0, function* () {
            var response = yield fetch(json_path);
            var res_ar = yield response.json();
            var parent_to_add = document.querySelector(`#${id}`);
            res_ar.forEach(res => {
                let to_add = `<div class="sc_img">
                                <img src="${res}" alt="design_item">
                            </div>`;
                parent_to_add === null || parent_to_add === void 0 ? void 0 : parent_to_add.insertAdjacentHTML("beforeend", to_add);
            });
            parent_to_add === null || parent_to_add === void 0 ? void 0 : parent_to_add.dispatchEvent(added_event);
        });
    };
})();
