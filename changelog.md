# pending changes


* can define an array of COLOR objects to use with the extension

```
const COLOR_DEFAULT = {
    autoset: true,
    debug: false,
    first_tuesday: new Date(2025, 9 - 1, 9, 0, 0, 0, 0),
    first_index: 0,
    ascending: true,
    data: [  
        { i: 0, desc: 'Green',  web: '#00ff00' },
        { i: 1, desc: 'Blue',   web: '#0000ff' },
        { i: 2, desc: 'Yellow', web: '#ffff00' },
        { i: 3, desc: 'Orange', web: '#ff8800' },
        { i: 4, desc: 'Red',    web: '#ff0000' }
    ],
    color: 'Green'
};
const COLOR_ARRAY_DEFAULT = [ COLOR_DEFAULT ];

const parse_color_object = (COLOR) => {
    return Object.assign({}, COLOR_DEFAULT, COLOR);
};

const get_color_array = () => {
    return COLOR_ARRAY_DEFAULT;
};

```

* RCTF.createColor method that will return a new COLOR Object
* RCTF.setLocalConfig api method to set the local level config

# R5
* applyToElements function that will update display elements

# R4
* new RCTF api that can be used in the javaScript console when using the extension
* Can now set a custom Date for 'now' with RCTF.run\_color\_tag\_fix
* revision number in rollup.config.static goes by what is in package.json
* revision number in npm\_scripts/build_bookmarks.html goes by what is in package.json
* COLOR.ascending to set autoset script in ascending of descending mode when getting the current color
* A rollup.config.autoset script that builds a dist/autoset/autoset.js from an src folder
* The rollup.config.autoset script also builds an dist/autoset/autoset.min.js file
* autoset.min.js is included as an option in bookmarklet.html
* an /src/utils.js for log and mod functions
* an /src/get\_print\_index\_by\_date.js file
* A rollup.config.extension script that builds the extension api
* The rollup.config.extension script should update the extension manifest.json with a version number based on what is set in package.json
* readme edits
