const href = window.location.href;

console.log('current href: ' + href);
console.log('appending api.js...');

const script = document.createElement('script');
script.src = chrome.runtime.getURL('colorset_api.js');
document.body.appendChild(script);
