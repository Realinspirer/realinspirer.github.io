const post_tag_searcher = (function() {


     async function return_found_tagged_items(data_raw:Array<Data_class_multiple_imgs_btn>, limit:number = 0, ...tag:Array<string>):Promise<Array<Data_class_multiple_imgs_btn>> {
        let data:Array<Data_class_multiple_imgs_btn> = [];

        let items_added = 0;
        if(tag != null && tag.length > 0){
            
            for (let index = 0; index < data_raw.length; index++) {
                const element = data_raw[index];
                let element_tags = element.tags?.split(",");
                if(element_tags != null && element_tags.length > 0){

                    for (let tag_ind = 0; tag_ind < element_tags.length; tag_ind++) {
                        
                        const x = element_tags[tag_ind];
                        if(tag.some(ta => ta.toLowerCase().trim() == x.toLowerCase().trim())){
                            data.push(element);
                            items_added++;
                            break;
                        }
                    }
                    if(limit > 0 && items_added >= limit){
                        break;
                    }
                }
                await new Promise(resolve => setTimeout(resolve, 5));
            }
        }
        else{
            data = data_raw;
        }
        return data;
    }


    async function return_found_tagged_items_searched(data_raw:Array<Data_class_multiple_imgs_btn>, limit:number = 0, tag_searched:Array<string>, ...tag:Array<string>):Promise<Array<Data_class_multiple_imgs_btn>> {
        let data:Array<Data_class_multiple_imgs_btn> = [];

        let items_added = 0;
        if(tag != null && tag.length > 0){
            
            for (let index = 0; index < data_raw.length; index++) {
                const element = data_raw[index];
                let element_tags = element.tags?.split(",");
                if(element_tags != null && element_tags.length > 0){

                    for (let tag_ind = 0; tag_ind < element_tags.length; tag_ind++) {
                        
                        const x = element_tags[tag_ind];
                        if(tag.some(ta => ta.toLowerCase().trim() == x.toLowerCase().trim())){
                            data.push(element);
                            items_added++;
                            break;
                        }
                    }
                    if(limit > 0 && items_added >= limit){
                        break;
                    }
                }
                await new Promise(resolve => setTimeout(resolve, 5));
            }
        }
        else{
            data = data_raw;
        }
        return return_only_tagged(data, ...tag_searched);
    }

    function return_only_tagged(data_raw:Array<Data_class_multiple_imgs_btn>, ...search_tags:Array<string>):Array<Data_class_multiple_imgs_btn>{

        if(search_tags == null || search_tags.length <= 0){
            return data_raw;
        }
        let to_return:Array<Data_class_multiple_imgs_btn> = []; 
        
        for (let index = 0; index < data_raw.length; index++) {
            let has_all = true;
            const element = data_raw[index];
            const tags_ele = element.tags?.split(",");
            search_tags.forEach(x => {
                if(tags_ele != null){
                    if(!tags_ele.some(ta => ta.toLowerCase().trim() == x.toLowerCase().trim())){
                        has_all = false;
                    }
                }
                else{
                    has_all = false;
                }
            });

            if(has_all){
                to_return.push(element);
            }
        }

        return to_return; 
    }
    
    async function return_found_tagged_items_excluded(data_raw:Array<Data_class_multiple_imgs_btn>, limit:number = 0, ...tag:Array<string>):Promise<Array<Data_class_multiple_imgs_btn>> {

        let items_added = 0;
        let data:Array<Data_class_multiple_imgs_btn> = [];
        if(tag != null && tag.length > 0){
            
            for (let index = 0; index < data_raw.length; index++) {
                const element = data_raw[index];
                let element_tags = element.tags?.split(",");
                if(element_tags != null && element_tags.length > 0){

                    let to_add = true;
                    for (let tag_ind = 0; tag_ind < element_tags.length; tag_ind++) {
                        
                        const x = element_tags[tag_ind];
                        if(tag.some(ta => ta.toLowerCase().trim() == x.toLowerCase().trim())){
                            to_add = false;
                            break;
                        }
                    }
                    if(to_add){
                        data.push(element);
                        items_added++;
                    }
                    if(limit > 0 && items_added >= limit){
                        break;
                    }
                }
                await new Promise(resolve => setTimeout(resolve, 5));
            }
        }
        else{
            data = data_raw;
        }
        return data;
    }

    return{
        return_found_tagged_items:return_found_tagged_items,
        return_found_tagged_items_searched:return_found_tagged_items_searched,
        return_found_tagged_items_excluded:return_found_tagged_items_excluded
    }

})();