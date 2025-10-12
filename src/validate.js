const get_color_keys = () => {
    return atob('R3JlZW4sUmVkLEJsdWUsT3JhbmdlLFllbGxvdyxMYXZlbmRlcg==').split(',');
};

const parse_color_key = (color_key='') => {
    if(typeof color_key != 'string'){
        return color_key;
    }
    const keys= get_color_keys();
    let i = keys.length;
    while(i--){
        if(color_key.length === 1 && ( color_key[0] || '' ).toUpperCase() === keys[i][0]){
            return keys[i];
        }
        if(color_key.toUpperCase() === keys[i].toUpperCase()){
            return keys[i];
        }
    }  
    return color_key;
};

const validate_color_key = ( color_key='') => {
    color_key = parse_color_key( color_key );
    const keys = get_color_keys();
    let i = keys.length;
    while(i--){
        if(keys[i] === color_key){
            return color_key;
        }
    }
    return false;
};

export { validate_color_key, get_color_keys };
