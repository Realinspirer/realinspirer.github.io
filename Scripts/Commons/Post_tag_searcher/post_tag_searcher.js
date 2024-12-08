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
const post_tag_searcher = (function () {
    function return_found_tagged_items(data_raw_1) {
        return __awaiter(this, arguments, void 0, function* (data_raw, limit = 0, ...tag) {
            var _a;
            let data = [];
            let items_added = 0;
            if (tag != null && tag.length > 0) {
                for (let index = 0; index < data_raw.length; index++) {
                    const element = data_raw[index];
                    let element_tags = (_a = element.tags) === null || _a === void 0 ? void 0 : _a.split(",");
                    if (element_tags != null && element_tags.length > 0) {
                        for (let tag_ind = 0; tag_ind < element_tags.length; tag_ind++) {
                            const x = element_tags[tag_ind];
                            if (tag.some(ta => ta.toLowerCase().trim() == x.toLocaleLowerCase().trim())) {
                                data.push(element);
                                items_added++;
                                break;
                            }
                        }
                        if (limit > 0 && items_added >= limit) {
                            break;
                        }
                    }
                    yield new Promise(resolve => setTimeout(resolve, 5));
                }
            }
            else {
                data = data_raw;
            }
            return data;
        });
    }
    function return_found_tagged_items_excluded(data_raw_1) {
        return __awaiter(this, arguments, void 0, function* (data_raw, limit = 0, ...tag) {
            var _a;
            let items_added = 0;
            let data = [];
            if (tag != null && tag.length > 0) {
                for (let index = 0; index < data_raw.length; index++) {
                    const element = data_raw[index];
                    let element_tags = (_a = element.tags) === null || _a === void 0 ? void 0 : _a.split(",");
                    if (element_tags != null && element_tags.length > 0) {
                        let to_add = true;
                        for (let tag_ind = 0; tag_ind < element_tags.length; tag_ind++) {
                            const x = element_tags[tag_ind];
                            if (tag.some(ta => ta.toLowerCase().trim() == x.toLocaleLowerCase().trim())) {
                                to_add = false;
                                break;
                            }
                        }
                        if (to_add) {
                            data.push(element);
                            items_added++;
                        }
                        if (limit > 0 && items_added >= limit) {
                            break;
                        }
                    }
                    yield new Promise(resolve => setTimeout(resolve, 5));
                }
            }
            else {
                data = data_raw;
            }
            return data;
        });
    }
    return {
        return_found_tagged_items: return_found_tagged_items,
        return_found_tagged_items_excluded: return_found_tagged_items_excluded
    };
})();
