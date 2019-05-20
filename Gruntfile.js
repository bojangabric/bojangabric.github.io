module.exports = function(grunt) {
	"use strict";

	grunt.initConfig({
		sass: {
			dist: {
				files: {
					"assets/css/style.css":
						"assets/sass/main.scss"
				},
				options: {
					sourceMap: false
				}
			}
		},

		postcss: {
			options: {
				processors: [
					require("autoprefixer")({ browsers: "last 2 versions" })
				]
			},
			dist: {
				src: "assets/css/style.css"
			}
		},

		watch: {
			files: ["assets/sass/**/*.scss"],
			tasks: ["sass", "postcss"],
			reload: {
				files: ["assets/css/style.css"],
				options: {
					livereload: true
				}
			}
		}
	});

	grunt.loadNpmTasks("grunt-contrib-sass");
	grunt.loadNpmTasks("grunt-postcss");
	grunt.loadNpmTasks("grunt-contrib-watch");

	grunt.registerTask("default", ["watch"]);
};
