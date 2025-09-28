# pending changes

* only reload the page if at the data1 portal

* change obj to color\_str in apply\_to\_buttons method, and remove log call
* have a get color keys function
```
const get_color_keys = () => {
    return atob('R3JlZW4sUmVkLEJsdWUsT3JhbmdlLFllbGxvdyxMYXZlbmRlcg==').split(',');
};
```
* improved apply\_to\_buttons parsing so that the color_str argument will parse 'y', 'Y', 'yellow', and 'yElLoW' to 'Yellow';
```
const parse_color_key = (color_key='') => {
    if(typeof color_key != 'string'){
        return color_key;
    }
    const keys= get_color_keys();
    let i = keys.length;
    while(i--){
        if(color_key.length === 1 && ( color_key[0] || '' ).toUpperCase() === keys[i][0]){
            return keys[i];
        }
        if(color_key.toUpperCase() === keys[i].toUpperCase()){
            return keys[i];
        }
    }  
    return color_key;
};
```
* improved apply\_to\_buttons by base64 encoding all valid color stings and return out if final value does not match any known value
```
const validate_color_key = (color_key='') => {
    const keys= keys= get_color_keys();
    let i = keys.length;
    while(i--){
        if(keys[i] === color_key){
            return true;
        }
    }
    return false;
};
```


* see about updating log

* can define an array of COLOR objects to use with the extension

* see if color fix extension can be used to inject favicon at any data1 address if not there
* a main update app loop
* inject additional info elements


# R5
* applyToElements function that will update display elements used in static, autoset scripts, and chrome extension
* RCTF.parse_color method that will return a new COLOR Object in javaScript console when using chrome extension
* started a custom popup menu for the chrome extension
* using chrome.storage.local to save settings for the chrome extension

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

# R3
* rollup script started for building file from a source file
* static scripts build from source folder
* npm script for building a bookmarks.html file from the static files
* chrome extension started
* readme file added

# R2
* autoset script working

# R1
* autoset script started

# R0
* original static set color script



