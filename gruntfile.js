module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),
    concat: {
    options: {
      separator: '\n',
    },
    js: {
      src: [
      'bower_components/jquery/dist/jquery.min.js',
      'bower_components/spin.js/spin.js',
      'bower_components/leaflet-dist-dev/leaflet-src.js',
      'bower_components/leaflet.spin/index.js',
      'bower_components/bootstrap/dist/js/bootstrap.min.js',
      'bower_components/leaflet.fullscreen/Control.FullScreen.js',
      'bower_components/leaflet-hash/index.js',
      'bower_components/shp/dist/shp.min.js',
      'bower_components/colorbrewer/colorbrewer.js',
      'bower_components/context/index.js',
      'bower_components/bootstrapcolorpicker/dist/js/bootstrap-colorpicker.min.js',
      'bower_components/bootstrap-select/js/bootstrap-select.js',
      //'bower_components/leaflet.markercluster/0.4/leaflet.markercluster.js',
      'bower_components/mustache/mustache.min.js',
       'bower_components/chroma-js/chroma.min.js',
       'bower_components/bootstrap-sortable/Scripts/bootstrap-sortable.js',
       'bower_components/html5sortable/jquery.sortable.min.js',
       //'bower_components/jquery.csvToTable/jquery.csvToTable.js',
       'bower_components/jquery.lazyload/jquery.lazyload.js',
      //'bower_components/PNG/PNG.js',
      //'bower_components/heatmapjs/heatmap.min.js',
      //'bower_components/leaflet.heatmapjs/leaflet-heatmap.js'

        ],
      dest: 'js/_script.js',
    },
    css: {
      src : [
'bower_components/bootstrap/dist/css/bootstrap.css',
'bower_components/leaflet-dist-dev/leaflet.css',
'bower_components/leaflet.fullscreen/Control.FullScreen.css',
'bower_components/bootstrapcolorpicker/dist/css/bootstrap-colorpicker.min.css',
'css/bootstrap-select.min.css'
      ],
      dest: 'css/style.min.css'
    }
  },
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      script: {
        src: 'js/_script.js',
        dest: 'js/script.min.js'
      },
      // style: {
      //   src: 'css/_style.css',
      //   dest: 'css/style.min.css'
      // }
    }

  });


  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  //grunt.loadNpmTasks('grunt-bower-concat');
  // Default task(s).
  grunt.registerTask('default', ['concat', 'uglify']);

};