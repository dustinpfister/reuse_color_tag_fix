import { log } from './utils.js';
import { validate_color_key } from './validate.js';
const apply_to_buttons = function( COLOR = {} ){
    COLOR.color = validate_color_key( COLOR.color );
    if(!COLOR.color){
        log('invalid color');
        return;
    }
    const COLOR_CHAR = COLOR.color[0];
    const CLASS_STR = 'btn ' + COLOR.color + '-tag btn-lg';
    const buttons = document.getElementsByTagName('button');
    let i = 0, len = buttons.length;
    while(i < len){
        const el = buttons[i];
        const arr_id = el.id.split('');
        if(arr_id[0] != 'W' && arr_id[0] != 'U' && arr_id.length === 5){
             el.id = COLOR_CHAR + arr_id.slice(1, 5).join('');
             el.className = CLASS_STR;
             if(COLOR.debug){
                 log( 'id='+ el.id, 'className=' + el.className );
             }
        }
        i += 1;
    }
};
export { apply_to_buttons };
