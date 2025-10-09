import { log, mod } from './utils.js';
import { get_print_index_by_date } from './get_print_index_by_date.js';
import { get_html_color } from './get_html_color.js';
import { inject_pane, remove_pane } from './inject_pane.js';
import { apply_to_buttons } from './apply_to_buttons.js';
import { apply_to_elements } from './apply_to_elements.js';
import { parse_color } from './parse_color.js';
import { gen_outlook } from './gen_outlook.js';

// the inject_version plugin will inject the version number here:
//[INJECT_VERSION]

const RCTF = window.RCTF = {};

RCTF.VERSION = VERSION;

RCTF.parse_color = ( obj = {} ) => {
    if(obj.constructor.name === 'Array'){
        return parse_color.array( obj );
    }
    return parse_color.object( obj );
};

RCTF.COLOR = RCTF.parse_color( );



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

const get_color_config_html = ( COLOR={} ) => {
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

const get_outlook_html = ( COLOR={}, date=new Date(), CELL_SIZE=100 ) => {
    let html = '<h3> Outlook </h3>';
    const result = RCTF.gen_outlook( COLOR, date.getFullYear(), date.getMonth() );
    let week = 0;
    const wrap_size = CELL_SIZE * 6;
    html += '<div style="position:relative;width:'+wrap_size+'px;height:'+wrap_size+'px;">'
    result.days.forEach((dayObj) => {
        const wd = dayObj.week_day;
        const x = Math.round( wd * CELL_SIZE )
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
        //el.innerHTML = get_data1_status_html( COLOR );
        el.setAttribute('style', COMMON_WRAP_STYLE);
        el_wrap.appendChild( el );
    }
    {
        let el = document.createElement('div');
        el.id='rctf_info_config';
        //el.innerHTML = get_color_config_html( COLOR );
        el.setAttribute('style', COMMON_WRAP_STYLE);
        el_wrap.appendChild( el );
    }
    {
        let el = document.createElement('div');
        el.id='rctf_info_outlook';
        //el.innerHTML = get_outlook_html( COLOR, new Date(), 100 );
        el.setAttribute('style', COMMON_WRAP_STYLE);
        el_wrap.appendChild( el );
    }   
    inject_pane('ctf', 'Color Tag Fix ' + RCTF.VERSION, el_wrap);
    return el_wrap;
};

const update_pane = ( COLOR = RCTF.COLOR, now = new Date() ) => {
    
    let el_wrap = setup_pane( COLOR );
    
    let el = document.getElementById('rctf_info_data1_status');
    
    console.log('update for data1 status info:');
    console.log(COLOR);
    
    el.innerHTML = get_data1_status_html( COLOR );

    el = document.getElementById('rctf_info_config');
    el.innerHTML = get_color_config_html( COLOR );

    el = document.getElementById('rctf_info_outlook');
    el.innerHTML = get_outlook_html( COLOR, new Date(), 100 );

    
    console.log('','el_wrap',el_wrap,'')

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



