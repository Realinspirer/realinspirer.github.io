const news_generator = (function(){

    return async function generator(json_path:string, selector:string){
        let parent = document.querySelector(selector)!;
        
        var response = await fetch(json_path);
        var res_ar:Array<Data_class> = await response.json();


        res_ar.forEach(data => {

            let news = document.createElement("a");
            news.classList.add("news");
            
            let click_url = data.click_url;

            if(click_url != null){
                news.href = click_url;
                let is_ext = data.external;
                if(is_ext){
                    news.target = "_blank";
                    news.rel = "noopener"
                }
            }
            parent.appendChild(news);

            let news_img = document.createElement("img");
            news_img.classList.add("news_img");
            news_img.src = data.img ?? "";
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
    }
})();