// un-comment for clear storage test
chrome.storage.local.clear();

const if_undefined = (result={}, opt={ key: 'enabled', default: true }) => {
    if(result[opt.key] === undefined){
        console.log( opt.key + ' key is not defined! Setting a default value : ' + opt.default );
        const store = {};
        store[ opt.key ] = opt.default;
        return chrome.storage.local.set( store )
        .then( (result) => {
            return chrome.storage.local.get( opt.key );
        });
    }
    return result;
};

chrome.storage.local.get('enabled')
.then( (result) => {
/*
    if(result.enabled === undefined){
        console.log( 'enabled key is not defined! Setting a default value for enabled: ' );
        return chrome.storage.local.set({ enabled: true })
        .then( (result) => {
            return chrome.storage.local.get('enabled');
        });
    }
    return result;
*/
    return if_undefined(result, { key: 'enabled', default: true });

})
.then((result)=>{
    if(result.enabled){
        console.log('color tag fix is enabled. Checking the current Mode ');
        return chrome.storage.local.get('mode');
    }
    if(!result.enabled){
        console.log('color tag fix is disabled ');
        return Promise.reject('reject because color tag fix is disabled ');
    }
})
.then((result) => {
/*
    if(result.mode === undefined){
        console.log( 'mode key is not defined! Setting a default value for mode: ' );
        return chrome.storage.local.set({ mode: 'auto_by_time' })
        .then( (result) => {
            return chrome.storage.local.get('mode');
        });
    }
    return result;
    */
    return if_undefined(result, { key: 'mode', default: 'auto_by_time' });
})
.then(( result ) => {
    
    if(result.mode === 'auto_by_time'){
        console.log('mode is auto_by_time, running the fix');
        RCTF.run_color_tag_fix();
        return Promise.resolve('done');
    }
    if(result.mode === 'auto_by_fixed'){
        console.log('mode is auto_by_fixed');
        return chrome.storage.local.get('color_select')
        .then(()=>{
        
        })
    }
    if(result.mode === 'manual'){
        console.log('mode is manual');
        return Promise.resolve('done');
    }
})
.catch((e) => {
    console.log(e);
});





     
     
