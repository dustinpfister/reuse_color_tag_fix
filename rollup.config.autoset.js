import packageJSON from './package.json' with { type: 'json' };
const VERSION = 'R' + packageJSON.version.split('.')[1];

console.log( 'building autoset scripts for reuse_color_tag_patch ' + VERSION );

const gen_banner = (color='Green') => {
    return '\/\* color-tag-fix, ' + VERSION + '-static ' + color + ' by Dustin \*\/';
};

export default [
    {
	    input: 'src/main-autoset.js',
	    output: {
            file: 'dist/autoset/autoset.js',
            banner : gen_banner('Green'),
            format: 'iife'
        }
    }
];
