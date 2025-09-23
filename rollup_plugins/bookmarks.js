const plugin_bookmarks = function(opts = {}) {
    let source = '<!DOCTYPE NETSCAPE-Bookmark-file-1>\n' +
    '<!-- -----------------------------------------------------\n' +
    '  color-tag-fix R3 bookmarklets by Dustin                 \n' +
    '    This script was generated using rollup                \n' +
    '    I advise to use rollup to create this rather than     \n' +
    '    edit manually.                                        \n' +
    '--------------------------------------------------------->\n' +
    '<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n'+
    '<TITLE>Bookmarks</TITLE>\n' +
    '<H1>Bookmarks</H1>\n' +
    '<DL><p>\n' +
    '    <DT><H3>color-tag-fix R3</H3>\n';
    const desc = 'Hello-World Alert';
    const code = 'javascript:alert\(\"Hello World\"\);';
    source += '' +
    '    <DL><p>\n' +
    '        <DT><H3>set-color</H3>\n' +
    '        <DL><p>\n' +
    '            <DT><A HREF=\"' + code + '\" >' + desc + '</A>\n' + 
    '        </DL><p>\n' +
    '    </DL><p>\n';
    
    source += '</DL><p>\n';

    return {
        name: 'bookmarks',
        async generateBundle(output, bundle) {
            const htmlFile = {
                type: 'asset',
                source: source,
                name: 'Rollup HTML Asset',
                fileName: 'bookmarks.html'
            };
            this.emitFile(htmlFile);
        }
    };
}

export { plugin_bookmarks };
