var config = {
    'token': 'jtJ3qevgR0oEBOZQVIrdF9nCWVlzEOnMqNi62askpes.',
    'basemaps': [
    {
        'name': 'Metro Basemap',
        'url': '//{s}.oregonmetro.gov/ArcGIS/rest/services/metromap/baseAll/MapServer/tile/{z}/{y}/{x}/',
        'type': 'composite',
        'thumb': 'img/metro_base.jpg',
        'source': 'Metro',
        'theme': 'Roads and Landscape',
        'requireToken':true
    },
    {
        'name': '2013 Air Photos',
        'url': '//{s}.oregonmetro.gov/ArcGIS/rest/services/photo/2013aerialphoto/MapServer/tile/{z}/{y}/{x}/',
        'type': 'photo',
        'thumb': 'img/photo2013.png',
        'source': 'Metro',
        'theme': 'Air Photo',
        'requireToken': true
    },
      {
          'name': '2012 Air Photos',
          'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2012aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
          'type': 'photo',
          'thumb': 'img/photo2012.jpg',
          'source': 'Metro',
          'maxZoom': 20,
          'theme': 'Air Photo',
          'requireToken': true
      },
        {
            'name': '2011 Air Photos',
            'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2011aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
            'type': 'photo',
            'thumb': 'img/photo2011.jpg',
            'source': 'Metro',
            'theme': 'Air Photo',
            'requireToken': true
        },
          {
              'name': '2010 Air Photos',
              'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2010aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
              'type': 'photo',
              'thumb': 'img/photo2010.jpg',
              'source': 'Metro',
              'theme': 'Air Photo',
              'requireToken': true
          },
        {
            'name': '2009 Air Photos',
            'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2009aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
            'type': 'photo',
            'thumb': 'img/photo2009.jpg',
            'source': 'Metro',
            'theme': 'Air Photo',
            'requireToken': true
        },
            {
                'name': '2008 Air Photos',
                'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2008aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
                'type': 'photo',
                'thumb': 'img/photo2008.jpg',
                'source': 'Metro',
                'theme': 'Air Photo',
                'requireToken': true
            },
            {
                'name': '2007 Air Photos',
                'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2007aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
                'type': 'photo',
                'thumb': 'img/photo2013.png',
                'source': 'Metro',
                'theme': 'Air Photo',
                'requireToken': true
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
        {'name': 'Open Street Map',
'url': 'http://a.tile.openstreetmap.org/{z}/{x}/{y}.png',
'type': 'basemap',
                'thumb': 'img/esriGray.png',
                'icon': 'img/esri_logo.png',
                'source': 'OSM',
                'theme': 'Roads and Landscape'
    }
    ],
    'layers': [
            {
                'name': 'City Limits',
                'url': '//library.oregonmetro.gov/rlisdiscovery/cty_fill.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/cty_fill.png',
                'symbolField': 'CITYNAME',
                'source': 'RLIS',
                'icon' : './img/metro_logo.png',
                'theme': 'Boundary',
                'level':2
            },
            {
                'name': 'Metro Council Districts 1979 to 1981',
                'url': '//library.oregonmetro.gov/rlisdiscovery/council1979.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme': 'Boundary'
            },
            {
                'name': 'Metro Council Districts 1982 to 1992',
                'url': '//library.oregonmetro.gov/rlisdiscovery/council1982.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme': 'Boundary'
            },{
                'name': 'Metro Council Districts 1993 to 1994',
                'url': '//library.oregonmetro.gov/rlisdiscovery/council1993.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme': 'Boundary'
            },{
                'name': 'Metro Council Districts 1995 to 2002',
                'url': '//library.oregonmetro.gov/rlisdiscovery/council1995.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme': 'Boundary',
                "legend": {
                    "type":"uniqueValue",
                    "symbols": [
                        {
                            "value": 1,
                            "fillColor": "#CEEC3B"
                        },
                        {
                            "value": 2,
                            "fillColor": "#41973A"
                        },
                        {
                            "value": 3,
                            "fillColor": "#276A95"
                        },
                        {
                            "value": 4,
                            "fillColor": "#FFC526"
                        },
                        {
                            "value": 5,
                            "fillCcolor": "#FC8C58"
                        },
                        {
                            "value": 6,
                            "fillColor": "#D63E50"
                        },
                        {
                            "value": 7,
                            "fillColor": "#61A19A"
                        }
                    ]
                },
            },{
                'name': 'Metro Council Districts 2003 to 2012',
                'url': '//library.oregonmetro.gov/rlisdiscovery/council2003.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme': 'Boundary'
            },{
                'name': 'Metro Council Districts',
                'url': '//library.oregonmetro.gov/rlisdiscovery/council.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme': 'Boundary',
                'level':2
            },{
                'name': 'Counties',
                'url': '//library.oregonmetro.gov/rlisdiscovery/co_fill.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/co_fill.png',
                'symbolField': 'COUNTY',
                'source': 'RLIS',
                'theme': 'Boundary'
            },{
                'name': 'County Line',
                'url': '//library.oregonmetro.gov/rlisdiscovery/co_line.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/co_line.png',
                'source': 'RLIS',
                'theme': 'Boundary',
                "style": {
                    'stroke': true,
                    'weight': 2,
                    'opacity': 1,
                    'dashArray': '2,5',
                    'color': '#999',
                    'lineCap': 'round',
                    'lineJoin': 'round'
                },
                'clickable': false
            },{
                'name': 'Fire District',
                'url': '//library.oregonmetro.gov/rlisdiscovery/fire_dst.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/fire_dst.png',
                'symbolField': 'FIRE_DIST',
                'source': 'RLIS',
                'theme': 'Boundary'
            },{
                'name': 'Fire District Tile Layer',
                'url': '//gis.oregonmetro.gov/services/Boundary/fireDistricts/tilejson',
                'type': 'tilejson',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/fire_dst.png',
                'source': 'RLIS',
                'theme': 'Boundary'
            },
            {
                'name': 'Garbage Haulers',
                'url': '//library.oregonmetro.gov/rlisdiscovery/hauler.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/hauler.png',
                'source': 'RLIS',
                'theme': 'Boundary',
                'symbolField': 'HN',
                'level':2,
                'style': {
                    'stroke': true,
                    'weight': 3,
                    'fillOpacity': 0,
                    'opacity': 1,
                    'color': '#1C846E',
                    'lineCap': 'round',
                    'lineJoin': 'round'
                }
            },{
                'name': 'Metro Boundary',
                'url': '//library.oregonmetro.gov/rlisdiscovery/metro.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/metro.png',
                'source': 'RLIS',
                'theme': 'Boundary',
                'level': 2,
                'style': {
                    'stroke': true,
                    'weight': 3,
                    'fillOpacity': 0,
                    'opacity': 1,
                    'color': '#003D76',
                    'lineCap': 'round',
                    'lineJoin': 'round'
                }
            },{
                'name': 'Neighborhoods Tile Layer',
                'url': '//gis.oregonmetro.gov/services/Boundary/neighborhoods/tilejson',
                'type': 'tilejson',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/nbo_hood.png',
                'source': 'RLIS',
                'theme': 'Boundary'
            }, {
                'name': 'Neighborhoods',
                'url': '//library.oregonmetro.gov/rlisdiscovery/nbo_hood.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/nbo_hood.png',
                'source': 'RLIS',
                'theme': 'Boundary'
            }, {
                'name': 'Park District',
                'url': '//library.oregonmetro.gov/rlisdiscovery/park_dst.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/park_dst.png',
                'symbolField': 'PARK_DIST',
                'source': 'RLIS',
                'theme': 'Boundary'
            },{
                'name': 'School Districts',
                'url': '//library.oregonmetro.gov/rlisdiscovery/school_district.zip',
                'type': 'shapefile',
                'symbolField': 'DISTNAME',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/school_district.png',
                'source': 'RLIS',
                'theme': 'Boundary'
            },{
                'name': 'School Districts Tile Layer',
                'url': '//gis.oregonmetro.gov/services/Boundary/schoolDistricts/tilejson',
                'type': 'tilejson',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/school_district.png',
                'source': 'RLIS',
                'theme': 'Boundary'
            },{
                'name': 'Sewer District',
                'url': '//library.oregonmetro.gov/rlisdiscovery/sewerdst.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/sewerdst.png',
                'symbolField': 'SEWER_DIST',
                'source': 'RLIS',
                'theme': 'Boundary'
            }, {
                'name': 'Sewer District Tile Layer',
                'url': '//gis.oregonmetro.gov/services/Boundary/sewerDistricts/tilejson',
                'type': 'tilejson',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/sewerdst.png',
                'source': 'RLIS',
                'theme': 'Boundary'
            }, {
                'name': 'Transit District',
                'url': '//library.oregonmetro.gov/rlisdiscovery/transit_district.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/transit_district.png',
                'symbolField': 'TRAN_DIST',
                'source': 'RLIS',
                'theme': 'Boundary'
            },{
                'name': 'Urban Growth Boundary',
                'url': '//library.oregonmetro.gov/rlisdiscovery/ugb.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/ugb.png',
                'source': 'RLIS',
                'theme': 'Boundary',
                'level':2,
                'style': {
                    'stroke': true,
                    'weight': 3,
                    'fillOpacity': 0,
                    'opacity': 1,
                    'color': '#BF3030',
                    'lineCap': 'round',
                    'lineJoin': 'round'
                }
            },{
                'name': 'Voter Precincts',
                'url': '//library.oregonmetro.gov/rlisdiscovery/precinct.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/precinct.png',
                'symbolField': 'PRECINCT',
                'source': 'RLIS',
                'theme': 'Boundary'
            },
            
            {
                'name': 'Voter Precincts Tiles',
                'url': '//gis.oregonmetro.gov/services/Boundary/voterPrecincts/tilejson',
                'type': 'tilejson',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/precinct.png',
                'source': 'RLIS',
                'theme': 'Boundary'
            },
            {
                'name': 'Water District',
                'url': '//library.oregonmetro.gov/rlisdiscovery/waterdst.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/waterdst.png',
                'symbolField': 'WATER_DIST',
                'source': 'RLIS',
                'theme': 'Boundary'
            },{
                'name': 'Zipcodes',
                'url': '//library.oregonmetro.gov/rlisdiscovery/zipcode.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/zipcode.png',
                'symbolField': 'ZIPCODE',
                'source': 'RLIS',
                'theme': 'Boundary',
                'level': 2,
            },
            {
                'name': 'Zipcodes Alt',
                'url': '//gis.oregonmetro.gov/services/Boundary/zipcodes/tilejson',
                'type': 'tilejson',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/zipcode.png',
                'source': 'RLIS',
                'theme': 'Boundary'
            },
            {
                'name': '2010 Census Tracts',
                'url': '//library.oregonmetro.gov/rlisdiscovery/tract2010.zip',
                'type': 'shapefile',
                'symbolField': 'TRACT',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/tract2010.png',
                'source': 'RLIS',
                'theme': 'Census',
                'level': 2,
            },
            {
                'name': '2010 Census Tracts Tiles',
                'url': '//gis.oregonmetro.gov/services/Census/censusTracts/tilejson',
                'type': 'tilejson',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/tract2010.png',
                'source': 'RLIS',
                'theme': 'Census'
            },
            {
                'name': '2000 Census Tracts',
                'url': '//library.oregonmetro.gov/rlisdiscovery/tract2000.zip',
                'type': 'shapefile',
                'symbolField': 'TRACT',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/tract.png',
                'source': 'RLIS',
                'theme': 'Census'
            },{
                'name': '2000 Census Block Groups',
                'url': '//library.oregonmetro.gov/rlisdiscovery/blockgrp2000.zip',
                'type': 'shapefile',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/blockgrp.png',
                'source': 'RLIS',
                'theme': 'Census'
            },
            {
                'name': '1990 Census Tracts',
                'url': '//library.oregonmetro.gov/rlisdiscovery/tract1990.zip',
                'type': 'shapefile',
                'symbolField': 'TRACT',
                'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/tract90.png',
                'source': 'RLIS',
                'theme': 'Census'
            },
             {
                 'name': '1980 Census Tracts',
                 'url': '//library.oregonmetro.gov/rlisdiscovery/tract1980.zip',
                 'type': 'shapefile',
                 'symbolField': 'TRACT',
                 'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/tract.png',
                 'source': 'RLIS',
                 'theme': 'Census'
             },
              {
                  'name': '1970 Census Tracts',
                  'url': '//library.oregonmetro.gov/rlisdiscovery/tract1970.zip',
                  'type': 'shapefile',
                  'symbolField': 'TRACT',
                  'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/tract.png',
                  'source': 'RLIS',
                  'theme': 'Census'
              },
              {
                  'name': '20 Districts',
                  'url': '//library.oregonmetro.gov/rlisdiscovery/district20.zip',
                  'type': 'shapefile',
                  'symbolField': 'DISTRICT',
                  'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/district20.png',
                  'source': 'RLIS',
                  'theme': 'Census',
                  'metadataUrl' :'http://rlisdiscovery.oregonmetro.gov/metadataviewer/display.cfm?meta_layer_id=2342'
              },
               {
                   'name': '2013 Vacant Lands',
                   'url': '//gis.oregonmetro.gov/services/Develop/vacantlands2013/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/vacant.png',
                   'source': 'RLIS',
                   'theme': 'Develop',
                   'level': 2,
               },
               {
                   'name': '2ft Contours',
                   'url': '//gis.oregonmetro.gov/services/Environment/2ftcontours/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/contours.png',
                   'source': 'RLIS',
                   'theme': 'Environment',
                   'level': 2,
               },
               {
                   'name': 'Slopes greater than 10 pct',
                   'url': '//gis.oregonmetro.gov/services/Environment/Slope10/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/slope_10.png',
                   'source': 'RLIS',
                   'theme': 'Environment'
               },
               {
                   'name': 'Slopes greater than 25 pct',
                   'url': '//gis.oregonmetro.gov/services/Environment/Slope25/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/slope_25.png',
                   'source': 'RLIS',
                   'theme': 'Environment'
               },
               {
                   'name': 'Soils',
                   'url': '//gis.oregonmetro.gov/services/Environment/soils/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/soils.png',
                   'source': 'RLIS',
                   'theme': 'Environment'
               },
               {
                   'name': 'Building Footprints',
                   'url': '//gis.oregonmetro.gov/services/Land/buildings/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/buildings.png',
                   'source': 'RLIS',
                   'theme': 'Land',
                   'level': 2,
               },{
                   'name': 'Multifamily Housing',
                    'url': '//gis.oregonmetro.gov/services/Land/multifamily/tilejson',
                    'type': 'tilejson',
                    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/multifamily_housing_invento.png',
                    'source': 'RLIS',
                    'theme': 'Land'
               },
               {
                   'name': 'ORCA Cemeteries',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_Cemeteries/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/orca.png',
                   'source': 'RLIS',
                   'theme': 'Land'
               },
               {
                   'name': 'ORCA Golf Courses',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_GolfCourses/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/orca.png',
                   'source': 'RLIS',
                   'theme': 'Land'
               },
               {
                   'name': 'ORCA HOAs',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_HOAs/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/orca.png',
                   'source': 'RLIS',
                   'theme': 'Land'
               },
               {
                   'name': 'ORCA Other',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_Other/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/orca.png',
                   'source': 'RLIS',
                   'theme': 'Land'
               },
               {
                   'name': 'ORCA Schools',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_Schools/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/orca.png',
                   'source': 'RLIS',
                   'theme': 'Land'
               },
               {
                   'name': 'ORCA Parks and Natural Areas',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_ParksAndNaturalAreas/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/orca.png',
                   'source': 'RLIS',
                   'theme': 'Land',
                   'level': 2,
               },
               {
                   'name': 'Zoning',
                   'url': '//gis.oregonmetro.gov/services/Land/Zoning/tilejson',
                   'type': 'tilejson',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/zoning.png',
                   'source': 'RLIS',
                   'theme': 'Land',
                   'zIndex': 70
               },
               {
                   'name': 'Airports',
                   'url': '//library.oregonmetro.gov/rlisdiscovery/airport.zip',
                   'type': 'shapefile',
                   'symbolField': 'NAME',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/airport.png',
                   'source': 'RLIS',
                   'theme': 'Places'
               },
               {
                   'name': 'City Halls',
                   'url': '//library.oregonmetro.gov/rlisdiscovery/cityhall.zip',
                   'type': 'shapefile',
                   'symbolField': 'CITY',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/cityhall.png',
                   'source': 'RLIS',
                   'theme': 'Places'
               },
               {
                   'name': 'Community Centers',
                   'url': '//library.oregonmetro.gov/rlisdiscovery/community_centers.zip',
                   'type': 'shapefile',
                   'symbolField': 'CITY',
                   'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/communitycenters.png',
                   'source': 'RLIS',
                   'theme': 'Places'
               },
                {
                    'name': 'Fire Stations',
                    'url': '//library.oregonmetro.gov/rlisdiscovery/fire_sta.zip',
                    'type': 'shapefile',
                    'symbolField': 'CITY',
                    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/fire_sta.png',
                    'source': 'RLIS',
                    'theme': 'Places'
                },
                 {
                     'name': 'Hospitals',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/hospital.zip',
                     'type': 'shapefile',
                     'symbolField': 'CITY',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/hospital.png',
                     'source': 'RLIS',
                     'theme': 'Places'
                 },
                 {
                     'name': 'Library',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/library.zip',
                     'type': 'shapefile',
                     'symbolField': 'CITY',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/library.png',
                     'source': 'RLIS',
                     'theme': 'Places'
                 },
                 {
                     'name': 'School Site',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/school_site.zip',
                     'type': 'shapefile',
                     'symbolField': 'SITE_NAME',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/school_site.png',
                     'source': 'RLIS',
                     'theme': 'Places',
                     'level':2
                 },
                 {
                     'name': 'Schools',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/schools.zip',
                     'type': 'shapefile',
                     'symbolField': 'NAME',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/schools.png',
                     'source': 'RLIS',
                     'theme': 'Places'
                 },
                 {
                     'name': 'Analysis Centers',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/analysis_centers.zip',
                     'type': 'shapefile',
                     'symbolField': 'NAME',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/analysis_centers.png',
                     'source': 'RLIS',
                     'theme': 'Planning'
                 },
                  {
                     'name': 'Concept Centers',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/concept_centers.zip',
                     'type': 'shapefile',
                     'symbolField': 'NAME',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/concept_centers.png',
                     'source': 'RLIS',
                     'theme': 'Planning'
                 }, {
                     'name': 'Concept Corridors',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/concept_corridors.zip',
                     'type': 'shapefile',
                     'symbolField': 'CORRIDOR',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/concept_corridors.png',
                     'source': 'RLIS',
                     'theme': 'Planning'
                 }, {
                     'name': 'Concept Main Streets',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/concept_main_streets.zip',
                     'type': 'shapefile',
                     'symbolField': 'MAINSTEET',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/concept_main_streets.png',
                     'source': 'RLIS',
                     'theme': 'Planning'
                 },
                 {
                     'name': 'Concept Station Communities',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/concept_station_communities.zip',
                     'type': 'shapefile',
                     'symbolField': 'STATION',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/concept_station_communities.png',
                     'source': 'RLIS',
                     'theme': 'Planning'
                 }, {
                     'name': 'Reserves',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/reserves.zip',
                     'type': 'shapefile',
                     'symbolField': 'TYPE',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/reserves.png',
                     'source': 'RLIS',
                     'theme': 'Planning',
                     'level': 2
                 }, {
                     'name': 'Title 13 Riparian',
                     'url': '//gis.oregonmetro.gov/services/NatureInNeighborhoods/riparianHabitat/tilejson',
                     'type': 'tilejson',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/title13_inventory.png',
                     'source': 'RLIS',
                     'theme': 'Planning',
                     'zIndex': 70
                 }, {
                     'name': 'Title 13 Upland',
                     'url': '//gis.oregonmetro.gov/services/NatureInNeighborhoods/uplandHabitat/tilejson',
                     'type': 'tilejson',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/title13_inventory.png',
                     'source': 'RLIS',
                     'theme': 'Planning',
                     'zIndex': 71
                 }, {
                     'name': 'Title 3 - Water Quality and Flood Mgt',
                     'url': '//gis.oregonmetro.gov/services/Planning/title3/tilejson',
                     'type': 'tilejson',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/title3.png',
                     'source': 'RLIS',
                     'theme': 'Planning',
                     'zIndex': 71
                 }, {
                     'name': 'Title 4 - Industrial and Employment Areas',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/title4.zip',
                     'type': 'shapefile',
                     'symbolField': 'PLAN',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/title4.png',
                     'source': 'RLIS',
                     'theme': 'Planning'
                 }, {
                     'name': 'UGB History',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/ugb_history.zip',
                     'type': 'shapefile',
                     'symbolField': 'YEAR',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/ugb_history.png',
                     'source': 'RLIS',
                     'theme': 'Planning'
                 },
                 {
                     'name': 'Major Arterials',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/maj_art.zip',
                     'type': 'shapefile',
                     'symbolField': 'TYPE',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/maj_art.png',
                     'source': 'RLIS',
                     'theme': 'Streets'
                 },
                 {
                     'name': 'Freeway',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/fwy.zip',
                     'type': 'shapefile',
                     'symbolField': 'FTYPE',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/fwy.png',
                     'source': 'RLIS',
                     'theme': 'Streets'
                 },
                 {
                     'name': 'Taxlots',
                     'url': '//gis.oregonmetro.gov/services/Taxlots/Taxlots/tilejson',
                     'type': 'tilejson',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/taxlots.png',
                     'source': 'RLIS',
                     'theme': 'Taxlots',
                     'zIndex': 71,
                     'requireToken': true,
                     'level': 2
                 }, {
                     'name': 'Townships',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/township.zip',
                     'type': 'shapefile',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/section.gif',
                     'source': 'RLIS',
                     'theme': 'Taxlots'
                 },
                 {
                     'name': 'Sections',
                     'url': '//gis.oregonmetro.gov/services/Taxlots/Sectionlines/tilejson',
                     'type': 'tilejson',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/section.gif',
                     'source': 'RLIS',
                     'theme': 'Taxlots',
                     'zIndex': 72
                 }, {
                     'name': 'Light Rail',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/lrt_line.zip',
                     'type': 'shapefile',
                     'symbolField': 'TYPE',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/lrt_line.png',
                     'source': 'RLIS',
                     'theme': 'Transit'
                 }, {
                     'name': 'Bike There',
                     'url': '//gis.oregonmetro.gov/arcgis/rest/services/transit/BikeThere2014/MapServer/tile/{z}/{y}/{x}/',
                     'type': 'tilelayer',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/bike_routes.png',
                     'source': 'RLIS',
                     'theme': 'Transit',
                     'level':2,
                     'requireToken': true
                 },
                                  {
                     'name': 'Light Rail Lines and Stops Tiles',
                     'url': '//gis.oregonmetro.gov/services/Transit/LRT/tilejson',
                     'type': 'tilejson',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/lrt_line.png',
                     'source': 'RLIS',
                     'theme': 'Transit',
                     'zIndex': 86
                 }, {
                     'name': 'Light Rail Stops',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/lrt_stop.zip',
                     'type': 'shapefile',
                     'symbolField': 'TYPE',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/lrt_stop.png',
                     'source': 'RLIS',
                     'theme': 'Transit'
                 }, {
                     'name': 'Park and Rides',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/parkride.zip',
                     'type': 'shapefile',
                     'symbolField': 'STATUS',
                     'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/parkride.png',
                     'source': 'RLIS',
                     'theme': 'Transit'
                 },
                  {
                      'name': 'Railroad',
                      'url': '//library.oregonmetro.gov/rlisdiscovery/railroad.zip',
                      'type': 'shapefile',
                      'symbolField': 'OWNER',
                      'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/railroad.png',
                      'source': 'RLIS',
                      'theme': 'Transit'
                  },
                  {
                      'name': 'Railyards',
                      'url': '//library.oregonmetro.gov/rlisdiscovery/railyards.zip',
                      'type': 'shapefile',
                      'symbolField': 'OWNER',
                      'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/railyards.png',
                      'source': 'RLIS',
                      'theme': 'Transit'
                  },
                  {
                      'name': 'Trails - Existing',
                      'url': '//gis.oregonmetro.gov/services/Transit/trailsExisting/tilejson',
                      'type': 'tilejson',
                      'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/trails.png',
                      'source': 'RLIS',
                      'theme': 'Transit',
                      'zIndex': 85,
                      'level': 2
                  },
                  {
                      'name': 'Transit Centers',
                      'url': '//library.oregonmetro.gov/rlisdiscovery/tran_cen.zip',
                      'type': 'shapefile',
                      'symbolField': 'NAME',
                      'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/tran_cen.png',
                      'source': 'RLIS',
                      'theme': 'Transit'
                  },
                   {
                       'name': '100 Yr Flood Plain',
                       'url': '//gis.oregonmetro.gov/services/water/floodPlain/tilejson',
                       'type': 'tilejson',
                       'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/flood96metro.png',
                       'source': 'RLIS',
                       'theme': 'Water',
                       'zIndex': 80,
                       'level': 2
                   },
                   {
                       'name': 'Wetlands',
                       'url': '//gis.oregonmetro.gov/services/water/wetlands/tilejson',
                       'type': 'tilejson',
                       'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/wetland.png',
                       'source': 'RLIS',
                       'theme': 'Water',
                       'zIndex': 75
                   }
    ]
}