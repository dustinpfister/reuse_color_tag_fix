import { log } from './utils.js';
import { validate_color_key } from './validate.js';
const get_html_color = function(){
    const buttons = document.getElementsByTagName('button');
    let i = 0, len = buttons.length;
    let back_color = '';
    while(i < len){
        const el = buttons[i];
        const arr_id = el.id.split('');
        if(arr_id[0] != 'W' && arr_id[0] != 'U' && arr_id.length === 5){
            back_color = el.dataset.back_color;
            if(!back_color){
                back_color = el.dataset.back_color = validate_color_key(arr_id[0]);
            }
        }
        i += 1;
    }
    return back_color;
};
export { get_html_color };
