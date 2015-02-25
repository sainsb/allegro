
var somethingChanged = false, fieldsChanged = [], config = { layers: [] }, curLayer = {};

$(function(){

    $('#scrollWrapper').css("height", ($(window).height() - 480));

    $(window).on("resize", function (e) {
        $('#scrollWrapper').css("height", ($(window).height() - 480));
    });

    $('.selectpicker').selectpicker();

    var deferreds = layersDialog.getDataSources();

    $.when.apply(null, deferreds).done(function () {
        if (location.hash != '' && location.hash != '#') {
            var name = location.hash.replace(/\-/g, ' ').replace('#', '');
            $('#leftNav > li').removeClass('active');
            $('#aEditLayers').addClass('active');

            var layer = getLayerByName(name);
            showLayerEditForm(layer);
        } else {
            $('#layerSelect').show();
            layersDialog.render();
        }
        });

    $('#aLayers').on('click', function(){
        if($('#layerEdit').is(':visible')){
            $('#layerEdit').fadeOut();
        }
        $('#layerSelect').fadeIn();
    })

    $('body').on('click','.btn-edit', function () {
        name = $(this).data('title');
        location.hash = name.replace(/\s/g,'-');
        $('#layerSelect').fadeOut();
        $('#leftNav > li').removeClass('active');
        $('#aEditLayers').addClass('active');
        window.scrollTo(0, 0);
        var layer = getLayerByName(name);
        showLayerEditForm(layer);
    });

    $('body').on('click','.btn-view', function () {
        name = $(this).data('title');
        window.location = '../#10/45.5222/-122.6521/'+name.replace(/\s/g, '-');
    });

    $('body').on('change','#layerTime input, select, textarea', function () {
        var fc = $(this).prop('id').replace("lyr", "");
        if(fieldsChanged.indexOf(fc) == -1){
            fieldsChanged.push(fc);
            
        }
        console.log(fieldsChanged);
        $('.btnSave').removeAttr('disabled');
     });

     $("body").on('click','.btnSave', function () {
        saveData();
    });

});

showLayerEditForm = function (layer) {
    curLayer = layer;
    $('#editbox').html(templates.layer({ layer: layer }));
    $('#layerEdit').fadeIn();
}

var layersDialog= {

        $grid: null,
        data_sources : [],
        categories : [],

        getDataSources : function() {
          var deferreds = [];

          //iterate data sources
          for (var i in data_sources) {
            deferreds.push(
              $.getJSON('../getLayersBySource/' + data_sources[i]).success(function (data) {
                config.layers.push.apply(config.layers, data);
              }));
          }
          return deferreds;
        },

        render: function () {
            this.$grid = $('#layers');

            for(var lyr in config.layers){
                var l = config.layers[lyr];
                var thumb = (typeof(l.thumb)=='undefined') ? 'img/placeholder.png': l.thumb;

                //var theme = (typeof(l.theme)=='undefined') ? "" : l.theme;

                var $div = $('<div class="layer img-block col-xs-6 col-sm-4" data-groups=\'["'+l.theme+'"]\' data-title=\'["'+l.name+'"]\' data-theme=\'["'+l.theme+'"]\' data-source=\'["'+l.source+'"]\'"><img width="82" height="62" class="lazy" data-original="'+thumb+'"/>'+l.name+'<br/><span style="font-size:11px;"><b>Source: </b>'+l.source+'<br/><b>Category: </b>'+l.theme+'<b></span><br/><button class="btn btn-default btn-xs btn-edit" style="margin-top:5px;" data-title="'+l.name+'"><i class="glyphicon glyphicon-pencil"></i> Edit</button>&nbsp;&nbsp;<button class="btn btn-default btn-xs btn-view" style="margin-top:5px;" data-title="'+l.name+'"><i class="glyphicon glyphicon-play"></i> View</button></div>');

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

            this.$grid.on('done.shuffle', function(){
                  setTimeout(function(){
                    $("img.lazy").lazyload({
                    effect: "fadeIn",
                    threshold:0,
                    container: $("#scrollWrapper"),
                    failurelimit:1});
               },1000);
            })

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
              layersDialog.$grid.shuffle('sort', opts);
               setTimeout(function(){
                   $("img.lazy").lazyload('update');
                   },500);
            });

            $('#txtLayerFilter').keyup($.debounce(250, function() {
                var val = $(this).val().toLowerCase();
                layersDialog.$grid.shuffle('shuffle', function($el, shuffle) {

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
                layersDialog.$grid.shuffle('shuffle', function($el, shuffle) {
                   
                  return $el.data('theme').indexOf(val) != -1;
                });
                setTimeout(function(){
                $("img.lazy").lazyload('update');
                },500);
            });

            $('#selDataSources').on('change', function(){
                var val = $(this).val();
                layersDialog.$grid.shuffle('shuffle', function($el, shuffle) {
                  return $el.data('source').indexOf(val) != -1;
                });
                setTimeout(function(){
                $("img.lazy").lazyload('update');
                },500);
            });

            $('#selCategories').selectpicker('refresh');
            $('#selDataSources').selectpicker('refresh');
            // console.log('b time');
            this.attachEventHandler();

        },

        attachEventHandler: function () {
            //Attach behavior to items in Add Data Modal
            
        }
    }

function saveData(layer) {
    for (var t in fieldsChanged) {

        var value = null;
        if (['clickable','simplify', 'proxy', 'token'].indexOf(fieldsChanged[t]) != -1)
        {
           value = $('#lyr' + fieldsChanged[t]).is(':checked');
        }else{
            value = $('#lyr' + fieldsChanged[t]).val();
        }

        curLayer[fieldsChanged[t]] = value;
    }
    console.log(JSON.stringify(curLayer));
    var id = location.hash.replace('#','').replace(/\-/g,' ');
    $.post('../putLayerByName/'+id, "layer="+JSON.stringify(curLayer), function (data) {
        console.log(data);
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

getLayerByName= function (name) {
    for (var layer in config.layers) {
        if (config.layers[layer].name == name) {
            return config.layers[layer];
        }
    }
    return null;
}