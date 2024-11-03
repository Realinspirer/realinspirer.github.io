const combine_all_known_posts_to_blogs = (function() {
    
    return function combine() {
        Blogs_and_posts_data.push(...projects_3d_posts_data);
        Blogs_and_posts_data.sort( (x,y) => {

            let req_regex = new RegExp("th|rd|nd", "i")

            let first_date = (x.date ?? "").replace(req_regex, "");
            let second_date = (y.date ?? "").replace(req_regex, "");
            var first = Date.parse(first_date);
            var second = Date.parse(second_date);

            if(first < second){
                return 1;
            }
            else if(first > second){
                return -1;
            }
            else{
                return 0;
            }
            
        });
    }
})();