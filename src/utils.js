const log = function(){
    console.log.apply(null, Array.from( arguments ) );
};
const mod = function(x, m) {
    return (x % m + m) % m;
};
export { log, mod };
