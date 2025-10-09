/********** ********** **********
  color-tag-fix, R8-autoset, color-Auto
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
        {
            const week_delta = week_count * ( 1  );
            return mod(COLOR.first_index + week_delta, COLOR.data.length);
        }
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
        const el_current_link = Array.from( document.querySelectorAll('.nav-link') ).filter(( el )=>{
            if(!el.href){
                return false;
            }
        
            const m = el.href.match(/#current-tab/);
            if(m){
               return true
            }
            return false;
        })[0];
        const color_str = validate_color_key(COLOR.color);
        if(color_str && el_current_p && el_current_link){
            el_current_p.innerText = color_str + ' Tagged Items with Standard Prices...';
            el_current_link.innerText = color_str;
        }
    };

    const COLOR = {
        debug: false,
        first_tuesday: new Date(2025, 9 - 1, 9, 0, 0, 0, 0),
        first_index: 0,
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
    apply_to_elements(COLOR);

})();
