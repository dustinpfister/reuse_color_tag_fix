
const el = document.querySelector('#checkbox_enabled');
chrome.storage.local.get('enabled')
.then((result) => {
   el.checked = result['enabled'];
});
el.addEventListener('change', (e) => {
    chrome.storage.local.set({ enabled : e.target.checked })
    .then(()=>{
       chrome.tabs.reload();
    })
});

