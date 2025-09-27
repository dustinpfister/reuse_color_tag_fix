# pending changes


* Can set an array of COLOR Objects to allow for more than one update state of the system
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
