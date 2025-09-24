import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR_STATIC = path.join(__dirname, '../dist/static');
const DIR_OUT = path.join(__dirname, '../dist/bookmarks');

import packageJSON from '../package.json' with { type: 'json' };
const VERSION = 'R' + packageJSON.version.split('.')[1];


console.log('building bookmarks.html for resue_color_tag_fix ' + VERSION);

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
    '  reuse_color_tag_patch ' + VERSION + ' bookmarklets.html \n' +
    '    This bookmarks file was generated I advise to use     \n' +
    '    the scripts at the repo to create this rather than    \n' +
    '    edit it manually.                                     \n' +
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
    console.log('Generating static links, by reading dist/static files... ', '\n');
    return get_static_html();
})
.then((html)=>{
    const html_full = html_bookmarks( html );
    const uri = path.join(DIR_OUT, 'bookmarks.html');
    console.log('full html done, generating bookmarks.html file at : ' + uri, '\n');
    return writeFile( uri, html_full, 'utf-8' ); 
})

