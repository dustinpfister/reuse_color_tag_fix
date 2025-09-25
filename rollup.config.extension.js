import { gen_banner, VERSION } from './rollup_plugins/banner.js';

console.log( 'building chrome_extension colorset_api.js for reuse_color_tag_patch ' + VERSION );

export default [
    {
	    input: 'src/main-extension-api.js',
	    output: {
	        file: 'dist/chrome_extension/colorset_api.js',
	        banner : gen_banner('colorset_api','Auto'),
	        format: 'iife'
	    }
    }
];
