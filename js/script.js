
var map, points_layer, baseAll, baseAnno, photo;

var STYLE_KEYWORDS = ['marker-size', 'marker-symbol', 'marker-color', 'stroke', 'stroke-opacity', 'stroke-width', 'fill', 'fill-opacity'];

var LAYER_TYPES = { 'geojson': 1, 'shapefile': 2, 'tilejson':3 };

var FIELD_TYPES = { 'number': 1, 'string': 2 };

var SUBDOMAINS = ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4'];

var GRAPHIC_PREFIX = 'http://library.oregonmetro.gov/rlisdiscovery/browse_graphic/';

function initMap() {

    baseAll = new L.TileLayer('//{s}.oregonmetro.gov/ArcGIS/rest/services/metromap/baseAll/MapServer/tile/{z}/{y}/{x}/?token=' + RLIS.token, { zIndex: 10, subdomains: SUBDOMAINS });
    baseAnno = new L.TileLayer('//{s}.oregonmetro.gov/ArcGIS/rest/services/metromap/baseAnno/MapServer/tile/{z}/{y}/{x}/?token=' + RLIS.token, { zIndex: 9100, subdomains: SUBDOMAINS });
    photo = new L.TileLayer('//{s}.oregonmetro.gov/ArcGIS/rest/services/photo/2013aerialphoto/MapServer/tile/{z}/{y}/{x}/?token=' + RLIS.token, { maxZoom: 19, zIndex: 10, subdomains: SUBDOMAINS });

    map = new L.Map('map', {
        center: new L.LatLng(45.44944, -122.67599),
        zoom: 10,
        minZoom: 9,
        maxZoom: 19,
        layers: [baseAll],
        fullscreenControl: true
    });

    var basemaps = L.Control.extend({
        options: {
            position: 'topright'
        },

        onAdd: function (map) {
            var basemapcontainer = L.DomUtil.get('basemap');
            L.DomEvent.disableClickPropagation(basemapcontainer);
            return basemapcontainer;
        }
    });

    map.addControl(new basemaps());
    L.control.scale().addTo(map);
    var hash = new L.Hash(map);
}

$(document).ready(function () {

    $('.color').colorpicker();

    $('.selectpicker').selectpicker();

    $('#btnAddData').click(function () {
        $('#dataModal').modal('show');
    });

    $('#btnTouchMe').click(function () {
        $('#colorModal').modal('show');
    });

    //Attach behavior to legend checkboxes
    $('body').on('click', '.legend-check', function () {
        var id = $(this).attr('id').replace('chk', '');
        var layer = getLayerById(id);
        if ($(this).is(':checked')) {
            //we'll need to bring stuff to back and front
            if (layer.type == LAYER_TYPES.geojson || layer.type == LAYER_TYPES.shapefile) {
                layer.mapLayer.addTo(map).bringToFront();
            } else {
                layer.mapLayer.addTo(map);
            }
        } else {
            map.removeLayer(layer.mapLayer);
        }
    });
    
    //Attach behavior to opacity sliders
    $('body').on('input', '.slider', function (e) {
        var id = $(this).attr('id').replace('sli', '');
        var layer = getLayerById(id);
        layer.opacity = $(this).val() / 100;
        switch(layer.type) {
            case "geojson":
            case "shapefile":
                layer.mapLayer.setStyle
            ({
                fillOpacity: layer.opacity,
                opacity: layer.opacity
            });
                break;
            case "tilejson":
                layer.mapLayer.setOpacity(layer.opacity);
                break;
        }
    });

    populateLayers();
    
    populatePalettes();

    //$(document).on('click', '.legend-item', function(){
    //  console.log($(this))  
    //  var color = $(this).data('data-color');
    //  console.log(color);

    //  //$('#colorpicker').colorpicker('setValue', color);
    //  //$('#colorModal').modal('show');
    //});

    $('#btnAerial').click(function () {
        $(this).addClass('active');
        $('#btnRoads').removeClass('active');
        map.addLayer(photo);
        map.removeLayer(baseAll);
        $('#lblLabels').removeClass('muted');
        if ($('#chkLabels').is(':checked')) {
            map.addLayer(baseAnno);
        }

        $('#chkLabels').removeAttr('disabled');
    });

    $('#btnRoads').click(function () {
        $(this).addClass('active');
        $('#btnAerial').removeClass('active');
        map.removeLayer(photo);
        map.removeLayer(baseAnno);
        map.addLayer(baseAll)
        $('#chkLabels').attr('disabled', 'disabled');
        $('#lblLabels').addClass('muted');
    });

    $('#chkLabels').click(function () {
        if ($(this).is(':checked')) {
            map.addLayer(baseAnno);
        } else {
            map.removeLayer(baseAnno);
        }
    });

    var x = new RLIS.Autosuggest("bikeTo", { "mode": 'locate', 'entries': 7 }, function (result, error) {
        if (error) {
            alert(error);
            return;
        }

        map.setView([result[0].lat, result[0].lng], 15);
    });

    initMap();

});

