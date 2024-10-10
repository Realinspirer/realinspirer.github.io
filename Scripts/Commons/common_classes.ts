class Data_class{
    title:string;
    subtitle:string|null;
    date:string|null;
    img:string|null;
    click_url:string|null;
    external:boolean|null;
    custom_data:string|null;

    constructor(title:string, subtitle:string|null, date:string|null, img:string|null,
                click_url:string|null, external:boolean|null,
                custom_data:string|null
    ){
        this.title = title;
        this.subtitle = subtitle;
        this.date = date;
        this.img = img;
        this.click_url = click_url;
        this.external = external;
        this.custom_data = custom_data;
    }
}
class btn_data{
    btn_string?:string;
    click_url?:string;
    custom_data?:string;
    external?:boolean;
}
class Data_class_multiple_imgs_btn{
    title:string;
    subtitle?:string|null;
    date?:string|null;
    imgs?:Array<string>|null;
    click_url?:string|null;
    external?:boolean|null;
    btns?:Array<btn_data>;
    custom_data?:string|null;

    constructor(title:string, subtitle:string|null, date:string|null, imgs:Array<string>|null,
                click_url:string|null, external:boolean|null, btns?:Array<btn_data>,
                custom_data?:string|null
    ){
        this.title = title;
        this.subtitle = subtitle;
        this.date = date;
        this.imgs = imgs;
        this.click_url = click_url;
        this.external = external;
        this.btns = btns;
        this.custom_data = custom_data;
    }

}