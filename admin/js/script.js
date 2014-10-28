

    var somethingChanged = false;
    var fieldsChanged = [];

    var config = {layers :[]};

$(function(){

      var deferreds = layersDialog.getDataSources();

        $.when.apply(null, deferreds).done(function () {
          layersDialog.render();
        });

    $('body').on('click', '.mute.edit', function() {
            //alert('yaytime');
        console.log($(this).prop('id'));
        //hide
        $('#layerSelect').fadeOut();
        $('#editbox').html(templates['layer']());
        $('#layerEdit').fadeIn();
        });

    $('body').on('change','#layerTime input,select', function () {
        
         var fc = $(this).prop('id').toLowerCase().replace("lyr", "");
         fieldsChanged.push(fc);
         console.log(fc);
         $('.btnSave').removeAttr('disabled');
     });

     $(".btnSave").on('click', function () {
         saveData();
     });

});
    
var layersDialog= {

        /* We keep track of this in order to apply the active class to the first tab */
        madeFirstTab: false,

        /* DOM object for the <ul> element that contains the tabs */
        $ulSourceTabs: null,

        getDataSources : function() {
          var deferreds = [];

          //iterate data sources
          for (var i in data_sources) {
            deferreds.push(
              $.getJSON('../getLayersBySource/' + data_sources[i]).success(function (data) {
                //console.log(data);
                config.layers.push.apply(config.layers, data);
              }));
          }
          return deferreds;
        },

        /* Render the entire layer tabs collection */
        render: function () {
            this.$ulSourceTabs = $('#ulSourceTabs');

            for (var _layer in config.layers) {

                var layer = config.layers[_layer];

                //If the layers source tab doesn't exist, create it.
                var source = layer.source.replace(/\s/g, '_');

                if (!$('#' + source).length) {
                    this.renderSourceTab(layer.source, layer.icon);
                }

                //If the layers theme section doesn't exist in the source tab content,
                //create it.
                var theme = (typeof layer.theme == 'undefined') ? '' : layer.theme.replace(/\s/g, '_');

                if (!$('#' + source + '_' + theme).length) {
                    $('#' + source).append('<div style="clear:both;" id="' + source + '_' + theme + '"><h4 style="margin:0;">' + layer.theme + '</h4><hr style="margin:0;padding:0;"/></div');
                }

                var elem = this.renderLayerElement(layer);

                $('#' + source + '_' + theme).append(elem);
            }

            ////Put the custom tab at the end.
            //this.$ulSourceTabs.append('  <li><a href="#customData" data-toggle="tab"><i class="fa fa-check-circle-o"></i>&nbsp;Custom</a></li>')

            //this.$ulSourceTabs.next().append("<div class='tab-pane fade' id='customData'>Data Source: &nbsp; <select class='selectpicker' id='selCustomData' data-style='btn-default' data-width='180'><option value='0'>GeoJSON</option><option value='1'>ArcGIS Server</option><option value='2'>Tile Layer</option><option value='3'>Shapefile</option><option value='4'>CSV</option></select></div>");

          //$('#ulSourceTabs > li > a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
            $("img.lazy").lazyload({
              //effect: "fadeIn",
              container: $(".tab-content")
            });
            $('#ulSourceTabs > li > a[data-toggle="tab"]').on('shown.bs.tab', function(e) {
                $("img.lazy").lazyload({
                    //effect: "fadeIn",
                    container: $(".tab-content")
                });
          });
        },

     

        /* Render a tab for a given source 
        returns:: @void; appends source tab to ulSourceTabs
        */
        renderSourceTab: function (source, icon) {

            var safe_source = source.replace(/\s/g, '_');

            var sourceTabString = '<li ';

            if (!this.madeFirstTab) {
                sourceTabString += 'class="active"';
            }

            //Get out your hatchets@!!!
            //if (source == 'OSDL') {
              sourceTabString += '><a href="#' + safe_source + '" style="padding-top:4px;padding-bottom:12px;" data-toggle="tab">';
            //} else {
            //  sourceTabString += '><a href="#' + safe_source + '" data-toggle="tab">';
            //}

            if (typeof (icon) != 'undefined') {
                  sourceTabString += '<img src="' + icon + '" align="left" />&nbsp;';
              } else {
                  sourceTabString += '<i class="fa fa-check-circle-o"></i>&nbsp;';
              }

            if (source != 'OSDL') {
              sourceTabString += source;
            }

            sourceTabString += '</a></li>';

              this.$ulSourceTabs.append(sourceTabString);

              var tabstring = '<div class="tab-pane fade ';

              if (!this.madeFirstTab) {
                  tabstring += 'active in';
                  this.madeFirstTab = true;
              }

              tabstring += '" id="' + safe_source + '"></div>';

              this.$ulSourceTabs.next().append(tabstring);
        },

        /* Render individual data/layer item */
        renderLayerElement: function (layer) {

            var id = getLayerId(layer.name);

            if (typeof (layer.thumb) != 'undefined') {
                var thumb = layer.thumb;
            }
            else {
                var thumb = '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png';
            }

            var elem = "<div class='layer img-block '>";
            elem += "<div class='caption'>" + layer.name + "</div><img width='82' height='62'";
            elem += " class='lazy' data-original='" + thumb + "' alt='" + layer.name + "' id='img" + id + "' style='vertical-align:top;float:left;'/>&nbsp;<span class='mute edit' id='" + layer.name.replace(/\s/g, '-') + "' style='float:right;' alt='edit' title='edit'><i class='glyphicon glyphicon-edit'></i></span><br/><a class='mute' href='../#10/45.4115/-122.6569/" + layer.name.replace(/\s/g, '-') + "' style='float:right;' alt='view' title='view'><i class='glyphicon glyphicon-play'></i></a></div>";

            return elem;

        }
    }

function saveData() {
    for (var t in fieldsChanged) {
        var yu = $('#lyr' + toTitleCase(fieldsChanged[t])).val();
      
        layer[fieldsChanged[t]] = yu;
    }
    console.log(JSON.stringify(layer));

    $.post('../putLayerByName/City%20Limits', "layer="+JSON.stringify(layer), function (data) {

    });
}

function toTitleCase(str)
{
    return str.replace(/\w\S*/g, function(txt){return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();});
}

getLayerId= function (name) {
            //name need lots more here to make safe
            return name.replace(/[\s,\/\:\%\.\(\)\+]/g, '_');
        },

getLayerById= function (id) {
    for (var layer in config.layers) {
        if (getLayerId(config.layers[layer].name) == id) {
            return config.layers[layer];
        }
    }
    return null;
}