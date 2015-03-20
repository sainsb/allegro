

//compile templates
console.log('compiling templates');
var fs = require('fs'),
    exec = require('child_process').exec,
    path = require('path'),
    //_ = require('underscore'),
    sys = require('sys');


//////////////////////
// Update release.txt
//////////////////////

var releaseText = fs.readFileSync("../release.txt", 'utf8');

var cortex = releaseText.substring(releaseText.indexOf('App Notes:'), releaseText.length);

var version = releaseText.substr(releaseText.indexOf('Current Build:'), 30);

version = version.replace('Current Build: ', '');
version = version.substr(0, version.indexOf('\r\n'));

version = version.split('.');
var maj = version[0];
var min = parseInt(version[1]);
var patch = version[2];

//increment minor build

if (process.argv[2] == '-v') { min += 1; console.log('Version rev: ' + maj + '.' + min + '.' + patch); }

version = maj + '.' + min + '.' + patch;

var ws = fs.createWriteStream('../release.txt', { flags: 'r+', start: 0 });
ws.end('\r\nAllegro\r\n\r\nCurrent Build: ' + version + "\r\n" + "Release Date: " + new Date().toISOString() + "\r\n\r\n" + cortex, 'utf-8');

// Output
var output = [

// Javascript
  {
    minified_output_file: 'script.min.js',
    files: [
      'bower_components/jquery/1.9.1/jquery.min.js',
      'bower_components/spin.js/spin.min.js',
      'bower_components/leaflet/0.8-dev/leaflet-src.js',
      'bower_components/leaflet-spin/leaflet.spin.js',
      'bower_components/bootstrap/3.0.3/js/bootstrap.min.js',
      'bower_components/leaflet.fullscreen/Control.FullScreen.js',
      'bower_components/metro/leaflet-hash/leaflet-hash.js',
      'bower_components/leaflet.shapefile/shp.js',
      'bower_components/colorbrewer/colorbrewer.js',
      'bower_components/metro/bootstrap-context/context.js',
      'bower_components/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js',
      'bower_components/bootstrap-select/1.3.1/js/bootstrap-select.min.js',
      'bower_components/leaflet.markercluster/0.4/leaflet.markercluster.js',
      'bower_components/mustache/mustache.min.js',
      'bower_components/chroma/chroma.min.js',
      'bower_components/bootstrap-sortable/bootstrap-sortable.js',
      'bower_components/html5sortable/jquery.sortable.min.js',
      'bower_components/jquery.csvToTable/jquery.csvToTable.js',
      '//atlas/www/prod/library/libraries/jquery.lazyload/jquery.lazyload.js',
      '//atlas/www/prod/library/libraries/PNG/PNG.js',
      '//atlas/www/prod/library/libraries/heatmapjs/heatmap.min.js',
      '//atlas/www/prod/library/libraries/leaflet.heatmapjs/leaflet-heatmap.js'
      //,"../js/script.js"
    ],

    isjs: true,
    output_directory: '../js'
  },

////CSS
    {
      minified_output_file: 'style.min.css',
      files: [

    '//atlas/www/prod/library/libraries/metro/rlis/css/metro-bootstrap-fix-new.css',
    '//atlas/www/prod/library/libraries/bootstrap/3.2.0/css/bootstrap.min.css',
    '//atlas/www/prod/library/libraries/metro/rlis/css/autosuggest.css',
    '//atlas/www/prod/library/libraries/leaflet/0.8-dev/leaflet.css',
   // '//atlas/www/prod/library/libraries/leaflet.markercluster/0.4/MarkerCluster.css',
   // '//atlas/www/prod/library/libraries/leaflet.markercluster/0.4/MarkerCluster.Default.css',
    '//atlas/www/prod/library/libraries/leaflet.fullscreen/Control.FullScreen.css',
    '//atlas/www/prod/library/libraries/bootstrap-context/context.bootstrap.css',
    '//atlas/www/prod/library/libraries/bootstrap-colorpicker/css/bootstrap-colorpicker.min.css',
    '../css/bootstrap-select.min.css'
    //,'../css/style.css'
      ],
      isjs: false,
      output_directory: '../css'
    }
];

// --------------------------------------------------------------------------
// ==========================================================================

var fs = require('fs'),
    exec = require('child_process').exec,
    path = require('path');

var streamOptions = {
  flags: 'w+',
  encoding: 'utf-8',
  mode: 0644
};

