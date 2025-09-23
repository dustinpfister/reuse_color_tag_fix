/******** **********
    COLOR TAG FIX - R2 - by Dustin.

    USER INFO :
        Copy and paste this javaScript code, and only this javaScript code
    into the javaScript console (ctrl + shift + j). Although this text 
    constitutes a JavaScript comment, ideally you will want to start copying
    the code where the IIFE ( Immediately Invoked Function Expression ) starts
    this begins with (function(){... and ends with ...}())
        You will have to enter 'allow pasting' into the console if prompted. 
    This is put in place to protect people from being duped into copying 
    malicious code into a website.
        If all goes well the end result should be the current proper tag 
    color set in data1. However you will have to re-renter this code if you 
    reload the page, or navigate away for any reason.
        One way to make it easier to re-enter would be to do what Louis 
    Suggests which is to use what is called a 'Bookmarklet' 
    ( https://en.wikipedia.org/wiki/Bookmarklet ). This would involve 
    creating a bookmark but in place of the usual http: protocol for the URL, 
    use the javascript: protocol followed by this javascript code to create 
    the bookmark. When at data1, you can then just use the bookmark to run 
    the code. For R3 I am working on a solution that involves generating a 
    bookmarks import file, among other things, but until then you will have 
    to create these manually.

    DEV INFO :
        This script works by setting the id, and className attributes of button 
    elements to what they should be for the current color tag in the data1
    client system. In addition it can also set what the current color is based
    on the date of client system by making use of the core javaScript Date class. 
        The COLOR.data array is the collection of current COLORS used. The 
    number of elements, AND the order of the elements in this array is of 
    concern if you need to mutate the value.
        COLOR.first_tusday is used as a reference date to know how many Tuesdays 
    have passed since this reference date when compared to the current date. 
    Aside from the fact that this date should be a tusday, it should also 
    correspond to the value set in COLOR.first_index in order to calibrate the
    script properly. 
       In addition to setting the button elements to the desired
    state, it can also be used to set any color at any time, but disabling
    COLOR.autoset, in such a case the value of COLOR.first_index will be used.
        So then to calibrate this set the first
    If you need to work on this, set COLOR.debug to true, and look at 
    the output when entering the script into the javaScript console when 
    viewing data1 you should see lines like 'BTBKS btn Blue-tag btn-lg' 
    if the current color should be Blue.
      Also to help not repeat the mistake I made in R1 of this script make sure
    to always hard reload the browser when making a change, on top of making
    sure the output looks good.
    
    The general testing process should involve the following:
    
    * Set the script into debug mode ( COLOR.debug = true; );
    * Make sure that you hard reload the page with every change.
    * The id strings should look like 'BTBKS' if the current color is Blue
    * The className strings look like 'btn Blue-tag btn-lg' if the current 
      color is Blue.
    * The code should work without issue when used as a Bookmarklet 
      via the javascript protocol for the url value of a bookmark
    * If you have access to a printer do a print only test, and make 
      sure that result looks as it should.
    
******** **********/
(function(){
    const COLOR = {};
    COLOR.autoset = true;
    COLOR.debug = false;
    COLOR.first_tuesday = new Date(2025, 9 - 1, 16); // <-- the ref date ( months are zero relative with js dates )
    COLOR.first_index = 0;        // <-- what index in COLOR.data should line up with the reference date
    COLOR.data = [ // <-- The order of this matters!
        { i: 0, desc: 'Green',    web: '#00ff00' },
        { i: 1, desc: 'Red',      web: '#ff0000' },
        { i: 2, desc: 'Orange',   web: '#ff8800' },
        { i: 3, desc: 'Yellow',   web: '#ffff00' },
        { i: 4, desc: 'Blue',     web: '#0000ff' }
    ];
    const NOW = new Date(); // <-- need to do some testing change what 'NOW' is to see what happens
    const log = function(){
       if(COLOR.debug){
           console.log.apply(null, Array.from( arguments ) );
       }
    };
    const mod = function(x, m) {
        return (x % m + m) % m;
    };
    const keys = COLOR.data.map((obj, i)=>{ return i; });
    const get_current_colors = ( print_index=0 ) => {
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
    const time = NOW.getTime();
    const ms = Math.round( time - COLOR.first_tuesday.getTime() );
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
}());
