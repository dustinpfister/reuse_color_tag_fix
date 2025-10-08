const script = document.createElement('script');
script.src = chrome.runtime.getURL('colorset_api.js');
document.body.appendChild(script);

// the inject_version plugin will inject the version number here:
//[INJECT_VERSION]

const get = (opt) => {
    return chrome.storage.local.get(opt);
};
const set = (opt) => {
    return chrome.storage.local.set(opt);
}

const if_undefined = (result={}, opt={ key: 'enabled', default: true}) => {
    if(result[opt.key] === undefined){
        console.log( opt.key + ' key is not defined! Setting a default value : ' + opt.default );
        const store = {};
        store[ opt.key ] = opt.default;
        return set( store )
        .then( (result) => {
            return get( opt.key );
        });
    }
    return result;
};

get('VERSION')
.then( ( result ) => {
    return if_undefined(result, { key: 'VERSION', default: VERSION });
})
.then((result)=>{
    console.log('Setting up Color Tag Fix ' + result.VERSION);    
    return get('enabled');
})
.then( (result) => {
    return if_undefined(result);
})
.then((result)=>{
    if(result.enabled){
        console.log('color tag fix is enabled. Checking the current Mode ');
        return get('mode');
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
        return get();
    }
    if(result.mode === 'auto_by_fixed'){
        console.log('mode is auto_by_fixed');
        return get('color_select')
        .then((result)=>{
            return if_undefined(result, { key: 'color_select', default: 'Green' });
        })
        .then((result) => {
            RCTF.run_color_tag_fix( result.color_select );
            return get();
        });
    }
    if(result.mode === 'manual'){
        console.log('mode is manual');
        return get()
        .then((result)=>{
            return if_undefined(result, { key: 'manual_count', default: 0 });
        })
        .then((result)=>{
            if(result.manual_count > 0){
                console.log('running a manual color fix for color: ' + result.color_select );
                console.log('the count for this is :' + result.manual_count);
                result.manual_count -= 1;
                RCTF.run_color_tag_fix( result.color_select );
                return set({ manual_count: result.manual_count })
                .then(()=>{
                    return get();    
                });
            }
            return get();
        });
    }
})
.catch((e) => {
    console.log('there was a problem with setup: ');
    console.log(e);
})
.then(()=>{
    get()
    .then((result)=>{
        console.log('setup is done');
        console.log(result);
        //RCTF.setup_pane(RCTF.COLOR);
        //RCTF.update_pane(RCTF.COLOR, new Date());
    });
});

