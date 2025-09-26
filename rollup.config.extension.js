import { gen_banner, VERSION } from './rollup_plugins/banner.js';
import { update_manifest } from './rollup_plugins/update_manifest.js'
console.log( 'building chrome_extension colorset_api.js for reuse_color_tag_patch ' + VERSION );

export default [
    {
	    input: 'src/main-extension-api.js',
	    plugins: [ update_manifest() ],
	    output: {
	        file: 'dist/chrome_extension/colorset_api.js',
	        banner : gen_banner('colorset_api','Auto'),
	        format: 'iife'
	    }
    }
];
