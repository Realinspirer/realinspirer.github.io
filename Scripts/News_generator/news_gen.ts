const news_generator = (function(){

    return async function generator(res_ar:Array<Data_class_multiple_imgs_btn>, selector:string){
        let parent = document.querySelector(selector)!;
        
        // var response = await fetch(json_path);
        // var res_ar:Array<Data_class> = await response.json();


        let index = 0;
        let count = 5;
        res_ar.forEach(data => {

            if(index >= 5){
                return;
            }
            index ++; 
            let news = document.createElement("a");
            news.classList.add("news");
            
            let click_url = data.click_url;

            // if(click_url != null){
            //     news.href = click_url;
            //     let is_ext = data.external;
            //     if(is_ext){
            //         news.target = "_blank";
            //         news.rel = "noopener"
            //     }
            // }

            let target_href = new URLSearchParams();
        
            target_href.append("title", data.title);
            
            let req_url = window.location.protocol + '//' + window.location.host + "/Blogs/" + "?" + target_href;

            news.href = req_url;


            parent.appendChild(news);

            let news_img = document.createElement("img");
            news_img.classList.add("news_img");

            if(data.imgs != null && data.imgs.length >= 1){
                news_img.src = data.imgs[0];
            }
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
            date.textContent = data.date ?? "";
            news_text.appendChild(date);            
        });
    }
})();