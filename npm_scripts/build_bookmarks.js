import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const DIR_STATIC = '../dist/static';
const DIR_OUT = '../dist/bookmarks'

const get_static_html = () => {
    let min_files = [];
    return readdir(DIR_STATIC)
    .then((files)=>{
        return files.filter((fileName)=>{
            return fileName.match(/\.min\.js$/)
        });
    })
    .then( (files) => {
        min_files = files;
        return Promise.all( min_files.map((fileName) => {  
            return readFile( path.join( DIR_STATIC, fileName  ), 'utf-8');
        }));
    })
    .then((result) => {
        return result.map( (code, i) => {
            const escaped_code = code.replace(/\"/g, '&quot;');
            return '<DT><A HREF=\"javascript:' + escaped_code + '\" >' + min_files[i].replace(/.min.js/, '') + '</A>\n';
        }).join('');
    })
};

const html_bookmarks = function( html='') {
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
                 html + 
    '        </DL><p>\n' +
    '    </DL><p>\n'; 
    source += '</DL><p>\n';
    return source;
}

mkdir(DIR_OUT, { recursive: true })
.then(()=>{
    return get_static_html();
})
.then((html)=>{
    const html_full = html_bookmarks( html );
    return writeFile( path.join(DIR_OUT, 'bookmarks.html'), html_full, 'utf-8' ); 
})

