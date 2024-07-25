"use strict";
var __classPrivateFieldGet = (this && this.__classPrivateFieldGet) || function (receiver, state, kind, f) {
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot read private member from an object whose class did not declare it");
    return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
};
var __classPrivateFieldSet = (this && this.__classPrivateFieldSet) || function (receiver, state, value, kind, f) {
    if (kind === "m") throw new TypeError("Private method is not writable");
    if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
    if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver)) throw new TypeError("Cannot write private member to an object whose class did not declare it");
    return (kind === "a" ? f.call(receiver, value) : f ? f.value = value : state.set(receiver, value)), value;
};
const Scroller_const = (function () {
    var _scroller_elements_class_instances, _scroller_elements_class_curr_sel, _scroller_elements_class_paused_, _scroller_elements_class_pause_play_img_element, _scroller_elements_class_timer_, _scroller_elements_class_timer_get, _scroller_elements_class_timer_set, _scroller_elements_class_threshold;
    class scroller_elements_class {
        get current_selected_index() {
            return __classPrivateFieldGet(this, _scroller_elements_class_curr_sel, "f");
        }
        set current_selected_index(val) {
            __classPrivateFieldSet(this, _scroller_elements_class_curr_sel, val, "f");
            __classPrivateFieldSet(this, _scroller_elements_class_instances, 0, "a", _scroller_elements_class_timer_set);
        }
        get paused() {
            return __classPrivateFieldGet(this, _scroller_elements_class_paused_, "f");
        }
        set paused(val) {
            var _a;
            __classPrivateFieldSet(this, _scroller_elements_class_paused_, val, "f");
            if (__classPrivateFieldGet(this, _scroller_elements_class_pause_play_img_element, "f") == null) {
                __classPrivateFieldSet(this, _scroller_elements_class_pause_play_img_element, (_a = this.pause_play_btn) === null || _a === void 0 ? void 0 : _a.querySelector("img"), "f");
            }
            __classPrivateFieldGet(this, _scroller_elements_class_pause_play_img_element, "f").src = __classPrivateFieldGet(this, _scroller_elements_class_paused_, "f") ? "/Images/Symbols/play.png" : "Images/Symbols/pause.png";
            __classPrivateFieldSet(this, _scroller_elements_class_instances, 0, "a", _scroller_elements_class_timer_set);
        }
        constructor(left_button, right_button, scroller, main_img, images, pause_play_btn) {
            _scroller_elements_class_instances.add(this);
            // current_selected_index:number|null;
            _scroller_elements_class_curr_sel.set(this, void 0);
            _scroller_elements_class_paused_.set(this, false);
            _scroller_elements_class_pause_play_img_element.set(this, null);
            _scroller_elements_class_timer_.set(this, 0);
            _scroller_elements_class_threshold.set(this, 10);
            this.left_button = left_button;
            this.right_button = right_button;
            this.scroller = scroller;
            this.main_img = main_img;
            this.images = images;
            __classPrivateFieldSet(this, _scroller_elements_class_curr_sel, null, "f");
            this.current_anim = null;
            this.pause_play_btn = pause_play_btn;
        }
        get current_selected_parent() {
            var _a;
            if (this.current_selected_index == null || this.images == null || this.images.length == 0) {
                return null;
            }
            else {
                return (_a = this.images[this.current_selected_index]) === null || _a === void 0 ? void 0 : _a.parentElement;
            }
        }
        get_next_item() {
            if (this.images == null || this.images.length == 0) {
                return null;
            }
            if (this.current_selected_index == null || this.current_selected_index >= this.images.length - 1) {
                return this.images[0];
            }
            return this.images[this.current_selected_index + 1];
        }
        get_prev_item() {
            if (this.images == null || this.images.length == 0) {
                return null;
            }
            if (this.current_selected_index == null) {
                return this.images[0];
            }
            if (this.current_selected_index <= 0) {
                return this.images[this.images.length - 1];
            }
            return this.images[this.current_selected_index - 1];
        }
        click_next_item() {
            var _a;
            (_a = this.get_next_item()) === null || _a === void 0 ? void 0 : _a.click();
            this.scroll_scroller_to_middle();
        }
        click_prev_item() {
            var _a;
            (_a = this.get_prev_item()) === null || _a === void 0 ? void 0 : _a.click();
            this.scroll_scroller_to_middle();
        }
        scroll_scroller_to_middle() {
            let scroller = this.scroller;
            let current_child = this.current_selected_parent;
            let gap = parseFloat(window.getComputedStyle(scroller, null).getPropertyValue("gap"));
            var to_calc = 0.5 * (scroller.clientWidth - current_child.clientWidth - (2 * gap));
            scroller.scrollTo({ left: (current_child.offsetLeft - gap) - to_calc });
        }
        start_auto_interval() {
            if (!this.paused) {
                __classPrivateFieldSet(this, _scroller_elements_class_instances, __classPrivateFieldGet(this, _scroller_elements_class_instances, "a", _scroller_elements_class_timer_get) + 500 / 1000, "a", _scroller_elements_class_timer_set);
            }
            if (__classPrivateFieldGet(this, _scroller_elements_class_instances, "a", _scroller_elements_class_timer_get) >= __classPrivateFieldGet(this, _scroller_elements_class_threshold, "f")) {
                this.click_next_item();
            }
            setTimeout(() => this.start_auto_interval(), 500);
        }
    }
    _scroller_elements_class_curr_sel = new WeakMap(), _scroller_elements_class_paused_ = new WeakMap(), _scroller_elements_class_pause_play_img_element = new WeakMap(), _scroller_elements_class_timer_ = new WeakMap(), _scroller_elements_class_threshold = new WeakMap(), _scroller_elements_class_instances = new WeakSet(), _scroller_elements_class_timer_get = function _scroller_elements_class_timer_get() {
        return __classPrivateFieldGet(this, _scroller_elements_class_timer_, "f");
    }, _scroller_elements_class_timer_set = function _scroller_elements_class_timer_set(val) {
        var _a;
        __classPrivateFieldSet(this, _scroller_elements_class_timer_, val, "f");
        (_a = this.scroller) === null || _a === void 0 ? void 0 : _a.style.setProperty('--timer_val', (((__classPrivateFieldGet(this, _scroller_elements_class_timer_, "f") / __classPrivateFieldGet(this, _scroller_elements_class_threshold, "f")) * 100) + '%').toString());
    };
    let all_covers = document.querySelectorAll(".cover_img_sec");
    // let items:Array<scroller_elements_class> = [];
    function add_to_items(cover_img_sec_element) {
        var _a;
        let cur_scroller = cover_img_sec_element.querySelector(".img_scroller");
        console.log(`Child count: ${cur_scroller.children.length}`);
        if (cur_scroller.children != null && cur_scroller.children.length > 0) {
            let root_parent = cover_img_sec_element.closest(".discover_item");
            root_parent === null || root_parent === void 0 ? void 0 : root_parent.insertAdjacentHTML("afterbegin", `<div class="pause_play_button"><img alt="Pause/Play" src="Images/Symbols/pause.png"></div>`);
            let created_item = new scroller_elements_class(cover_img_sec_element.querySelector(".sc_btn.left"), cover_img_sec_element.querySelector(".sc_btn.right"), cur_scroller, cover_img_sec_element.querySelector(".main_img"), Array.from(cover_img_sec_element.querySelectorAll(".img_scroller .sc_img img")), root_parent.querySelector(".pause_play_button"));
            created_item.pause_play_btn.addEventListener("click", function () {
                created_item.paused = !created_item.paused;
            });
            created_item.right_button.addEventListener("click", function () {
                created_item.click_next_item();
            });
            created_item.left_button.addEventListener("click", function () {
                created_item.click_prev_item();
            });
            let main_img = created_item.main_img;
            let pic_ele = document.createElement("picture");
            main_img.parentElement.replaceChild(pic_ele, created_item.main_img);
            pic_ele.appendChild(main_img);
            (_a = created_item.images) === null || _a === void 0 ? void 0 : _a.forEach(im => {
                im.parentElement.addEventListener("click", function () {
                    var _a;
                    (_a = created_item.current_selected_parent) === null || _a === void 0 ? void 0 : _a.classList.toggle("active");
                    created_item.current_selected_index = created_item.images.indexOf(im);
                    created_item.current_selected_parent.classList.toggle("active");
                    main_img.style.opacity = "0";
                    if (created_item.current_anim != null) {
                        clearInterval(created_item.current_anim);
                    }
                    created_item.current_anim = setInterval(function () {
                        if (parseFloat(window.getComputedStyle(main_img).opacity) <= 0) {
                            main_img.style.opacity = "1";
                            main_img.style.cssText = im.dataset.custom_style;
                            let pa_img = main_img.parentElement;
                            let prev_sources = pa_img.querySelectorAll("source");
                            if (prev_sources.length > 0) {
                                prev_sources.forEach(ch => ch.remove());
                            }
                            let req_imgs = im.dataset.other_imgs;
                            if (req_imgs != null) {
                                let srcs_to_add = "";
                                let req_array = req_imgs.split(";");
                                req_array.forEach(ele => {
                                    let computed_size = ele.split(":");
                                    if (computed_size.length == 2) {
                                        srcs_to_add += `<source srcset="${computed_size[1]}" media="(max-width: ${computed_size[0]}px)"/>`;
                                    }
                                });
                                main_img.insertAdjacentHTML("beforebegin", srcs_to_add);
                            }
                            created_item.main_img.src = im.src;
                            clearInterval(created_item.current_anim);
                        }
                    }, 100);
                });
            });
            created_item.click_next_item();
            created_item.start_auto_interval();
        }
        else {
            console.warn("Image scroller did not contain any children, added listner!");
            cur_scroller.addEventListener("Added_children", () => add_to_items(cover_img_sec_element));
        }
    }
    all_covers.forEach((item) => {
        add_to_items(item);
    });
    return {
        add_scroller_item(cover_img_sec_element) {
            add_to_items(cover_img_sec_element);
        }
    };
})();
