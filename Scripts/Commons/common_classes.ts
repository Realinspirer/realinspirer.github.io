class Data_class{
    title:string;
    date:string|null;
    img:string|null;
    click_url:string|null;
    external:boolean|null;
    custom_data:string|null;

    constructor(title:string, date:string|null, img:string|null,
                click_url:string|null, external:boolean|null,
                custom_data:string|null
    ){
        this.title = title;
        this.date = date;
        this.img = img;
        this.click_url = click_url;
        this.external = external;
        this.custom_data = custom_data;
    }
}