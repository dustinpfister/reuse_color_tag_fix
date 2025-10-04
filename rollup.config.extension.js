import { gen_banner, VERSION } from './rollup_plugins/banner.js';
import { update_manifest } from './rollup_plugins/update_manifest.js'
console.log( 'building chrome_extension colorset_api.js for reuse_color_tag_patch ' + VERSION );

// to use:
// place the following pattern in the source code to inject the VERSION const
//[INJECT_VERSION]
const inject_version = (version='R0') => {
    return {
        name: 'inject_version',
        transform(code, id) {
            const version_str = 'const VERSION = ' + '\"' + version + '\";';
            const code_update = code.replace(/\/\/\[INJECT_VERSION\]/, version_str);
            return {
                code: code_update,
                map: null,
                moduleSideEffects: 'no-treeshake'
            }
        }
    }
};

export default [
    {
	    input: 'src/main-extension-api.js',
	    plugins: [ update_manifest(), inject_version(VERSION) ],
	    output: {
	        file: 'dist/chrome_extension/colorset_api.js',
	        banner : gen_banner('colorset_api','Auto'),
	        format: 'iife'
	    }
    },
    {
	    input: 'src/main-extension-index.js',
	    plugins: [ inject_version(VERSION) ],
	    output: {
	        file: 'dist/chrome_extension/index.js',
	        banner : gen_banner('extension_index','Auto'),
	        format: 'iife'
	    }
    }
];
