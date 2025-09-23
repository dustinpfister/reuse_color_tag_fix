# reuse_color_tag_patch



## How to use

In the dist folder there are a number of final, generated output files that are the various software patches that can be used to fix the color tag problem on data1. 

The 'chrome\_extension' folder would be the best way to go about fixing the problem in a way in which it will just happen automatically each time the page is reloaded or navigated to by a user. To set this up you will need to go to chrome://extensions then make sure that 'Developer mode' is toggled on. You will then want to click the 'Load unpacked' button and navigate the the root 'chrome\_extension' which is what will need to be selected.

The 'static' folder contains a number of static js functions that can be used to fix the problem by injecting the code directly into the javaScript console. There are two files for each color, one in a development form, and the other in a minified form. The minified form would be a better choice if you need to manually make a bookmarlet by just using the javascript: prototcol followed by the code. 

## How to Build files

I am using the nodejs global script called Rollup to generate the final distribution files from source files. Assuming that you have nodejs and npm installed, install rollup as a global script so that it can be used as a command line tool. If you are at the root of the project folder then use just need to call rollup with the -c option, then give the config file for what you want to build. Rollup will then read the settings defined in the config.js file to build the given form of the color tag fix.

```
$ sudo npm install --global rollup
```

### To build 

```
$ rollup -c rollup.config.static.js
```
