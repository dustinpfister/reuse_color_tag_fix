import { validate_color_key } from './validate.js';
const apply_to_elements = function( COLOR ){
    const el_current_p = document.querySelector('#current-tab>p');
    const el_current_link = Array.from( document.querySelectorAll('.nav-link') ).filter(( el )=>{
        if(!el.href){
            return false;
        }
    
        const m = el.href.match(/#current-tab/);
        if(m){
           return true
        }
        return false;
    })[0];
    const color_str = validate_color_key(COLOR.color);
    if(color_str && el_current_p && el_current_link){
        el_current_p.innerText = color_str + ' Tagged Items with Standard Prices...';
        el_current_link.innerText = color_str;
    }
};
export { apply_to_elements };
