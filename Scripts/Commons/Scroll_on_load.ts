(function(){

    class Key_value_pair{
        key:string|null = null;
        value?:string|null = null;        
    }
    const req_converters:Array<Key_value_pair> = [{key:"3D", value:"Animations"}]
    
    window.addEventListener("load", scroll_to_id);
    window.addEventListener("hashchange", scroll_to_id);

    function scroll_to_id(){
        const url = window.location;
        if(url != null){
            const hash = converter(url.hash);
            if(hash != null && hash != ""){
                setTimeout(() => {
                    document.documentElement.scrollTo(0, document.querySelector<HTMLElement>(hash)!.offsetTop - 30);
                }, 300);
            }
        }
    }    

    function converter(to_convert:string){
        const req = req_converters.filter(x => `#${x.key}` == to_convert);
        if(req != null && req.length > 0){
            return `#${req[0].value}`;
        }
        else{
            return to_convert;
        }
    }
})();