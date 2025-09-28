/********** ********** **********
  color-tag-fix, R5-static, color-Red
  by: Dustin Pfister 
  e-mail: dustin.pfister@fingerlakesreuse.org  
  github: https://github.com/dustinpfister/reuse_color_tag_fix 
********** ********** *********/
(function () {
    'use strict';

    const log = function(){
        console.log.apply(null, Array.from( arguments ) );
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

    const COLOR = { color: 'Red', debug: false };

    apply_to_buttons( COLOR );
    apply_to_elements( COLOR );

})();
