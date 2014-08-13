config.basemaps = [
    {
        'name': 'Metro Basemap',
        'url': '//{s}.oregonmetro.gov/ArcGIS/rest/services/metromap/baseAll/MapServer/tile/{z}/{y}/{x}/',
        'type': 'composite',
        'thumb': 'img/metro_base.jpg',
        'source': 'Metro',
        'theme': 'Roads and Landscape',
        'requireToken': true,
        'subdomains': ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4']
    },
    {
        'name': '2013 Air Photos',
        'url': '//{s}.oregonmetro.gov/ArcGIS/rest/services/photo/2013aerialphoto/MapServer/tile/{z}/{y}/{x}/',
        'type': 'photo',
        'thumb': 'img/photo2013.png',
        'source': 'Metro',
        'maxZoom': 20,
        'theme': 'Air Photo',
        'requireToken': true,
        'subdomains': ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4']
    },
      {
          'name': '2012 Air Photos',
          'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2012aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
          'type': 'photo',
          'thumb': 'img/photo2012.jpg',
          'source': 'Metro',
          'maxZoom': 20,
          'theme': 'Air Photo',
          'requireToken': true,
          'subdomains': ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4']
      },
        {
            'name': '2011 Air Photos',
            'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2011aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
            'type': 'photo',
            'thumb': 'img/photo2011.jpg',
            'source': 'Metro',
            'theme': 'Air Photo',
            'requireToken': true,
            'subdomains': ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4']
        },
          {
              'name': '2010 Air Photos',
              'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2010aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
              'type': 'photo',
              'thumb': 'img/photo2010.jpg',
              'source': 'Metro',
              'theme': 'Air Photo',
              'requireToken': true,
              'subdomains': ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4']
          },
        {
            'name': '2009 Air Photos',
            'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2009aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
            'type': 'photo',
            'thumb': 'img/photo2009.jpg',
            'source': 'Metro',
            'theme': 'Air Photo',
            'requireToken': true,
            'subdomains': ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4']
        },
            {
                'name': '2008 Air Photos',
                'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2008aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
                'type': 'photo',
                'thumb': 'img/photo2008.jpg',
                'source': 'Metro',
                'theme': 'Air Photo',
                'requireToken': true,
                'subdomains': ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4']
            },
            {
                'name': '2007 Air Photos',
                'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2007aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
                'type': 'photo',
                'thumb': 'img/photo2013.png',
                'source': 'Metro',
                'theme': 'Air Photo',
                'requireToken': true,
                'subdomains': ['gistiles1', 'gistiles2', 'gistiles3', 'gistiles4']
            },

            {
                'name': 'Gray Scale',
                'url': '//server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}',
                'type': 'basemap',
                'active': true,
                'thumb': 'img/esriGray.png',
                'icon': 'img/esri_logo.png',
                'source': 'ESRI',
                'theme': 'Roads and Landscape'
            },
        {
            'name': 'Open Street Map',
            'url': 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
            'type': 'basemap',
            'thumb': 'img/esriGray.png',
            'icon': 'img/esri_logo.png',
            'source': 'OSM',
            'theme': 'Roads and Landscape'
        }
];