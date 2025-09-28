
const el = document.querySelector('#checkbox_enabled');
chrome.storage.local.get('enabled')
.then((result) => {
   const bool = result['enabled'];
   console.log('popup.js', 'enabled', bool);
   el.checked = bool;
});
el.addEventListener('change', (e) => {
    chrome.storage.local.set({ enabled : e.target.checked })
    .then(()=>{
       chrome.tabs.reload();
    })
});

