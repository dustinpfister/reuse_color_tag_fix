/********** ********** **********
  color-tag-fix, R8-colorset_api, color-Auto
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
        let back_color = '';
        while(i < len){
            const el = buttons[i];
            const arr_id = el.id.split('');
            if(arr_id[0] != 'W' && arr_id[0] != 'U' && arr_id.length === 5){
                back_color = el.dataset.back_color;
                if(!back_color){
                    back_color = el.dataset.back_color = validate_color_key(arr_id[0]);
                }
            }
            i += 1;
        }
        return back_color;
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
    //const COLOR_ARRAY_DEFAULT = [ COLOR_DEFAULT ];

    const parse_color = {};

    parse_color.object = ( COLOR ) => {
        const new_color = Object.assign({}, COLOR_DEFAULT, COLOR);
        new_color.color = new_color.data[ new_color.first_index ].desc;
        return new_color;
    };

    parse_color.array = ( COLOR_ARRAY=[] ) => {
        //return COLOR_ARRAY_DEFAULT;
        return COLOR_ARRAY.map( (COLOR) => {
            return parse_color.object( COLOR );
        });
    };

    const gen_outlook = (COLOR, year=2025, month=0) => {
        const days_in_month = ( new Date(2025, 9 + 1, -1)   ).getDate();
        let day = 1;
        const result = {
            year: year,
            month: month,
            days: [],
        };
        while(day <= days_in_month){
            const date = new Date(year, month, day);
            const print_index = get_print_index_by_date( COLOR, date );
            const colorObj = COLOR.data[print_index];
            result.days.push({
                print_index: print_index,
                day: day,
                week_day: date.getDay(),
                color: colorObj.desc
            });
            day += 1;
        }
        return result;
    };

    const Color_Array = {};

    Color_Array.sort_by_date = ( color_arr=[] ) => {
        return color_arr.sort( (a, b) => {
            if( a.first_tuesday.getTime() > b.first_tuesday.getTime()  ){
                return 1;
            }
            if( a.first_tuesday.getTime() < b.first_tuesday.getTime()  ){
                return -1;
            }
            return 0;
        });
    };

    Color_Array.get_times = ( color_arr= [], now = new Date() ) => {
        color_arr = Color_Array.sort_by_date( color_arr );
        return color_arr.map( (color, i) => {
            return {
                ms: color.first_tuesday.getTime() - now.getTime(),
                i : i,
                color: color
            }
        });
    };

    Color_Array.get_obj = ( color_arr=[], now = new Date() ) => {
       color_arr = Color_Array.sort_by_date( color_arr );
       return ColorArr.get_times(color_arr, now)
       .filter((time_result)=>{
           return time_result.ms < 0;
       })
       .sort((a, b)=>{
          if(a.ms > b.ms){
              return -1;
          }
          if(b.ms < a.ms){
              return 1;
          }
          return 0;
       })[0].color;
    };

    // the inject_version plugin will inject the version number here:
    const VERSION = "R8";

    const RCTF = window.RCTF = {};

    RCTF.VERSION = VERSION;

    RCTF.Color_Array = Color_Array;

    RCTF.parse_color = ( obj = {} ) => {
        if(obj.constructor.name === 'Array'){
            return parse_color.array( obj );
        }
        return parse_color.object( obj );
    };

    RCTF.COLOR = RCTF.parse_color( );

    RCTF.get = ( COLOR={} ) => {
        return Color_Array();
    };

    RCTF.gen_outlook = ( COLOR = RCTF.COLOR, year='2025', month=0) => {
        return gen_outlook(COLOR, year, month);
    };

    RCTF.reset = () => {
       return chrome.storage.local.clear();
    };

    const COMMON_WRAP_STYLE = 'border:1px solid black;background:#afafaf;padding:5px;margin-bottom:15px;';

    const get_data1_status_html = (COLOR={}) => {
        let html = '<h3>data1 backend status</h3>' + 
        '<p>The data1 printing color is: '+
        '<span style=\"color:' + COLOR.back_color + ';text-shadow: 1px 1px 0 black;\">' +  COLOR.back_color + '</span>'+
        ', and the RCTF color is: ' + 
        ' <span style=\"color:' + COLOR.color + ';text-shadow: 1px 1px 0 black;\">' + COLOR.color + '</span></p>';
        if(COLOR.back_color != COLOR.color){
            html += '<p style=\"color:red;border:1px solid red;padding:10px;background:#ffffff;\">The CTF color does not match up with what data1 is rendering server side. Please continue to use this chrome extension to make sure you are printing the current color</p>';
        }
        if(COLOR.back_color === COLOR.color){
            html += '<p style=\"color:green;border:1px solid green;padding:10px;background:#ffffff;\">The CTF color does Match up with data1. Unless you are experimenting with a custom configuration, this is a good sign that there has been a patch to the data1 back end code. As such you can remove the CTF extension if this is in fact the case.</p>';
        }
        //const el = document.createElement('div');
        //el.innerHTML = html;
        //el.setAttribute('style', COMMON_WRAP_STYLE);
        //return el;
        return html;
    };
    /*
    const get_config_html = ( COLOR={} ) => {
        let html = '<h3>CTF config </h3>';
        
        let i = 0;
        const len = COLOR.data.length;
        html += '<span>first tuesday : ' + COLOR.first_tuesday.toString() + '<br>';
        html += 'first index : ' + COLOR.first_index + '<br>';
        html += 'ascending : ' + COLOR.ascending + '<br><br></span>';
        html += '<table>';
        html += '<tr><th>index</th><th>Color Name</th></tr>';
        while(i < len){
            const colorObj = COLOR.data[i];
            const first_style = i === COLOR.first_index ? 'border: 1px solid black;' : '';
            html += '<tr style=\"' + first_style + '\">'+
                '<td style=\"padding:5px;\">' + i + '</td>'+
                '<td style=\"padding:5px;\">' + colorObj.desc + '</td>'+
            '</tr>';
            i += 1;
        }
        html += '</table>';
        return html;
    };

    */

    const get_outlook_html = ( COLOR={}, date=new Date(), CELL_SIZE=100 ) => {
        let html = '<h3> Outlook </h3>';
        const result = RCTF.gen_outlook( COLOR, date.getFullYear(), date.getMonth() );
        let week = 0;
        const wrap_size = CELL_SIZE * 6;
        html += '<div style="position:relative;width:'+wrap_size+'px;height:'+wrap_size+'px;">';
        result.days.forEach((dayObj) => {
            const wd = dayObj.week_day;
            const x = Math.round( wd * CELL_SIZE );
            const y = Math.round( week * CELL_SIZE );
            const css_str = 'position:absolute;left:' + x + 'px;top:' + y + 'px;'+
            'width:' + CELL_SIZE + 'px;height:' + CELL_SIZE + 'px;'+
            'background:' + dayObj.color + ';' +
            'border:1px solid black;padding:5px;';
            html += '<div style=\"' + css_str + '\">' + dayObj.day + '</div>';
            if(wd === 6){
                week += 1;
            }
        });
        html += '</div>';
        return html
    };

    const create_config_pannel = (  ) => {
        const el_wrap = document.createElement('div'); 
        const el_color_list = document.create_element('li');
        el_wrap.appendChild(el_color_list);
        
        
        
        //el_color_list.appendChild(el_li);
        
        
        return el_wrap;
    };

    const setup_pane = ( COLOR = RCTF.COLOR ) => {
        let el_wrap = document.getElementById('rctf_pane_wrap');
        if(el_wrap){
            return el_wrap;
        }
        
        console.log('rctf_pane_wrap pane not found. Creating and in injecting it...');
        
        el_wrap = document.createElement('div');
        el_wrap.setAttribute('id', 'rctf_pane_wrap');
        
        {
            let el = document.createElement('div');
            el.id='rctf_info_data1_status';
            el.setAttribute('style', COMMON_WRAP_STYLE);
            el_wrap.appendChild( el );
        }
        
        {
            //let el = document.createElement('div');
            //el.id='rctf_info_config';
            //el.setAttribute('style', COMMON_WRAP_STYLE);
            //el_wrap.appendChild( el );
        }

        {
            let el = document.createElement('div');
            el.id='rctf_info_outlook';
            el.setAttribute('style', COMMON_WRAP_STYLE);
            el_wrap.appendChild( el );
        }
        
        const colors = get_color_keys();
        
        console.log(colors);
        
        
        inject_pane('ctf', 'Color Tag Fix ' + RCTF.VERSION, el_wrap);
        return el_wrap;
    };

    const update_pane = ( COLOR = RCTF.COLOR, now = new Date() ) => {
        
        let el_wrap = setup_pane( COLOR );
        
        let el = document.getElementById('rctf_info_data1_status');
        
        console.log('update for data1 status info:');
        console.log(COLOR);
        
        el.innerHTML = get_data1_status_html( COLOR );

        //el = document.getElementById('rctf_info_config');
        //el.innerHTML = get_config_html( COLOR );

        el = document.getElementById('rctf_info_outlook');
        el.innerHTML = get_outlook_html( COLOR, new Date(), 100 );

        
        console.log('','el_wrap',el_wrap,'');

    };

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
        update_pane(COLOR, DATE);
    };

    RCTF.run_5 = ( DATE = new Date() ) => {
        RCTF.run_color_tag_fix( RCTF.parse_color({
            first_tuesday : new Date(2025, 8, 9),
            first_index : 0,
            ascending: true,
            data : [  
                { i: 0, desc: 'Green',  web: '#00ff00' },
                { i: 1, desc: 'Blue',   web: '#0000ff' },
                { i: 2, desc: 'Yellow', web: '#ffff00' },
                { i: 3, desc: 'Orange', web: '#ff8800' },
                { i: 4, desc: 'Red',    web: '#ff0000' }
            ]
        }), DATE);
    };

    RCTF.run_6 = ( DATE = new Date() ) => {
        RCTF.run_color_tag_fix( RCTF.parse_color({
            first_tuesday : new Date(2025, 0, 7),
            first_index : 0,
            ascending: false,
            data : [
                { i: 0, desc: 'Lavender', web: '#ff00aa' },
                { i: 1, desc: 'Green',    web: '#00ff00' },
                { i: 2, desc: 'Red',      web: '#ff0000' },
                { i: 3, desc: 'Orange',   web: '#ff8800' },
                { i: 4, desc: 'Yellow',   web: '#ffff00' },
                { i: 5, desc: 'Blue',     web: '#0000ff' }
            ]
        }), DATE);
    };

})();
