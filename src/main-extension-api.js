import { log, mod } from './utils.js';
import { get_print_index_by_date } from './get_print_index_by_date.js';
import { apply_to_buttons } from './apply_to_buttons.js';
import { apply_to_elements } from './apply_to_elements.js';
import { parse_color } from './parse_color.js';

const RCTF = window.RCTF = {};

RCTF.parse_color = ( obj = {} ) => {
    if(obj.constructor.name === 'Array'){
        return parse_color.array(obj);
    }
    return parse_color.object( obj );
};

RCTF.COLOR = RCTF.parse_color( );

RCTF.run_color_tag_fix = ( COLOR = RCTF.COLOR, DATE = new Date() ) => {
    if(typeof COLOR === 'object'){
        const print_index = get_print_index_by_date(COLOR, DATE );
        COLOR.color = COLOR.data[ print_index ].desc;
    }
    if(typeof COLOR === 'string'){
        COLOR = { color: COLOR, debug: false };
    }
    apply_to_buttons(COLOR);
    apply_to_elements(COLOR);
};

RCTF.reset = () => {
   return chrome.storage.local.clear();
};




