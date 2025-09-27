/********** ********** **********
  color-tag-fix, R5-colorset_api, color-Auto
  by: Dustin Pfister 
  e-mail: dustin.pfister@fingerlakesreuse.org  
  github: https://github.com/dustinpfister/reuse_color_tag_fix 
********** ********** *********/
(function () {
    'use strict';

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

    const apply_to_buttons = function( opt= {} ){
        opt = Object.assign({}, { color: '', debug: false }, opt);
        opt.color = opt.color[0].toUpperCase() + opt.color.substring(1, opt.color.length );
        const COLOR_CHAR = opt.color[0].toUpperCase();
        const CLASS_STR = 'btn ' + opt.color + '-tag btn-lg';
        const buttons = document.getElementsByTagName('button');
        let i = 0, len = buttons.length;
        while(i < len){
            const el = buttons[i];
            const arr_id = el.id.split('');
            if(arr_id[0] != 'W' && arr_id[0] != 'U' && arr_id.length === 5){
                 el.id = COLOR_CHAR + arr_id.slice(1, 5).join('');
                 el.className = CLASS_STR;
                 if(opt.debug){
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
        if(COLOR.color && el_current_p && el_current_link){
            el_current_p.innerText = COLOR.color + ' Tagged Items with Standard Prices...';
            el_current_link.innerText = COLOR.color;
        }
    };

    const COLOR$1 = {
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

    RCTF.run_color_tag_fix = ( DATE = new Date(), color_obj = COLOR$1 ) => {
        const print_index = get_print_index_by_date(COLOR$1, DATE );
        color_obj.color = color_obj.data[ print_index ].desc;
        apply_to_buttons(color_obj);
        apply_to_elements(color_obj);
    };

    RCTF.run_color_tag_fix( new Date(), COLOR$1 );

})();
