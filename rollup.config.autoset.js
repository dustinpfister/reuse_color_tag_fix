
import { gen_banner, VERSION } from './rollup_plugins/banner.js';

console.log( 'building autoset scripts for reuse_color_tag_patch ' + VERSION );


export default [
    {
	    input: 'src/main-autoset.js',
	    output: {
            file: 'dist/autoset/autoset.js',
            banner : gen_banner('autoset', 'Auto'),
            format: 'iife'
        }
    },
    {
	    input: 'src/main-autoset.js',
	    output: {
            file: 'dist/autoset/autoset.min.js',
            banner : gen_banner('autoset', 'Auto'),
            format: 'iife'
        }
    }
];
