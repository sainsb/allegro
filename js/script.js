
var map, points_layer, baseAll, baseAnno, photo;

var STYLE_KEYWORDS = ['marker-size', 'marker-symbol', 'marker-color', 'stroke', 'stroke-opacity', 'stroke-width', 'fill', 'fill-opacity'];

var LAYER_TYPES = { 'GEOJSON': 'geojson', 'SHAPEFILE':'shapefile', 'TILEJSON':'tilejson', 'TILELAYER' : 'tilelayer' };

var FIELD_TYPES = { 'number': 1, 'string': 2 };

var RENDERER = { 'UNIQUE_VALUE': 'uniqueValue', 'CLASS_BREAKS': 'classBreaks', 'SINGLE_SYMBOL': 'singleSymbol' };

var SUBDOMAINS = ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4'];

var DEFAULT_RAMP = 'RdYlBu';
var DEFAULT_COLOR = '#444';
var DEFAULT_FILLCOLOR = '#444';
var DEFAULT_FILLOPACITY = 1;
var DEFAULT_WEIGHT = 1;
var DEFAULT_RADIUS = 7;

var scaleCounter = 0;

$(document).ready(function () {

    var mapmargin = parseInt($("#map").css("margin-bottom"), 10)+258;
    $('#map,#legend').css("height", ($(window).height() - mapmargin));

    $(window).on("resize", function(e) {

        $('#map,#legend').css("height", ($(window).height() - mapmargin));
        if ($(window).width() >= 980) {
            $('#map,#legend').css("margin-bottom", 10);
        } else {
            $('#map,#legend').css("margin-bottom", -20);
        }
    });

    if($(window).width()>=980){
        $('#map,#legend').css("margin-bottom",10);
    }else{
        $('#map,#legend').css("margin-bottom",-20);
    }

    $('.color').colorpicker();

    $('#btnAddData').click(function () {

        $('#dataModal').modal('show');
    });

    $('#btnBasemap').click(function() {
        $('#basemapModal').modal('show');
    });

    $('#sliBasemap').on('input', function() {
        //get active basemap
        for (var b in config.basemaps) {
            if (config.basemaps[b].active == true) {
                config.basemaps[b].mapLayer.setOpacity($(this).val() / 100);
            }
        }
    });

    $('#selOptions').on('change.core', function(ev) {
        var opts = $('#selOptions').val();
        if ($.inArray('Show Coordinates', opts) > -1) {
            if (typeof(map.coordControl) == 'undefined') {
                map.coordControl = L.control.coordinates().addTo(map);
            }
        } else {
            if (typeof (map.coordControl) != 'undefined') {
                map.coordControl.removeFrom(map);
                map.coordControl = undefined;
            }
        }
    });

    //Attach behavior to legend checkboxes
    $('body').on('click', '.legend-check', function (evt) {
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

        //with this logic, the layer legend is dumb to the checkbox state.

        if (evt.stopPropagation) {
            evt.stopPropagation();
        }
        if (evt.cancelBubble != null) {
            evt.cancelBubble = true;
        }
    });
    
    //Attach behavior to opacity sliders
    $('body').on('input', '.sliderFillOpacity', function (e) {
        var id = $(this).attr('id').replace('sli', '');
        var layer = getLayerById(id);
        layer.fillOpacity = $(this).val() / 100;
        switch(layer.type) {
            case "geojson":
            case "shapefile":
                layer.mapLayer.setStyle
            ({
                fillOpacity: layer.fillOpacity,
            });
                break;
            case "tilejson":
                layer.mapLayer.setOpacity(layer.opacity);
                break;
        }
    });

    $('body').on('input', '.sliderStrokeOpacity', function (e) {
        var id = $(this).attr('id').replace('sli', '');
        var layer = getLayerById(id);
        layer.strokeOpacity = $(this).val() / 100;
        layer.mapLayer.setStyle({
                opacity: layer.strokeOpacity
            });
    });

    $('body').on('click','.img-block.layer', function () {
        var id = $(this).find('img').attr('id').replace('img', '');
        layer = getLayerById(id);
        if ($(this).hasClass('active')) {
            $(this).removeClass('active');
            map.removeLayer(layer.mapLayer);
            $('#li' + id).remove();
        }
        else {
            $(this).addClass('active');
            if (typeof (layer.mapLayer) != 'undefined') {
                map.addLayer(layer.mapLayer);
                _(layer.type);
                switch(layer.type){
                    case LAYER_TYPES.GEOJSON:
                    case LAYER_TYPES.SHAPEFILE:
                        $('#ulVectorLegend').prepend(layer.HTMLLegend);
                        break;
                    case LAYER_TYPES.TILELAYER:
                    case LAYER_TYPES.TILEJSON:
                        $('#ulTileLegend').prepend(layer.HTMLLegend);
                        break;
                }
            }
            else {
                addData(layer);
            }
        }
    });

    initMap();

    populateLayers();

    populateBasemaps();
    
    populatePalettes();

    $('.selectpicker').selectpicker();

    var x = new RLIS.Autosuggest("txtLocSearch", { "mode": 'locate', 'entries': 7 }, function (result, error) {
        if (result.error == true || result[0].status == 'failure') {
            $('#frmLocSearch').addClass('has-error');
            return;
        }
        $('#frmLocSearch').removeClass('has-error');
        map.setView([result[0].lat, result[0].lng], 15);
    });
});

