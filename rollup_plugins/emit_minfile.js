import UglifyJS from "uglify-js";

const plugin_emit_minfile = function( opt={} ) {
    return {
        name: 'plugin_emit_minfile',
        resolveId ( source ) {
            if (source === 'plugin_emit_minfile') {
                return source;
            }
            return null;
        },
        load ( id ) {
            if (id === 'plugin_emit_minfile') {
                return '';
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
                name: 'Rollup plugin_emit_minfile Asset',
                fileName: fileName
            };
            this.emitFile(file);
        }
    };
};

export { plugin_emit_minfile }

