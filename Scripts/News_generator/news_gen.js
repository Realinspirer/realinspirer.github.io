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
const news_generator = (function () {
    return function generator(json_path, selector) {
        return __awaiter(this, void 0, void 0, function* () {
            let parent = document.querySelector(selector);
            var response = yield fetch(json_path);
            var res_ar = yield response.json();
            res_ar.forEach(data => {
                var _a;
                let news = document.createElement("a");
                news.classList.add("news");
                let click_url = data.click_url;
                if (click_url != null) {
                    news.href = click_url;
                    let is_ext = data.external;
                    if (is_ext) {
                        news.target = "_blank";
                        news.rel = "noopener";
                    }
                }
                parent.appendChild(news);
                let news_img = document.createElement("img");
                news_img.classList.add("news_img");
                news_img.src = (_a = data.img) !== null && _a !== void 0 ? _a : "";
                news_img.alt = "";
                news.appendChild(news_img);
                let news_text = document.createElement("div");
                news_text.classList.add("news_text");
                news.appendChild(news_text);
                let text = document.createElement("h3");
                text.classList.add("text");
                text.textContent = data.title;
                news_text.appendChild(text);
                let date = document.createElement("p");
                date.classList.add("date");
                date.textContent = data.date;
                news_text.appendChild(date);
            });
        });
    };
})();
