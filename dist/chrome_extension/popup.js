

const el = document.querySelector('#checkbox_enabled');
chrome.storage.local.get('enabled')
.then((result) => {
   const bool = result['enabled'];
   el.checked = bool;
});
el.addEventListener('change', (e) => {
    chrome.storage.local.set({ enabled : e.target.checked })
    .then(()=>{
    
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const tab = tabs[0];
        console.log(tab.url);
        
    
    });
    
       //if(location.host === 'data1.ithacareuse.org'){
          chrome.tabs.reload();
       //}
       
    })
});

