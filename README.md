allegro
=======

The zero backend map app.  Thanks to advances in javascript like [Calvin Metcalf's shapefile-js](https://github.com/calvinmetcalf/shapefile-js) and [Makina Corpus' Layer Index](http://makinacorpus.github.io/Leaflet.LayerIndex/) , spectacular GIS things can happen in the browser.

Allegro consumes static shapefiles living in, on, and occasionally under the interwebs.  CORS data providers are especially welcome to play, others must go via proxy (yes, there's a .NET proxy in there) (hail spawn of Satan).  By virtue of passing through the application, data are converted to geojson and are, alternately, available for download as such. View tables, resymbolize with single symbol, unique value and class breaks renderers.  Highly configurable using config.json files (see examples).

Project uses jQuery, Leaflet+ a few choice plugins, Bootstrap 3+ a few plugins, Mustache, colorbrewer, jquery lazyload and... I think that's about it.



