import UglifyJS from "uglify-js";

const plugin_static = function( color='Red' ) {
    return {
        name: 'plugin_set_color',
        resolveId ( source ) {
            if (source === 'plugin_set_color') {
                return source;
            }
            return null;
        },
        load ( id ) {
            if (id === 'plugin_set_color') {
                return 'const COLOR = { color: \'' + color +  '\', debug: false }; export { COLOR };';
            }
            return null;
        },
        async generateBundle(output, bundle) {
            const file_keys = Object.keys( bundle );
            const fn_parts = file_keys[0].split('.');
            const fileName = fn_parts[0] + '.min.js';
            const code = bundle[ file_keys[0] ].code;
            const code_min = UglifyJS.minify(code).code;
            const file = {
                type: 'asset',
                source: code_min, 
                name: 'Rollup plugin_static Asset',
                fileName: fileName
            };
            this.emitFile(file);
        }
    };
};

export { plugin_static }
