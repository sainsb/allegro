
var map, points_layer, baseAll, baseAnno, photo;

var STYLE_KEYWORDS = ['marker-size', 'marker-symbol', 'marker-color', 'stroke', 'stroke-opacity', 'stroke-width', 'fill', 'fill-opacity'];

var LAYER_TYPES = { 'geojson': 1, 'shapefile': 2, 'tilejson':3 };

var FIELD_TYPES = { 'number': 1, 'string': 2 };

var SUBDOMAINS = ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4'];

var GRAPHIC_PREFIX = 'http://library.oregonmetro.gov/rlisdiscovery/browse_graphic/';

var DEFAULT_RAMP = 'RdYlBu';
var DEFAULT_COLOR = '#444';
var DEFAULT_WEIGHT = 1;

var scaleCounter = 0;

$(document).ready(function () {

    $('.color').colorpicker();

    $('.selectpicker').selectpicker();

    $('#btnAddData').click(function () {
        $('#dataModal').modal('show');
    });

    $('#btnTouchMe').click(function () {
        $('#colorModal').modal('show');
    });

    $('#btnBasemap').click(function() {
        $('#basemapModal').modal('show');
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

    populateBasemaps();
    
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

    L.control.scale().addTo(map);
    var hash = new L.Hash(map);
}

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

        layer.mapLayer = new L.TileLayer(data.canonicalURL + '?token=' + RLIS.token, { subdomains: data.subdomains, zIndex: (typeof layer.zIndex != 'undefined') ? layer.zIndex : 70});

        layer.mapLayer.addTo(map);

    });
}

function parseGeoJSON(data, layer) {

    var geoJson = {};

    // take legend def in config over data legend
    if (typeof (layer.legend) === 'undefined') {
        if (typeof (data.legend) === 'undefined') {
            layer.ramp = DEFAULT_RAMP;
            layer.legend = { "symbols": [], "title": layer.name };

            var values = [];
            
            for (var i = 0; i < data.features.length; i++) {
                if ($.inArray(data.features[i].properties[layer.symbolField], values) === -1) {
                    values.push(data.features[i].properties[layer.symbolField]);
                }
            }

            layer.scale = chroma.scale(DEFAULT_RAMP).domain([1, values.length]).out('hex');

            for (var val in values.sort(myComparator)) {
                values[val] = values[val];
                createJSONLegend(values[val], layer.scale, layer.legend.symbols);
            }

        } else {
            layer.legend = data.legend;
        }
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

        //create legend....
    }
    else {
        switch (data.features[0].geometry.type) {
            case "Point":
                geoJson = L.geoJson(data, {
                    pointToLayer: 
                        function (feature, latlng) {
                            return L.circleMarker(latlng, styleFromLegend(feature, layer));
                        },
                    onEachFeature: _onEachFeature
                });
                break;
            case "LineString":
            case "Polygon":
            case "MultiPolygon":
                geoJson = L.geoJson(data, {
                    style: (typeof (layer.style) != 'undefined') ?
                        layer.style : function(feature) {return styleFromLegend(feature, layer); },
                    onEachFeature: _onEachFeature,
                    clickable: (typeof (layer.clickable) == 'undefined' || layer.clickable == true)
                });
        }
    }

    var id = layer.name.replace(/\s/g, '_');

    layer.geom = data.features[0].geometry.type;

    //parse fields and add to layer object
    layer.fields = [];
    for (var field in data.features[0].properties) {
        var fieldType = isNaN(data.features[0].properties[field]) ? 'string' : 'number';
        layer.fields.push({ name: field, type: fieldType});
        
    }

    //create the HTMLLegend from the jsonLegend property of the layer.
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

    HTMLLegend += HTMLLegendFactory(layer);

    HTMLLegend += '</div>';

    return HTMLLegend;
}

function HTMLLegendFactory(layer) {

    var HTMLLegend = "";
    layer.legend.symbols.sort(compare);
    layer.legend.symbols.forEach(function (symbol) {
        HTMLLegend += createHTMLLegendItem(layer.geom, symbol);
    });

    return HTMLLegend;
}