var deleteFileIfExists = function (filename) {
  if (fs.existsSync(filename)) {
    fs.unlinkSync(filename);
  }

}, createDirectoryTree = function (dirpath) {
  var parts = path.normalize(dirpath).replace(/\\/g, '/').replace(/^\.?\s*\/+\s*/, "").replace(/\s*\/+\s*$/, "").split('/');
  var result_path = '.';
  for (var i = 0; i < parts.length; i++) {
    result_path = path.join(result_path, parts[i]);
    if (parts[i] == '..') {
      continue;
    }
    if (!fs.existsSync(result_path)) {
      fs.mkdirSync(result_path);
    }
  }
  return path.normalize(result_path);

}, toType = function (obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase();

}, streamClose = function (output_file, minified_file, output_path, minified_path, isjs) {
  var build_file = 'build-' + (output_file || minified_file),
    output_file_path = (output_file) ? path.join(output_path, output_file) : null,
    minified_file_path = (minified_file) ? path.join(minified_path, minified_file) : null;

  // Copy uncompressed file
  if (output_file_path) {
    deleteFileIfExists(output_file_path);
    fs.writeFileSync(output_file_path, fs.readFileSync(build_file, 'utf-8'));
    console.log('File "' + output_file_path + '" has been compiled successfully.');
  }

  // Compress file
  if (minified_file_path) {
    deleteFileIfExists(minified_file_path);
    if (isjs) {
      exec('java -jar //alex/rlis/drctools/buildscripts/yuicompressor-2.4.7.jar --type js ' + build_file + ' -o ' + minified_file_path, function (error, stdout, stderr) {
        if (stderr || error) {
          console.log('Error: ' + (stderr || error));
        } else {
          fs.unlinkSync(build_file);
          console.log('File "' + minified_file_path + '" has been compiled successfully.');
        }
      });
    } else {
      exec('java -jar //alex/rlis/drctools/buildscripts/yuicompressor-2.4.7.jar --type css ' + build_file + ' -o ' + minified_file_path, function (error, stdout, stderr) {
        if (stderr || error) {
          console.log('Error: ' + (stderr || error));
        } else {
          fs.unlinkSync(build_file);
          console.log('File "' + minified_file_path + '" has been compiled successfully.');
        }
      });
    }
  } else {
    fs.unlinkSync(build_file);
  }
};

//End function declarations

if (output.length === 0) {
  console.log('No files specified to compile.');
}
else {
  output.forEach(function (output_obj) {
    var output_file = (!output_obj['output_file']) ? null : path.basename(output_obj['output_file']),
        minified_file = (!output_obj['minified_output_file']) ? null : path.basename(output_obj['minified_output_file']);

    if (!output_file && !minified_file) {
      return;
    }

    var output_path = null, minified_path = null;

    if (output_file) {
      output_path = createDirectoryTree(path.dirname(path.join(output_obj.output_directory, output_obj['output_file'])));
    }

    if (minified_file) {
      minified_path = createDirectoryTree(path.dirname(path.join(output_obj.output_directory, output_obj['minified_output_file'])));
    }

    var build_file = 'build-' + (output_file || minified_file);

    deleteFileIfExists(build_file);

    (function (_output_obj, _build_file, _output_file, _minified_file, _output_path, _minified_path) {
      var file_stream = fs.createWriteStream(_build_file, streamOptions);

      file_stream.on('close', function () {
        streamClose(_output_file, _minified_file, _output_path, _minified_path, _output_obj.isjs);
      });

      for (var i = 0, file = _output_obj['files'][0]; i < _output_obj['files'].length; file = _output_obj['files'][++i]) {

        var filename = (toType(file) === 'object') ? file['file'] : file,
            data = fs.readFileSync(path.normalize(filename), 'utf-8');
        data = data.replace(/^\uFEFF/, '');
        if (toType(file) === 'object') {
          if (toType(file['replace']) === 'array') {
            for (var j = 0; j < file['replace'].length; j++) {
              data = data.replace(file['replace'][j][0], file['replace'][j][1]);
            }
          }
        }

        // Write data
        file_stream.write('/* ' + path.normalize(filename) + ' */\n\r' + data + '\n\r\n\r');
      }
      file_stream.write('var version="'+version+'";');
      file_stream.end();

    })(output_obj, build_file, output_file, minified_file, output_path, minified_path);

  });
}