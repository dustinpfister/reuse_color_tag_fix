import { log, mod } from './utils.js';
import { get_print_index_by_date } from './get_print_index_by_date.js';
import { apply_to_buttons } from './apply_to_buttons.js';
import { apply_to_elements } from './apply_to_elements.js';

const COLOR = {
    autoset: true,
    debug: false,
    first_tuesday: new Date(2025, 9 - 1, 9, 0, 0, 0, 0),
    first_index: 0,
    ascending: true,
    data: [  
        { i: 0, desc: 'Green',  web: '#00ff00' },
        { i: 1, desc: 'Blue',   web: '#0000ff' },
        { i: 2, desc: 'Yellow', web: '#ffff00' },
        { i: 3, desc: 'Orange', web: '#ff8800' },
        { i: 4, desc: 'Red',    web: '#ff0000' }
    ]
};

const RCTF = window.RCTF = {};

RCTF.run_color_tag_fix = ( DATE = new Date(), color_obj = COLOR ) => {
    const print_index = get_print_index_by_date(COLOR, DATE );
    color_obj.color = color_obj.data[ print_index ].desc;
    apply_to_buttons(color_obj);
    apply_to_elements(color_obj);
};

RCTF.run_color_tag_fix( new Date(), COLOR );


