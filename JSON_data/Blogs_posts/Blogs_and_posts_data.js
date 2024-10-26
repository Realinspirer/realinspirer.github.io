"use strict";
const Blogs_and_posts_data = new Array();
Blogs_and_posts_data.push({
    title: "Background Design for Upcoming Video (Domino\'s experience)",
    subtitle: "Just created a background design using procedural shaders in Blender for my upcoming YouTube video. Have a look!",
    date: "19th October 2024",
    imgs: [
        "/Blogs/Images/dominos_video/back0.jpg",
        "/Blogs/Images/dominos_video/back1.jpg",
        "/Blogs/Images/dominos_video/back2.jpg"
    ],
    btns: [
        {
            btn_string: "LinkedIn Video",
            click_url: "https://www.linkedin.com/posts/realinspirer_blender-shaders-activity-7253472608094961664-vOdn",
            external: true
        }
    ]
});
Blogs_and_posts_data.push({
    title: "Dwelling into 4th Dimension and Time",
    subtitle: "Just created and dropped a YouTube video with some spicy 🌶️ video editing. I talk about 4th dimension and time in this video. I edited the video using DaVinci Resolve and Blender. \n I also created a thumbnail for the video.",
    date: "10th October 2024",
    imgs: [
        "/Blogs/Images/fourth_dimension_video/3.jpg",
        "/Blogs/Images/fourth_dimension_video/1.jpg",
        "/Blogs/Images/fourth_dimension_video/2.jpg",
        "/Blogs/Images/fourth_dimension_video/0.jpg",
        "/Blogs/Images/fourth_dimension_video/4.jpg",
        "/Blogs/Images/fourth_dimension_video/5.jpg",
    ],
    btns: [
        {
            btn_string: "Watch Video",
            click_url: "https://youtu.be/pqa7vKbMS7k?si=pnI7CJxk-mOShie9",
            external: true
        },
        {
            btn_string: "Watch Shorts Video",
            click_url: "https://www.youtube.com/shorts/qtudAjtOKYQ",
            external: true
        }
    ]
});
Blogs_and_posts_data.push({
    title: "Thumbnail Design in DaVinci Resolve (4th Dimension Video)",
    subtitle: "Thumbnail Design using DaVinci Resolve. Yeah, I made this in the video editor itself. Turned out pretty good. I use vector software, Blender and now Resolve for my thumbnail designs, so that's quite helpful to discover.",
    date: "10th October 2024",
    btns: [
        {
            btn_string: "Watch Video",
            click_url: "https://youtu.be/pqa7vKbMS7k?si=pnI7CJxk-mOShie9",
            external: true
        }
    ],
    imgs: [
        "/Blogs/Images/fourth_dimension_video/thumbnail.jpg",
        "/Blogs/Images/fourth_dimension_video/thumbnail_vert.png"
    ]
});
Blogs_and_posts_data.push({
    title: "I Fixed a Problem!",
    date: "29th September 2024",
    subtitle: "I recently noticed a surge in the comments which are on the lines of \"Oil up!\". So I fixed the problem! \n Watch the video to get some giggles and context.",
    btns: [
        {
            btn_string: "Watch Video",
            click_url: "https://www.youtube.com/shorts/gPTIsGISDxU",
            external: true
        },
        {
            btn_string: "Generator App",
            click_url: "/Apps/Looper_comment/"
        }
    ],
    imgs: [
        "/Apps/Looper_comment/Images/logo.png",
        "/Blogs/Images/oiled_up/0.png"
    ]
});
Blogs_and_posts_data.push({
    title: "Why CODNEXT is Bad for it's Franchise",
    date: "13th September 2024",
    subtitle: "I just uploaded a YouTube video where I talk about CODNext.\n\n Edited the video using DaVinci Resolve and a little bit of Blender and loved the editing process! Even made a whole planner for the video. I made the thumbnail for this video using Blender.",
    btns: [
        {
            btn_string: "Watch Video",
            click_url: "https://youtu.be/_alZtrel79Q?si=BO89TgyFI5D_ptbC",
            external: true
        },
        {
            btn_string: "Watch Shorts Video",
            click_url: "https://www.youtube.com/shorts/ss_Ugquczhg",
            external: true
        }
    ],
    imgs: [
        "/Blogs/Images/cod_next/cod_thumb.jpg",
        "/Blogs/Images/cod_next/cod_thumb_vert.jpg",
        "/Blogs/Images/cod_next/3.jpg",
        "/Blogs/Images/cod_next/0.jpg",
        "/Blogs/Images/cod_next/2.jpg",
        "/Blogs/Images/cod_next/1.jpg",
    ]
});
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
