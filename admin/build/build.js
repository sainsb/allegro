

var toutput = [
 
//rlisapi
    {
    files: [
            '../views/layer.htm',
        ],
    outfile: '../views/views.min.js'
}
];

// --------------------------------------------------------------------------
// ==========================================================================

//compile templates

console.log('compiling templates');
var fs = require('fs'),
    exec = require('child_process').exec,
    path = require('path'),
    _ = require('underscore');

function readFiles(paths) {
    return paths.map(function (file) {
        var t = fs.readFileSync(file, 'utf8');
        //(<\/?pre[^>]*>)
        t = t.replace(/^\uFEFF/, '');
        //t = t.replace( /(\r\n|\n|\r)/gm , "");
        //t = t.replace(/>\s+</gm, "><");
        t = t.replace(/>\s+</gm, '><');
        //        for (var i = 0; i < 10; i++) {
        //            t = t.replace(/\S\S/gm, ' ');
        //        }
        //        t = t.replace(/\s</gm, '<');
        //        t = t.replace(/>\s/gm, '>');

        var source = _.template(t).source;
        var fu = file.split('/');
        fu = fu[fu.length - 1].split('.')[0];
        fu = fu.replace('vw_', '');
        var declaration = 'templates["' + fu + '"] = ' + source;
        return {
            'path': file,
            declaration: declaration
        };
    });
}


function concat(templates) {
    return templates.reduce(function (previousValue, currentValue, index, array) {
        return previousValue + '\n' + currentValue.declaration;
    }, "var templates = {};");
}

for (var i = 0; i < toutput.length; i++) {
    fs.writeFileSync(toutput[i].outfile, concat(readFiles(toutput[i].files)), 'utf8');
    console.log('File "' + toutput[i].outfile + '" has been created successfully.');
}

//compile scripts and css


// Output
var output = [
    // Javascript
    {
    minified_output_file: 'script.min.js',
        files: [
          "\\\\atlas\\www\\prod\\library\\libraries\\jquery/2.0.3/jquery.min.js",
          "\\\\atlas\\www\\prod\\library\\libraries\\bootstrap/3.2.0/js/bootstrap.min.js",
          "\\\\atlas\\www\\prod\\library\\libraries\\chartjs/Chart.min.js",
          
      '//atlas/www/prod/library/libraries/jquery.lazyload/jquery.lazyload.min.js',
            "../views/views.min.js"
           //, "../js/script.js"
        ],
        isjs: true,
        output_directory: '../js'
    },

    //CSS
    {
    minified_output_file: 'style.min.css',
        files: [
            "\\\\atlas\\www\\prod\\library\\libraries\\bootstrap/3.2.0/css/bootstrap.min.css",
            "../css/style.css"
        ],
        isjs: false,
        output_directory : '../css'
    }
];

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
            exec('java -jar r:/drctools/buildscripts/yuicompressor-2.4.7.jar --type js ' + build_file + ' -o ' + minified_file_path, function (error, stdout, stderr) {
                if (stderr || error) {
                    console.log('Error: ' + (stderr || error));
                } else {
                    fs.unlinkSync(build_file);
                    console.log('File "' + minified_file_path + '" has been compiled successfully.');
                }
            });
        } else {
            exec('java -jar r:/drctools/buildscripts/yuicompressor-2.4.7.jar --type css ' + build_file + ' -o ' + minified_file_path, function (error, stdout, stderr) {
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