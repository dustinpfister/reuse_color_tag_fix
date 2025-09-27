/********** ********** **********
  color-tag-fix, R5-static, color-Green
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

    const COLOR$1 = { color: 'Green', debug: false };

    apply_to_buttons( COLOR$1 );
    apply_to_elements( COLOR$1 );

})();
