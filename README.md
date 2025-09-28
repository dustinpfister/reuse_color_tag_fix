# reuse_color_tag_fix

<p align="center">
  <img 
    width="256"
    height="256" 
    src="https://github.com/dustinpfister/reuse_color_tag_fix/blob/main/dist/chrome_extension/img/icon_128.png"
  >
</p>

This is the patch to the color tag problem with data1 at Finger Lakes Reuse. We use what many refer to as 'data1' every day when it comes to to printing labels to price items in various departments. A color tag system of sorts is used that differs from white tags in that white tags are a fixed price, while color tags go threw a color discount cycle. We where using a six color system, but a new system was adopted which is a 5 color system. This is fine, as these kinds of adjustments do need to be made from time to time. However the back end source code for data1 was not updated to accommodate this change.

This is where this software patch comes into play. It is a collection of scripts that can be injected into the javaScript console to set the proper tag color with respect to this new system, rather than the old system. On top of that it is also a bookmark import file that can be used to import a collection of [Bookmarklets](https://en.wikipedia.org/wiki/Bookmarklet) of said scripts into a web browser to set a desired tag color. Finally there is now a chrome extension form of the patch that can be used to inject the patch each time the pages is visited. This means that as long as the chrome extension is installed, and working as it should, people do not need to bother injecting code into the javaScript console, or click a bookmark each time that they navigate to the data1 pricing portal.

This project is then a band-aid of sorts, to buy time. Enough time until a proper fix is issued which involves updating, and re deploying server side code. If the code has been updated, then this project is no longer relevant. If it has not, then I will continue to maintain this for what it is worth.

## 1 ) How to use

[Visit the releases page](https://github.com/dustinpfister/reuse_color_tag_fix/releases) and download the zip file of the latest revision. The dist folder is where there are a number of final, generated output files. These are the various forms of the software patch that can be used to fix the color tag problem on data1. There is a _chrome\_extension_ form, a _bookmark import file_ form, and various _static and autoset script_ forms of the patch.

### 1.1 ) The static, and autoset javaScript console scripts

The 'static' folder contains a number of static js functions that can be used to fix the problem by injecting the code directly into the javaScript console. There are two files for each color, one in a development form, and the other in a minified form. The minified form would be a better choice if you need to manually make a Bookmarklet by just using the javascript: prototcol followed by the code. However there is no need to bother with that as there is now a bookmarks.html file that can be used to import a collection of these into chrome.

There is also an autoset script as well, once again in both development and mini form.

### 1.2 ) The bookmarks import file.

The 'bookmarks' folder in the dist folder contains a bookmarks import file, to quickly import a collection of Bookmarklets for each tag color, as well as the autoset script. In chrome go to the three dot menu, then 'bookmarks and lists', and then finally 'Import bookmarks and settings'. From there choose to load a bookmark file, and navigate to the location of the bookmarks.html file. If all goes well you should see an Imported folder in the bookmarks bar. The Bookmarklets should all be there to use when at the data1 pricing portal.

This bookmarks file was made as an alternative option to the chrome extension, then main draw back with this is that you will need to set the color each time to reload the data1 pricing portal. If you want the correct color to set each time, the only option for that would be the chrome extension form of this patch.

### 1.3 ) The chrome extension.

The 'chrome\_extension' folder would be the best way to go about fixing the problem in a way in which it will just happen automatically each time the page is reloaded or navigated to by a user. To set this up you will need to go to chrome://extensions then make sure that 'Developer mode' is toggled on. You will then want to click the 'Load unpacked' button and navigate to the root 'chrome\_extension' folder in the dist folder of this repo which is what will need to be selected.

## 2.0 ) How to Build files

I am using the nodejs global script called Rollup, as well as one additional custom script, to generate the final distribution files from source files. I have also set up some npm scripts to help make this process easy, but there is still a bit of a setup process here if you do not have everything installed, cloned down, ect. 

### 2.1 ) Check if you have git, nodejs and npm installed to begin with, and install if need be.

Before installing git, node, and npm, it is possible that one or more might all ready be there. There are a few options when it comes to checking if a command is installed on a Linux system, I like to use the bash built in command 'type'. So there is using 'type' to find the location of node and npm. If these are not installed you will get a 'bash: type: \[commandName\]: not found' message. If they are installed the -v option can be used to check the version numbers of these. The versions that I was using to build are in the example below.

```
$ type git
git is /usr/bin/git
$ type node
node is /usr/local/bin/node
$ type npm
npm is hashed (/usr/local/bin/npm)
$ git -v
git version 2.43.0
$ node -v
v22.17.1
$ npm -v
10.9.2
```

If git, node, and npm are not installed you will want them installed in order to build files.

```
$ sudo apt install git nodejs npm
```

if the version is out of date, use the '[n npmjs](https://www.npmjs.com/package/n/v/5.0.0)' package to install an updated version of node.

### 2.2) Install rollup as a global script

I use rollup to build the static files in both development and minified form. Building these files first is necessary in order to build the bookmarks import file, as the minifored forms of the scripts are used to do just that.

```
$ sudo npm install --global rollup
```

### 2.3) Clone down this repo, do an npm install

Use git to clone down a copy of the repo. I am using [uglify-js to minify](https://www.npmjs.com/package/uglify-js/) code into a form that works well for bookmarks.

```
$ git clone --depth 1 https://github.com/dustinpfister/reuse_color_tag_fix
$ cd reuse_color_tag_fix
$ npm install
```

### 2.4) To build the dist folder files

Run the npm scripts to build the static files, the autoset script, the bookmarks.html file, and the chrome extension.

```
$ npm run build_static
$ npm run build_autoset
$ npm run build_bookmarks
$ npm run build_extension
```