/* Creates HTML(& SVG) elements based on geometry and color
@geom - string, an enum of sorts. looking for Point, LineString, Multipolygon etc.
@value - string/number, the value of the legend item
@color - Hexadecimal color #FFCC00
*/
function createHTMLLegendItem(geom, symbol) {
    var legendItem = null;

    switch (geom) {
        case "Point":
            legendItem = '<div class="legend-item" data-color="' + symbol.fillColor + '" id="' + symbol.value + '"><svg width="16" height="14">'
                    + '<circle cx="6.5" cy="8" r="5.8" stroke="'+symbol.color+'" stroke-width="'+symbol.weight+'" fill="' + symbol.fillColor + '" />'
                    + '</svg> ' + symbol.value + '</div>';
            break;
        case "Polygon":
        case "MultiPolygon":
            legendItem = '<div class="legend-item" data-color="' + symbol.fillColor + '" id="' + symbol.value + '">'
                + '<svg width="16" height="14">'
                + '<rect width="12" height="12" fill=' + symbol.fillColor + ' stroke-width="'+symbol.weight+'" stroke="'+symbol.color+'">'
                + '</svg> ' + symbol.value + '</div>';
            break;
        case "LineString":
            legendItem = '<div class="legend-item" data-color="' + symbol.fillColor + '" id="' + symbol.value + '">'
                + '<svg width="16" height="14">'
                + '<rect width="12" height="4" fill=' + symbol.fillColor + ' stroke-width="'+symbol.weight+'" stroke="'+symbol.color+'">'
                + '</svg> ' + symbol.value + '</div>';
    }

    return legendItem;
}

function styleFromLegend(feature, layer) {
    
    var color, weight, fillColor;

    var value = feature.properties[layer.symbolField];

    //value will always be found in legend.
    for (var i = 0; i < layer.legend.symbols.length; i++) {
        var sym = layer.legend.symbols[i];
        if (isNaN(value)) {
            if (sym.value.toUpperCase() == value.toUpperCase()) {
                color = (typeof sym.color != 'undefined') ? sym.color : DEFAULT_COLOR;
                weight = (typeof sym.weight != 'undefined') ? sym.weight : DEFAULT_WEIGHT;
                fillColor = (typeof sym.fillColor != 'undefined') ? sym.fillColor : '#777';
                break;
            }
        }
        else if (layer.legend.symbols[i].value == value) {
            color = (typeof sym.color != 'undefined') ? sym.color : DEFAULT_COLOR;
            weight = (typeof sym.weight != 'undefined') ? sym.weight : DEFAULT_WEIGHT;
            fillColor = (typeof sym.fillColor != 'undefined') ? sym.fillColor : '#777';
            break;
        }
    }

    var style=  {
            fillColor: fillColor,
            fillOpacity: layer.opacity,
            stroke: (weight>0) ? true: false,
            weight: weight,
            opacity: layer.opacity,
            color: color
    };

    if (feature.geometry.type == 'Point') {
        style.radius = 5;
    }

    return style;
};

