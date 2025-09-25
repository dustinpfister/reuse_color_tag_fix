//import { plugin_static } from './rollup_plugins/static.js';
//import packageJSON from './package.json' with { type: 'json' };
//const VERSION = 'R' + packageJSON.version.split('.')[1];

import { plugin_static } from './rollup_plugins/static.js';
import { gen_banner, VERSION } from './rollup_plugins/banner.js';

console.log( 'building static scripts for reuse_color_tag_patch ' + VERSION );

//const gen_banner = (color='Green') => {
//    return '\/\* color-tag-fix, ' + VERSION + '-static ' + color + ' by Dustin \*\/';
//};

export default [
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Green') ],
	    output: { 
	        file: 'dist/static/ctf-static-green.js', 
	        banner : gen_banner('static', 'Green'),
	        format: 'iife'
	    }
    },
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Red') ],
	    output: {
		    file: 'dist/static/ctf-static-red.js',
		    banner : gen_banner('static', 'Red'),
		    format: 'iife'
	    }
    },
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Orange') ],
	    output: {
		    file: 'dist/static/ctf-static-orange.js',
		    banner : gen_banner('static', 'Orange'),
		    format: 'iife'
	    }
    },
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Yellow') ],
	    output: {
		    file: 'dist/static/ctf-static-yellow.js',
		    banner : gen_banner('static', 'Yellow'),
		    format: 'iife'
	    }
    },
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Blue') ],
	    output: {
		    file: 'dist/static/ctf-static-blue.js',
		    banner : gen_banner('static', 'Blue'),
		    format: 'iife'
	    }
    },
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Lavender') ],
	    output: {
		    file: 'dist/static/ctf-static-lavender.js',
		    banner : gen_banner('static', 'Lavender'),
		    format: 'iife'
	    }
    }
];
