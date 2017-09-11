module.exports = function(grunt) {

  // load all grunt plugins
  require('load-grunt-tasks')(grunt);

  //configure grunt
  grunt.initConfig({

    // get the configuration info from package.json ----------------------------
    // this way we can use things like name and version (pkg.name)
    pkg: grunt.file.readJSON('package.json'),

    // all of our configuration will go here
    // Watch task config
    watch: {
      sass: {
        files: "src/sass/**/*",
        tasks: ['sass:dev']
      }
    },

    stylelint: {
      options: {
        configFile: '.stylelintrc',
        formatter: 'verbose',
        ignoreDisables: false,
        failOnError: true,
        outputFile: '',
        reportNeedlessDisables: false,
        syntax: ''
      },
      src: [
              'src/**/*.{css,scss}'
              // …,
              // '!src/badstyles/*.css'
          ]
    },

    // sass task config
    sass: {
      // For development
      dev: {
        files: {
          "src/css/main.css" : "src/sass/main.scss"
        },
        options: {
          outputStyle: 'expanded'
        }
      },

      // For production
      prod: {
        files: {
          "build/css/main.css" : "src/sass/main.scss"
        },
        options: {
          outputStyle: 'expanded',
          sourcemap: 'none'
        }
      }

    },

    // postcss task config
    postcss: {
      options: {
        map: false,

        processors: [
          require('pixrem')(), // add fallbacks for rem units
          require('autoprefixer')({browsers: 'last 4 versions'}), // add vendor prefixes
          require('postcss-vmin'),
          // require("postcss-cssnext")(),
          require('cssnano')({
            preset: 'default',
            minifyFontValues: false,
          }),
        ]
      },
      dist: {
        src: 'build/css/main.css'
      }
    },

    // copy html task config
    copy: {
      html: {
        expand: true,
        flatten: true,
        src: 'src/*.html',
        dest: 'build/',
        filter: 'isFile'
      },
      img: {
        expand: true,
        cwd: 'img/',
        src: ['**'],
        dest: 'build/'
      }
    }

  });

  // ===========================================================================
  // LOAD GRUNT PLUGINS ========================================================
  // ===========================================================================

  // grunt.loadNpmTasks('grunt-contrib-sass');
  // grunt.loadNpmTasks('grunt-sass');
  // grunt.loadNpmTasks('grunt-contrib-watch');
  // grunt.loadNpmTasks('grunt-contrib-uglify');
  // grunt.loadNpmTasks('grunt-postcss');
  // grunt.loadNpmTasks('grunt-contrib-copy');


  grunt.registerTask('default', ['watch']);
  grunt.registerTask('lint', ['stylelint']);
  grunt.registerTask('prod', ['sass:prod', 'postcss', 'copy']);

};
