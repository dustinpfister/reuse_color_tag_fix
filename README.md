# reuse_color_tag_patch

This is the patch to the color tag problem with data1 at Finger Lakes Reuse. At reuse we use what many refer to as 'data1' every day when it comes to to printing labels to price items in various departments. At reuse we use a color tag system of sorts, that is that when we price an item as a color tag, rather than a white tag, it goes threw what is called a color discount cycle. We where using a six color system, and discounts of 25, 50, and 75 percent off. Decisions where made where a new system should be adopted, which is a 5 color system with just 25, and 50 percent off. This is fine, as these kinds of adjustments do need to be made from time to time. However the back end source code for data1 was not updated to accommodate this change.

This is where this software patch comes into play. It is a collection of scripts that can be injected into the javaScript console to set the proper tag color with respect to this new system, rather than the old system. On top of that it is also a bookmark import file that can be used to import a collection of [Bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet) of said scripts into a web browser to set a desired tag color. Finally it is also ( now as of R3 ), a chrome extension that can be used to inject such scripts each time the pages is visited. This means that as long as the chrome extension is installed, and working as it should, people do not need to bother injecting code into the javaScript console, or click a bookmark each time that they navigate to data1.

So in conclusion, this project is a band-aid of sorts, to buy time.

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