function addData(layerObject) {

    //Is this a tiled layer or a JSON layer or....?
    //See if it already exists in the global namespace
    switch (layerObject.type) {

        case "geojson":
            loadGeoJSON(layerObject);
            break;
        case "tilejson":
            loadTileJSON(layerObject);
            break;
        case "AGSTiles":
            layerObject.mapOptions = layerObject.mapOptions || {};
            layerObject.mapLayer = new L.TileLayer(layerObject.url + '?token=' + RLIS.token, layerObject.mapOptions).addTo(map);
            break;
        case "shapefile":
            layerObject.callback = function (data) {
                parseGeoJSON(data, layerObject);
            };

            loadShapefile(layerObject);
    }
}

function loadGeoJSON(options) {
    $.getJSON(options.url, function (data) {
        parseGeoJSON(data, options);
    });
}

function loadTileJSON(layer) {
    $.getJSON(layer.url, function (data) {

        //Add to legend

        var id = layer.name.replace(/\s/g, '_');
        var legend = '<div class="legend" id="leg' + id + '">';
        legend += '<label id="lbl' + id + '""><input type="checkbox" id="chk' + id + '" style="clear:both;float:left;" checked="checked" class="legend-check"/>&nbsp;&nbsp;<b>' + layer.name + '</b></label>';
        if (typeof (data.legend) != 'undefined') {
            legend += data.legend;
        }
        legend += '</div>';
        $('#legend').prepend(legend);

        layer.HTMLLegend = legend;

        applyContextMenu('#lbl' + id, LAYER_TYPES.tilejson);

        layer.mapLayer = new L.TileLayer(data.canonicalURL + '?token=' + RLIS.token, { subdomains: data.subdomains, zIndex: 70 });

        layer.mapLayer.addTo(map);

    });
}

function getLayerById(id) {
    for (var layer in config.layers) {
        if (config.layers[layer].name.replace(/\s/g, '_') == id) {
            return config.layers[layer];
        }
    }
    return null;
}

