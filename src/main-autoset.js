import { apply_to_buttons } from './apply_to_buttons.js';

const log = function(){
    const con = window.console;
    if(COLOR.debug){
        con.log.apply(null, Array.from( arguments ) );
    }
};
const mod = function(x, m) {
    return (x % m + m) % m;
};

const get_print_index_by_date = (COLOR, DATE=new Date()) => {
    const time = DATE.getTime();
    const ms = Math.round( time  - COLOR.first_tuesday.getTime() );
    const week_count = Math.floor( ms  / ( 1000  * 60 * 60 * 24 * 7) );
    if(COLOR.autoset){
        const week_delta = week_count * ( COLOR.ascending ? 1 : -1 );
        return mod(COLOR.first_index + week_delta, COLOR.data.length);
    }
    return COLOR.first_index;
};

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

const print_index = get_print_index_by_date(COLOR, new Date() );
COLOR.color = COLOR.data[ print_index ].desc;

apply_to_buttons(COLOR);
