import { plugin_static } from './rollup_plugins/static.js';

const VERSION = 'R4';
const gen_banner = (color='Green') => {
    return '\/\* color-tag-fix, ' + VERSION + '-static ' + color + ' by Dustin \*\/';
};

export default [
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Green') ],
	    output: { file: 'dist/static/ctf-static-green.js', banner : gen_banner('Green'), format: 'iife' }
    },
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Red') ],
	    output: {
		    file: 'dist/static/ctf-static-red.js',
		    banner : gen_banner('Red'),
		    format: 'iife'
	    }
    },
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Orange') ],
	    output: {
		    file: 'dist/static/ctf-static-orange.js',
		    banner : gen_banner('Orange'),
		    format: 'iife'
	    }
    },
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Yellow') ],
	    output: {
		    file: 'dist/static/ctf-static-yellow.js',
		    banner : gen_banner('Yellow'),
		    format: 'iife'
	    }
    },
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Blue') ],
	    output: {
		    file: 'dist/static/ctf-static-blue.js',
		    banner : gen_banner('Blue'),
		    format: 'iife'
	    }
    },
    {
	    input: 'src/main-static.js',
	    plugins: [ plugin_static('Lavender') ],
	    output: {
		    file: 'dist/static/ctf-static-lavender.js',
		    banner : gen_banner('Lavender'),
		    format: 'iife'
	    }
    }
];
