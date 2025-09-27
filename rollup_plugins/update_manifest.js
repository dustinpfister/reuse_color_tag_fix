import { VERSION } from './banner.js';

const get_json = () => {
    return  '' +
    '{\n' +
      '\"manifest_version\": 3,\n' +
      '\"name\": \"Reuse data1 Color Tag Fix ' + VERSION + '\",\n' +
      '\"description\": \"This chrome extension injects the data1 color tag patch into data1 each time the page reloads.\",\n' +
      '\"version\": \"0.' + VERSION.replace(/R/g, '') + '\",\n' +
      '\"icons\": {\n' +
        '\"16\": \"img/icon_16.png\",\n' +
        '\"32\": \"img/icon_32.png\",\n' +
        '\"48\": \"img/icon_48.png\",\n' +
        '\"128\": \"img/icon_128.png\"\n' +
      '},\n' +
      '\"action\": {\n' +
        '\"default_popup\": "popup_menu.html\"\n' +
      '},\n' +
      '\"content_scripts\": [\n' +
        '{\n' +
          '\"js\": [ \"patch.js\" ],\n' +
          '\"matches\": [\n' +
            '\"https://data1.ithacareuse.org/pricing/portal/RMC/\",\n' +
            '\"https://data1.ithacareuse.org/pricing/portal/IRC/\"\n' +
          ']\n' +
        '}\n' +
      '],\n' +
      '\"web_accessible_resources\": [\n' +
        '{\n' +
          '\"resources\": [\"colorset_api.js\"],\n' +
          '\"matches\": [\"<all_urls>\"]\n' +
        '}\n' +
      ']\n' +
    '}\n';
};

const update_manifest = function( opt={} ) {
    return {
        name: 'update_manifest',
        resolveId ( source ) {
            if (source === 'update_manifest') {
                return source;
            }
            return null;
        },
        async generateBundle(output, bundle) {
            const file = {
                type: 'asset',
                source: get_json(), 
                name: 'Rollup update_manifest Asset',
                fileName: 'manifest.json'
            };
            this.emitFile(file);
        }
    };
};

export { update_manifest }

