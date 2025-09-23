/* color-tag-fix, R3-static Red by Dustin */
(function () {
    'use strict';

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
                     console.log( 'id='+ el.id, 'className=' + el.className );
                 }
            }
            i += 1;
        }
    };

    const COLOR = { color: 'Red', debug: false };

    apply_to_buttons( COLOR );

})();
