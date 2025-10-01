// un-comment for clear storage test
//chrome.storage.local.clear();

const script = document.createElement('script');
script.src = chrome.runtime.getURL('colorset_api.js');
document.body.appendChild(script);

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
        .then((result)=>{
            return if_undefined(result, { key: 'color_select', default: 'Green' });
        })
        .then((result) => {
            RCTF.run_color_tag_fix( result.color_select );
            return Promise.resolve('done');
        });
    }
    if(result.mode === 'manual'){
        console.log('mode is manual');
        return chrome.storage.local.get()
        .then((result)=>{
            return if_undefined(result, { key: 'manual_count', default: 0 });
        })
        .then((result)=>{
            if(result.manual_count > 0){
                console.log('running a manual color fix for color: ' + result.color_select );
                console.log('the count for this is :' + result.manual_count);
                result.manual_count -= 1;

                RCTF.run_color_tag_fix( result.color_select );
                return chrome.storage.local.set({ manual_count: result.manual_count })
                .then(()=>{
                    return Promise.resolve('done');    
                });
            }
            return Promise.resolve('done');
        });
    }
})
.catch((e) => {
    console.log(e);
});





     
     
