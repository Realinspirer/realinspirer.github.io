"use strict";
(function () {
    let viewer_parent = document.querySelector("#viewer");
    let close_btn = viewer_parent.querySelector(".close_btn");
    let main_img = viewer_parent.querySelector(".main_img");
    let viewer_co;
    close_btn.addEventListener("click", () => {
        if (viewer_co != null) {
            clearInterval(viewer_co);
        }
        viewer_parent.classList.remove("visible");
        viewer_co = setTimeout(() => {
            viewer_parent.classList.add("hidden");
            document.documentElement.classList.remove("viewer_active");
            viewer_co = null;
        }, 300);
    });
    Start();
    function Start() {
        let left_btns = document.querySelectorAll(".sc_button.left");
        let right_btns = document.querySelectorAll(".sc_button.right");
        left_btns.forEach(left_btn => {
            let images_post = left_btn.closest(".post_image_scroller").querySelector(".images_post");
            left_btn.addEventListener("click", () => images_post.scrollBy(-window.outerHeight * 0.25, 0));
            let checker = setInterval(() => {
                check_sc_btns(images_post, checker, left_btn);
            }, 700);
        });
        right_btns.forEach(right_btn => {
            let images_post = right_btn.closest(".post_image_scroller").querySelector(".images_post");
            right_btn.addEventListener("click", () => images_post.scrollBy(window.outerHeight * 0.25, 0));
            let checker = setInterval(() => {
                check_sc_btns(images_post, checker, right_btn);
            }, 700);
        });
        let post_imgs = document.querySelectorAll(".post_img");
        post_imgs.forEach(post_img => {
            post_img.addEventListener("click", () => {
                let img = post_img.querySelector("img:not(.symbol)").src;
                posts_viewer(img);
            });
        });
    }
    function check_sc_btns(sc_ele, checker, ...to_hide_elements) {
        if (sc_ele.offsetWidth < sc_ele.scrollWidth) {
            to_hide_elements.forEach(x => x.classList.remove("hidden"));
            clearInterval(checker);
        }
        else {
            to_hide_elements.forEach(x => x.classList.add("hidden"));
        }
    }
    function posts_viewer(img_url) {
        main_img.src = img_url;
        viewer_parent.classList.remove("hidden");
        setTimeout(() => {
            viewer_parent.classList.add("visible");
        });
        document.documentElement.classList.add("viewer_active");
    }
})();
