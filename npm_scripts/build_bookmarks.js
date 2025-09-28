import { readdir, mkdir, readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const DIR_STATIC = path.join(__dirname, '../dist/static');
const URI_AUTOSET = path.join(__dirname, '../dist/autoset/autoset.min.js');
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
    });
};

const get_autoset_html = () => {
    return readFile(URI_AUTOSET, 'utf-8')
    .then((code)=>{
        const escaped_code = code.replace(/\"/g, '&quot;');
        return '<DT><A HREF=\"javascript:' + escaped_code + '\" >Auto set</A>\n';  
    });
};

const html_bookmarks = function( html_static='', html_autoset='') {
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
    '    <DT><H3>color-tag-fix ' + VERSION + '</H3>\n';
    const desc = 'Hello-World Alert';
    const code = 'javascript:alert\(\"Hello World\"\);';
    source += '' +
    '    <DL><p>\n' +
    '        <DT><H3>set-color</H3>\n' +
    '        <DL><p>\n' +
                 html_static + 
    '        </DL><p>\n' +
    '        <DT><H3>todays-color</H3>\n' +
    '        <DL><p>\n' +
                 html_autoset +
    '        </DL><p>\n' +
    '<DT><A HREF=\"https://data1.ithacareuse.org/pricing/portal/RMC/\" >data1 pricing (RMC)</A>\n'+   
    '<DT><A HREF=\"https://data1.ithacareuse.org/pricing/portal/IRC/\" >data1 pricing (IRC)</A>\n'+   
    '<DT><A HREF=\"https://github.com/dustinpfister/reuse_color_tag_fix/blob/main/README.md\" >ReadMe</A>\n'+    
    '<DT><A HREF=\"https://github.com/dustinpfister/reuse_color_tag_fix/releases\" >Updates</A>\n'+ 
    '    </DL><p>\n' +
    '</DL><p>\n';
    return source;
}

let html_static = '',
html_auto = '';
mkdir(DIR_OUT, { recursive: true })
.then(()=>{
    console.log('Generating static links, by reading dist/static files... ', '\n');
    return get_static_html();
})
.then((html)=>{

    html_static = html;
    return get_autoset_html();
})
.then((html) => {
    html_auto = html;
    const html_full = html_bookmarks( html_static, html_auto );
    const uri = path.join(DIR_OUT, 'bookmarks.html');
    console.log('full html done, generating bookmarks.html file at : ' + uri, '\n');
    return writeFile( uri, html_full, 'utf-8' ); 
})

