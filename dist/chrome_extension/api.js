(function(){
    const COLOR = {};
    COLOR.autoset = true;
    COLOR.debug = true;
    COLOR.first_tuesday = new Date(2025, 9 - 1, 16); // <-- the ref date ( months are zero relative with js dates )
    COLOR.first_index = 0;        // <-- what index in COLOR.data should line up with the reference date
    COLOR.data = [ // <-- The order of this matters!
        { i: 0, desc: 'Green',    web: '#00ff00' },
        { i: 1, desc: 'Red',      web: '#ff0000' },
        { i: 2, desc: 'Orange',   web: '#ff8800' },
        { i: 3, desc: 'Yellow',   web: '#ffff00' },
        { i: 4, desc: 'Blue',     web: '#0000ff' }
    ];
    const log = function(){
        const con = window.console;
        if(COLOR.debug){
            con.log.apply(null, Array.from( arguments ) );
        }
    };
    const mod = function(x, m) {
        return (x % m + m) % m;
    };
    const get_current_colors = ( print_index=0 ) => {
        const keys = COLOR.data.map((obj, i)=>{ return i; });
        if( typeof print_index === 'string' ){
            const options = COLOR.data.filter((obj)=>{
                return obj.desc === print_index.toLowerCase().trim();
            });
            if(options.length >= 1){
               print_index = options[0].i;
            }
            if(options.length === 0){
                print_index = 0;
            }
        }
        const len = keys.length;
        const pi = print_index % len;
        return {
            print: COLOR.data[ keys[ pi ] ],
            d25: COLOR.data[ keys[ ( pi + 2 ) % len ] ],
            d50: COLOR.data[ keys[ ( pi + 3 ) % len ] ],
            cull: COLOR.data[ keys[ ( pi + 4 ) % len ] ]
        };
    };
    const RCTF = window.RCTF = {};
    // need to do some testing change what 'NOW' is to see what happens
    // months are zero relative with js dates so:
    // new Date(2025, 8, 16 ) is Sep 16th 2025
    RCTF.run_color_tag_fix = ( NOW= new Date() ) => {
        const time = NOW.getTime();
        const ms = Math.round( ( time + 1 ) - COLOR.first_tuesday.getTime() );
        const tuesday_count = Math.ceil( ms  / ( 1000  * 60 * 60 * 24 * 7) );
        let print_index = COLOR.first_index;
        if(COLOR.autoset){
            print_index = mod(COLOR.first_index - tuesday_count, COLOR.data.length);
        }
        const cd = get_current_colors(print_index);
        const CLASS_STR = "btn " + cd.print.desc + "-tag btn-lg";
        Array.prototype.forEach.call( document.getElementsByTagName('button'), ( el, i )=>{
            const arr_id = el.id.split('');
            if(arr_id[0] != 'W' && arr_id[0] != 'U' && arr_id.length === 5 && cd.print.desc){
                el.id = cd.print.desc[0] + arr_id.slice(1, 5).join('');
                el.className = CLASS_STR;
                log(i + ')');
                log('    id: \"' + el.id + '\"');
                log('    className: \"' + el.className + '\"' );
            }
        });
        log('It has been ' + tuesday_count + ' weeks sense the reference date of ' +  COLOR.first_tuesday);
    };
    log('the API has been loaded, running automatic color tag fix.');
    RCTF.run_color_tag_fix();
}());
