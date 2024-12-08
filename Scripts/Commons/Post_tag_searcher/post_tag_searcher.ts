const post_tag_searcher = (function() {


     async function return_found_tagged_items(data_raw:Array<Data_class_multiple_imgs_btn>, ...tag:Array<string>):Promise<Array<Data_class_multiple_imgs_btn>> {
        let data:Array<Data_class_multiple_imgs_btn> = [];
        if(tag != null && tag.length > 0){
            
            for (let index = 0; index < data_raw.length; index++) {
                const element = data_raw[index];
                let element_tags = element.tags?.split(",");
                if(element_tags != null && element_tags.length > 0){

                    for (let tag_ind = 0; tag_ind < element_tags.length; tag_ind++) {
                        
                        const x = element_tags[tag_ind];
                        if(tag.some(ta => ta.toLowerCase().trim() == x.toLocaleLowerCase().trim())){
                            data.push(element);
                            break;
                        }
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
    
    async function return_found_tagged_items_excluded(data_raw:Array<Data_class_multiple_imgs_btn>, ...tag:Array<string>):Promise<Array<Data_class_multiple_imgs_btn>> {
        let data:Array<Data_class_multiple_imgs_btn> = [];
        if(tag != null && tag.length > 0){
            
            for (let index = 0; index < data_raw.length; index++) {
                const element = data_raw[index];
                let element_tags = element.tags?.split(",");
                if(element_tags != null && element_tags.length > 0){

                    let to_add = true;
                    for (let tag_ind = 0; tag_ind < element_tags.length; tag_ind++) {
                        
                        const x = element_tags[tag_ind];
                        if(tag.some(ta => ta.toLowerCase().trim() == x.toLocaleLowerCase().trim())){
                            to_add = false;
                            break;
                        }
                    }
                    if(to_add){
                        data.push(element);
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
        return_found_tagged_items_excluded:return_found_tagged_items_excluded
    }

})();