function parseGeoJSON(data, layer) {
    var geoJson = {};

    if (typeof(data.legend) != 'undefined') {
        layer.legend = data.legend;
    }

    if (typeof (layer.legend) === 'undefined') {
        layer.legend = { "symbols": [], "title": layer.name };
    }
    
    var _onEachFeature = function (feature, slayer) {
        if (feature.properties) {
            slayer.bindPopup(Object.keys(feature.properties).map(function (k) {
                if ($.inArray(k, STYLE_KEYWORDS) == -1) {
                    return '<b>' + k + "</b>: " + feature.properties[k] + '<br/>';
                }
            }).join(""), { maxHeight: 200 });
        }
    };

    //does it have simpleStyle defined?
    //https://github.com/mapbox/simplestyle-spec/tree/master/1.1.0
    //Nothing more to do here, handle it with the mapbox style api
    if (hasSimpleStyle(data.features[0].properties)) {
        geoJson = L.geoJson(data, {
            style: L.mapbox.simplestyle.style,
            onEachFeature: _onEachFeature
        });
    }
    else {

        var ramp = colorbrewer[pickRandomProperty(colorbrewer)];
        layer.ramp = ramp[pickRandomProperty(ramp)];

        switch (data.features[0].geometry.type) {

            case "Point":
                geoJson = L.geoJson(data, {
                    pointToLayer: (layer.legend.symbols.length > 0) ?
                        function (feature, latlng) {
                        return L.circleMarker(latlng, {
                            radius: 5,
                            fillColor:  styleSymbolsFromLegend(feature.properties[layer.symbolField], layer.legend),
                            fillOpacity: 1,
                            stroke: true,
                            weight: 1,
                            opacity: 1,
                            color: '#FFF'
                        });
                        } : function (feature, latlng) {
                            return L.circleMarker(latlng, {
                                radius: 5,
                                fillColor: styleFactory(feature,layer),
                                fillOpacity: 1,
                                stroke: true,
                                weight: 1,
                                opacity: 1,
                                color: '#FFF'
                            });
                        },
                    onEachFeature: _onEachFeature
                });
                break;
            case "LineString":
            case "Polygon":
            case "MultiPolygon":
                geoJson = L.geoJson(data, {
                    style: (typeof (layer.style) != 'undefined') ?
                        layer.style :
                        (layer.legend.symbols.length > 0) ?
                        function(feature) {
                            return {
                                fillColor: styleSymbolsFromLegend(feature.properties[layer.symbolField], layer.legend),
                                fillOpacity: 1,
                                stroke: true,
                                weight: 1,
                                opacity: 1,
                                color: "#FFF"
                            };
                        } : function(feature) {
                            return {
                                fillColor: styleFactory(feature, layer),
                                fillOpacity: 1,
                                stroke: true,
                                weight: 1,
                                opacity: 1,
                                color: '#CCC'
                            };
                        },
                    onEachFeature: _onEachFeature,
                    clickable: (typeof (layer.clickable) == 'undefined' || layer.clickable == true)
                });
        }
    }
    
    var id = layer.name.replace(/\s/g, '_');

    layer.geom = data.features[0].geometry.type;
    if (layer.legend.symbols.length == 0) {
       layer.legend.symbols.push({ value: ' ', color: layer.style.color });
    }

    //parse fields:
    layer.fields = [];
    for (var field in data.features[0].properties) {
        if (isNaN(data.features[0].properties[field])) {
            layer.fields.push({ name: field, type: FIELD_TYPES.string });
        } else {
            layer.fields.push({ name: field, type: FIELD_TYPES.number });
        }
    }

    var legend = createHTMLLegend(layer);
    $('#legend').prepend(legend);
    applyContextMenu('#lbl' + id);
    layer.HTMLLegend = legend;
    layer.mapLayer = geoJson.addTo(map);
}

function loadShapefile(options) {

    //Check in local storage first
    var localGeoJSON = localStorage.getObject(options.url);

    if (localGeoJSON != null) {
        parseGeoJSON(localGeoJSON, options);
        return;
    }

    var xhr = new XMLHttpRequest(),
            reader = new FileReader();

    //url_prefix = 'data/';
    xhr.open("GET", options.url, true);
    // Set the responseType to blob
    xhr.responseType = "blob";

    xhr.addEventListener("load", function () {
        if (xhr.status === 200) {
            // onload needed since Google Chrome doesn't support addEventListener for FileReader
            reader.onload = function (e) {
                var ext;
                if (reader.readyState !== 2 || reader.error) {
                    return;
                } else {
                    shp(reader.result).then(function (data) {

                        //cache geojson in localstorage
                        try {
                            localStorage.setObject(options.url, data);
                        }
                        catch (ex) {
                            console.log('unable to store this in local storage');
                        }
                        options.callback(data);
                    });
                    //.then(function (data) {
                    //console.log('bon');
                    // console.log(z);
                    //});
                    //worker.data([reader.result, file.name.slice(0, (0 - (ext.length + 1)))], [reader.result]).then(function(data) {
                    //  console.log(data);
                    //  });
                }
            }
            // Load blob as Data URL
            reader.readAsArrayBuffer(xhr.response);
        }
    }, false);
    // Send XHR
    xhr.send();
}

function hasSimpleStyle(featureProperties) {
    for (var prop in featureProperties) {
        if ($.inArray(prop, STYLE_KEYWORDS) > -1) {
            return true;
        }
    }
    return false;
}

/* Creates and returns an HTML legend from a jsonlegend
  @layer - a layer object
*/
function createHTMLLegend(layer) {
   
    var id = layer.name.replace(/\s/g, '_');

    var HTMLLegend = '<div class="legend" id="leg' + id + '">';
    HTMLLegend += '<label id="lbl' + id + '""><input type="checkbox" id="chk' + id + '" style="clear:both;float:left;" checked="checked" class="legend-check"/>&nbsp;&nbsp;<b>' + layer.legend.title + '</b></label>';

    //console.log(jsonLegend);
    HTMLLegend += HTMLLegendFactory(layer);

    HTMLLegend += '</div>';

    return HTMLLegend;
}