function createJSONLegend(value, scale, symbols, color, weight) {

    color = (typeof (color) !== 'undefined') ? color : DEFAULT_COLOR;
    weight = (typeof (weight) !== 'undefined') ? weight : DEFAULT_WEIGHT;

    symbols.push({
        "value": value,
        "fillColor": getColorFromRamp(scale), 'color': color, 'weight': weight
    });
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

            $('#layerSourceTabs').append(sourceTabString);

            var tabstring = '<div class="tab-pane fade ';
            
            if (!madeFirstActiveTab) {
                tabstring += 'active in';
                madeFirstActiveTab = true;
            }
            tabstring += '" id="' + layer.source + '"></div>';

            $('#layerSourceTabs').next().append(tabstring);
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
        $('#' + layer.source + '_' + layer.theme).append("<div class='img-block layer'><div class='caption'>" + layer.name + "</div><img class='idata' src='" + thumb + "' alt='" + layer.name + "' id='img" + id + "'/></div>");
    }
    
    $('.img-block.layer').on('click', function () {
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
    for (_basemap in config.basemaps) {

        var basemap = config.basemaps[_basemap];
        var id = basemap.name.replace(/\s/g, '_');

        var madeFirstActiveTab = false;

        var source = basemap.source;
        var theme = basemap.theme.replace(/\s/g, '_');

        //If the layers source tab doesn't exist, create it.
        if (!$('#' + source).length) {
            
            var sourceTabString = '<li ';
            if (!madeFirstActiveTab) {
                sourceTabString += 'class="active"';
            }

            sourceTabString += '><a href="#' +  + '" data-toggle="tab"><i class="fa fa-check-circle-o"></i>&nbsp;' + source + '</a></li>';

            $('#basemapSourceTabs').append(sourceTabString);

            var tabstring = '<div class="tab-pane fade ';

            if (!madeFirstActiveTab) {
                tabstring += 'active in';
                madeFirstActiveTab = true;
            }
            tabstring += '" id="' + source + '"></div>';

            $('#basemapSourceTabs').next().append(tabstring);
        }

        if (!$('#' + source + '_' + basemap.theme).length) {
            $('#' + source).append('<div style="clear:both;" id="' + source + '_' + theme + '"><h4 style="margin:0;">' + basemap.theme + '</h4><hr style="margin:0;padding:0;"/></div');
        }

        var thumb = GRAPHIC_PREFIX + basemap.thumb;
        $('#' + source + '_' + theme).append("<div class='img-block basemap'><div class='caption'>" + basemap.name + "</div><img class='idata' src='" + thumb + "' alt='" + basemap.name + "' id='img" + id + "'/></div>");
    }

    $('.img-block.basemap').on('click', function () {
        var id = $(this).find('img').attr('id').replace('img', '');
        basemap = getBasemapById(id);

        //We will need a lot of intelligence here.
        //remove previous basemap
        //handle multi-ply layers etc. etc.

        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            map.removeLayer(basemap.mapLayer);
        }
        else {
            $(this).addClass('active');
            if (typeof (layer.mapLayer) != 'undefined') {
                map.addLayer(basemap.mapLayer);
            }
            else {
                addTileLayer(basemap.url);
            }
        }
    });

    $('.img-block.basemap').hover(
        function () {
            $(this).find('.caption').addClass('hover');
        },
        function () {
            $(this).find('.caption').removeClass('hover');
        }
      );


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

function getColorFromRamp(scale) {
    //console.log(scaleCounter+' : '+scale.domain()[1]);
    //var _ramp = colorbrewer[ramp]['9'];
    //var ran = Math.floor(Math.random() * _ramp.length);
    //return _ramp[ran];
    scaleCounter += 1;
    var color = scale(scaleCounter);
    if (scaleCounter == scale.domain()[1]) {
        //console.log(scaleCounter);
        scaleCounter = 0;
    }
    return color;
}

function changeSymbolHandler(id) {

    id = id.replace('#lbl', '');
    var layer = getLayerById(id);

    if (typeof (layer.ramp) != 'undefined') {
        var $span = $('<span class="temppalette" title="' + layer.ramp + '"></span>');

        var _ramp = colorbrewer[layer.ramp]['9'];

        for (var col in _ramp) {
            $span.append('<span class="swatch" style="background-color: ' + _ramp[col] + ';"></span>');
        }

        if (!$($('#selGradient').children()[0]).is('b')) {
            $('#selGradient span').first().remove();
        }

        $('#selGradient').prepend($span);
    }

    $('#selCatField').off('change.core');

    $('#selCatField').empty();

    $.each(layer.fields, function (key, value) {
        $('#selCatField')
            .append($("<option></option>")
            .attr("value", value.name)
            .text(value.name));
    });

    $('#selCatField').selectpicker('val', layer.symbolField);

    //match with exisint layer.symbolField;

    $('.selectpicker').selectpicker('refresh');

    //setup event handlers for single color
    $('#_colSingleFill').off('changeColor').on('changeColor', function (ev) {
        layer.mapLayer.setStyle({ fillColor: ev.color.toHex() });
    });

    $('#_colSingleStroke').off('changeColor').on('changeColor', function (ev) {
        layer.mapLayer.setStyle({ color: ev.color.toHex() });
    });

    $('#rngSingleStroke').off('change').on('change', function(e) {
        layer.mapLayer.setStyle({ weight: $(this).val() });
    });

     $('#_colCatStroke').off('changeColor').on('changeColor', function (ev) {
        resymbolize(layer);
    });

    //event handlers for categories
    $('#rngCatWeight').on('change', function(){
       resymbolize(layer);
    });

    $('#selCatField').on('change.core', function() {
        resymbolize(layer);
    });

    $('.palette').off('click').on('click', function (e) {
        var ramp = $(this).attr('title');
        var $span = $('<span class="palette" title="'+ramp+'"></span>');
        for (col in colorbrewer[ramp]['9']) {
            $span.append('<span class="swatch" style="background-color: ' + colorbrewer[ramp]['9'][col] + ';"></span>');
        }

        $('#selGradient span').first().remove();
        $('#selGradient').prepend($span);
        
        resymbolize(layer);
    });

    //recreate the legend in the dialog???

    $('#rendererLegend').empty().append(HTMLLegendFactory(layer));
    $('#symbolModal').modal('show');
}

function resymbolize(layer) {
    console.log('yo');

    //get ramp, 
    var ramp= $($('#selGradient').children()[0]).attr('title');

    //get field
    var symbolField = $('#selCatField').val();

    //get stroke width
    var weight = parseInt($('#rngCatWeight').val());
    
    //get whatever color we're not sourcing from the ramp.
    var color = $('#colCatStroke').val();

    //! only if the symbolField has changed do we need to iterate the features again
    //take the ramp, reparse the JSON features and build a fake JSON legend
    var phantomSymbols = [];

    var values = [];

    if (symbolField != layer.symbolField) {
        for (var feature in layer.mapLayer._layers) {
            if ($.inArray(layer.mapLayer._layers[feature].feature.properties[symbolField], values) === -1) {
                values.push(layer.mapLayer._layers[feature].feature.properties[symbolField]);
            }
        }
    }
    else
    {
        //load the values with the values from the legend.
        for (var i=0;i<layer.legend.symbols.length;i++) {
            values.push(layer.legend.symbols[i].value);
        }
    }

    var scale = chroma.scale(ramp).domain([1, values.length]).out('hex');

    for (var val in values.sort(myComparator)) {
        createJSONLegend(values[val], scale, phantomSymbols, color, weight);
    }

    var legendItems = HTMLLegendFactory({name : layer.name,geom: layer.geom, legend: {symbols: phantomSymbols }});

    $('#rendererLegend').empty().html(legendItems);

    $('#btnApplySymbol').off().on('click', function () {

        layer.symbolField = symbolField;

        layer.scale = scale;

        //use the new jsonlegend
        layer.legend.symbols = phantomSymbols;
        
        layer.mapLayer.setStyle(function (feature) {
            return styleFromLegend(feature, layer);
        });

        var id=layer.name.replace(/\s/g,'_');

        layer.ramp = ramp;
        $('#leg' + id + ' .legend-item').remove();
        $('#leg' + id).append(legendItems);

        var HTMLLegend = $('#leg' + id).clone().html();
        layer.HTMLLegend = '<div class="legend" id="leg' + id + '">' + HTMLLegend + '</div';
    });
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
            text: 'Change Color...',
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
            text: "Download...",
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

function getLayerById(id) {
    for (var layer in config.layers) {
        if (config.layers[layer].name.replace(/\s/g, '_') == id) {
            return config.layers[layer];
        }
    }
    return null;
}

function getBasemapById(id) {
    for (var layer in config.layers) {
        if (config.layers[layer].name.replace(/\s/g, '_') == id) {
            return config.layers[layer];
        }
    }
    return null;
}

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

function myComparator(a, b) {
    if (isNumeric(a) && isNumeric(b)) {
        return a - b;
    } else {
        if (a < b) {
            return -1;
        }
        if (a > b) {
            return 1;
        }
    }
    return 0;
}

function compare(a, b) {
    if (a.value < b.value)
        return -1;
    if (a.value > b.value)
        return 1;
    return 0;
}
