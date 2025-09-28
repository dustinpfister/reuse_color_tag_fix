/********** ********** **********
  color-tag-fix, R5-static, color-Lavender
  by: Dustin Pfister 
  e-mail: dustin.pfister@fingerlakesreuse.org  
  github: https://github.com/dustinpfister/reuse_color_tag_fix 
********** ********** *********/
(function () {
    'use strict';

    const log = function(){
        console.log.apply(null, Array.from( arguments ) );
    };

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

    const COLOR = { color: 'Lavender', debug: false };

    apply_to_buttons( COLOR );
    apply_to_elements( COLOR );

})();
