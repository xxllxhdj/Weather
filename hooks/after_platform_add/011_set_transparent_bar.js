#!/usr/bin/env node

var fs = require('fs');
var path = require('path');

var rootdir = process.argv[2];

function setTransparentBar (indexPath) {
    try {

        var data = fs.readFileSync(indexPath, 'utf8');

        var replace_with = "getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_STATUS);getWindow().addFlags(WindowManager.LayoutParams.FLAG_TRANSLUCENT_NAVIGATION);super.onCreate(savedInstanceState)";

        data = data.replace(/super\.onCreate\(savedInstanceState\)/g, replace_with);

        fs.writeFileSync(indexPath, data, 'utf8');

        process.stdout.write('set transparent bar for Android.\n');
    } catch(e) {
        process.stdout.write(e);
    }
}

if (rootdir) {

    // go through each of the platform directories that have been prepared
    var platforms = (process.env.CORDOVA_PLATFORMS ? process.env.CORDOVA_PLATFORMS.split(',') : []);

    for(var x = 0; x < platforms.length; x++) {
        // open up the index.html file at the www root
        try {
            var platform = platforms[x].trim().toLowerCase();

            if(platform == 'android') {
                var indexPath = path.join('platforms', platform, 'CordovaLib', 'src', 'org', 'apache', 'cordova', 'CordovaActivity.java');
                if(fs.existsSync(indexPath)) {
                    setTransparentBar(indexPath);
                }
            }
        } catch(e) {
            process.stdout.write(e);
        }
    }

}