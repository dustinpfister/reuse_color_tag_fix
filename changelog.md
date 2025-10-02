# pending changes

* a main update app loop that will update the color based on the current date as the date changes
* The extension injects an additional ctf pane element
* The CTF pane informs what the current print color is
* The CTF pane informs what color is currently 25% off, 50% off, and the cull color
* The CTF pane gives an outlook for the current month and next month

* can define an array of COLOR objects to use with the extension
* see if color fix extension can be used to inject favicon at any data1 address if not there

# R6 - Improved Chrome Extension Menu
* In the extension popup menu a 'mode' can be set to 'auto by time', 'auto fixed color', or 'manual'
* In the event of 'auto by time' the current date will be used to set the color
* chrome extension will only reload the page if at the data1 portal after enable or disable
* In the event of 'auto by color', or 'manual' mode a color selection menu will show up in the form of a canvas element
* a reset button in the popup menu can be used to reset settings
* reload popup page when reset is clicked
* have data1 links in the extension menu

# R5
* new apply\_to\_elements function that will update display elements, not just id and className attributes of buttons
* new get\_color\_keys function that returns an array of valid color names from a base64 encoded string
* improved apply\_to\_buttons parsing by base64 encoding all valid color stings, and abort if final value does not match any known value
* improved apply\_to\_buttons parsing so that the color strings like 'y', 'Y', 'yellow', and'yElLoW' parse to a valid 'Yellow' value;
* RCTF.parse_color method that will return a new COLOR Object in javaScript console when using chrome extension
* started a custom menu for the chrome extension
* using chrome.storage.local to save settings for the chrome extension
* can easily enable/disable the chrome extension 
* change obj to color\_str in apply\_to\_buttons method
* data1-RMC and data1-IRC pricing portal links in the bookmarks.html file

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



