/********* **********
SETUP checkbox enabled
********** *********/
const el_enabled = document.querySelector('#checkbox_enabled');
chrome.storage.local.get('enabled')
.then((result) => {
   const bool = result['enabled'];
   el_enabled.checked = bool;
});
el_enabled.addEventListener('change', (e) => {
    chrome.storage.local.set({ enabled : e.target.checked })
    .then(()=>{
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
            const tab = tabs[0];
            const parts = tab.url.replace('https://', '').split('/');
            if(parts.length >= 3 && parts[0] === 'data1.ithacareuse.org' && parts[1] === 'pricing' && parts[2] === 'portal'){
                chrome.tabs.reload();
            }
        });
    })
});

