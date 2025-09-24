# pending changes

* A rollup script that builds the extension api
* the rollup script should update the extension manifest.json with a version number based on what is set in package.json
* RCTF.setLocalConfig api method to set the local level config
* api checks for a remote config at 
```
fetch('https://ithacareuse.org/rctf.config.json')
.then((result)=>{
    return result.json();
}).then((json) => {
    console.log(json);
});
```



# R4
    * Can now set a custom Date for RCTF.run\_color\_tag\_fix in the extension
    * adding 1 to ms value in RCTF.run\_color\_tag\_fix so that a Date like
      new Date(2025, 8, 23) results in the proper color being set.
    * readme edits
    * revision number in rollup.config.static goes by what is in package.json
    * revision number in npm\_scripts/build_bookmarks.html goes by what is in package.json
