
const href = window.location.href;

console.log('current href: ' + href);
console.log('appending api.js...');
console.log( 'chrome: ', chrome);

const key_check = (key='foo', value='bar') => {
     return chrome.storage.local.get(key)
     .then((result)=>{
         if(result[key] === undefined){
             const obj = {};
             obj[key] = value;
             return chrome.storage.local.set(obj);
         }
     });
};

const key_run = (key='foo', run=function(){} ) => {
    return chrome.storage.local.get(key)
    .then((result)=>{
         run(key, result[key]);
    });
};

//chrome.storage.local.clear();
key_check('enabled', true)
.then( ()=>{
    key_run('enabled', (key, value) => {
    
        console.log(key, value);
    
        if(value === true){
            RCTF.run_color_tag_fix();
        }
    });
});



//const script = document.createElement('script');
//script.src = chrome.runtime.getURL('colorset_api.js');
//document.body.appendChild(script);

//script.addEventListener('load', ()=>{

//    console.log('colorset api is loaded.');
    


//});





     
     