function HTMLLegendFactory(layer) {

    var HTMLLegend = "";
    layer.legend.symbols.sort(compare);
    layer.legend.symbols.forEach(function (symbol) {
        HTMLLegend += createHTMLLegendItem(layer.geom, symbol.value, symbol.color);
    });

    return HTMLLegend;
}

/* Creates HTML(& SVG) elements based on geometry and color
@geom - string, an enum of sorts. looking for Point, LineString, Multipolygon etc.
@value - string/number, the value of the legend item
@color - Hexadecimal color #FFCC00
*/
function createHTMLLegendItem(geom, value, color) {
    var legendItem = null;

    switch (geom) {
        case "Point":
            legendItem = '<div class="legend-item" data-color="' + color + '" id="' + value + '"><svg width="16" height="14">'
                    + '<circle cx="6.5" cy="8" r="5.8" stroke="#777" stroke-width="1" fill="' + color + '" />'
                    + '</svg> ' + value + '</div>';
            break;
        case "Polygon":
        case "MultiPolygon":
            legendItem = '<div class="legend-item" data-color="' + color + '" id="' + value + '">'
                + '<svg width="16" height="14">'
                + '<rect width="12" height="12" fill=' + color + ' stroke-width="1" stroke="#777">'
                + '</svg> ' + value + '</div>';
    }

    return legendItem;
}

function styleSymbolsFromLegend(value, legend) {
    
    if (!value) { return '#777'; }
    for (var i = 0; i < legend.symbols.length; i++) {
        if (isNaN(value)) {
            if (legend.symbols[i].value.toUpperCase() == value.toUpperCase()) {
                return legend.symbols[i].color;
            }
        }
        else if (legend.symbols[i].value == value) {
            return legend.symbols[i].color;
        }
        else {
            //die
        }
    }
};

/*
Returns a color and adds it and corresponding value to the GeoJSON legend property
note that we have to check for distinction
@feature - the feature that leaflet is iterating thru
@ramp - the selected/assigned color ramp for the layer
@symbolField - the field upon which the symbols will be assigned
@dataLegend - passed by ref, creates the JSON legend not the HTML legend
*/
function styleFactory(feature, layer) {
    //ensure that we haven't symbolized this multipart feature yet.
    for (var i = 0; i < layer.legend.symbols.length; i++) {
        if (layer.legend.symbols[i].value == feature.properties[layer.symbolField]) {
            return layer.legend.symbols[i].color;
        }
    }

    var color = getColorFromRamp(layer.ramp);

    //build the legend while we're here
    layer.legend.symbols.push({ "value": feature.properties[layer.symbolField], "color": color });
    return color;
}

function populateLayers() {
    var madeFirstActiveTab = false;
    for (var _layer in config.layers) {

        var layer = config.layers[_layer];
        var id = layer.name.replace(/\s/g, '_');
        //If the layers source tab doesn't exist, create it.
        if (!$('#' + layer.source).length) {

            var sourceTabString = '<li ';
            if (!madeFirstActiveTab) {
                sourceTabString += 'class="active"';
            }

            sourceTabString += '><a href="#' + layer.source + '" data-toggle="tab"><i class="fa fa-check-circle-o"></i>&nbsp;' + layer.source + '</a></li>';

            $('#sourceTabs').append(sourceTabString);

            var tabstring = '<div class="tab-pane fade ';
            
            if (!madeFirstActiveTab) {
                tabstring += 'active in';
                madeFirstActiveTab = true;
            }
            tabstring += '" id="' + layer.source + '"></div>';

            $('#sourceTabs').next().append(tabstring);
        }

        //If the layers theme section doesn't exist in the source tab content,
        //create it.
        if (typeof layer.theme == 'undefined') {
            layer.theme = '';
        }

        if (!$('#' + layer.source + '_' + layer.theme).length) {
                $('#' + layer.source).append('<div style="clear:both;" id="' + layer.source + '_' + layer.theme + '"><h4 style="margin:0;">' + layer.theme.toProperCase() + '</h4><hr style="margin:0;padding:0;"/></div');
        }

        var thumb = GRAPHIC_PREFIX + layer.thumb;
        $('#' + layer.source + '_' + layer.theme).append("<div class='img-block'><div class='caption'>" + layer.name + "</div><img class='idata' src='" + thumb + "' alt='" + layer.name + "' id='img" + id + "'/></div>");
    }
    
    $('.img-block').on('click', function () {
        var id = $(this).find('img').attr('id').replace('img', '');
        layer = getLayerById(id);

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            map.removeLayer(layer.mapLayer);
            $('#leg' + id).remove();
        }
        else {
            $(this).addClass('active');
            if (typeof (layer.mapLayer) != 'undefined') {
                map.addLayer(layer.mapLayer);
                $('#legend').prepend(layer.HTMLLegend);
            }
            else {
                addData(layer);
            }
        }
    });

    $('.img-block').hover(
        function () {
            $(this).find('.caption').addClass('hover');
        },
        function () {
            $(this).find('.caption').removeClass('hover');
        }
      );
}

