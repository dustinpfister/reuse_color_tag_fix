# pending changes



* A rollup script that builds the extension api
* Can set an array of COLOR Objects to allow for more than one state
* the rollup script should update the extension manifest.json with a version number based on what is set in package.json
* RCTF.setLocalConfig api method to set the local level config


# R4
    * Can now set a custom Date for RCTF.run\_color\_tag\_fix in the extension
    * revision number in rollup.config.static goes by what is in package.json
    * revision number in npm\_scripts/build_bookmarks.html goes by what is in package.json
    * COLOR.ascending to set autoset script in ascending of descending mode when getting the current color
    * A rollup.config.autoset script that builds a dist/autoset/autoset.js from an src folder
    * The rollup.config.autoset script also builds an dist/autoset/autoset.min.js file
    * autoset.min.js is included as an option in bookmarklet.html
    * readme edits
