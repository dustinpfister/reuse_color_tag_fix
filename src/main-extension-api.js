import { log, mod } from './utils.js';
import { get_print_index_by_date } from './get_print_index_by_date.js';
import { get_html_color } from './get_html_color.js';
import { inject_pane, remove_pane } from './inject_pane.js';
import { apply_to_buttons } from './apply_to_buttons.js';
import { apply_to_elements } from './apply_to_elements.js';
import { parse_color } from './parse_color.js';

// the inject_version plugin will inject the version number here:
//[INJECT_VERSION]

const RCTF = window.RCTF = {};

RCTF.VERSION = VERSION;

RCTF.setup_pane = (COLOR) => {

    const el_pane = document.createElement('p');
    el_pane.innerHTML = '<p>data1 backend color is: '+
    '<span style=\"color:' + COLOR.back_color + ';text-shadow: 1px 1px 0 black;\">' +  COLOR.back_color + '</span>,'+
    ' RCTF color is' + 
    ' <span style=\"color:' + COLOR.color + ';text-shadow: 1px 1px 0 black;\">' + COLOR.color + '</span></p>';
    

    inject_pane('ctf', 'Color Tag Fix', el_pane);
};

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
    
    COLOR.back_color = get_html_color();
    
    if(COLOR.back_color === COLOR.color){
        console.log('');
        console.log('both data1 and CTF color are:' + COLOR.color );
        console.log('unless you are using a custom config, you may be able to remove this extension now.');
        console.log('');
    }
    
    if(COLOR.back_color != COLOR.color){
        console.log('');
        console.log('data1 backend color is: ' + COLOR.back_color );
        console.log('CTF color is: ' + COLOR.color );
        console.log('Please continue using this extension.');
        console.log('');
    }
    
    apply_to_buttons(COLOR);
    apply_to_elements(COLOR);
};

RCTF.reset = () => {
   return chrome.storage.local.clear();
};




