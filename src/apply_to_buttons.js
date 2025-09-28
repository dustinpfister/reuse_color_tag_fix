import { log } from './utils.js';
const apply_to_buttons = function( COLOR = {} ){
    COLOR = Object.assign({}, { color: '', debug: false }, COLOR);
    COLOR.color = COLOR.color[0].toUpperCase() + COLOR.color.substring(1, COLOR.color.length );
    const COLOR_CHAR = COLOR.color[0].toUpperCase();
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