function populateBasemaps() {
    
}

function populatePalettes() {
    for (ramp in colorbrewer) {
        if (typeof (colorbrewer[ramp]['9']) != 'undefined') {
            var $li = $('<li></li>');
            var $span = $('<span class="palette" title="' + ramp + '"></span>');
            for (var col in colorbrewer[ramp]['9']) {
                $span.append('<span class="swatch" style="background-color: ' + colorbrewer[ramp][9][col] + ';"></span>');
            }
            $li.append($span);
            $('#lstRamps').append($li);
        }
    }
}

function getColorFromRamp(ramp) {
    var ran = Math.floor(Math.random() * ramp.length);
    return ramp[ran];
}

function style() {
    return {
        fillColor: getRandomColor(),
        fillOpacity: 1,
        stroke: true,
        weight: 1,
        opacity: 1,
        color: '#FFF'
    };
}

function changeSymbolHandler(id) {

    id = id.replace('#lbl', '');
    var layer = getLayerById(id);
    var $span = $('<span class="temppalette" ></span>');
    for (var col in layer.ramp) {
        $span.append('<span class="swatch" style="background-color: ' + layer.ramp[col] + ';"></span>');
    }

    if (!$($('#selGradient').children()[0]).is('b')) {
        $('#selGradient span').first().remove();
    }

    $('#selGradient').prepend($span);

    $('#selField').empty();

    $.each(layer.fields, function (key, value) {
        $('#selField')
            .append($("<option></option>")
            .attr("value", value.name)
            .text(value.name));
    });

    $('#selField').on('change', function(e) {
        console.log($('#selField').val());
        layer.symbolField = $('#selField').val();
        //rerender?
        //phantom_symbols = [];
        //for (symbol in layer.legend.symbols) {
        //    phantom_symbols.push({ value: layer.legend.symbols[symbol].value, color: getColorFromRamp(colorbrewer[ramp]['9']) });
        //}

        var legenditems = HTMLLegendFactory({ name: layer.name, geom: layer.geom, legend: { title: layer.legend.title, symbols: phantom_symbols } });

        $('#rendererLegend').empty().html(legenditems);

        $('#btnApplySymbol').off().on('click', function () {

            //use the new jsonlegend
            layer.legend.symbols = phantom_symbols;
            //resymbolize the features
            layer.mapLayer.setStyle(function (feature) {
                return {
                    fillColor: styleSymbolsFromLegend(feature.properties[layer.symbolField], layer.legend),
                    fillOpacity: (typeof (layer.opacity) !== 'undefined') ? layer.opacity : 1,
                    stroke: true,
                    weight: 1,
                    opacity: (typeof (layer.opacity) !== 'undefined') ? layer.opacity : 1,
                    color: "#FFF"
                };
            });

            layer.ramp = colorbrewer[ramp]['9'];
            $('#leg' + id + ' .legend-item').remove();
            $('#leg' + id).append(legenditems);

            var HTMLLegend = $('#leg' + id).clone().html();
            layer.HTMLLegend = '<div class="legend" id="leg' + id + '">' + HTMLLegend + '</div';
        });
    });

    $('.selectpicker').selectpicker('refresh');

    //setup event handlers for single color
    $('#colFill').off('changeColor').on('changeColor', function (ev) {
        layer.mapLayer.setStyle({ fillColor: ev.color.toHex() });
    });

    $('#colStroke').off('changeColor').on('changeColor', function (ev) {
        layer.mapLayer.setStyle({ color: ev.color.toHex() });
    });

    $('#numStroke').off('change').on('change', function(e) {
        layer.mapLayer.setStyle({ weight: $('#numStroke').val() });
    });

    //strip any handlers from selGradient and create new to match correct layer
    $('.palette').off().on('click', function (e) {
        var ramp = $(this).attr('title');
        var $span = $('<span class="palette"></span>');
        for (col in colorbrewer[ramp]['9']) {
            $span.append('<span class="swatch" style="background-color: ' + colorbrewer[ramp]['9'][col] + ';"></span>');
        }

        $('#selGradient span').first().remove();
        $('#selGradient').prepend($span);
        //take the ramp and reparse the geoJSON

        //for each value in the options.legend
        phantom_symbols = [];
        for (symbol in layer.legend.symbols) {
            phantom_symbols.push({ value: layer.legend.symbols[symbol].value, color: getColorFromRamp(colorbrewer[ramp]['9']) });
        }

        var legenditems = HTMLLegendFactory({name : layer.name,geom: layer.geom, legend: { title: layer.legend.title, symbols: phantom_symbols }});

        $('#rendererLegend').empty().html(legenditems);

        $('#btnApplySymbol').off().on('click', function () {

            //use the new jsonlegend
            layer.legend.symbols = phantom_symbols;
            //resymbolize the features
            layer.mapLayer.setStyle(function (feature) {
                return {
                    fillColor: styleSymbolsFromLegend(feature.properties[layer.symbolField], layer.legend),
                    fillOpacity: (typeof (layer.opacity) !== 'undefined') ? layer.opacity : 1,
                    stroke: true,
                    weight: 1,
                    opacity: (typeof(layer.opacity) !== 'undefined') ? layer.opacity: 1,
                    color: "#FFF"
                };
            });

            layer.ramp = colorbrewer[ramp]['9'];
            $('#leg' + id + ' .legend-item').remove();
            $('#leg' + id).append(legenditems);

            var HTMLLegend = $('#leg' + id).clone().html();
            layer.HTMLLegend = '<div class="legend" id="leg' + id + '">' + HTMLLegend + '</div';
        });

        //$('#legend').prepend(legend);
        //now build a phantom legend out of it.

        // console.log(layer.HTMLLegend);
        // layer.mapLayer.setStyle(function(feature){
        //   return {
        //       fillColor: restyleFactory(feature, layer.ramp, layer.symbolField, layer.legend),
        //       fillOpacity: 1,
        //       stroke: true,
        //       weight: 1,
        //       opacity: 1,
        //       color: '#CCC'
        //   };});
    });

    //recreate the legend in the dialog???

    $('#rendererLegend').empty().append(HTMLLegendFactory(layer));
    $('#symbolModal').modal('show');
}

