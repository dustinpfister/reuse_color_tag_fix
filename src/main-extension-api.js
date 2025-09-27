import { log, mod } from './utils.js';
import { get_print_index_by_date } from './get_print_index_by_date.js';
import { apply_to_buttons } from './apply_to_buttons.js';
import { apply_to_elements } from './apply_to_elements.js';
import { parse_color } from './parse_color.js';

const RCTF = window.RCTF = {};

RCTF.parse_color = ( obj ) => {
    if(obj.constructor.name === 'Array'){
        return parse_color.array(obj);
    }
    return parse_color.object( obj );
};

RCTF.run_color_tag_fix = ( DATE = new Date(), color_obj = COLOR ) => {
    const print_index = get_print_index_by_date(COLOR, DATE );
    color_obj.color = color_obj.data[ print_index ].desc;
    apply_to_buttons(color_obj);
    apply_to_elements(color_obj);
};

const COLOR = RCTF.parse_color( { } );

log('color: ',COLOR);

RCTF.run_color_tag_fix( new Date(), COLOR );


