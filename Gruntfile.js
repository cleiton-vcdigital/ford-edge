module.exports = function(grunt) {

	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		
		// Compile
		pug: {
			compile: {
				options: {
					data: {
						debug: false,
						page: require('./data/page.json')
					},
					pretty: true
				},

				files: [
					{
						expand: true,     // Enable dynamic expansion.
						cwd: 'source/views/',      // Src matches are relative to this path.
						src: ['*.pug'], // Actual pattern(s) to match.
						dest: 'public/',   // Destination path prefix.
						ext: '.html',   // Dest filepaths will have this extension.
						extDot: 'first'   // Extensions in filenames begin after the first dot
					},
				],
			}
		},

		watch: {
			files: ['source/scss/**/*.scss', 'source/views/**', 'source/js/**', 'data/**'],
			tasks: ['pug', 'sass', 'autoprefixer', 'uglify']
		},

		sass: {
			dev: {
				options: {
					style: 'expanded'
				},

				files: [{
					expand: true,
					cwd: 'source/scss',
					src: ['**/*.scss'],
					dest: 'public/css',
					ext: '.css'
				}]
			}
		},

		autoprefixer: {
			options: {
				cascade: true
			},

			files: {
				expand: true,
				flatten: true,
				src: ['public/css/*.css'],
				dest: 'public/css/'
			}
		},

		uglify: {
			options: {
				mangle: false,
				compress: true
			},
			javascript: {
				options: {
					beautify: true
				},
				files: {
					'public/js/main.min.js': [
						'source/js/custom.js']
				}
			}
		},

		copy: {
			jquery: {
				expand: true, 
				flatten: true, 
				src: 'node_modules/jquery/dist/jquery.min.*',
				dest: 'public/js',
			},
			bootstrap: {
				expand: true, 
				flatten: true, 
				src: 'node_modules/bootstrap/dist/js/bootstrap.bundle.min.*',
				dest: 'public/js'
			},
			fontawesome: {
				expand: true, 
				flatten: true, 
				src: 'node_modules/@fortawesome/fontawesome-free/css/all.min.css',
				dest: 'public/css'
			}
		},

		browserSync: {
			dev: {
				bsFiles: {
					src : [
						'public/css/*.css',
						'public/js/*.js',
						'public/*.html'
					]
				},
				options: {
					watchTask: true,
					server: './public'
				}
			}
		}
	});

	// Load the plugin that provides the "uglify" task.
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-copy');
	grunt.loadNpmTasks('grunt-contrib-pug');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-contrib-uglify');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-browser-sync');

	// Default task(s)
	grunt.registerTask('build', ['copy', 'sass', 'autoprefixer', 'uglify', 'pug']);
	grunt.registerTask('default', ['build', 'browserSync', 'watch']);
	grunt.registerTask('serve', ['browserSync', 'watch']);

};