function applyContextMenu(id) {

    context.init({
        fadeSpeed: 100,
        filter: function ($obj) { },
        above: 'auto',
        preventDoubleContext: true,
        compress: false
    });

    context.attach(id, [
        { header: 'Options' },
        {
            text: 'Change Symbol',
            action: function () { changeSymbolHandler(id); }
        },
        {
            text: 'Remove',
            action: function (e) {
                id = id.replace('#lbl', '');
                var layer = getLayerById(id);
                map.removeLayer(layer.mapLayer);
                $('#leg' + id).remove();
                $('.img-block.active').each(function (index) {
                    if ($(this).find('img').attr('id').replace('img', '') == id) {
                        $(this).removeClass('active');
                    }
                });
            }
        },
        {
            text: "Download",
            subMenu: [
                { text: 'Shapefile',  target: '_blank' },
                { text: 'GeoJSON',  target: '_blank' }
            ]
        },
         { header: 'Opacity' },
         {
             value: function() {
                 id = id.replace('#lbl', '');
                 var layer = getLayerById(id);
                 return (typeof layer.opacity !== 'undefined') ? layer.opacity :
                 100;
             },
             id: id.replace('#lbl', '')
         },
         { header: 'Developer' },
            {
                text: 'Export Symbology',
                action: function (e) {
                    id = id.replace('#lbl', '');
                    var layer = getLayerById(id);
                }
            }
    ]);
}

Storage.prototype.setObject = function (key, value) {
    this.setItem(key, JSON.stringify(value));
}

Storage.prototype.getObject = function (key) {
    var value = this.getItem(key);
    return value && JSON.parse(value);
}

String.prototype.toProperCase = function () {
    return this.replace(/\w\S*/g, function (txt) { return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase(); });
};

function pickRandomProperty(obj) {
    var result;
    var count = 0;
    for (var prop in obj)
        if (Math.random() < 1 / ++count)
            result = prop;
    return result;
}

function compare(a, b) {
    if (a.value < b.value)
        return -1;
    if (a.value > b.value)
        return 1;
    return 0;
}
