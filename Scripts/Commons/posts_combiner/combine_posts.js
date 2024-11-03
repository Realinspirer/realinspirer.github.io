"use strict";
const combine_all_known_posts_to_blogs = (function () {
    return function combine() {
        Blogs_and_posts_data.push(...projects_3d_posts_data);
        Blogs_and_posts_data.sort((x, y) => {
            var _a, _b;
            let req_regex = new RegExp("th|rd|nd", "i");
            let first_date = ((_a = x.date) !== null && _a !== void 0 ? _a : "").replace(req_regex, "");
            let second_date = ((_b = y.date) !== null && _b !== void 0 ? _b : "").replace(req_regex, "");
            var first = Date.parse(first_date);
            var second = Date.parse(second_date);
            if (first < second) {
                return 1;
            }
            else if (first > second) {
                return -1;
            }
            else {
                return 0;
            }
        });
    };
})();
