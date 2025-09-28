
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
        if(value === true){
            console.log('Calling RCTF.run_color_tag_fix');        
            RCTF.run_color_tag_fix();
        }
    });
});






     
     
