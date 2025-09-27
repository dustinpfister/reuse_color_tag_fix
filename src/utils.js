const log = function(){
    const con = window.console;
    
    //if(COLOR.debug){
        con.log.apply(null, Array.from( arguments ) );
    //}
};
const mod = function(x, m) {
    return (x % m + m) % m;
};
export { log, mod };
