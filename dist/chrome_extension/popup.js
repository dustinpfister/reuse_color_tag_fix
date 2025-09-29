const el_enabled = document.querySelector('#checkbox_enabled');
const el_full_menu = document.querySelector('#full_menu');
const el_mode = document.querySelector('#select_mode');
/********* **********
HELPER FUNCTIONS
********** *********/
const reload_at_data1 = () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        const parts = tab.url.replace('https://', '').split('/');
        if(parts.length >= 3 && parts[0] === 'data1.ithacareuse.org' && parts[1] === 'pricing' && parts[2] === 'portal'){
            chrome.tabs.reload();
        }
    });
};
const display_full_menu = (bool=true) => {
    el_full_menu.style.visibility = 'visible';
    if(!bool){
        el_full_menu.style.visibility = 'hidden';
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
});
el_enabled.addEventListener('change', (e) => {
    chrome.storage.local.set({ enabled : e.target.checked })
    .then(()=>{
        reload_at_data1();
        display_full_menu(e.target.checked);
    });
});
/********* **********
SETUP select mode
********** *********/
chrome.storage.local.get('mode')
.then((result) => {
    el_mode.value = result['mode'];
});
el_mode.addEventListener('change', (e) => {
    chrome.storage.local.set({ mode : e.target.value })
    .then(() => {
        console.log( 'mode set to :' + e.target.value );
        reload_at_data1();
    });
});
