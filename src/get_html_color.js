import { log } from './utils.js';
import { validate_color_key } from './validate.js';
const get_html_color = function(){
    const buttons = document.getElementsByTagName('button');
    let i = 0, len = buttons.length;
    while(i < len){
        const el = buttons[i];
        const arr_id = el.id.split('');
        if(arr_id[0] != 'W' && arr_id[0] != 'U' && arr_id.length === 5){
             console.log( validate_color_key( el.id[0]  ));
        }
        i += 1;
    }
};
export { get_html_color };