function initMap() {

    map = new L.Map('map', {
        center: new L.LatLng(45.44944, -122.67599),
        zoom: 10,
        minZoom: 9,
        maxZoom: 19,
        fullscreenControl: true
    });

    L.control.scale().addTo(map);
    new L.Hash(map);

    //var BoxSelect = L.Map.BoxZoom.extend({
        
    //    _onMouseUp: function (e) {
    //        this._pane.removeChild(this._box);
    //        this._container.style.cursor = '';

    //        L.DomUtil.enableTextSelection();

    //        L.DomEvent
    //            .off(document, 'mousemove', this._onMouseMove)
    //            .off(document, 'mouseup', this._onMouseUp);

    //        var map = this._map,
    //            layerPoint = map.mouseEventToLayerPoint(e);

    //        if (this._startLayerPoint.equals(layerPoint)) { return; }

    //        var bounds = new L.LatLngBounds(
    //                map.layerPointToLatLng(this._startLayerPoint),
    //                map.layerPointToLatLng(layerPoint));

    //        map.fire("boxselectend", {
    //            boxSelectBounds: [[bounds.getSouthWest().lng,bounds.getSouthWest().lat],[bounds.getNorthEast().lng,bounds.getNorthEast().lat]]
    //        });
    //    }
    //});

    //map.boxZoom.disable();//turn off  the default behavior
    //var boxSelect = new BoxSelect(map);//new box select
    //boxSelect.enable();//add it

    //selLayer = L.geoJson(undefined, {
    //    style: { opacity:1, color: '#02D8FA', weight: 2, fillColor: '#02D8FA' },
    //    onEachFeature:function(feature, layer){
    //        layer.bindPopup('yay');
    //    }
    //}).addTo(map);

}

