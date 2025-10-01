const el_enabled = document.querySelector('#checkbox_enabled');
const el_full_menu = document.querySelector('#full_menu');
const el_mode = document.querySelector('#select_mode');
const el_canvas = document.querySelector('#color_canvas');
const el_reset = document.querySelector('#button_reset');
const el_reload = document.querySelector('#button_reload');
/********* **********
reload popup when tab reloads
********** *********/
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    location.reload();
});
/********* **********
Pricing Portal Links
********** *********/
['#button_pricing_rmc', '#button_pricing_irc'].forEach((str_id)=>{
    
    const el = document.querySelector(str_id);
    el.addEventListener('click', (e) => {
        //console.log(e.target.dataset.href);
        chrome.tabs.update( undefined, { url: e.target.dataset.href } );
    });
});
/********* **********
HELPER FUNCTIONS
********** *********/
const reload_at_data1 = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const parts = tab.url.replace('https://', '').split('/');
        if(parts.length >= 3 && parts[0] === 'data1.ithacareuse.org' && parts[1] === 'pricing' && parts[2] === 'portal'){
            chrome.tabs.reload()
        }
    });
};
const display_canvas = (bool=true) => {
    el_canvas.style.display = 'block';
    if(!bool){
        el_canvas.style.display = 'none';
    }
};
const display_full_menu = (bool=true) => {
    el_full_menu.style.visibility = 'visible';
    if(!bool){
        el_full_menu.style.visibility = 'hidden';
    }
};
const COLORS = 'Green,Red,Blue,Orange,Yellow,Lavender'.split(',');
const color_canvas_draw = (select=null) => {
    const ctx = el_canvas.getContext('2d');
    ctx.fillRect( 0, 0, el_canvas.width, el_canvas.height);
    let i = 0;
    const len = COLORS.length;
    while(i < len){
        const x = i % 3, y = Math.floor(i / 3);
        ctx.fillStyle = COLORS[i];
        ctx.fillRect(x * 64, y * 64, 64, 64);
        i += 1;
    }
};
/********* **********
SETUP checkbox enabled
********** *********/
chrome.storage.local.get('enabled')
.then((result) => {
   const bool = result['enabled'];
   el_enabled.checked = bool;
   display_full_menu(bool);
   color_canvas_draw();
});
el_enabled.addEventListener('change', (e) => {
    chrome.storage.local.set({ enabled : e.target.checked })
    .then(()=>{
        reload_at_data1();
        display_full_menu(e.target.checked);
    });
});
/********* **********
SETUP reset and reload buttons
********** *********/
el_reset.addEventListener('click', (e) => {
    chrome.storage.local.clear()
    .then(()=>{
        reload_at_data1();
    });
});
el_reload.addEventListener('click', (e) => {
    reload_at_data1();
});
/********* **********
SETUP select mode
********** *********/
chrome.storage.local.get('mode')
.then((result) => {
    const mode = result['mode'];
    el_mode.value = mode;
    if(mode === 'auto_by_time'){
        display_canvas(false);
    }
});
el_mode.addEventListener('change', (e) => {
    chrome.storage.local.set({ mode : e.target.value })
    .then(() => {
        console.log( 'mode set to :' + e.target.value );
        reload_at_data1();
    });
});
/********* **********
SETUP canvas
********** *********/
el_canvas.addEventListener('pointerdown', (e) => {
    const canvas = e.target;
    const bx = canvas.getBoundingClientRect();
    const x = Math.floor(e.clientX - bx.left), y = Math.floor(e.clientY - bx.top);
    const i = Math.floor( Math.floor(y / 64) * 3 + Math.floor(x / 64) );
    console.log(x, y, i);
    chrome.storage.local.set({ color_select : COLORS[i], manual_count: 1 })
    .then(()=>{
        console.log( 'color_select set to :' + COLORS[i] );
        reload_at_data1();
    });
});
