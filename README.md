allegro
=======

Ultralight GIS-style web mapping.  Thanks to advances in javascript like [Calvin Metcalf's shapefile-js](https://github.com/calvinmetcalf/shapefile-js) and [Makina Corpus' Layer Index](http://makinacorpus.github.io/Leaflet.LayerIndex/) , spectacular GIS things can happen in the browser.

Allegro consumes static shapefiles living in, on, and occasionally under the interwebs.  CORS data providers are especially welcome to play, others (FTP support too) must go via proxy (yes, there's a .NET proxy in there) (hail spawn of Satan).  By virtue of passing through the application, data is converted to geojson and made available for download as such.  View tables, resymbolize with single symbol, unique value and class breaks renderers, adjust opacity of fill and stroke and thickness/color of stroke.  Highly configurable using config.json files (see examples).

Project uses jQuery, Leaflet and a few choice plugins, Bootstrap 3 and a few plugins, Mustache, colorbrewer, jquery lazyload and... I think that's about it.

Layer object:

* name - String, Plain text name (can be id unfriendly)
* url - String, URL to shapefile on interwebs
* type - String Enum, Currently accepting: (shapefile|geojson|tilejson|tilelayer)
* thumb - String, URL to thumbnail of data
* popupTemplate - String, mustache template for popup
* symbolField - String, Field to initially symbolize the data on
* source - String, Datasource name
* metadataUrl - String, URL to metadata
* clickable - Bool, Whether or not to attach a popup to the layer
* icon - String, URL to an icon for the datasource name (only need this for the first instance of a dataset from a datasource)
* theme - String, A sub-categorizer/grouper for datasets under the datasource
* level - Int, A stylistic promotion for popular datasets.  Currently only accepting 1 level of promotion (indicated by level:2)
* zIndex - Int, for tilejson or tilelayer layers
* legend - legend object (see below)
* requireToken - Bool, I <3 ArcGIS Server
* style - style object

Legend object:

* type - String Enum, 'uniqueValue', 'classBreaks', or leave out for 'single'
* symbols - Array of symbol

Symbol object

* value - value in the shapefile (dbf) to symbolize on
* fillColor - fill color of feature
* color - Stroke color of feature
* weight - Weight of stroke
* 

Style object