function addData(layerObject) {

    //Is this a tiled layer or a JSON layer or....?
    //See if it already exists in the global namespace
    switch (layerObject.type) {

        case "geojson":
            loadGeoJSON(layerObject);
            break;
        case "dynamiclayer":
            loadGeoJSON(layerObject);
            break;
        case "tilejson":
            loadTileJSON(layerObject);
            break;
        case "tilelayer":
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
    var url = layer.url + ((layer.requireToken == true) ? "?token=" + config.token : "");

    $.getJSON(url, function (data) {

        //Add to legend

        var id = layer.name.replace(/\s/g, '_');

        var str = "<li style='clear:both;' id='li" + id + "' class='liTileLegend'><div class='panelyr' data-toggle='collapse' data-target='#leg" + id + "'><span class='accordion-toggle'></span><input type='checkbox' class='legend-check' id='chk" + id + "' checked style='float:left;margin-right:5px;margin-left:3px;'/>" + layer.name + "</div><div style='clear:both;margin-left:15px;float:left;' id='leg" + id + "' class='collapse in'>";

        if (typeof (data.legend) != 'undefined') {
            str += data.legend;
        }

        str += "</div></li>";

        $('#ulTileLegend').prepend(str);

        layer.HTMLLegend = legend;

        applyContextMenu(id);

        var url = data.canonicalURL;

        if (typeof(layer.requireToken) != 'undefined') {
            url += '?token=' + config.token;
        }

        layer.mapLayer = new L.TileLayer(url, { subdomains: data.subdomains, zIndex: (typeof layer.zIndex != 'undefined') ? layer.zIndex : 70, maxZoom:19, reuseTiles:true});

        layer.mapLayer.addTo(map);

    });
}

function loadBasemap(basemap) {
    var zIndex = (typeof (basemap.zIndex) != 'undefined') ? basemap.zIndex : 0;
    var attribution = (typeof (basemap.source) != 'undefined') ? basemap.source : '';
    var url = (typeof (basemap.requireToken) != 'undefined') ? basemap.url + '?token=' + config.token : basemap.url;
    var maxZoom = (typeof(basemap.maxZoom) != 'undefined') ? basemap.maxZoom : 19;
    basemap.mapLayer = new L.TileLayer(url, { zIndex: 0, attribution: attribution, subdomains: SUBDOMAINS, maxZoom:maxZoom });
    map.addLayer(basemap.mapLayer);
}

function parseGeoJSON(data, layer) {
    
    if($.isArray(data)){
    
        for (d in data){
            if(typeof(data[d].type) != 'undefined' && data[d].type=='FeatureCollection'){
                data = data[d];
                break;
            }
        }
    }
    _(data);
    var geoJson = {};
    
    /* in order of preference:
        layer.legend
            layer.style
                data.legend
                    symbolField
                        simpleStyle
    */

    if (typeof (layer.legend) == 'undefined') {

        layer.legend = { "symbols": [], "title": layer.name };

        if(typeof(layer.style) != 'undefined'){

            layer.legend.type = RENDERER.SINGLE_SYMBOL;

            layer.legend.symbols.push({
                "value": "*",
                "fillColor": (typeof(layer.style.fillColor) != 'undefined') ? layer.style.fillColor : DEFAULT_FILLCOLOR,
                'color': (typeof(layer.style.color) != 'undefined') ? layer.style.color : DEFAULT_COLOR,
                'fillOpacity' : (typeof(layer.style.fillOpacity) != 'undefined') ? layer.style.fillOpacity : DEFAULT_FILLOPACITY,
                'weight': (typeof(layer.style.weight) != 'undefined') ? layer.style.weight: DEFAULT_WEIGHT
            });

        } else if (typeof (data.legend) != 'undefined') {

            layer.legend = data.legend;

        } else if (typeof(layer.symbolField) != 'undefined') {

            layer.ramp = DEFAULT_RAMP;

            layer.legend.type = RENDERER.UNIQUE_VALUE;
            
            var values = [];

            for (var i = 0; i < data.features.length; i++) {
                var value = data.features[i].properties[layer.symbolField];

                if (value != value) {
                    value='null';
                }

                if ($.inArray(value, values) === -1) {
                    values.push(value);
                }
            }

            layer.scale = chroma.scale(DEFAULT_RAMP).domain([1, (values.length > 1) ? values.length : 2]).out('hex');

            for (var val in values.sort(myComparator)) {
                _(val);
                layer.legend.symbols.push(createJSONLegend(values[val], layer.scale));
            }

        } else { 

            layer.legend.type = RENDERER.SINGLE_SYMBOL;

            layer.legend.symbols.push({
                "value": "*",
                "fillColor": getRandomColor(), 'color': DEFAULT_COLOR, 'weight': DEFAULT_WEIGHT
            });
        }
    }

    var _onEachFeature = (typeof(layer.popupTemplate) != 'undefined') ?
         function(feature, slayer) {
            var thm = Mustache.render(layer.popupTemplate, feature.properties);
            slayer.bindPopup(thm);
        }
    : function (feature, slayer) {
            if (feature.properties) {
                slayer.bindPopup(Object.keys(feature.properties).map(function (k) {
                    if ($.inArray(k, STYLE_KEYWORDS) == -1) {
                        return '<strong>' + k + "</strong>: " + feature.properties[k] + '<br/>';
                    }
                }).join(""), { maxHeight: 200 });
            }
        };

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

    var id = layer.name.replace(/\s/g, '_');

    layer.geom = data.features[0].geometry.type;

    _(layer.geom);
    //parse fields and add to layer object
    layer.fields = [];

    for (var field in data.features[0].properties) {
        var fieldType = isNaN(data.features[0].properties[field]) ? 'string' : 'number';
        layer.fields.push({ name: field, type: fieldType});
    }

    //create the HTMLLegend from the jsonLegend property of the layer.
    var legend = createHTMLLegend(layer);

    $('#ulVectorLegend').prepend(legend);

    layer.HTMLLegend = legend;

    $('.sortable').sortable().bind('sortupdate', function(e, ui) {
        //return false;
        handleSort(e, ui);
    });

    layer.mapLayer = geoJson.addTo(map);

    applyContextMenu(id);

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

    var title = (typeof(layer.legend.title) != 'undefined') ? layer.legend.title : layer.name;

    var str = "<li style='clear:both;' id='li" + id + "' class='liVectorLegend'><div class='panelyr' data-toggle='collapse' data-target='#leg" + id + "'><span class='accordion-toggle'></span><input type='checkbox' class='legend-check' id='chk" + id + "' checked style='float:left;margin-right:5px;margin-left:3px;'/>" + title + "</div><div style='clear:both;margin-left:15px;float:left;padding-top:6px;' id='leg" + id + "' class='collapse in'>";

    str += HTMLLegendFactory(layer);
    
    str += "</div></li>";

    return str;
}

function _(msg) {
    console.log(msg);
}

function HTMLLegendFactory(layer) {

    var HTMLLegend = "";
    layer.legend.symbols.sort(myComparator);

    layer.legend.symbols.forEach(function (symbol) {
        HTMLLegend += createSVGLegendItem(layer.geom, symbol);
    });

    return HTMLLegend;
}

/* Creates HTML(& SVG) elements based on geometry and color
@geom - string, an enum of sorts. looking for Point, LineString, Multipolygon etc.
@value - string/number, the value of the legend item
@color - Hexadecimal color #FFCC00
*/
function createSVGLegendItem(geom, symbol) {
    var legendItem = null;
    var symVal = (symbol.value == '*') ? '' : symbol.value;
    switch (geom) {
        case "Point":
            legendItem = '<div class="legend-item">'
                    + '<svg width="16" height="14">'
                    + '<circle cx="6.5" cy="8" r="5.8" stroke="'+symbol.color+'" stroke-width="'+symbol.weight+'" fill="' + symbol.fillColor + '" />'
                    + '</svg> ' + symVal + '</div>';
            break;
        case "Polygon":
        case "MultiPolygon":
            legendItem = '<div class="legend-item">'
                + '<svg width="16" height="14">'
                + '<rect width="12" height="12" fill=' + symbol.fillColor + ' stroke-width="'+symbol.weight+'" stroke="'+symbol.color+'">'
                + '</svg> ' + symVal + '</div>';
            break;
        case "LineString":
            legendItem = '<div class="legend-item">'
                + '<svg width="16" height="14">'
                + '<rect width="12" height="3" fill=' + symbol.color + ' stroke-width="0" >'
                + '</svg> ' + symVal + '</div>';
    }

    return legendItem;
}

function styleFromLegend(feature, layer) {
 
    var style = {
        fillColor: DEFAULT_FILLCOLOR,
        fillOpacity: layer.fillOpacity,
        stroke: true,
        weight: DEFAULT_WEIGHT,
        opacity: layer.strokeOpacity,
        color: DEFAULT_COLOR
    };

    var sym ={};

    if (layer.legend.type==RENDERER.SINGLE_SYMBOL ) {
        sym = layer.legend.symbols[0];
        return styleFromSingleSymbolRenderer(fillColor);
    } else {

        var value = feature.properties[layer.symbolField];

        //NaN is the only value in javascript that does not equal itself
        if (value !== value) {
            return style;
        }

        for (var i = 0; i < layer.legend.symbols.length; i++) {
            sym = layer.legend.symbols[i];
            if (layer.legend.type == RENDERER.UNIQUE_VALUE) {
                if (isNaN(value) && isNaN(sym.value)) {
                    if (sym.value.toUpperCase() == value.toUpperCase()) {
                        break;
                    }
                }
                else if (layer.legend.symbols[i].value == value) {
                    break;
                }
            } else if (layer.legend.type == RENDERER.CLASS_BREAKS) {
                if (!isNaN(value) && (value >= sym.minVal && value <= sym.maxVal)) {
                    break;
                }
            }
        }

        style.color = (typeof sym.color != 'undefined') ? sym.color : DEFAULT_COLOR;
        style.weight = (typeof sym.weight != 'undefined') ? sym.weight : DEFAULT_WEIGHT;
        style.fillColor = (typeof sym.fillColor != 'undefined') ? sym.fillColor : DEFAULT_FILLCOLOR;
        style.fillOpacity = (typeof sym.fillOpacity != 'undefined') ? sym.fillOpacity : DEFAULT_FILLOPACITY;

        if (feature.geometry.type == 'Point') {

            style.radius = (typeof sym.radius != 'undefined') ? sym.radius : DEFAULT_RADIUS;
        }
    }

    return style;
};

function styleFromSingleSymbolRenderer(fillColor) {
   
 
}

function styleFromUniqueValueRenderer() {
}

function styleFromClassBreaksRenderer() {

}

function createJSONLegend(value, scale,  color, weight) {

    color = (typeof (color) !== 'undefined') ? color : DEFAULT_COLOR;
    weight = (typeof (weight) !== 'undefined') ? weight : DEFAULT_WEIGHT;

    var fillColor;

    if (value == 'null') {
        fillColor = DEFAULT_FILLCOLOR;
        scaleCounter += 1;

    } else {
        fillColor = getColorFromRamp(scale);
    }

    return {
        "value": value,
        "fillColor": fillColor, 'color': color, 'weight': weight
    };
}

function populateLayers() {
    var madeFirstActiveTab = false;

    for (var _layer in config.layers) {

        var layer = config.layers[_layer];
        var id = layer.name.replace(/\s/g, '_');

        //If the layers source tab doesn't exist, create it.
        var source = layer.source.replace(/\s/g, '_');

        if (!$('#' + source).length) {
            var sourceTabString = '<li ';

            if (!madeFirstActiveTab) {
                sourceTabString += 'class="active"';
            }

            sourceTabString += '><a href="#' + source + '" data-toggle="tab">';

            if (typeof (layer.icon) != 'undefined') {
                sourceTabString += '<img src="' + layer.icon + '" align="left" style="margin-top:3px;"/>&nbsp;';
            } else{
                sourceTabString += '<i class="fa fa-check-circle-o"></i>&nbsp;';
            }

            sourceTabString += layer.source + '</a></li>';

            $('#layerSourceTabs').append(sourceTabString);

            var tabstring = '<div class="tab-pane fade ';
            
            if (!madeFirstActiveTab) {
                tabstring += 'active in';
                madeFirstActiveTab = true;
            }
            tabstring += '" id="' + source + '"></div>';

            $('#layerSourceTabs').next().append(tabstring);
        }

        //If the layers theme section doesn't exist in the source tab content,
        //create it.
        var theme = (typeof layer.theme == 'undefined') ? '' : layer.theme.replace(/\s/g, '_');

        if (!$('#' + source + '_' + theme).length) {
                $('#' + source).append('<div style="clear:both;" id="' + source + '_' + theme + '"><h4 style="margin:0;">' + layer.theme + '</h4><hr style="margin:0;padding:0;"/></div');
        }

        if (typeof (layer.thumb) != 'undefined') {
            var thumb = layer.thumb;
        }
        else {
            var thumb = '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png';
        }

        var elem = "<div class='layer img-block ";
        
        if (layer.level == 2) {
            elem += "img-block-m";
        }

        if (layer.level == 3) {
            elem += "img-block-lg";
        }

        elem += "'><div class='caption ";

        if (layer.level == 2) {
            elem += "caption-m";
        }

        if (layer.level == 3) {
            elem += "caption-lg";
        }

        elem += "'>" + layer.name + "</div><img class='idata ";
        
        if (layer.level == 2 || layer.level==3) {
            elem += "idata-lg";
        }
        
        elem+="' src='" + thumb + "' alt='" + layer.name + "' id='img" + id + "'/></div>";

        $('#' + source + '_' + theme).append(elem);
    }

    //I want the custom tab at the end.
    $('#layerSourceTabs').append('  <li><a href="#customData" data-toggle="tab"><i class="fa fa-check-circle-o"></i>&nbsp;Custom</a></li>')

    $('#layerSourceTabs').next().append("<div class='tab-pane fade' id='customData'>Data Source: &nbsp;    <select class='selectpicker' id='selCustomData' data-style='btn-default' data-width='180'>       <option value='0'>GeoJSON</option><option value='1'>ArcGIS Server</option><option value='2'>Tile Layer</option><option value='3'>Shapefile</option><option value='4'>CSV</option></select></div>");

}

function populateBasemaps() {

    //var madeFirstActiveTab = false;

    for (_basemap in config.basemaps) {

        var basemap = config.basemaps[_basemap];
        var id = basemap.name.replace(/\s/g, '_');


        //var source = basemap.source;
        var theme = basemap.theme.replace(/\s/g, '_');

        //If the layers source tab doesn't exist, create it.
        //if (!$('#' + source).length) {
        //    var sourceTabString = '<li ';
        //    if (!madeFirstActiveTab) {
        //        sourceTabString += 'class="active"';
        //    }

        //    sourceTabString += '><a href="#' + basemap.source + '" data-toggle="tab">';

        //    if (typeof (basemap.icon) != 'undefined') {
        //        sourceTabString += '<img src="' + basemap.icon + '" align="left" style="margin-top:3px;"/>&nbsp;';
        //    } else {
        //        sourceTabString += '<i class="fa fa-check-circle-o"></i>&nbsp;';
        //    }
        //    sourceTabString += basemap.source + '</a></li>';

        //    $('#basemapSourceTabs').append(sourceTabString);

        //    var tabstring = '<div class="tab-pane fade ';

        //    if (!madeFirstActiveTab) {
        //        tabstring += 'active in';
        //        madeFirstActiveTab = true;
        //    }
        //    tabstring += '" id="' + source + '"></div>';

        //    $('#basemapSourceTabs').next().append(tabstring);
        //}

        if (!$('#' + theme).length) {
            $('#basemapContent').append('<div style="clear:both;" id="' + theme + '"><h4 style="margin:0;">' + basemap.theme + '</h4><hr style="margin:0;padding:0;"/></div');
        }

        var thumb = basemap.thumb;

        var imgBlockText = "<div class='img-block img-block-sm basemap";

        if (basemap.active == true) {
            imgBlockText += ' active';
            loadBasemap(basemap);
        }

        imgBlockText += "'><div class='caption caption-sm'>" + basemap.name + "</div><img class='idata' src='" + thumb + "' alt='" + basemap.name + "' id='img" + id + "'/></div>";

        $('#' + theme).append(imgBlockText);
    }

    $('.img-block.basemap').on('click', function () {
        var id = $(this).find('img').attr('id').replace('img', '');
        basemap = getBasemapById(id);

        //We will need a lot of intelligence here.
        //remove previous basemap
        //handle multi-ply layers etc. etc.

        //get existing basemap
        var oldBasemap = $($('.img-block.basemap.active')[0]).removeClass('active').find('img').attr('id').replace('img','');
        oldBasemap = getBasemapById(oldBasemap);
        oldBasemap.active = false;
        map.removeLayer(oldBasemap.mapLayer);
      
        $(this).addClass('active');
        if (typeof (basemap.mapLayer) != 'undefined') {
            map.addLayer(basemap.mapLayer);
        }
        else {
            loadBasemap(basemap);
        }
        basemap.active = true;
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
    } else {
        //we're dealing with a custom legend here... no ramp...
    }

    //populate field select control
    $('#selCatField').off('change.core');

    $('#selCatField').empty();

    $.each(layer.fields, function (key, value) {
        $('#selCatField')
            .append($("<option></option>")
            .attr("value", value.name)
            .text(value.name));
    });

    $('#selCatField').selectpicker('val', layer.symbolField);
    
    $('.selectpicker').selectpicker('refresh');

    //remove event handlers for single color before changing their values
    $('#_colSingleFill, #_colSingleStroke').off('changeColor');

    $('#rngSingleWeight').off('change');

    var legend = HTMLLegendFactory(layer);

    //Set to correct tab
    if (layer.legend.symbols[0].value == '*') {
        //haxxor - bootstrap tabs don't work right...
        //the uniqueValues tab is still active.. I can't make it not active w/out breaking this thing...
        $('#symbolTabs > li > a').first().tab('show');
        $('#singleFill').addClass('active in');

        //match colors and stroke
        $('#_colSingleFillColor').colorpicker('setValue', layer.legend.symbols[0].fillColor);
        $('#_colSingleColor').colorpicker('setValue', layer.legend.symbols[0].color);
        $('#rngSingleWeight').val(layer.legend.symbols[0].weight);

        //show the legend item
        $('#singleLegend').empty().append(legend);
    } else {
        //recreate the legend in the dialog???
        $('#catLegend').empty().append(legend);
    }

    $('#_colSingleFillColor, #_colSingleColor').on('changeColor', function (ev) {
        singleFillResymbolize(layer);
    });
    
    $('#rngSingleWeight').on('change', function (e) {
        singleFillResymbolize(layer);
    });

    //event handlers for categories
    $('#_colCatStroke').off('changeColor').on('changeColor', function (ev) {
        resymbolize(layer);
    });

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

    $('#symbolModal').modal('show');
}

function singleFillResymbolize(layer) {
    var phantomSymbol = { value: '*', fillColor: $('#colSingleFillColor').val(), color: $('#colSingleColor').val(), weight: $('#rngSingleWeight').val() };

    var legendItem = createSVGLegendItem(layer.geom, phantomSymbol);

    $('#singleLegend').empty().html(legendItem);

    $('#btnApplySymbol').off().on('click', function () {

        //use the new jsonlegend
        layer.legend.symbols = [phantomSymbol];
        layer.legend.type = RENDERER.SINGLE_SYMBOL;
        layer.mapLayer.setStyle(function (feature) {
            return styleFromLegend(feature, layer);
        });

        var id = layer.name.replace(/\s/g, '_');

        layer.ramp = ramp;
        $('#leg' + id + ' .legend-item').remove();
        $('#leg' + id).append(legendItem);

        var HTMLLegend = $('#leg' + id).clone().html();
        layer.HTMLLegend = '<div class="legend" id="leg' + id + '">' + HTMLLegend + '</div';
    });

    $('#catLegend').empty();
}

function resymbolize(layer) {

    //get ramp, 
    var ramp= $($('#selGradient').children()[0]).attr('title');
    
    //if ramp==undefined then we have a custom color set...
    //test if layer.ramp==ramp?

    //get field
    var symbolField = $('#selCatField').val();

    //get stroke width
    var weight = parseInt($('#rngCatWeight').val());
    
    //get whatever color we're not sourcing from the ramp.
    var color = $('#colCatStroke').val();

    //! only if the symbolField has changed, or we have a single, asterix
    //value in the symbols do we need to iterate the features again
    //take the ramp, reparse the JSON features and build a fake JSON legend
    var phantomSymbols = [];

    var values = [];

    if (symbolField != layer.symbolField || layer.legend.symbols[0].value=='*') {
        for (var feature in layer.mapLayer._layers) {
            if ($.inArray(layer.mapLayer._layers[feature].feature.properties[symbolField], values) === -1) {
                values.push(layer.mapLayer._layers[feature].feature.properties[symbolField]);
            }
        }
        values.sort(myComparator);
    }
    else
    {
        //load the values with the values from the legend.
        for (var i=0;i<layer.legend.symbols.length;i++) {
            values.push(layer.legend.symbols[i].value);
        }
    }
    
    if (typeof(ramp) != 'undefined' || layer.ramp != ramp) {
        var scale = chroma.scale(ramp).domain([1, values.length]).out('hex');

        for (var val in values.sort(myComparator)) {
            phantomSymbols.push(
                createJSONLegend(values[val], scale, color, weight)
            );
        }
    } else {
        //get colors from existing legend.
        //keep fillcolor the same here but alter weight and color....
        for (var s in layer.legend.symbols) {
            var sym = layer.legend.symbols[s];
            phantomSymbols.push({ value: sym.value, fillColor: sym.fillColor, color: color, weight: weight });
        }
    }

    var legendItems = HTMLLegendFactory({ name : layer.name,geom: layer.geom, legend: {symbols: phantomSymbols }});

    $('#singleLegend').empty()
    $('#catLegend').empty().html(legendItems);

    $('#btnApplySymbol').off().on('click', function () {

        layer.symbolField = symbolField;

        layer.scale = scale;

        //use the new jsonlegend
        layer.legend.symbols = phantomSymbols;
        layer.legend.type = RENDERER.UNIQUE_VALUE;
        
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

    var layer = getLayerById(id);

    context.init({
        fadeSpeed: 100,
        filter: function ($obj) { },
        above: 'auto',
        preventDoubleContext: true,
        compress: false
    });

    var contents = [
        { header: 'Options' }
    ];

    if (layer.type == 'shapefile' || layer.type == 'geojson') {
        contents.push({
            text: 'Change Color...',
            action:
                function() { changeSymbolHandler(id); }
        });
    }

    contents.push(
        {
            text: 'Remove',
            action:
                function(e) {
                    map.removeLayer(layer.mapLayer);
                    $('#li' + id).remove();
                    $('.img-block.active').each(function(index) {
                        if ($(this).find('img').attr('id').replace('img', '') == id) {
                            $(this).removeClass('active');
                        }
                    });
                }
        },
        {
            text: "Download...",
            subMenu:
            [
                {
                    text: 'Shapefile', action: function () {
                    window.open(layer.url);
                } },
                {
                    text: 'GeoJSON', action: function () {
                        window.open("data:text/plain;charset=utf-8," + JSON.stringify(layer.mapLayer.toGeoJSON()));
                } },
                {text: 'CSV', action: function() {
                    var str = export2CSV(layer.mapLayer._layers, true);
                    //DBF files are generally in the ISO8859-1
                    //http://gis.stackexchange.com/questions/3529/which-character-encoding-is-used-by-the-dbf-file-in-shapefiles
                    window.open("data:text/plain;charset=iso-8859-1," + escape(str));
                    }
                }
            ]
        },
        {
            text: 'Zoom To',
            action:
                function(e) {
                    map.fitBounds(layer.mapLayer.getBounds());
                }
        },
        {
            text: "Select...",
            subMenu:
            [
                {
                    text: 'By Attributes', action: function () {
                    window.open(layer.url);
                } },
                {
                    text: 'By Location', action: function () {
                        window.open("data:text/plain;charset=utf-8," + JSON.stringify(layer.mapLayer.toGeoJSON()));
                } },
            ]
        }
    );

    if (layer.type == 'shapefile' || layer.type == 'geojson') {
        contents.push({
            text: 'View Table...',
            action:
                function () {
                    var str = export2CSV(layer.mapLayer._layers);
                    $('#tableDiv').CSVToTable(str);
                    $('#tableModalHeader').html(layer.name + ' Table');
                    $.bootstrapSortable();

                    $('#btnExportToCSV').off('click').on('click', function () {
                        var str = export2CSV(layer.mapLayer._layers, true);
                        //DBF files are generally in the ISO8859-1
                        //http://gis.stackexchange.com/questions/3529/which-character-encoding-is-used-by-the-dbf-file-in-shapefiles
                        window.open("data:text/plain;charset=iso-8859-1," + escape(str));

                    });

                    //console.log(str);
                    //$('#tableModal').on('shown', function() {
                    //    $.bootstrapSortable();
                    //});
                    $('#tableModal').modal('show');
                }
        });
    }

    if (typeof(layer.metadataUrl) != 'undefined') {
        contents.push(
        {
            text: 'View Metadata...',
            action: function (e) {
                id = id.replace('#li', '');
                var layer = getLayerById(id);
                window.open(layer.metadataUrl, '_blank');
            }
        });
    }

    switch (layer.type) {
    case "shapefile":
        case "geojson":
            if (layer.geom != 'LineString') {
                contents.push({ header: 'Fill Opacity' }, {
                    class: 'sliderFillOpacity',
                    id: id,
                    value: 100
                });
            }
            contents.push({ header: 'Stroke Opacity' }, {
            class: 'sliderStrokeOpacity',
            id: id,
            value: 100
            });
        break;
    case "tilejson":
    case "tilelayer":
        contents.push({ header: 'Opacity' }, {
            class: 'sliderFillOpacity',
            id: id,
            value: 100
        });
        break;
    }


    contents.push({ header: 'Developer' },
    {
        text: 'Export Symbology',
        action: function(e) {
            //id = id.replace('#lbl', '');
            //var layer = getLayerById(id);
        }
    });

    context.attach('#li'+id, contents);
}

/* Util */

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
    for (var basemap in config.basemaps) {
        if (config.basemaps[basemap].name.replace(/\s/g, '_') == id) {
            return config.basemaps[basemap];
        }
    }
    return null;
}

function export2CSV(data, quote) {
    var str = '';

    //construct head
    var f = data[Object.keys(data)[0]].feature.properties;
    var line = '';

    for (var value in f) {
        if (typeof(quote) !== undefined && quote==true) {
            line += '"' + value.replace(/["]/g, '""').replace(/,/g,'') + '",';
        } else {
            line += value + ',';
        }
    }
           
    line = line.slice(0, -1);
    str += line + '\r\n';

    for (var feature in data) {
       var array = data[feature].feature.properties;
        
       array = $.map(array, function (value) {
            return [value];
       });
        //console.log(array);
        var line = '';
        for (var i = 0; i < array.length; i++) {
            if (typeof(array[i]) == 'undefined') {
                line += '"",';
            }
            if (typeof (array[i]) == 'string') {
                if (typeof (quote) !== undefined && quote == true) {
                    line += '"' + array[i].replace(/"/g, '""').replace(/,/g, '') + '",';
                } else {
                    line += array[i].replace(/"/g, '""').replace(/,/g, '') + ',';
                }
            } else {
                line += array[i]+',';
            }
        }
        line = line.slice(0, -1);
        str += line + '\r\n';
    }

    return str;
    
    //add a new tab and activate it. give it an x also 
   
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

function getRandomColor() {
    return "#" + ((1 << 24) * Math.random() | 0).toString(16);
}

function compare(a, b) {
    if (a.value < b.value)
        return -1;
    if (a.value > b.value)
        return 1;
    return 0;
}

// implement JSON.stringify serialization
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"' + obj + '"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof (v);
            if (t == "string") v = '"' + v + '"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};


function handleSort(e, ui) {
    var dropped = ui.item;

    var trgid = dropped[0].id;
    var id = trgid.replace('li', '');
    var layer = getLayerById(id);
    layer.mapLayer.bringToFront();
    //var trgkey = trgid.substring(2, trgid.length);

    //if (dropped[0].previousSibling == null) { //At top
    //    var srcid = dropped[0].nextSibling.id;
    //    var srckey = srcid.substring(2, srcid.length);
    //    var srcz = maplayers.layers[srckey].source.options.zIndex;
    //    var newz = srcz + 1;
    //} else if (dropped[0].nextSibling == null) {
    //    srcid = dropped[0].previousSibling.id;
    //    srckey = srcid.substring(2, srcid.length);
    //    srcz = maplayers.layers[srckey].source.options.zIndex;
    //    newz = srcz - 1;
    //} else {
    //    //somehow iterate all the zindex values for this group.


    //    var topsrcid = dropped[0].previousSibling.id;
    //    var topsrckey = topsrcid.substring(2, topsrcid.length);
    //    var topsrcz = maplayers.layers[topsrckey].source.options.zIndex;
    //    var botsrcid = dropped[0].nextSibling.id;
    //    var botsrckey = botsrcid.substring(2, botsrcid.length);
    //    var botsrcz = maplayers.layers[botsrckey].source.options.zIndex;
    //    newz = botsrcz + (Math.abs(topsrcz - botsrcz) / 2);
    //}

    //maplayers.layers[trgkey].source.options.zIndex = newz;

    //if (map.hasLayer(maplayers.layers[trgkey].source)) {
    //    map.removeLayer(maplayers.layers[trgkey].source);
    //    map.addLayer(maplayers.layers[trgkey].source);
    //}

    //map._resetView(map.getCenter(), map.getZoom(), true);
    //if prev element is null then at top

    //if nextsibling element is null then at bottom.

    //get prev element id, zIndex increment 1;

}