/********** ********** **********
  color-tag-fix, R7-colorset_api, color-Auto
  by: Dustin Pfister 
  e-mail: dustin.pfister@fingerlakesreuse.org  
  github: https://github.com/dustinpfister/reuse_color_tag_fix 
********** ********** *********/
(function () {
    'use strict';

    const log = function(){
        console.log.apply(null, Array.from( arguments ) );
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

    const get_color_keys = () => {
        return atob('R3JlZW4sUmVkLEJsdWUsT3JhbmdlLFllbGxvdyxMYXZlbmRlcg==').split(',');
    };

    const parse_color_key = (color_key='') => {
        if(typeof color_key != 'string'){
            return color_key;
        }
        const keys= get_color_keys();
        let i = keys.length;
        while(i--){
            if(color_key.length === 1 && ( color_key[0] || '' ).toUpperCase() === keys[i][0]){
                return keys[i];
            }
            if(color_key.toUpperCase() === keys[i].toUpperCase()){
                return keys[i];
            }
        }  
        return color_key;
    };

    const validate_color_key = ( color_key='') => {
        color_key = parse_color_key( color_key );
        const keys = get_color_keys();
        let i = keys.length;
        while(i--){
            if(keys[i] === color_key){
                return color_key;
            }
        }
        return false;
    };

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

    const apply_to_elements = function( COLOR ){
        const el_current_p = document.querySelector('#current-tab>p');
        const el_current_link = Array.from(document.querySelectorAll('.nav-link')).filter(( el)=>{
            return el.href.match(/#current-tab/);
        })[0];
        const color_str = validate_color_key(COLOR.color);
        if(color_str && el_current_p && el_current_link){
            el_current_p.innerText = color_str + ' Tagged Items with Standard Prices...';
            el_current_link.innerText = color_str;
        }
    };

    const COLOR_DEFAULT = {
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
        ],
        color: 'Green'
    };
    const COLOR_ARRAY_DEFAULT = [ COLOR_DEFAULT ];

    const parse_color = {};

    parse_color.object = ( COLOR ) => {
        return Object.assign({}, COLOR_DEFAULT, COLOR);
    };

    parse_color.array = ( COLOR_ARRAY ) => {
        return COLOR_ARRAY_DEFAULT;
    };

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

})();
