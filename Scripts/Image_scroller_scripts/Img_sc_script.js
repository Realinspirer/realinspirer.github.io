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
(function () {
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
    let items = [];
    all_covers.forEach((item) => {
        let root_parent = item.closest(".discover_item");
        root_parent === null || root_parent === void 0 ? void 0 : root_parent.insertAdjacentHTML("afterbegin", `<div class="pause_play_button"><img alt="Pause/Play" src="Images/Symbols/pause.png"></div>`);
        items.push(new scroller_elements_class(item.querySelector(".sc_btn.left"), item.querySelector(".sc_btn.right"), item.querySelector(".img_scroller"), item.querySelector(".main_img"), Array.from(item.querySelectorAll(".sc_img img")), root_parent.querySelector(".pause_play_button")));
    });
    items.forEach((item) => {
        var _a;
        item.pause_play_btn.addEventListener("click", function () {
            item.paused = !item.paused;
        });
        item.right_button.addEventListener("click", function () {
            item.click_next_item();
        });
        item.left_button.addEventListener("click", function () {
            item.click_prev_item();
        });
        (_a = item.images) === null || _a === void 0 ? void 0 : _a.forEach(im => im.parentElement.addEventListener("click", function () {
            var _a;
            (_a = item.current_selected_parent) === null || _a === void 0 ? void 0 : _a.classList.toggle("active");
            item.current_selected_index = item.images.indexOf(im);
            item.current_selected_parent.classList.toggle("active");
            let main_img = item.main_img;
            main_img.style.opacity = "0";
            if (item.current_anim != null) {
                clearInterval(item.current_anim);
            }
            item.current_anim = setInterval(function () {
                if (parseFloat(window.getComputedStyle(main_img).opacity) <= 0) {
                    item.main_img.src = im.src;
                    main_img.style.opacity = "1";
                    clearInterval(item.current_anim);
                }
            }, 80);
        }));
        item.click_next_item();
        item.start_auto_interval();
    });
})();
