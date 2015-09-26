/*global module:false*/
module.exports = function (grunt) {

    grunt.initConfig({
        requirejs: {
            std: {
                options: {
                    appDir: 'www',
                    mainConfigFile: 'www/js/main.js',
                    dir: 'www-built',
                    modules: [
                        {
                            name: 'app'
                        }
                    ]
                }
            }
        },

        jshint: {
            options: {
                curly: true,
                eqeqeq: true,
                immed: true,
                latedef: true,
                newcap: true,
                noarg: true,
                sub: true,
                undef: true,
                eqnull: true,
                browser: true,
                nomen: true,
                globals: {
                    define: true,
                    requirejs: true,
                    require: true,
                    angular: true,
                    cordova: true,
                    StatusBar: true
                }
            },
            all: ['www/js/*.js']
        }
    });

    grunt.loadNpmTasks("grunt-contrib-requirejs");
    grunt.loadNpmTasks('grunt-contrib-jshint');

    grunt.registerTask('default', ['jshint', 'build']);
    grunt.registerTask('build', 'requirejs');
};
