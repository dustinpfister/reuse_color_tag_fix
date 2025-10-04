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

    const get_html_color = function(){
        const buttons = document.getElementsByTagName('button');
        let i = 0, len = buttons.length;
        while(i < len){
            const el = buttons[i];
            const arr_id = el.id.split('');
            if(arr_id[0] != 'W' && arr_id[0] != 'U' && arr_id.length === 5){
                 return validate_color_key( el.id[0]  );
            }
            i += 1;
        }
        return '';
    };

    const inject_pane = ( id_prefix='ctf', label='Color Tag Fix', content='' ) => {
        const el_li = document.createElement('li');
        const id_pane = id_prefix + '-pane';
        el_li.innerText = label;
        el_li.setAttribute('id', id_prefix + '-nav-link');
        el_li.setAttribute('class', 'targetTabChange nav-link');
        el_li.setAttribute('style', 'cursor:pointer;');
        el_li.setAttribute('href', '#' + id_pane );
        el_li.setAttribute('data-toggle', 'tab');
        el_li.setAttribute('role', 'tab');
        el_li.setAttribute('aria-selected', 'false');
        const nav_parent = document.querySelectorAll('.nav-tabs')[0];
        nav_parent.appendChild(el_li);
        nav_parent.addEventListener('click', (el) => {
            if(el.target != el_li){
                el_li.className = 'targetTabChange nav-link';
                el_li.setAttribute('aria-selected', 'false');
            }
        });
        const el_div = document.createElement('div');
        if(typeof content === 'string'){
            el_div.innerText = content;
        }
        if(typeof content === 'object'){
            el_div.appendChild(content);
        }
        el_div.setAttribute('class', 'tab-pane');
        el_div.setAttribute('id', id_pane);
        el_div.setAttribute('role', 'tabpanel');
        document.querySelectorAll('.tab-content')[0].appendChild(el_div);
    };
    const remove_pane = ( id_prefix='ctf' ) => {
         [id_prefix + '-nav-link', id_prefix + '-pane'].forEach( (id) => {
             const el = document.getElementById(id);
             if(el){
                 el.remove();
             }
         });
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

    // the inject_version plugin will inject the version number here:
    const VERSION = "R7";

    const RCTF = window.RCTF = {};

    RCTF.VERSION = VERSION;

    RCTF.setup_pane = (COLOR) => {

        const el_pane = document.createElement('p');
        el_pane.innerHTML = 'data1 backend color is: <span style=\"color:' + COLOR.back_color + ';text-shadow: 1px 1px 0 black;\">' +  COLOR.back_color + '</span>,'+
        ' RCTF color is <span style=\"color:' + COLOR.color + ';text-shadow: 1px 1px 0 black;\">' + COLOR.color + '</span>';
        

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

})();
