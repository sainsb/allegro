

//compile templates
console.log('compiling templates');
var fs = require('fs'),
    exec = require('child_process').exec,
    path = require('path'),
    //_ = require('underscore'),
    sys = require('sys');

var version;
var t = fs.readFileSync("../Properties/AssemblyInfo.cs", 'utf8');
var s = t.split('\n');
for (var i = 0; i < s.length; i++) {
  if (s[i].indexOf('assembly: AssemblyVersion') != -1) {
    version = s[i].replace('[assembly: AssemblyVersion("', "");
    version = version.replace('")]', '');
    version = version.replace(/(\r\n|\n|\r)/gm, "");
    console.log('My Version number is:' + version);
  }
}

//////////////////////
// Update release.txt
//////////////////////

//var releaseText = fs.readFileSync("../release.txt", 'utf8');

//var cortex = releaseText.substring(releaseText.indexOf('App Notes:'), releaseText.length);

//var ws = fs.createWriteStream('../release.txt', { flags: 'r+', start: 0 });
//ws.end('\r\nAllegro\r\n\r\nCurrent Build: ' + version + "\r\n" + "Release Date: " + new Date().toISOString() + "\r\n\r\n" + cortex, 'utf-8');

//function readFiles(paths) {
//  return paths.map(function (file) {
//    var t = fs.readFileSync(file, 'utf8');
//    //(<\/?pre[^>]*>)
//    t = t.replace(/^\uFEFF/, '');
//    t = t.replace(/(\r\n|\n|\r)/gm, "");
//    //t = t.replace(/>\s+</gm, "><");
//    t = t.replace(/>\s+</gm, '><');
//    for (var i = 0; i < 10; i++) {
//      t = t.replace(/\s\s/gm, ' ');
//    }
//    //        t = t.replace(/\s</gm, '<');
//    //        t = t.replace(/>\s/gm, '>');

//    var source = _.template(t).source;
//    var fu = file.split('/');
//    fu = fu[fu.length - 1].split('.')[0];
//    fu = fu.replace('vw_', '');
//    var declaration = 'templates["' + fu + '"] = ' + source;
//    return {
//      'path': file,
//      declaration: declaration
//    };
//  });
//}

//function concat(templates) {
//  return templates.reduce(function (previousValue, currentValue, index, array) {
//    return previousValue + '\n' + currentValue.declaration;
//  }, "var version='" + version + "';var templates = {};");
//}

//for (var i = 0; i < toutput.length; i++) {
//  fs.writeFileSync(toutput[i].outfile, concat(readFiles(toutput[i].files)), 'utf8');
//  console.log('File "' + toutput[i].outfile + '" has been created successfully.');
//}

// Output
var output = [

// Javascript
  {
    minified_output_file: 'script.min.js',
    files: [
       '//atlas/www/prod/library/libraries/jquery/1.9.1/jquery.min.js',
       '//atlas/www/prod/library/libraries/leaflet/0.8-dev/leaflet-src.js',
       '//atlas/www/prod/library/libraries/bootstrap/3.0.3/js/bootstrap.min.js',
       '//atlas/www/prod/library/libraries/leaflet.fullscreen/Control.FullScreen.js',
       '//atlas/www/prod/library/libraries/leaflet-hash/leaflet-hash.js',
        '//atlas/www/prod/library/libraries/leaflet.shapefile/shp.js',
      '//atlas/www/prod/library/libraries/colorbrewer/colorbrewer.js',
      '//atlas/www/prod/library/libraries/metro/bootstrap-context/context.js',
      '//atlas/www/prod/library/libraries/bootstrap-colorpicker/js/bootstrap-colorpicker.min.js',
      '//atlas/www/prod/library/libraries/bootstrap-select/1.3.1/js/bootstrap-select.min.js',
    '//atlas/www/prod/library/libraries/leaflet.markercluster/0.4/leaflet.markercluster.js',
    '//atlas/www/prod/library/libraries/mustache/mustache.min.js',
    '//atlas/www/prod/library/libraries/chroma/chroma.min.js',
     '//atlas/www/prod/library/libraries/bootstrap-sortable/bootstrap-sortable.js',
     '//atlas/www/prod/library/libraries/html5sortable/jquery.sortable.min.js',
      '//atlas/www/prod/library/libraries/jquery.csvToTable/jquery.csvToTable.js',
      '//atlas/www/prod/library/libraries/jquery.lazyload/jquery.lazyload.min.js',
  '//atlas/www/prod/library/libraries/PNG/PNG.js',
      '//atlas/www/prod/library/libraries/heatmapjs/heatmap.min.js',
      '//atlas/www/prod/library/libraries/leaflet.heatmapjs/leaflet-heatmap.js'
    ,"../js/script.js"
    ],

    isjs: true,
    output_directory: '../js'
  },
   {
     minified_output_file: 'config.min.js',
     files: [
      "../config/rlis_config.js",
      "../config/basemap_config.js",
      "../config/rise_config.js",
      "../config/trimet_config.js",
     // "../config/civic_apps_config.js",
     // "../config/parks_config.js",
      "../config/equity_atlas_config.js",
      "../config/spatial_data_library_config.js"
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
    '//atlas/www/prod/library/libraries/leaflet.coordinates/0.1.4/Leaflet.Coordinates.css',
    '../css/bootstrap-select.min.css',
    '../css/style.css'
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
      file_stream.end();

    })(output_obj, build_file, output_file, minified_file, output_path, minified_path);

  });
}