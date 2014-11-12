/* Allegro JS Map Viewer
 Ben Sainsbury
 http://github.com/sainsb/allegro
 */

var map = null;

var App = {
    map: null,
    STYLE_KEYWORDS: ['marker-size', 'marker-symbol', 'marker-color', 'stroke', 'stroke-opacity', 'stroke-width', 'fill', 'fill-opacity'],
    LAYER_TYPES: { 'GEOJSON': 'geojson', 'SHAPEFILE': 'shapefile', 'TILEJSON': 'tilejson', 'TILELAYER': 'tilelayer', 'DYNAMIC_LAYER': 'dynamicLayer', 'HEATMAP':'heatmap' },
    GEOM_TYPES: { 'LINESTRING': "LineString", "POINT": "Point", "MULTIPOINT": "MultiPoint", "POLYGON": "Polygon", "MULTIPOLYGON": "MultiPolygon", 'MULTILINESTRING': 'MultiLineString' },
    FIELD_TYPES: { 'number': 1, 'string': 2 },
    RENDERER: { 'UNIQUE_VALUE': 'uniqueValue', 'CLASS_BREAKS': 'classBreaks', 'SINGLE_SYMBOL': 'singleSymbol' },
    SUBDOMAINS: ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4'],

    DEFAULT_RAMP: 'RdYlBu',
    DEFAULT_COLOR: '#444',
    DEFAULT_FILLCOLOR: '#444',
    DEFAULT_FILLOPACITY: 1,
    DEFAULT_OPACITY: 1,
    DEFAULT_WEIGHT: 1,
    DEFAULT_RADIUS: 7,

    locateMarker:null,
  
    init: function () {
      "use strict";
      if ($('html').is('.ie6, .ie7, .ie8, .ie9')) {
        $('#browserModal').modal('show');
      }
      
       //Put the version in the top banner
       $('#txtVersion').html(version);
        //resizes the map and legend height upon page resize
        //width is taken care of by the DOM.
        //** will probably want to disable when the site goes into responsive mode..
        var mapmargin = parseInt($("#map").css("margin-bottom"), 10) + 258;

        $('#map').css("height", ($(window).height() - mapmargin));
        $('#scrollWrapper').css("height", ($(window).height() - 480));

        $(window).on("resize", function (e) {
            
            $('#scrollWrapper').css("height", ($(window).height() - 480));
            $('#map').css("height", ($(window).height() - mapmargin));

            if ($(window).width() >= 980) {
                $('#map').css("margin-bottom", 10);
            } else {
                $('#map').css("margin-bottom", -20);
            }
        });

        //currently not using this but will want it/need it to handle responsive change
        // if ($(window).width() >= 980) {
        //     $('#map,#legend').css("margin-bottom", 10);
        // } else {
        //     $('#map,#legend').css("margin-bottom", -20);
        // }

        //assign handle to add Data button
        //init image lazy loader
        // $('#btnAddData').click(function () {

        //   $('#imgLoadingData').hide();

        //     $('#dataModal').on('shown.bs.modal', function () {

        //         $("img.lazy").lazyload({
        //             effect: "fadeIn",
        //             container: $(".tab-content")
        //         });
        //     });

        //     $('#dataModal').modal('show');
        // });

        //assign handler to Basemap button
        $('#btnBasemap').click(function () {
            $('#basemapModal').modal('show');
        });

        $('#btnAdmin').on('click', function() {
          window.location='./admin/';
        });

        //assign handler to Basemap button
        $('#btnOptions').click(function () {
            $('#optionsModal').modal('show');
        });

        $('#btnShare').on('click', function() {
            $('#browserDialog').modal('show');
        });

        //Attach behavior to legend checkboxes
        $('body').on('click', '.legend-check', function (evt) {
            var id = $(this).attr('id').replace('chk', '');
            var layer = App.util.getLayerById(id);
            if ($(this).is(':checked')) {
                if (layer.type == App.LAYER_TYPES.GEOJSON || layer.type == App.LAYER_TYPES.SHAPEFILE) {
                    layer.mapLayer.addTo(map).bringToFront();
                    var other_layers = [];
                    $.each($('.legend-check'), function(i,v){
                        var iid = $(v).prop('id').replace('chk','');
                        if (iid != id){
                            if($(v).is(':checked')){
                                other_layers.push(iid);
                            }
                        } else {
                            return false;
                        }
                    });
                    other_layers.reverse();
                    for(var l=0;l<other_layers.length;l++){
                        App.util.getLayerById(other_layers[l]).mapLayer.bringToFront();
                    }
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

        //Basemap opacity slider
        $('#sliBasemap').on('change input', function () {
            //get active basemap
            for (var b in config.basemaps) {
                if (config.basemaps[b].active == true) {
                    config.basemaps[b].mapLayer.setOpacity($(this).val() / 100);
                }
            }
        });

        //Fill opacity sliders
        $('body').on('change input', '.sliderFillOpacity', function () {
            var id = $(this).attr('id').replace('sli', '');
            var layer = App.util.getLayerById(id);
            layer.fillOpacity = $(this).val();
            switch (layer.type) {
                case App.LAYER_TYPES.GEOJSON:
                case App.LAYER_TYPES.SHAPEFILE:
                    layer.mapLayer.setStyle({
                        fillOpacity: layer.fillOpacity,
                    });
                    break;
                case App.LAYER_TYPES.TILELAYER:
                case App.LAYER_TYPES.TILEJSON:
                    layer.mapLayer.setOpacity(layer.fillOpacity);
                    break;
            }
        });

        //Stroke opacity sliders
        $('body').on('change input', '.sliderStrokeOpacity', function () {
            var id = $(this).attr('id').replace('sli', '');
            var layer = App.util.getLayerById(id);
            layer.strokeOpacity = $(this).val();
            layer.mapLayer.setStyle({
                opacity: layer.strokeOpacity
            });
        });

        $('.dropdown.keep-open').on({
            "shown.bs.dropdown": function () { this.closable = false; },
            "mouseleave": function () {
                this.closable = true; },
            "hide.bs.dropdown": function () { return this.closable; }
        });

        //init map
        L.Icon.Default.imagePath = '//library.oregonmetro.gov/libraries/leaflet/0.8-dev/images/';

        this.map = new L.Map('map', {
            center: new L.LatLng(45.44944, -122.67599),
            zoom: 10,
            minZoom: 3,
            maxZoom: 19,
            fullscreenControl: true,
        });

        map = this.map;

        L.control.scale().addTo(this.map);
        new L.Hash(this.map);

        //Get all the meta for each data source specified in the index.htm
        var deferreds = this.layersDialog.getDataSources();

        $.when.apply(null, deferreds).done(function () {
          App.layersDialog.render();

          //load layers passed in hash
          var hash = location.hash.split('/');

          if (hash.length > 3 && hash[3] != '') {
            App.boot_layers = hash.slice(3, hash.length).reverse();
            map.spin(true);
            App.load_layers(0);
          }
        });

        this.basemapDialog.render();

        this.symbolDialog.ramps.render();

        //init selectpickers
        $('.selectpicker').selectpicker();

        //init colorpickers
        $('.color').colorpicker();

        //init RLIS API autosuggest
        var x = new RLIS.Autosuggest("txtLocSearch", { "mode": 'locate', 'entries': 7 }, function (result, error) {
            if (result.error == true || result[0].status == 'failure') {
                $('#frmLocSearch').addClass('has-error');
                return;
            }
            $('#frmLocSearch').removeClass('has-error');

            if (App.locateMarker != null) {
                App.locateMarker.setLatLng([result[0].lat, result[0].lng]);
                App.locateMarker._icon.title = result[0].fullAddress;
                App.locateMarker.bindPopup(result[0].fullAddress);
                App.locateMarker.update();
            }
            else {
                App.locateMarker = new L.marker([result[0].lat, result[0].lng], {
                    draggable: false,
                    title: result[0].fullAddress
                });
                App.locateMarker.bindPopup(result[0].fullAddress);
                map.addLayer(App.locateMarker);
            }

            App.map.setView([result[0].lat, result[0].lng], 15);
        });
        
        //Add drag and drop shapefile functionality
        this.util.dragHandler();
    },

    boot_layers : [],

    load_layers : function(layerIndex) {
      if (layerIndex < App.boot_layers.length && App.boot_layers[layerIndex] != '') {
       
        var name = App.boot_layers[layerIndex].trim().replace(/\-/g, ' ');
        var layer = this.util.getLayerByName(name);
        
        if (layer != null) {
          App.data.add(layer, function() { App.load_layers(layerIndex + 1); });
          $('.img-block.layer').each(function(i, v) {
            if ($(v).data('title') == layer.name) {
              $(v).addClass('active');
            }
          });
        } else {
          console.log(name + ' layer not recognized...sorry');
          App.load_layers(layerIndex + 1);
        }
      } else {
        $('#imgLoadingData').hide();
        map.spin(false);
      }
    },

    data: {

        /* event handler for add data button */
        add: function (layer, cb) {
            switch (layer.type) {
                case App.LAYER_TYPES.GEOJSON:
                    this.load.geoJSON(layer, cb);
                    break;
                case App.LAYER_TYPES.DYNAMIC_LAYER:
                    console.log('Not implemented');
                    break;
                case App.LAYER_TYPES.TILEJSON:
                    this.load.tileJSON(layer);
                    break;
                case App.LAYER_TYPES.TILELAYER:
                    this.load.tileLayer(layer);
                    break;
                case App.LAYER_TYPES.HEATMAP:
                    this.load.heatmap(layer, function() {
                        App.heatmap.render();
                    });
                    break;
              case App.LAYER_TYPES.SHAPEFILE:
                  this.load.shapefile(layer, function (data) {
                        App.data.parse.geoJSON(data, layer, cb);
                  });
                  break;
            }
        },

        /* load a variety of data types */
        load: {

            tileLayer: function (layer) {

                var options = {};
                options.zIndex = (typeof (layer.zIndex) != 'undefined') ? layer.zIndex : 70;
                options.attribution = (typeof (layer.source) != 'undefined') ? layer.source : '';
                options.maxZoom = (typeof (layer.maxZoom) != 'undefined') ? layer.maxZoom : 19;
                options.minZoom = (typeof (layer.maxZoom) != 'undefined') ? layer.minZoom : 0;
                options.opacity = (typeof (layer.fillOpacity) != 'undefined') ? layer.fillOpacity : (typeof (layer.opacity) != 'undefined') ? layer.opacity : 1;

                //This is too custom for comfort
                if (typeof (layer.requireToken) != 'undefined') {
                    layer.url += '?token=' + config.token;
                }

                if (typeof (layer.subdomains) != 'undefined') {
                    options.subdomains = layer.subdomains;
                }

                //** will need some sort of legend created.
                layer.mapLayer = new L.TileLayer(layer.url, options);
                layer.mapLayer.addTo(App.map);
                map.spin(false);
            },

            tileJSON: function (layer) {
              
              var url = layer.url + ((layer.requireToken == true) ? "?token=" + config.token : "");
              
                $.getJSON(url, function (data) {

                    //Add to legend

                    var id = App.util.getLayerId(layer.name);

                    var str = "<li style='clear:both;' id='li" + id + "' class='liTileLegend'><div class='panelyr' data-toggle='collapse' data-target='#leg" + id + "'><span class='accordion-toggle'></span><input type='checkbox' class='legend-check' id='chk" + id + "' checked style='float:left;margin-right:5px;margin-left:3px;'/>" + layer.name + "<div onclick='App.util.removeLayer(\"" + id + "\")' style='float:right;cursor:pointer;' class='btnRemove'>×</div></div><div style='clear:both;margin-left:15px;float:left;' id='leg" + id + "' class='collapse in'>";

                    if (typeof (data.legend) != 'undefined') {
                        str += data.legend;
                    }

                    str += "</div></li>";

                    $('#ulTileLegend').prepend(str);

                    layer.HTMLLegend = legend;

                    App.contextMenu.apply(layer);

                    //beware that this is based on my own spec of the tilejson
                    //doesn't conform to other tilejson spec.
                    var url = data.canonicalURL;

                    if (typeof (layer.requireToken) != 'undefined') {
                        url += '?token=' + config.token;
                    }

                    //** todo - reconcile layer map options with tilejson options.
                    layer.mapLayer = new L.TileLayer(url, { subdomains: data.subdomains, zIndex: (typeof layer.zIndex != 'undefined') ? layer.zIndex : 70, maxZoom: 19, reuseTiles: true });

                    layer.mapLayer.addTo(map);
                    map.spin(false);
                });
            },

            geoJSON: function (layer, callback) {
                $.getJSON(layer.url, function (data) {
                    App.data.parse.geoJSON(data, layer, callback);
                });
            },

            shapefile: function(layer, callback) {

                $('#txtLoadingData').html('Loading...');
                $('#imgLoadingData').fadeIn(100);

                //Check in local storage first
                var localGeoJSON = localStorage.getObject(layer.url);

                if (localGeoJSON != null) {
                  callback(localGeoJSON);
                  //App.data.parse.geoJSON(localGeoJSON, layer);
                  return;
                }
                
                if(typeof (FileReader) != 'undefined' && typeof(layer.simplify) != 'undefined' && layer.simplify==false){
                // if (typeof (FileReader) != 'undefined') {
                var xhr = new XMLHttpRequest(), reader = new FileReader();

                  var url = '';

                  if (typeof (layer.proxy) != 'undefined') {
                    url = './proxy/?url=' + encodeURIComponent(layer.url);
                  } else {
                    url = layer.url;
                  }

                  //url_prefix = 'data/';
                  xhr.open("GET", url, true);
                  // Set the responseType to blob
                  xhr.responseType = "blob";

                  xhr.addEventListener("load", function() {
                    if (xhr.status === 200) {
                      // onload needed since Google Chrome doesn't support addEventListener for FileReader
                      if (typeof(FileReader) == 'undefined') {

                      } else {
                        reader.onload = function(e) {

                          if (reader.readyState !== 2 || reader.error) {
                            if (reader.error) {
                              console.log(reader.error);
                            }
                            return;
                          } else {

                            shp(reader.result).then(function(data) {
                              //cache geojson in localstorage
                              try {
                                localStorage.setObject(layer.url, data);
                              } catch (ex) {
                                console.log('unable to store this in local storage');
                              }
                              $('#txtLoadingData').html('Parsing...');
                              callback(data);
                            });
                          }
                        }
                        // Load blob as Data URL
                        reader.readAsArrayBuffer(xhr.response);
                      }
                    }
                  }, false);
                  // Send XHR
                  xhr.send();
                } else { //IE 9 or less polyfill

                    var url = './polyfill/?url=' + encodeURIComponent(layer.url);
                    if (layer.simplify) {
                      url += "&tolerance=.0005";
                    }
                    $.getJSON(url, function(data) {
                        try {
                          localStorage.setObject(layer.url, data);
                        } catch (ex) {
                          console.log('unable to store this in local storage');
                        }
                        $('#txtLoadingData').html('Parsing...');
                        callback(data);
                    });
                }
            },

            heatmap: function (layer, callback) {

                if (typeof (App.heatmap.rasters[App.util.getLayerId(layer.name)]) != 'undefined') {

                    $('#ulHeatmapLegend').append($(layer.HTMLLegend));

                    callback();
                    return;
                }

                layer.HTMLLegend = App.legendFactory.createHeatmapLegend(layer.name);

                $('#ulHeatmapLegend').append($(layer.HTMLLegend));

                var xhr = new XMLHttpRequest();
                xhr.open('GET', layer.url, true);
                xhr.responseType = 'arraybuffer';
                pngdata = [];
                xhr.onload = function (e) {
                    if (this.status == 200) {
                        var reader = new PNGReader(this.response);
                        reader.parse(function (err, png) {
                            if (err) throw err;
                            var id = App.util.getLayerId(layer.name);
                            App.heatmap.curRasters.push(layer);
                            App.heatmap.rasters[id] = png;
                            App.heatmap.rasterMultiplier[id] = 1;

                            callback();
                        });
                    }
                };

                xhr.send();
            }
        },

        /* Parse geojson into Leaflet, include legend creation */
        parse: {

            geoJSON: function (data, layer, cb) {
                //Sometimes the Shapefile parser will find multiple objects in a zipped shapefile
                //We could prompt the user...but this works for the time being...
                if ($.isArray(data)) {
                    for (var d in data) {
                        if (typeof (data[d].type) != 'undefined' && data[d].type == 'FeatureCollection') {
                            data = data[d];
                            break;
                        }
                    }
                }
                
                var geoJson = {};

                //parse a defnition query
                if (typeof (layer.defQuery) != 'undefined') {
                    var newFeatures = [];
                    //for(var f=data.features.length;f in data.features)
                    newFeatures = $.grep(data.features, function (feature, i) {
                        var clause='';
                        if($.isArray(layer.defQuery)){
                           
                            for(var cl in layer.defQuery){
                                clause+= 'feature.properties.'+layer.defQuery[cl];
                            }
                            return eval(clause)
                        }
                        else{clause='feature.properties.' + layer.defQuery}

                        return eval(clause);
                    });

                    data.features = newFeatures;
                }

                //assemble the legend for this layer
                App.legendFactory.init(layer, data);

                var _onEachFeature = (typeof (layer.popupTemplate) != 'undefined') ?
                     function (feature, slayer) {
                         var thm = Mustache.render(layer.popupTemplate, feature.properties);
                         slayer.bindPopup(thm);
                     }
                : function (feature, slayer) {
                    if (feature.properties) {
                        slayer.bindPopup('<h5>'+layer.name+'</h5>'+Object.keys(feature.properties).map(function (k) {
                            if ($.inArray(k, App.STYLE_KEYWORDS) == -1) {
                                return '<strong>' + k + "</strong>: " + feature.properties[k] + '<br/>';
                            }
                        }).join(""), { maxHeight: 200 });
                    }
                };

                layer.geom = data.features[0].geometry.type;

                switch (layer.geom) {
                    case App.GEOM_TYPES.POINT:
                    case App.GEOM_TYPES.MULTIPOINT:
                        // if(data.features.length>100 && typeof(override) == 'undefined'){
                            
                        //     //prompt user heatmap or markercollection?
                        //     $('#dialogModal .modal-content').html('That\'s a lot of points. <br/>How would you like to render these?<br/><button class="btn btn-sm" id="btnHeatmap" style="margin:10px;" data-dismiss="modal">Heatmap</button><button class="btn btn-sm" id="btnCluster" style="margin:10px;" data-dismiss="modal">Cluster</button><button class="btn btn-sm" id="btnDeal" style="margin:10px;" data-dismiss="modal">I\'ll deal with it</button>');

                        //     $('#btnHeatmap').on('click', function(){
                        //         //if (typeof (App.heatmap.rasters[App.util.getLayerId(layer.name)]) != 'undefined') {

                        //         //    $('#ulHeatmapLegend').append($(layer.HTMLLegend));

                        //         //    callback();
                        //         //    return;
                        //         //}

                        //         layer.HTMLLegend = App.legendFactory.createHeatmapLegend(layer.name);

                        //         $('#ulHeatmapLegend').append($(layer.HTMLLegend));

                        //         var id = App.util.getLayerId(layer.name);

                        //         //how are we pushing this into the curRasters?
                        //         App.heatmap.curRasters.push(layer);
                        //         App.heatmap.rasters[id] = data;
                        //         App.heatmap.rasterMultiplier[id] = 1;
                                
                        //         layer.type = 'heatmap';

                        //         App.heatmap.render();

                        //     });

                        //     $('#btnCluster').off('click').on('click', function(){
                        //         layer.mapLayer = L.markerClusterGroup({showCoverageOnHover:false});
                         
                        //         for (var i = 0; i < data.features.length; i++) {

                        //             var marker = L.marker(new L.LatLng(data.features[i].geometry.coordinates[1], data.features[i].geometry.coordinates[0]));

                        //             marker.bindPopup(Object.keys(data.features[i].properties).map(function (k) {
                        //                 if ($.inArray(k, App.STYLE_KEYWORDS) == -1) {
                        //                     return '<strong>' + k + "</strong>: " + data.features[i].properties[k] + '<br/>';
                        //                 }
                        //             }).join(""), { maxHeight: 200 });

                        //             layer.mapLayer.addLayer(marker);
                        //         }
                                
                        //         App.map.addLayer(layer.mapLayer);

                        //         layer.type = 'POINT_CLUSTER';

                        //         //create the HTMLLegend from the jsonLegend property of the layer.
                        //         layer.HTMLLegend = App.legendFactory.renderHTMLLegend(layer);

                        //         $('#ulVectorLegend').prepend(layer.HTMLLegend);
                        //     });

                        //     $('#btnDeal').on('click', function() {
                        //         App.data.parse.geoJSON(data, layer, true);
                        //     });

                        //     $('#dialogModal').modal('show');

                        //     //if it's something that's been dropped
                        //     if (typeof (config.layers[App.util.getLayerId(layer.name)]) == 'undefined') {
                        //         config.layers.push(layer);
                        //     }

                        //     return false;
                        // } else {
                        geoJson = L.geoJson(data, {
                            pointToLayer:
                                function (feature, latlng) {
                                    return L.circleMarker(latlng, App.styleFeatures(feature, layer));
                                },
                            onEachFeature: _onEachFeature
                        });
                        //}
                        break;
                    case App.GEOM_TYPES.MULTILINESTRING:
                    case App.GEOM_TYPES.LINESTRING:
                    case App.GEOM_TYPES.POLYGON:
                    case App.GEOM_TYPES.MULTIPOLYGON:
                        geoJson = L.geoJson(data, {
                            style: (typeof (layer.style) != 'undefined') ?
                                layer.style : function (feature) { return App.styleFeatures(feature, layer); },
                            onEachFeature: _onEachFeature,
                            clickable: (typeof (layer.clickable) == 'undefined' || layer.clickable == true)
                        });
                        break;
                }

                //**going to need some additional logic here
                //to handle offensive characters in layer names
                //var id = App.util.getLayerId(layer.name);

                //parse fields and add to layer object
                //This is used in the layer symbology dialog when applying a renderer
                layer.fields = [];

                for (var field in data.features[0].properties) {
                    var fieldType = isNaN(data.features[0].properties[field]) ? 'string' : 'number';
                    layer.fields.push({ name: field, type: fieldType });
                }
              
                //create the HTMLLegend from the jsonLegend property of the layer.
                layer.HTMLLegend = App.legendFactory.renderHTMLLegend(layer);

                $('#ulVectorLegend').prepend(layer.HTMLLegend);
         
                App.contextMenu.apply(layer);

                //init sortable functionality in TOC for this item
                $('.sortable').sortable().bind('sortupdate', function (e, ui) {
                    //return false;
                    App.util.sortHandler(e, ui);
                });

                //if it's something that's been dropped
                if (typeof (config.layers[App.util.getLayerId(layer.name)]) == 'undefined') {
                    config.layers.push(layer);
                }

                layer.mapLayer = geoJson;
                layer.mapLayer.addTo(map);
             
                map.spin(false);
              if (typeof(cb) != 'undefined') {
                cb();
              }
            },

            csv: function(csv){
                console.log(csv.substring(0,50));
                var data =Papa.parse(csv, {header:true});
                console.log(data.data[0]);
                $('#imgLoadingData').fadeOut(100);
            }
        }
    },

    legendFactory: {

        /* Initialize a legend for a given layer */
        init: function (layer, data) {

            //set parent properties of layer.fillOpacity and layer.strokeOpacity
            if (typeof (layer.style) != 'undefined') {
                layer.strokeOpacity = (typeof (layer.style.opacity) != 'undefined') ? layer.style.opacity : App.DEFAULT_OPACITY;
                layer.fillOpacity = (typeof (layer.style.fillOpacity) != 'undefined') ? layer.style.fillOpacity : App.DEFAULT_FILLOPACITY;
            } else {
                layer.fillOpacity = App.DEFAULT_FILLOPACITY;
                layer.strokeOpacity = App.DEFAULT_OPACITY;
            }

            /* in order of preference:
	        layer.legend
	            layer.style
	                data.legend
	                    symbolField
                            ramp
	                            simpleStyle
		    */

            if (typeof (layer.legend) == 'undefined') { //there is no legend.

                layer.legend = { "symbols": [], "title": layer.name };

                if (typeof (layer.style) != 'undefined') {

                    layer.legend.type = App.RENDERER.SINGLE_SYMBOL;

                    layer.legend.symbols.push({
                        "value": "*",
                        "fillColor": (typeof (layer.style.fillColor) != 'undefined') ? layer.style.fillColor : App.DEFAULT_FILLCOLOR,
                        'color': (typeof (layer.style.color) != 'undefined') ? layer.style.color : App.DEFAULT_COLOR,
                        'fillOpacity': (typeof (layer.style.fillOpacity) != 'undefined') ? layer.style.fillOpacity : App.DEFAULT_FILLOPACITY,
                        'weight': (typeof (layer.style.weight) != 'undefined') ? layer.style.weight : App.DEFAULT_WEIGHT
                    });

                } else if (typeof (data.legend) != 'undefined') {

                    layer.legend = data.legend;

                } else if (typeof (layer.symbolField) != 'undefined') {

                    layer.ramp = (typeof(layer.ramp) != 'undefined') ? layer.ramp : App.DEFAULT_RAMP;
                    
                    layer.legend.type = App.RENDERER.UNIQUE_VALUE;

                    var values = [];
                    var temp_values = [];

                    for (var i = 0; i < data.features.length; i++) {
                        var value = data.features[i].properties[layer.symbolField];

                        if (value != value) {
                            value = 'null';
                        }

                        if ($.inArray(value, temp_values) === -1) {
                            values.push({ value: value });
                            temp_values.push(value);
                        }
                    }

                    layer.scale = chroma.scale(layer.ramp).domain([1, (values.length > 1) ? values.length : 2]).out('hex');

                    for (var val in values.sort(App.util.comparator)) {
                        var legend = App.legendFactory.createJSONLegend(layer.geom, values[val], layer.scale, layer.fillOpacity, layer.strokeOpacity);
                        layer.legend.symbols.push(legend);
                    }

                } else {

                    layer.legend.type = App.RENDERER.SINGLE_SYMBOL;

                    layer.legend.symbols.push({
                        "value": "*",
                        "fillColor": App.util.getRandomColor(), 'color': App.DEFAULT_COLOR, 'weight': App.DEFAULT_WEIGHT
                    });
                }
            }
        },

        /* render an HTML Legend from a JSON legend */
        renderHTMLLegend: function (layer) {

            var id = App.util.getLayerId(layer.name);

            var title = (typeof (layer.legend.title) != 'undefined') ? layer.legend.title : layer.name;

            var str = "<li style='clear:both;' id='li" + id + "' class='liVectorLegend'><div class='panelyr' data-toggle='collapse' data-target='#leg" + id + "'><span class='accordion-toggle'></span><input type='checkbox' class='legend-check' id='chk" + id + "' checked style='float:left;margin-right:5px;margin-left:3px;'/>" + title + "<div onclick='App.util.removeLayer(\"" + id + "\")' style='float:right;cursor:pointer;' class='btnRemove'>×</div></div><div style='clear:both;margin-left:15px;float:left;padding-top:6px;' id='leg" + id + "' class='collapse in'>";

            str += this.renderHTMLLegendItems(layer);

            str += "</div></li>";

            return str;
        },

        /* render each individual HTML legend Item */
        renderHTMLLegendItems: function (layer) {

            var HTMLLegend = "";

            layer.legend.symbols.forEach(function (symbol) {

                HTMLLegend += App.legendFactory.renderHTMLLegendItem(layer.geom, symbol);

            });

            return HTMLLegend;
        },

        /* render SVG shape for each legend item */
        renderHTMLLegendItem: function (geom, symbol) {

            var legendItem;
            var symVal = (symbol.value == '*') ? '' : typeof (symbol.label) != 'undefined' ? symbol.label : symbol.value;

            legendItem = '<div class="legend-item">'
		                    + '<svg width="16" height="16">';

            switch (geom) {
                case App.GEOM_TYPES.MULTIPOINT:
                case App.GEOM_TYPES.POINT:
                    legendItem += '<circle cx="6.5" cy="8" r="5.8" stroke="' + symbol.color + '" stroke-width="' + symbol.weight + '" fill-opacity="'+symbol.fillOpacity+'"  stroke-opacity="'+symbol.opacity+'" fill="' + symbol.fillColor + '" />';
                    break;
                case App.GEOM_TYPES.MULTIPOLYGON:
                case App.GEOM_TYPES.POLYGON:
                    if (isNaN(symbol.weight)) {
                        symbol.weight = 1;}
                    //console.log(symbol.fillOpacity);
                    legendItem += '<rect y="' + (symbol.weight - 1) + '" x="' + (symbol.weight - 1) + '" width="12" height="12" fill-opacity="' + symbol.fillOpacity + '" fill=' + symbol.fillColor + ' stroke-width="' + symbol.weight + '" stroke="' + symbol.color + '" />';
                    break;
                case App.GEOM_TYPES.LINESTRING:
                case App.GEOM_TYPES.MULTILINESTRING:
                if (isNaN(symbol.weight)) {
                        symbol.weight = 1;}
                    legendItem += '<rect width="12" height="' + (symbol.weight + 1) + '" fill=' + symbol.color + ' stroke-width="0" />';
                    break;
            }

            legendItem += '</svg> ' + symVal + '</div>';

            return legendItem;
        },

        /* create the JSON obj/representation for a given symbol */
        createJSONLegend: function (geom, symbol, scale, fillOpacity, opacity, color, weight) {

            color = (typeof (color) !== 'undefined') ? color : App.DEFAULT_COLOR;
            weight = (typeof (weight) !== 'undefined') ? weight : App.DEFAULT_WEIGHT;

            var fillColor;

            if (symbol.value == 'null') {
                fillColor = App.DEFAULT_FILLCOLOR;
                scaleCounter += 1;

            } else {
                fillColor = App.symbolDialog.ramps.getNextColor(scale);
            }

            var obj = {}
            if (geom == App.GEOM_TYPES.LINESTRING || geom == App.GEOM_TYPES.MULTILINESTRING) {
                obj = { "value": symbol.value, 'opacity': opacity, 'color': fillColor, 'weight': weight };
            } else {
                obj = { "value": symbol.value, 'opacity':opacity, 'fillOpacity':fillOpacity, "fillColor": fillColor, 'color': color, 'weight': weight };
            }

            if (typeof (symbol.label) != 'undefined') {
                obj.label = symbol.label;
            }
            return obj;
        },

        createHeatmapLegend : function(name) {
            var id = App.util.getLayerId(name);

            return "<li id='li" + id + "'><input type='checkbox' checked='checked' class='indicator' id='chk" + id + "'> " + name + "<div onclick='App.util.removeLayer(\"" + id + "\")' style='float:right;cursor:pointer;' class='btnRemove'>×</div>" + "<input type='range' class='indrange' value='1' min='1' max='10' step='.25' id='sli" + id + "'/><div class='indlabel' id='lbl" + id + "'>1</div></li>";
        }
    },

    styleFeatures: function (feature, layer) {
        
        var style = {
            fillColor: App.DEFAULT_FILLCOLOR,
            fillOpacity: layer.fillOpacity,
            stroke: true,
            weight: App.DEFAULT_WEIGHT,
            opacity: layer.strokeOpacity,
            color: App.DEFAULT_COLOR
        };

        var sym = {};

        //a little defense here
        if (typeof (layer.legend.type) == 'undefined') {
            if (layer.legend.symbols.length == 1) {
                layer.legend.type = App.RENDERER.SINGLE_SYMBOL;
            } else {
                layer.legend.type = App.RENDERER.UNIQUE_VALUE;
            }
        }

        if (layer.legend.type == App.RENDERER.SINGLE_SYMBOL) {
            sym = layer.legend.symbols[0];
        } else {

            var value = feature.properties[layer.symbolField];

            //NaN is the only value in javascript that does not equal itself
            if (value !== value) {
                return style;
            }

            for (var i = 0; i < layer.legend.symbols.length; i++) {
                sym = layer.legend.symbols[i];
                if (layer.legend.type == App.RENDERER.UNIQUE_VALUE) {
                    if (isNaN(value) && isNaN(sym.value)) {
                        if (sym.value.toUpperCase() == value.toUpperCase()) {
                            break;
                        }
                    }
                    else if (layer.legend.symbols[i].value == value) {
                        break;
                    }
                } else if (layer.legend.type == App.RENDERER.CLASS_BREAKS) {
                    if (!isNaN(value) && (value >= sym.minVal && value <= sym.maxVal)) {
                        break;
                    }
                }
            }
        }

        style.color = (typeof sym.color != 'undefined') ? sym.color : App.DEFAULT_COLOR;
        style.weight = (typeof sym.weight != 'undefined') ? sym.weight : App.DEFAULT_WEIGHT;
        style.fillColor = (typeof sym.fillColor != 'undefined') ? sym.fillColor : App.DEFAULT_FILLCOLOR;
        style.fillOpacity = (typeof sym.fillOpacity != 'undefined') ? sym.fillOpacity : App.DEFAULT_FILLOPACITY;
        style.opacity = (typeof sym.opacity != 'undefined') ? sym.opacity : App.DEFAULT_OPACITY;

        if (feature.geometry.type == 'Point') {
            style.radius = (typeof sym.radius != 'undefined') ? sym.radius : App.DEFAULT_RADIUS;
        }

        if (feature.geometry.type == 'LineString') {
            style.dashArray = (typeof sym.dashArray != 'undefined') ? sym.dashArray : "";
        }
        return style;
    },

    layersDialog: {

        $grid: null,
        data_sources : [],
        categories : [],

        getDataSources : function() {
          var deferreds = [];

          //iterate data sources
          for (var i in data_sources) {
            deferreds.push(
              $.getJSON('./getLayersBySource/' + data_sources[i]).success(function (data) {
                //console.log(data);
                config.layers.push.apply(config.layers, data);
              }));
          }
          return deferreds;
        },

        /* Render the entire layer tabs collection */
        render: function () {
            this.$grid = $('#layers');

            for(var lyr in config.layers){
                var l = config.layers[lyr];
                var thumb = (typeof(l.thumb)=='undefined') ? 'img/placeholder.png': l.thumb;

                //var theme = (typeof(l.theme)=='undefined') ? "" : l.theme;

                var $div = $('<div class="layer img-block col-xs-6 col-sm-4" data-groups=\'["'+l.theme+'"]\' data-title=\'["'+l.name+'"]\' data-theme=\'["'+l.theme+'"]\' data-source=\'["'+l.source+'"]\'"><img width="82" height="62" class="lazy" data-original="'+thumb+'"/>'+l.name+'<br/><span style="font-size:11px;"><b>Source: </b>'+l.source+'<br/><b>Category: </b>'+l.theme+'<b><br/>Data URL: </b><a href="'+l.url+'">'+l.url+'</a></span></div>');

                if (this.data_sources.indexOf(l.source) == -1){
                    
                    this.data_sources.push(l.source);
                }

                if (this.categories.indexOf(l.theme) == -1){
                    
                    this.categories.push(l.theme);
                }

                this.$grid.append($div);
            }

            this.data_sources.sort();
            this.categories.sort();

            if(this.categories[0].trim()==''){
                this.categories.splice(0,1);
            }

            for(var c in this.categories){
                $('#selCategories').append('<option value="'+this.categories[c]+'">'+this.categories[c]+'</option>');
            }

            for(var ds in this.data_sources){
                $('#selDataSources').append('<option value="'+this.data_sources[ds]+'">'+this.data_sources[ds]+'</option>');
            }

            $('#selCategories').selectpicker('refresh');
            $('#selDataSources').selectpicker('refresh');

            this.$grid.shuffle({
                itemSelector: '.img-block'
            });

            $('.sort-options').on('change', function() {
              var sort = $(this).val(),
                  opts = {};
              // We're given the element wrapped in jQuery
              if ( sort === 'date-created' ) {
                opts = {
                  reverse: true,
                  by: function($el) {
                    return $el.data('date-created');
                  }
                };
              } else if ( sort === 'title' ) {
                opts = {
                  by: function($el) {
                    return $el.data('title').toString().toLowerCase();
                  }
                };
              }
              // Filter elements
              App.layersDialog.$grid.shuffle('sort', opts);
               setTimeout(function(){
                   $("img.lazy").lazyload('update');
                   },500);
            });

            $('#txtLayerFilter').keyup($.debounce(250, function() {
                var val = $(this).val().toLowerCase();
                App.layersDialog.$grid.shuffle('shuffle', function($el, shuffle) {

                //Only search elements in the current group
                if (shuffle.group !== 'all' && $.inArray(shuffle.group, $el.data('groups')) === -1) {
                  return false;
                }

                var text = $.trim($el.data('title') ).toLowerCase();

                return text.indexOf(val) !== -1;
                });

                //refresh lazy Images;
                setTimeout(function(){
                $("img.lazy").lazyload('update');
                },500);
            }));

            $('#selCategories').on('change', function(){

                var val = $(this).val();
                App.layersDialog.$grid.shuffle('shuffle', function($el, shuffle) {
                   
                  return $el.data('theme').indexOf(val) != -1;
                });
                setTimeout(function(){
                $("img.lazy").lazyload('update');
                },500);
            })

            $('#selDataSources').on('change', function(){

                var val = $(this).val();
                App.layersDialog.$grid.shuffle('shuffle', function($el, shuffle) {
                   
                  return $el.data('source').indexOf(val) != -1;
                });
                setTimeout(function(){
                $("img.lazy").lazyload('update');
                },500);
            })


            this.attachEventHandler();
        },

        attachEventHandler: function () {
            //Attach behavior to items in Add Data Modal
            $('.img-block.layer').on('click', function () {
                var name = $(this).data('title');
                var layer = App.util.getLayerByName(name);
                if ($(this).hasClass('active')) {
                    $(this).removeClass('active');
                    
                    if (layer.type == 'heatmap') {
                        var id = App.util.getLayerId(layer.name);
                        delete App.heatmap.rasterMultiplier[id];
                        App.heatmap.sync(id, false);
                    } else {
                        map.removeLayer(layer.mapLayer);
                    }

                    $('#li' + App.util.getLayerId(layer.name)).remove();
                    App.util.updateUrl();
                }
                else {
                    $(this).addClass('active');
                    if (typeof (layer.mapLayer) != 'undefined') {
                        map.addLayer(layer.mapLayer);
                        App.contextMenu.apply(layer);
                        switch (layer.type) {
                            case App.LAYER_TYPES.GEOJSON:
                            case App.LAYER_TYPES.SHAPEFILE:
                                //apply context menu,
                                //wire up behavior of close button.
                                //the layer.HTMLLegend is a div not an li.
                                $('#ulVectorLegend').prepend(layer.HTMLLegend);
                                break;
                            case App.LAYER_TYPES.TILELAYER:
                            case App.LAYER_TYPES.TILEJSON:
                                $('#ulTileLegend').prepend(layer.HTMLLegend);
                                break;
                        }
                    } else if (layer.type == 'heatmap' ) {
                        id = App.util.getLayerId(layer.name);
                        if (typeof (App.heatmap.rasters[id]) != 'undefined') {
                            $('#ulHeatmapLegend').append($(layer.HTMLLegend));
                            App.heatmap.rasterMultiplier[id]=1;
                            App.heatmap.sync(id, true);
                        } else {
                          App.util.updateUrl();
                          App.data.add(layer, function () { App.util.updateUrl();});
                        }
                    }
                    else {
                        map.spin(true);
                        App.data.add(layer, function() { App.util.updateUrl();});
                    }
                }
            });
        }
    },

    basemapDialog: {

        /* Render the basemap dialog. */
        render: function () {
            for (_basemap in config.basemaps) {

                var basemap = config.basemaps[_basemap];

                var id = basemap.name.replace(/\s/g, '_');

                var theme = basemap.theme.replace(/\s/g, '_');

                if (!$('#' + theme).length) {
                    $('#basemapContent').append('<div style="clear:both;" id="' + theme + '"><h4 style="margin:0;">' + basemap.theme + '</h4><hr style="margin:0;padding:0;"/></div');
                }

                var thumb = basemap.thumb;

                var imgBlockText = "<div class='img-block img-block-sm basemap";

                if (basemap.active == true) {
                    imgBlockText += ' active';
                    basemap.zIndex = 0;
                    //App.data.load.tileLayer(basemap);
                }

                imgBlockText += "'><div class='caption caption-sm'>" + basemap.name + "</div><img class='idata' src='" + thumb + "' alt='" + basemap.name + "' id='img" + id + "'/></div>";

                $('#' + theme).append(imgBlockText);
            }

            this.attachEventHandlers();

        },

        attachEventHandlers: function () {

            $('.img-block.basemap').on('click', function () {

                var id = $(this).find('img').attr('id').replace('img', '');

                var basemap = App.util.getBasemapById(id);

                //We will need a lot of intelligence here.
                //remove previous basemap
                //handle multi-ply layers etc. etc.


                //get existing basemap
                var oldBasemapEl = $($('.img-block.basemap.active')[0]);
                var oldBasemapId = oldBasemapEl.find('img').attr('id').replace('img', '');
                var oldBasemap = App.util.getBasemapById(oldBasemapId);

                //turned on labels first and then a photo layer or turned on a photo first and then labels
                //if ((oldBasemap.type == 'labels' && basemap.type == 'photo') ||
                //    (basemap.type == 'labels' && oldBasemap.type == 'photo')) {

                //}
                // else if(basemap.type != 'photo' && map.hasLayer(App.util.getBasemapById('Photo_Labels').mapLayer){
                oldBasemapEl.removeClass('active');
                //         console.log("rocky");
                     oldBasemap.active = false;
                     try{
                       App.map.removeLayer(oldBasemap.mapLayer);
                   }catch(ex){}
                //     }

                $(this).addClass('active');

                if (typeof (basemap.mapLayer) != 'undefined') {
                    App.map.addLayer(basemap.mapLayer);
                }
                else {
                    if (basemap.type != 'labels') {
                        basemap.zIndex = 0;
                    }
                    _(basemap.zIndex);
                    //App.map.maxZoom = (typeof basemap.maxZoom != 'undefined') ? basemap.maxZoom : 19;

                    App.data.load.tileLayer(basemap);
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
    },

    symbolDialog: {

        /* Refresh the symboldialog with controls specific to layer type...
        e.g. hide fill control for lines, show circle radius range for points
        */

        refresh: function (id) {
            var layer = App.util.getLayerById(id);

            //hide stroke inputs if we're dealing with a LineString geometry
            if (layer.geom == App.GEOM_TYPES.LINESTRING || layer.geom == App.GEOM_TYPES.MULTILINESTRING) {
                $('.lblStroke').hide();
            } else {
                $('.lblStroke').show();
            }

            App.symbolDialog.ramps.refresh(layer);

            //populate field select control
            $('#selCatField').off('change.core');

            $('#selCatField').empty();

            $.each(layer.fields, function (key, value) {
                $('#selCatField')
		            .append($("<option></option>")
		            .attr("value", value.name)
		            .text(value.name));
            });

            if (typeof (layer.symbolField) != 'undefined') {
                $('#selCatField').selectpicker('val', layer.symbolField);
            } else {
                $('#selCatField')
		            .append($("<option></option>")
		            .attr("value", '0')
		            .text('No field Selected')).selectpicker('val', '0')

                $('#selCatField').next().first().on('click.core', function () {

                    $('#selCatField').find('[value=0]').remove();

                    $('.selectpicker').selectpicker('refresh');

                    $('#selCatField').next().first().off('click.core');

                    //if a ramp hasn't been set, set it to the default ramp in the dropdown.
                    //set a ramp in the selGradient combobox
                    if ($($('#selGradient').children()[0]).is('b')) {
                        App.symbolDialog.ramps.deefault();
                    }

                    App.symbolDialog.legends.uniqueValues.refresh(layer);
                });
            }

            $('.selectpicker').selectpicker('refresh');

            //remove event handlers for single color before changing their values
            $('#_colSingleFill, #_colSingleStroke').off('changeColor');

            $('#rngSingleWeight').off('change');

            var legend = App.legendFactory.renderHTMLLegendItems(layer);

            //Just start from scratch on which tab each time
            $('#symbolModal .tab-content > div').each(function (index) { $(this).removeClass('active in') });

            //Set to correct tab
            switch (layer.legend.type) {
                case App.RENDERER.SINGLE_SYMBOL:

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
                    break;

                case App.RENDERER.UNIQUE_VALUE:

                    //recreate the legend in the dialog???
                    $('#uniqueValuesLegend').empty().append(legend);
                    $('#symbolTabs > li:nth-child(2) > a').tab('show');
                    $('#uniqueValues').addClass('active in');
                    break;
                case App.RENDERER.CLASS_BREAKS:

                    //match number of classes, min, max and labels

                    $('#classBreaksLegend').empty().append(legend);
                    $('#symbolTabs > li:nth-child(3) > a').tab('show');
                    $('#classBreaks').addClass('active in');
                    break;
            }

            $('#_colSingleFillColor, #_colSingleColor').on('changeColor', function (ev) {
                App.symbolDialog.legends.singleFill.refresh(layer);
            });

            $('#rngSingleWeight').on('change', function (e) {
                App.symbolDialog.legends.singleFill.refresh(layer);
            });

            //event handlers for categories
            $('#_colCatStroke').off('changeColor').on('changeColor', function (ev) {
                App.symbolDialog.legends.uniqueValues.refresh(layer);
            });

            $('#rngCatWeight').on('change', function () {
                App.symbolDialog.legends.uniqueValues.refresh(layer);
            });

            $('#selCatField').on('change.core', function () {
                if (typeof (layer.ramp) == 'undefined') {
                    App.symbolDialog.ramps.deefault();
                }
                App.symbolDialog.legends.uniqueValues.refresh(layer);
            });

            $('.palette').off('click').on('click', function (e) {
                var ramp = $(this).attr('title');
                var $span = $('<span class="palette" title="' + ramp + '"></span>');
                for (col in colorbrewer[ramp]['9']) {
                    $span.append('<span class="swatch" style="background-color: ' + colorbrewer[ramp]['9'][col] + ';"></span>');
                }

                $('#selGradient span').first().remove();
                $('#selGradient').prepend($span);

                if ($('#selCatField').val() == '0') { //no field selected
                    //add error class to field input?
                    return;
                }

                App.symbolDialog.legends.uniqueValues.refresh(layer);
            });

            $('#symbolModal').modal('show');
        },

        ramps: {

            scaleCounter: 0,

            $lstRamps: null,

            refresh: function (layer) {

                if (typeof (layer.ramp) != 'undefined') {
                    
                    var _ramp = layer.ramp;

                    //set a ramp in the selGradient combobox
                    var $span = $('<span class="temppalette" title="' + _ramp + '"></span>');

                    for (var col in colorbrewer[_ramp]['9']) {
                        $span.append('<span class="swatch" style="background-color: ' + colorbrewer[_ramp]['9'][col] + ';"></span>');
                    }

                    if (!$($('#selGradient').children()[0]).is('b')) {
                        $('#selGradient span').first().remove();
                    }

                    $('#selGradient').prepend($span);
                } else {
                    //can I do this?
                    $('#selGradient span').first().remove();
                }
            },

            render: function () {

                this.$lstRamps = $('#lstRamps');

                for (ramp in colorbrewer) {
                    if (typeof (colorbrewer[ramp]['9']) != 'undefined') {
                        var $li = $('<li></li>');
                        var $span = $('<span class="palette" title="' + ramp + '"></span>');
                        for (var col in colorbrewer[ramp]['9']) {
                            $span.append('<span class="swatch" style="background-color: ' + colorbrewer[ramp][9][col] + ';"></span>');
                        }
                        $li.append($span);
                        this.$lstRamps.append($li);
                    }
                }
            },

            getNextColor: function (scale) {
                this.scaleCounter += 1;
                var color = scale(this.scaleCounter);
                if (this.scaleCounter == scale.domain()[1]) {
                    //console.log(scaleCounter);
                    this.scaleCounter = 0;
                }
                return color;
            },

            deefault: function () {

                var $span = $('<span class="temppalette" title="' + App.DEFAULT_RAMP + '"></span>');

                for (var col in colorbrewer[App.DEFAULT_RAMP]['9']) {
                    $span.append('<span class="swatch" style="background-color: ' + colorbrewer[App.DEFAULT_RAMP]['9'][col] + ';"></span>');
                }

                if (!$($('#selGradient').children()[0]).is('b')) {
                    $('#selGradient span').first().remove();
                }

                $('#selGradient').prepend($span);
            }

        },

        legends: {

            singleFill: {
                refresh: function (layer) {

                    //construct the faux legend item
                    var phantomSymbol = { value: '*', fillColor: $('#colSingleFillColor').val(), color: $('#colSingleColor').val(), weight: $('#rngSingleWeight').val(), fillOpacity:layer.fillOpacity };

                    var legendItem = App.legendFactory.renderHTMLLegendItem(layer.geom, phantomSymbol);

                    $('#singleLegend').empty().html(legendItem);

                    $('#btnApplySymbol').off().on('click', function () {

                        if (typeof (layer.symbolField) != 'undefined') {
                            layer.symbolField = undefined;
                        }

                        App.symbolDialog.apply(layer, [phantomSymbol],              App.RENDERER.SINGLE_SYMBOL, legendItem);

                    });

                    $('#uniqueValuesLegend').empty();
                }
            },

            uniqueValues: {
                refresh: function (layer) {
                    //get ramp, 
                    //if(typeof(layer.ramp) == 'undefined'){
                    var ramp = $($('#selGradient').children()[0]).attr('title');
                    //_(ramp);
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

                    var values = [];
                    var tempValues = [];

                    if (symbolField != layer.symbolField || layer.legend.symbols[0].value == '*') {
                        for (var feature in layer.mapLayer._layers) {
                            var value = layer.mapLayer._layers[feature].feature.properties[symbolField];
                            if ($.inArray(value, tempValues) === -1) {
                                values.push({ value: value });
                                tempValues.push(value);
                            }
                        }
                    }
                    else {
                        //load the values with the values from the legend.
                        for (var i = 0; i < layer.legend.symbols.length; i++) {
                            //support labels

                            var obj = { value: layer.legend.symbols[i].value };
                            if (typeof (layer.legend.symbols[i].label) != undefined) {
                                obj.label = layer.legend.symbols[i].label;
                            }
                            values.push(obj);
                        }
                    }

                    var phantomSymbols = [];

                    if (typeof (ramp) != 'undefined' || layer.ramp != ramp) {
                        var scale = chroma.scale(ramp).domain([1, values.length]).out('hex');

                        values.sort(App.util.comparator);

                        for (var i = 0; i < values.length; i++) {
                            var obj = App.legendFactory.createJSONLegend(layer.geom, values[i], scale, layer.fillOpacity, layer.strokeOpacity, color, weight);
                            //if (typeof (values[i].label) != 'undefined') { obj.label = symbol.label; }
                            phantomSymbols.push(obj);
                        }
                    } else {
                        //get colors from existing legend.
                        //keep fillcolor the same here but alter weight and color....
                        for (var s in layer.legend.symbols) {
                            var sym = layer.legend.symbols[s];
                            var obj = { value: sym.value, fillColor: sym.fillColor, color: sym.color, weight: weight, opacity: layer.strokeOpacity, fillOpacity: layer.fillOpacity };
                            //if (typeof(symbol.label) != 'undefined'){obj.label = symbol.label;}
                            phantomSymbols.push(obj);
                        }
                    }

                    var legendItems = App.legendFactory.renderHTMLLegendItems({ name: layer.name, geom: layer.geom, legend: { symbols: phantomSymbols } });

                    $('#uniqueValuesLegend').empty().html(legendItems);

                    $('#btnApplySymbol').off().on('click', function () {

                        //couple of uniqueValue renderer specifics, then off to the generic apply function.
                        layer.symbolField = symbolField;
                        layer.scale = scale;

                        App.symbolDialog.apply(layer, phantomSymbols, App.RENDERER.UNIQUE_VALUE, legendItems, ramp);
                    });
                }
            },

            classBreaks: {
                refresh: function (layer) {

                }
            }
        },
        
        /* Applies chosen symbology to layer */
        apply: function (layer, newSymbol, renderer, legendItem, ramp) {

            layer.legend.symbols = newSymbol;
            layer.legend.type = renderer;

            if (typeof (ramp) != 'undefined') {
                layer.ramp = ramp;
            }

            layer.mapLayer.setStyle(function (feature) {
                return App.styleFeatures(feature, layer);
            });

            var id = App.util.getLayerId(layer.name);

            $('#leg' + id + ' .legend-item').remove();
            $('#leg' + id).append(legendItem);

                    //slight haxxorz to get outerhtml.
            layer.HTMLLegend = $('#li' + id).clone().wrap('<p>').parent().html();
        },
    },

    optionsDialog : {
        
    },

    selectDialog: {

        init: function(layer){

            //push layer's fields into selSelectFields
            $('#selSelectFields').empty();

            for(var field in layer.fields){
                $('#selSelectFields').append('<option value="'+layer.fields[field].name+'">'+layer.fields[field].name+'</option>')
            }

            $('#selSelectFields').selectpicker('refresh');
            $('#selectModal').modal('show');


            $('#selSelectFields').on('change', function(){
                //remove numeric comparator symbols from selSQLOps

            });
            
            $('#btnApplySelect').off('click').on('click', function(){

                var op = $('#selSQLOps').val();

                var field = $('#selSelectFields').val();

                var value = $('#txtSelection').val();

                var layerField = null;
                for (var fieldx in layer.fields){

                    if (layer.fields[fieldx].name==field){
                        layerField =layer.fields[fieldx];
                    }
                }

                if ((op=='gt' || op == 'lt') && layerField.type != 'number'){
                    alert('Unable to use greater or lesser with text values');
                    return;
                }

                if ((op=='l' || op == 'nl') && layerField.type != 'string'){
                    alert('Unable to use like/not like with numbers');
                    return;
                }

                if(typeof (layer.selection) != 'undefined'){
                    map.removeLayer(layer.selection);
                    layer.selection = {};
                }

                map.removeLayer(layer.mapLayer);

                var newoptions = $.extend(layer.mapLayer.options, {
                    filter: function(feature, layer) {
                        var bool = false;
                        switch(op){
                            case 'eq':
                                bool = feature.properties[field]==value;
                                break;
                            case 'neq':
                                bool = feature.properties[field]!=value;
                                break;
                            case 'l':
                                bool = feature.properties[field].indexOf(value) != -1;
                                break;
                            case 'gt':
                                bool = feature.properties[field] > parseInt(value);
                                break;
                            case 'lt':
                                bool = feature.properties[field] < parseInt(value);
                                break;
                        }

                        return bool;
                    }});

                layer.selection =  L.geoJson(layer.mapLayer.toGeoJSON(), newoptions).addTo(map);
            });

            $('#btnClearSelect').off('click').on('click', function(){
                App.selectDialog.clear(layer);
            });
        },
        clear: function(layer){
           if(typeof(layer.selection) != 'undefined'){
                map.removeLayer(layer.selection);
                map.addLayer(layer.mapLayer);
                layer.selection = {};
            }
        }
    },

    contextMenu : {

        apply: function (layer) {
            var id = App.util.getLayerId(layer.name);

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
                        function () { App.symbolDialog.refresh(id); }
                });
            }

            contents.push(
                {
                    text: 'Remove',
                    action:
                        function (e) {
                            App.util.removeLayer(id);
                        }
                });

            if (layer.type == 'shapefile' || layer.type == 'geojson') {
                contents.push(
                {
                    text: "Download...",
                    subMenu:
                    [
                        {
                            text: 'Shapefile', action: function () {
                                window.open(layer.url);
                            }
                        },
                        {
                          text: 'GeoJSON', action: function () {

                            if (typeof(Blob) != 'undefined') {
                              var foo = JSON.stringify(layer.mapLayer.toGeoJSON());
                              var goo = new Blob([foo], { type: 'application/octet' });

                              if (window.navigator.msSaveBlob) {
                                window.navigator.msSaveBlob(goo, id + '.geojson');
                              } else {
                                var blobUrl = URL.createObjectURL(goo);
                                var a = document.createElement("a");
                                document.body.appendChild(a);
                                a.style = "display: none";
                                a.href = blobUrl;
                                a.download = id + '.geojson';
                                a.click();
                                URL.revokeObjectURL(blobUrl);
                              }
                            } else {
                              var url = "./polyfill/?url=" + encodeURIComponent(layer.url) + "&type=file";
                              if (layer.simplify) {
                                url += '&tolerance=.005';
                              }
                              window.location = url;
                            }
                          }
                        },
                        {
                            text: 'CSV', action: function () {
                                var str = App.util.export2CSV(layer.mapLayer._layers, true);
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
                         function (e) {
                             map.fitBounds(layer.mapLayer.getBounds());
                         }
                 },
                 {
                            text: 'Filter...', action: function () {
                                App.selectDialog.init(layer);
                            }
                        }
                );
            }

            if (layer.type == 'shapefile' || layer.type == 'geojson') {
                contents.push({
                    text: 'View Table...',
                    action:
                        function () {
                            var str = App.util.export2CSV(layer.mapLayer._layers, true);
                            $('#tableDiv').CSVToTable(str);
                            $('#tableModalHeader').html(layer.name + ' Table');
                            $.bootstrapSortable();

                            $('#btnExportToCSV').off('click').on('click', function () {
                                var str = App.util.export2CSV(layer.mapLayer._layers, true);
                                //DBF files are generally in the ISO8859-1
                                //http://gis.stackexchange.com/questions/3529/which-character-encoding-is-used-by-the-dbf-file-in-shapefiles
                                window.open("data:text/plain;charset=iso-8859-1," + escape(str));

                            });

                            //console.log(str);
                            $('#tableModal').on('shown', function () {
                                $.bootstrapSortable();
                            });
                            $('#tableModal').modal('show');
                        }
                });
            }

            if (typeof (layer.metadataUrl) != 'undefined') {
                contents.push(
                {
                    text: 'View Metadata...',
                    action: function (e) {
                        id = id.replace('#li', '');
                        var layer = App.util.getLayerById(id);
                        window.open(layer.metadataUrl, '_blank');
                    }
                });
            }

            switch (layer.type) {
                case "shapefile":
                case "geojson":
                    if (layer.geom != App.GEOM_TYPES.LINESTRING && layer.geom != App.GEOM_TYPES.MULTILINESTRING) {
                        contents.push({ header: 'Fill Opacity' }, {
                            klass: 'sliderFillOpacity',
                            id: id,
                            value: (typeof (layer.fillOpacity) != 'undefined') ? layer.fillOpacity : 1
                        });
                    }
                    contents.push({ header: 'Stroke Opacity' }, {
                        klass: 'sliderStrokeOpacity',
                        id: id,
                        value: (typeof (layer.strokeOpacity) != 'undefined') ? layer.strokeOpacity : 1
                    });
                    break;
                case "tilejson":
                case "tilelayer":
                    contents.push({ header: 'Opacity' }, {
                        klass: 'sliderFillOpacity',
                        id: id,
                        value: (typeof (layer.fillOpacity) != 'undefined') ? layer.fillOpacity : 1
                    });
                    break;
            }


            contents.push({ header: 'Developer' },
            {
                text: 'Export Symbology',
                action: function (e) {
                    id = id.replace('#li', '');
                    var layer = App.util.getLayerById(id);
                    console.log(JSON.stringify(layer.legend));
                }
            });

            //attach the id of the context menu to the layer;
            layer.context =context.attach('#li' + id, contents);

        }
    },

    heatmap : {
        layer: null,
        rasters: {},
        rasterMultiplier: {},
        curRasters: [],
        tooltip: null,
        blur: .65,
        gradientIndex: 4,
        heattip_enabled : false,
        gradients: [
                {'.55': '#278590','.85': '#F9FBBD','.95': '#0000FF', '1': '#9D5923'},
                {'.55':'#0C307A','.85':'#76EC00', '1':'#C2523C'},
                {'0':'#3562CF','.5':'#FFFFBF', '1':'#C44539'},
                {'0':'#FFDFDF', '1':'#8F0C0A'},
                  null
        ],
        pngdata: [],
        resolution: 5,
        radius: .0036,
        maxOpacity: 0.7,
        minOpacity :0,
        
        _init: function () {

            this.config =  {
                "radius": this.radius,
                "maxOpacity": this.maxOpacity,
                "minOpacity": this.minOpacity,
                "scaleRadius": true,
                "useLocalExtrema": false,
                "blur":this.blur,
                "gradient":this.gradients[this.gradientIndex],
                "latField": 'lat',
                "lngField": 'lng',
                "valueField": 'count'
            },

            App.heatmap.layer = new HeatmapOverlay(this.config);
            
            App.map.addLayer(this.layer);

            this.tooltip = L.popup({autoPan:false});

            $('#sliRadius').val(this.radius);
            $('#txtRadius').html(this.radius);
            $('#sliMaxVal').val(this.maxVal);
            $('#txtMaxVal').html(this.maxVal);
            $('#sliResolution').val(this.resolution);
            $('#txtResolution').html(this.resolution);
            $('#sliMaxOpacity').val(this.maxOpacity);
            $('#txtMaxOpacity').html(this.maxOpacity);
            $('#sliMinOpacity').val(this.minOpacity);
            $('#txtMinOpacity').html(this.minOpacity);
            $('#sliBlur').val(this.blur);
            $('#txtBlur').html(this.blur);

            $('#sliRadius').on('input change', function () {
                $('#txtRadius').html($(this).val());
                App.heatmap.radius = $(this).val();
                App.heatmap._reconfigure();
            });

            $('#sliMaxVal').on('input change', function () {
                $('#txtMaxVal').html($(this).val());
                App.heatmap.pngdata.max = parseFloat($(this).val());
                App.heatmap._reconfigure();
            });

            $('#sliBlur').on('input change', function () {
                $('#txtBlur').html($(this).val());
                App.heatmap.blur = parseFloat($(this).val());
                App.heatmap._reconfigure();
            });

            $('#sliResolution').on('input change', function () {
                $('#txtResolution').html($(this).val());
                App.heatmap.resolution = parseInt($(this).val());
                App.heatmap.render();
            });

            $('#sliMaxOpacity').on('input change', function () {
                $('#txtMaxOpacity').html($(this).val());
                App.heatmap.maxOpacity = parseFloat($(this).val());
                App.heatmap._reconfigure();
            });

            $('#sliMinOpacity').on('input change', function () {
                $('#txtMinOpacity').html($(this).val());
                App.heatmap.minOpacity = parseFloat($(this).val());
                App.heatmap._reconfigure();
            });

            $('#chkLocalExtrema').on('change', function () {


            });

            $('#chkHeatTip').on('change', function () {
                //if ($(this).hasAttr('checked')){
                    App.heatmap.heattip_enabled = $(this).is(':checked');
                    
                    if(App.heatmap.heattip_enabled){

                    $(map).on('mousemove.heat', function(e){

                        var containerPoint = map.mouseEventToContainerPoint(event)
                        //console.log(containerPoint);
                        var value=App.heatmap.layer._heatmap.getValueAt({x:containerPoint.x, y:containerPoint.y});  
                         if(value+''=='0'){
                             if(map.hasLayer(App.heatmap.tooltip)){
                             map.removeLayer(App.heatmap.tooltip);
                         }
                             return;
                         }
                        var latlng = map.mouseEventToLatLng(event);
                     App.heatmap.tooltip.setLatLng(latlng).setContent('<h3>'+value+'</h3>').update();
                       
                if(!map.hasLayer(App.heatmap.tooltip)){
                    map.addLayer(App.heatmap.tooltip);
                }

                    })

                }
                else
                {
                    $(map).off('mousemove.heat');
                }

            });

            $('body').on('input change', '.indrange', function() {
                var rast = $(this).attr('id').replace('sli', '');
                var val = parseFloat($(this).val());
                App.heatmap.rasterMultiplier[rast] = val;
                $('#lbl' + rast).html($(this).val());
                App.heatmap.render();
            });

            $('#btnGradient').on('click', function () {
                App.heatmap.gradientIndex += 1;
                if (App.heatmap.gradientIndex > 4) { App.heatmap.gradientIndex = 0; }
                App.heatmap._reconfigure();
            });

            //Attach behavior to future indicators
            $('body').on('change', '.indicator', function () {
                var id = $(this).attr('id').replace('chk', '');
                App.heatmap.sync(id, $(this).is(':checked'));

            });
        },

        // called when a heatmap layer that has already been added
        // to the heatmap is activated or deactivated.
        sync: function (id, active) {
           
            if (active == false) {
                $.each(this.curRasters, function(i, v) {
                    if (App.util.getLayerId(v.name) == id) {
                        App.heatmap.curRasters.splice(i, 1);
                        App.heatmap.render();
                        return false;
                    }
                });
            } else {
                var lyr = $.grep(config.layers, function (item) {
                    return App.util.getLayerId(item.name) == id;
                })[0];

                this.curRasters.push(lyr);

                this.render();
            }
        },

        _reconfigure: function () {

            map.removeLayer(this.layer);

            this.config = {
                "radius": this.radius,
                "maxOpacity": this.maxOpacity,
                "minOpacity": this.minOpacity,
                "blur": this.blur,
                "gradient": this.gradients[this.gradientIndex],
                "scaleRadius": true,
                "useLocalExtrema": true,
                "latField": 'lat',
                "lngField": 'lng',
                "valueField": 'count'
            };

            this.layer = new HeatmapOverlay(this.config);
            map.addLayer(this.layer);
            this.layer.setData({ max: this.maxval, data: this.pngdata });
        },

        render : function() {

            this.pngdata = [];

            if (App.heatmap.layer == null) {
                this._init();
            }

            if (this.curRasters.length == 0) {
                this.layer.setData({ max: 0, data: [] });
                App.map.removeLayer(this.layer);
                return;
            } else if (!map.hasLayer(this.layer)) {
                App.map.addLayer(this.layer);
            }
            
            var rManager = {};

            //group rasters by dimensions
            $.each(this.curRasters, function (i, v) {
                
                var id = App.util.getLayerId(v.name);
                
                if (typeof (v.width) != 'undefined') {
                    var dims = v.width + '_' + v.height;
                } else { //for geojson point-based heatmaps
                    
                    if (typeof(rManager['geojson']) != 'undefined') {
                        rManager.geojson.push(id);
                    } else {
                        rManager.geojson = { rasters: [id] };
                    };
                    return true;
                }

                //concatenated, stringified to code width and height to support 
                //grouping
                //for true rasters (eg. PNGs)
                if (typeof (rManager[dims]) != 'undefined') {
                    rManager[dims].rasters.push(id);
                }
                else {
                    var lng = parseFloat(v.upperLeft.split(',')[0]);
                    var lat = parseFloat(v.upperLeft.split(',')[1]);

                   rManager[dims] = { height: v.height, width: v.width, rasters: [id], nodata: v.nodata, ul: [lng, lat], step: v.step };
                }
            });

            for (var dims in rManager) {
                //combing point based heatmap
                if (dims == 'geojson') {
                    this._crush_geojson(rManager.geojson.rasters);
                } else {

                    this._crush(rManager[dims]);
                }
            }

            $('#sliMaxVal').val(this.maxval);
            $('#txtMaxVal').html(this.maxval);

            this.layer.setData({ max: this.maxval, data: this.pngdata });
        },

        _crush_geojson: function(colGeojson) {
            
            for (var id in colGeojson) {
                var features = App.heatmap.rasters[colGeojson[id]].features;
                var counter = 0;
                for (var point in features) {
                    if (counter % 10 == 0) {
                        this.pngdata.push({ lat: features[point].geometry.coordinates[1], lng: features[point].geometry.coordinates[0], count: 1 * this.rasterMultiplier[colGeojson[id]] });
                    }
                    counter += 1;
                }
            }
        },

        _crush: function (colRasters) {
            var curlng = colRasters.ul[0];
            var curlat = colRasters.ul[1];

            for (var x = 0; x < colRasters.width - this.resolution; x += this.resolution) {
                for (var y = 0; y < colRasters.height - this.resolution; y += this.resolution) {
                    var val = 0;

                    for (var r = 0; r < colRasters.rasters.length; r++) {

                        var tempval = this.rasters[colRasters.rasters[r]].getPixel(x, y)[1];
                        if (tempval > colRasters.nodata) {
                            val += tempval * this.rasterMultiplier[colRasters.rasters[r]];
                        }
                    }

                    if (val > colRasters.nodata && val < 255) {
                        if (val > this.maxval) { this.maxval = val; }
                        this.pngdata.push({ lng: curlng, lat: curlat, count: val });
                    }

                    curlat -= (colRasters.step * this.resolution);
                }
                curlng += (colRasters.step * this.resolution);
                curlat = colRasters.ul[1];
            }
        }
    },

    util: {

        comparator: function (a, b) {

            if (typeof (a.label) != 'undefined') {
                if (a.label < b.label) {
                    return -1;
                }
                if (a.label > b.label) {
                    return 1;
                }
                return 0;
            }

            if (isNumeric(a.value) && isNumeric(b.value)) {
                return a.value - b.value;
            }

            if (a.value < b.value) {
                return -1;
            }
            if (a.value > b.value) {
                return 1;
            }
            return 0;
        },

        removeLayer: function (id) {
            var layer = this.getLayerById(id);
            if (layer.type == 'heatmap') {
                App.heatmap.sync(id, false);
            } else {
                map.removeLayer(layer.mapLayer);
            }

            context.destroy('#li' + id, layer.context);

            $('#li' + id).remove();
            App.util.updateUrl();

            $('.img-block.active').each(function (index) {
                if ($(this).data('title') == layer.name) {
                    $(this).removeClass('active');
                }
            });

        },

        getLayerId: function (name) {
            //name need lots more here to make safe
            return name.replace(/[\s,\/\:\%\.\(\)\+]/g, '_');
        },

        getLayerById: function (id) {
            for (var layer in config.layers) {
                if (this.getLayerId(config.layers[layer].name) == id) {
                    return config.layers[layer];
                }
            }
            return null;
        },

        getLayerByName: function (name) {
            for (var layer in config.layers) {
                if (config.layers[layer].name == name) {
                    return config.layers[layer];
                }
            }
            return null;
        },

        getBasemapById: function (id) {
            for (var basemap in config.basemaps) {
                if (config.basemaps[basemap].name.replace(/\s/g, '_') == id) {
                    return config.basemaps[basemap];
                }
            }
            return null;
        },

        getRandomColor: function() {
            var letters = '0123456789ABCDEF'.split('');
            var color = '#';
            for (var i = 0; i < 6; i++ ) {
                color += letters[Math.floor(Math.random() * 16)];
            }
            return color;
        },

        export2CSV: function (data, quote) {
            var str = '';

            //construct head
            var f = data[Object.keys(data)[0]].feature.properties;
            var line = '';

            for (var value in f) {
                if (typeof (quote) !== undefined && quote == true) {
                    line += '"' + value.replace(/["]/g, '""').replace(/,/g, '') + '",';
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
                
                var line = '';
                for (var i = 0; i < array.length; i++) {
                    if (typeof (array[i]) == 'undefined') {
                        line += '"",';
                    }
                    if (typeof (array[i]) == 'string') {

                        if (typeof (quote) !== undefined && quote == true) {
                            line += '"' + array[i].replace(/"/g, '""').replace(/,/g, '') + '",';
                        } else {
                            line += array[i].replace(/"/g, '""').replace(/,/g, '') + ',';
                        }
                    } else {
                        line += array[i] + ',';
                    }
                }
                line = line.slice(0, -1).replace(/(\r\n|\n|\r)/gm,"");

                str += line + '\r\n';
            }
            return str;
        },

        export2GeoJSON: function (blob, options) {

        },

        sortHandler: function (e, ui) {
          //console.log('added to sorthandler');
            var dropped = ui.item;

            var trgid = dropped[0].id;
            var id = trgid.replace('li', '');
            if($('#chk'+id).is(':checked')){
                var layer = this.getLayerById(id);

                if (layer.type == App.LAYER_TYPES.GEOJSON || layer.type == App.LAYER_TYPES.SHAPEFILE) {

                  /* Enter Layer order z-index hell */
                  //Just bring any layers to the front that are above in the TOC after bringing this one to the front.

                  layer.mapLayer.addTo(map).bringToFront();
                  var other_layers = [];
                  $.each($('.legend-check'), function (i, v) {
                    var iid = $(v).prop('id').replace('chk', '');
                    if (iid != id) {
                      if ($(v).is(':checked')) {
                        other_layers.push(iid);
                      }
                    } else {
                      return false;
                    }
                  });
                  other_layers.reverse();
                  for (var l = 0; l < other_layers.length; l++) {
                    App.util.getLayerById(other_layers[l]).mapLayer.bringToFront();
                  }
                }
            }

            App.util.updateUrl();
        },

        dragHandler: function () {
            var dropbox = document.getElementById("map");
            dropbox.addEventListener("dragenter", dragenter, false);
            dropbox.addEventListener("dragover", dragover, false);
            dropbox.addEventListener("drop", drop, false);
            dropbox.addEventListener("dragleave", function () { map.scrollWheelZoom.enable(); }, false);
            function dragenter(e) {
                e.stopPropagation();
                e.preventDefault();
                map.scrollWheelZoom.disable();
            }

            function dragover(e) {
                e.stopPropagation();
                e.preventDefault();
            }

            function drop(e) {
                e.stopPropagation();
                e.preventDefault();
                map.scrollWheelZoom.enable();
                var dt = e.dataTransfer;
                var files = dt.files;

                var i = 0;
                var len = files.length;
                if (!len) { return }
                while (i < len) {
                    //we're going to assume zipped shapefile for the ever so brief moment.
                    reader = new FileReader();
                    reader.onload = function (e) {
                        var ext;
                        if (reader.readyState !== 2 || reader.error) {
                            return;
                        } else {
                            shp(reader.result).then(function (data) {
                                App.data.parse.geoJSON(data, { name: data.fileName, type: 'shapefile' });
                            });
                        }
                    }
                    // Load blob as Data URL
                    reader.readAsArrayBuffer(files[i]);
                    i++;
                }
            }
        },

        updateUrl: function () {
            //console.log(location.hash);
            var temp_hash = location.hash.split('/').slice(0,3).join('/');
            var _layers = [];
            $('.legend-check').each(function(i, v) {
                var id = $(v).prop('id').replace('chk', '');
                var layer = App.util.getLayerById(id);
                _layers.push(layer.name.replace(/\s/g,'-'));
            });

            location.hash = temp_hash+ '/'+_layers.join('/');
        }
    }
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

function isNumeric(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
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

function _(msg) {
    console.log(msg);
}

//document.load
$(function () {

    //Navigation Menu Slider
        $('#btnToggleAddData').on('click',function(e){
            e.preventDefault();
            $('body').toggleClass('nav-addDataExpanded');
            if($('body').hasClass('nav-addDataExpanded')){
                $('#maprow').animate({
                    'marginRight': "296px"
                  }, 400, function() {
                    // Animation complete.
                  });

                 $("img.lazy").lazyload({
                        effect: "fadeIn",
                        threshold:0,
                        container: $("#scrollWrapper"),
                        failurelimit:1000
                    });
           
                $('#btnToggleAddData').fadeOut(300,function(){$(this).html('&gt;&gt;').removeClass('btn-primary').addClass('btn-default').fadeIn(100)});
            }else{
                 $('#maprow').animate({
                    'marginRight': "0px"
                  }, 300, function() {
                    // Animation complete.
                  });
                 $('#btnToggleAddData').fadeOut(300,function(){$(this).html("<i class='glyphicon glyphicon-tasks' ></i> &nbsp;Add Layers").removeClass('btn-default').addClass('btn-primary').fadeIn(100)});
            }
        });

        $('#btnToggleLegend').on('click',function(e){
            e.preventDefault();
            $('body').toggleClass('nav-legendExpanded');
            if($('body').hasClass('nav-legendExpanded')){
                $('#maprow').animate({
                    'marginLeft': "255px"
                  }, 300, function() {
                    // Animation complete.
                  });
            $('#btnToggleLegend').fadeOut(300);
            } else {
                 $('#maprow').animate({
                    'marginLeft': "0px"
                  }, 300, function() {
                    // Animation complete.
                  });
                 $('#btnToggleLegend').fadeIn(100);
            }
        });

        $('#btnCloseLegend').on('click', function(){
            $('body').removeClass('nav-legendExpanded');
                $('#maprow').animate({
                    'marginLeft': "0px"
                  }, 300, function() {
                    // Animation complete.
                  });
                 $('#btnToggleLegend').fadeIn(100);
        });

    App.init();
});