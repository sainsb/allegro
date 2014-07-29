var config = {
    'token': 'GYJZSQrfbb8YrZ_RIn-64Kc1SpybpK4LpW4TenvGQmk.',
    'basemaps': [
    {
        'name': 'Metro Basemap',
        'url': '//{s}.oregonmetro.gov/ArcGIS/rest/services/metromap/baseAll/MapServer/tile/{z}/{y}/{x}/',
        'type': 'composite',
        'thumb': 'cty_fill.png',
        'source': 'Metro',
        'icon':'img/metro_logo.png',
        'theme': 'Roads and Landscape',
        'requireToken':true
    },
    {
        'name': '2013 Air Photos',
        'url': '//{s}.oregonmetro.gov/ArcGIS/rest/services/photo/2013aerialphoto/MapServer/tile/{z}/{y}/{x}/',
        'type': 'photo',
        'thumb': 'photo2013.png',
        'source': 'Metro',
        'theme': 'Air Photo',
        'requireToken': true
    },
      {
          'name': '2012 Air Photos',
          'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2012aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
          'type': 'photo',
          'thumb': 'photo2013.png',
          'source': 'Metro',
          'theme': 'Air Photo',
          'requireToken': true
      },
        {
            'name': '2011 Air Photos',
            'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2011aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
            'type': 'photo',
            'thumb': 'photo2013.png',
            'source': 'Metro',
            'theme': 'Air Photo',
            'requireToken': true
        },
          {
              'name': '2010 Air Photos',
              'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2010aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
              'type': 'photo',
              'thumb': 'photo2013.png',
              'source': 'Metro',
              'theme': 'Air Photo',
              'requireToken': true
          },
        {
            'name': '2009 Air Photos',
            'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2009aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
            'type': 'photo',
            'thumb': 'photo2013.png',
            'source': 'Metro',
            'theme': 'Air Photo',
            'requireToken': true
        },
            {
                'name': '2008 Air Photos',
                'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2008aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
                'type': 'photo',
                'thumb': 'photo2013.png',
                'source': 'Metro',
                'theme': 'Air Photo',
                'requireToken': true
            },
            {
                'name': '2007 Air Photos',
                'url': '//{s}.oregonmetro.gov/arcgis/rest/services/photo/2007aerialPhotoWebMerc/MapServer/tile/{z}/{y}/{x}/',
                'type': 'photo',
                'thumb': 'photo2013.png',
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
                'thumb': 'cty_fill.png',
                'symbolField': 'CITYNAME',
                'source': 'RLIS',
                'icon' : './img/metro_logo.png',
                'theme': 'boundary'
            },
            {
                'name': 'Metro Council Districts 1979 to 1981',
                'url': '//library.oregonmetro.gov/rlisdiscovery/council1979.zip',
                'type': 'shapefile',
                'thumb': 'council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme':'boundary'
            },
            {
                'name': 'Metro Council Districts 1982 to 1992',
                'url': '//library.oregonmetro.gov/rlisdiscovery/council1982.zip',
                'type': 'shapefile',
                'thumb': 'council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'Metro Council Districts 1993 to 1994',
                'url': '//library.oregonmetro.gov/rlisdiscovery/council1993.zip',
                'type': 'shapefile',
                'thumb': 'council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'Metro Council Districts 1995 to 2002',
                'url': '//library.oregonmetro.gov/rlisdiscovery/council1995.zip',
                'type': 'shapefile',
                'thumb': 'council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme':'boundary',
                "legend": {
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
                'thumb': 'council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'Metro Council Districts',
                'url': '//library.oregonmetro.gov/rlisdiscovery/council.zip',
                'type': 'shapefile',
                'thumb': 'council.png',
                "symbolField": "DISTRICT",
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'Counties',
                'url': '//library.oregonmetro.gov/rlisdiscovery/co_fill.zip',
                'type': 'shapefile',
                'thumb': 'co_fill.png',
                'symbolField': 'COUNTY',
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'County Line',
                'url': '//library.oregonmetro.gov/rlisdiscovery/co_line.zip',
                'type': 'shapefile',
                'thumb': 'co_line.png',
                'source': 'RLIS',
                'theme':'boundary',
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
                'thumb': 'fire_dst.png',
                'symbolField': 'FIRE_DIST',
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'Fire District Tile Layer',
                'url': '//gis.oregonmetro.gov/services/Boundary/fireDistricts/tilejson',
                'type': 'tilejson',
                'thumb': 'fire_dst.png',
                'source': 'RLIS',
                'theme': 'boundary'
            },
            {
                'name': 'Garbage Haulers',
                'url': '//library.oregonmetro.gov/rlisdiscovery/hauler.zip',
                'type': 'shapefile',
                'thumb': 'hauler.png',
                'source': 'RLIS',
                'theme': 'boundary',
                'symbolField':'HN',
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
                'thumb': 'metro.png',
                'source': 'RLIS',
                'theme':'boundary',
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
                'name': 'Neighborhoods',
                'url': '//gis.oregonmetro.gov/services/Boundary/neighborhoods/tilejson',
                'type': 'tilejson',
                'thumb': 'nbo_hood.png',
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'Park District',
                'url': '//library.oregonmetro.gov/rlisdiscovery/park_dst.zip',
                'type': 'shapefile',
                'thumb': 'park_dst.png',
                'symbolField': 'PARK_DIST',
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'School Districts',
                'url': '//library.oregonmetro.gov/rlisdiscovery/school_district.zip',
                'type': 'shapefile',
                'symbolField': 'DISTNAME',
                'thumb': 'school_district.png',
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'School Districts Tile Layer',
                'url': '//gis.oregonmetro.gov/services/Boundary/schoolDistricts/tilejson',
                'type': 'tilejson',
                'thumb': 'school_district.png',
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'Sewer District',
                'url': '//library.oregonmetro.gov/rlisdiscovery/sewerdst.zip',
                'type': 'shapefile',
                'thumb': 'sewerdst.png',
                'symbolField': 'SEWER_DIST',
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'Transit District',
                'url': '//library.oregonmetro.gov/rlisdiscovery/transit_district.zip',
                'type': 'shapefile',
                'thumb': 'transit_district.png',
                'symbolField': 'TRAN_DIST',
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'Urban Growth Boundary',
                'url': '//library.oregonmetro.gov/rlisdiscovery/ugb.zip',
                'type': 'shapefile',
                'thumb': 'ugb.png',
                'source': 'RLIS',
                'theme':'boundary',
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
                'thumb': 'precinct.png',
                'symbolField': 'PRECINCT',
                'source': 'RLIS',
                'theme':'boundary'
            },
            
            {
                'name': 'Voter Precincts Tiles',
                'url': '//gis.oregonmetro.gov/services/Boundary/voterPrecincts/tilejson',
                'type': 'tilejson',
                'thumb': 'precinct.png',
                'source': 'RLIS',
                'theme': 'boundary'
            },
            {
                'name': 'Water District',
                'url': '//library.oregonmetro.gov/rlisdiscovery/waterdst.zip',
                'type': 'shapefile',
                'thumb': 'waterdst.png',
                'symbolField': 'WATER_DIST',
                'source': 'RLIS',
                'theme':'boundary'
            },{
                'name': 'Zipcodes',
                'url': '//library.oregonmetro.gov/rlisdiscovery/zipcode.zip',
                'type': 'shapefile',
                'thumb': 'zipcode.png',
                'symbolField': 'ZIPCODE',
                'source': 'RLIS',
                'theme':'boundary'
            },
            {
                'name': 'Zipcodes Alt',
                'url': '//gis.oregonmetro.gov/services/Boundary/zipcodes/tilejson',
                'type': 'tilejson',
                'thumb': 'zipcode.png',
                'source': 'RLIS',
                'theme': 'boundary'
            },
            {
                'name': '2010 Census Tracts',
                'url': '//library.oregonmetro.gov/rlisdiscovery/tract2010.zip',
                'type': 'shapefile',
                'symbolField': 'TRACT',
                'thumb': 'tract2010.png',
                'source': 'RLIS',
                'theme': 'census'
            },
            {
                'name': '2010 Census Tracts Tiles',
                'url': '//gis.oregonmetro.gov/services/Census/censusTracts/tilejson',
                'type': 'tilejson',
                'thumb': 'tract2010.png',
                'source': 'RLIS',
                'theme': 'census'
            },
            {
                'name': '2000 Census Tracts',
                'url': '//library.oregonmetro.gov/rlisdiscovery/tract2000.zip',
                'type': 'shapefile',
                'symbolField': 'TRACT',
                'thumb': 'tract.png',
                'source': 'RLIS',
                'theme': 'census'
            },{
                'name': '2000 Census Block Groups',
                'url': '//library.oregonmetro.gov/rlisdiscovery/blockgrp2000.zip',
                'type': 'shapefile',
                'thumb': 'blockgrp.png',
                'source': 'RLIS',
                'theme': 'census'
            },
            {
                'name': '1990 Census Tracts',
                'url': '//library.oregonmetro.gov/rlisdiscovery/tract1990.zip',
                'type': 'shapefile',
                'symbolField': 'TRACT',
                'thumb': 'tract90.png',
                'source': 'RLIS',
                'theme': 'census'
            },
             {
                 'name': '1980 Census Tracts',
                 'url': '//library.oregonmetro.gov/rlisdiscovery/tract1980.zip',
                 'type': 'shapefile',
                 'symbolField': 'TRACT',
                 'thumb': 'tract.png',
                 'source': 'RLIS',
                 'theme': 'census'
             },
              {
                  'name': '1970 Census Tracts',
                  'url': '//library.oregonmetro.gov/rlisdiscovery/tract1970.zip',
                  'type': 'shapefile',
                  'symbolField': 'TRACT',
                  'thumb': 'tract.png',
                  'source': 'RLIS',
                  'theme': 'census'
              },
              {
                  'name': '20 Districts',
                  'url': '//library.oregonmetro.gov/rlisdiscovery/district20.zip',
                  'type': 'shapefile',
                  'symbolField': 'DISTRICT',
                  'thumb': 'district20.png',
                  'source': 'RLIS',
                  'theme': 'census',
                  'metadataUrl' :'http://rlisdiscovery.oregonmetro.gov/metadataviewer/display.cfm?meta_layer_id=2342'
              },
               {
                   'name': '2013 Vacant Lands',
                   'url': '//gis.oregonmetro.gov/services/Develop/vacantlands2013/tilejson',
                   'type': 'tilejson',
                   'thumb': 'vacant.png',
                   'source': 'RLIS',
                   'theme': 'develop'
               },
               {
                   'name': '2ft Contours',
                   'url': '//gis.oregonmetro.gov/services/Environment/2ftcontours/tilejson',
                   'type': 'tilejson',
                   'thumb': 'contours.png',
                   'source': 'RLIS',
                   'theme': 'environment'
               },
               {
                   'name': 'Slopes greater than 10 pct',
                   'url': '//gis.oregonmetro.gov/services/Environment/Slope10/tilejson',
                   'type': 'tilejson',
                   'thumb': 'slope_10.png',
                   'source': 'RLIS',
                   'theme': 'environment'
               },
               {
                   'name': 'Slopes greater than 25 pct',
                   'url': '//gis.oregonmetro.gov/services/Environment/Slope25/tilejson',
                   'type': 'tilejson',
                   'thumb': 'slope_25.png',
                   'source': 'RLIS',
                   'theme': 'environment'
               },
               {
                   'name': 'Soils',
                   'url': '//gis.oregonmetro.gov/services/Environment/soils/tilejson',
                   'type': 'tilejson',
                   'thumb': 'soils.png',
                   'source': 'RLIS',
                   'theme': 'environment'
               },
               {
                   'name': 'Building Footprints',
                   'url': '//gis.oregonmetro.gov/services/Land/buildings/tilejson',
                   'type': 'tilejson',
                   'thumb': 'buildings.png',
                   'source': 'RLIS',
                   'theme': 'land'
               },{
                   'name': 'Multifamily Housing',
                    'url': '//gis.oregonmetro.gov/services/Land/multifamily/tilejson',
                    'type': 'tilejson',
                    'thumb': 'multifamily_housing_invento.png',
                    'source': 'RLIS',
                    'theme': 'land'
               },
               {
                   'name': 'ORCA Cemeteries',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_Cemeteries/tilejson',
                   'type': 'tilejson',
                   'thumb': 'orca.png',
                   'source': 'RLIS',
                   'theme': 'land'
               },
               {
                   'name': 'ORCA Golf Courses',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_GolfCourses/tilejson',
                   'type': 'tilejson',
                   'thumb': 'orca.png',
                   'source': 'RLIS',
                   'theme': 'land'
               },
               {
                   'name': 'ORCA HOAs',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_HOAs/tilejson',
                   'type': 'tilejson',
                   'thumb': 'orca.png',
                   'source': 'RLIS',
                   'theme': 'land'
               },
               {
                   'name': 'ORCA Other',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_Other/tilejson',
                   'type': 'tilejson',
                   'thumb': 'orca.png',
                   'source': 'RLIS',
                   'theme': 'land'
               },
               {
                   'name': 'ORCA Schools',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_Schools/tilejson',
                   'type': 'tilejson',
                   'thumb': 'orca.png',
                   'source': 'RLIS',
                   'theme': 'land'
               },
               {
                   'name': 'ORCA Parks and Natural Areas',
                   'url': '//gis.oregonmetro.gov/services/Land/ORCA_ParksAndNaturalAreas/tilejson',
                   'type': 'tilejson',
                   'thumb': 'orca.png',
                   'source': 'RLIS',
                   'theme': 'land'
               },
               {
                   'name': 'Zoning',
                   'url': '//gis.oregonmetro.gov/services/Land/Zoning/tilejson',
                   'type': 'tilejson',
                   'thumb': 'zoning.png',
                   'source': 'RLIS',
                   'theme': 'land',
                   'zIndex': 70
               },
               {
                   'name': 'Airports',
                   'url': '//library.oregonmetro.gov/rlisdiscovery/airport.zip',
                   'type': 'shapefile',
                   'symbolField': 'NAME',
                   'thumb': 'airport.png',
                   'source': 'RLIS',
                   'theme': 'places'
               },
               {
                   'name': 'City Halls',
                   'url': '//library.oregonmetro.gov/rlisdiscovery/cityhall.zip',
                   'type': 'shapefile',
                   'symbolField': 'CITY',
                   'thumb': 'cityhall.png',
                   'source': 'RLIS',
                   'theme': 'places'
               },
               {
                   'name': 'Community Centers',
                   'url': '//library.oregonmetro.gov/rlisdiscovery/community_centers.zip',
                   'type': 'shapefile',
                   'symbolField': 'CITY',
                   'thumb': 'communitycenters.png',
                   'source': 'RLIS',
                   'theme': 'places'
               },
                {
                    'name': 'Fire Stations',
                    'url': '//library.oregonmetro.gov/rlisdiscovery/fire_sta.zip',
                    'type': 'shapefile',
                    'symbolField': 'CITY',
                    'thumb': 'fire_sta.png',
                    'source': 'RLIS',
                    'theme': 'places'
                },
                 {
                     'name': 'Hospitals',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/hospital.zip',
                     'type': 'shapefile',
                     'symbolField': 'CITY',
                     'thumb': 'hospital.png',
                     'source': 'RLIS',
                     'theme': 'places'
                 },
                 {
                     'name': 'Library',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/library.zip',
                     'type': 'shapefile',
                     'symbolField': 'CITY',
                     'thumb': 'library.png',
                     'source': 'RLIS',
                     'theme': 'places'
                 },
                 {
                     'name': 'School Site',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/school_site.zip',
                     'type': 'shapefile',
                     'symbolField': 'SITE_NAME',
                     'thumb': 'school_site.png',
                     'source': 'RLIS',
                     'theme': 'places'
                 },
                 {
                     'name': 'Schools',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/schools.zip',
                     'type': 'shapefile',
                     'symbolField': 'NAME',
                     'thumb': 'schools.png',
                     'source': 'RLIS',
                     'theme': 'places'
                 },
                 {
                     'name': 'Analysis Centers',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/analysis_centers.zip',
                     'type': 'shapefile',
                     'symbolField': 'NAME',
                     'thumb': 'analysis_centers.png',
                     'source': 'RLIS',
                     'theme': 'planning'
                 },
                  {
                     'name': 'Concept Centers',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/concept_centers.zip',
                     'type': 'shapefile',
                     'symbolField': 'NAME',
                     'thumb': 'concept_centers.png',
                     'source': 'RLIS',
                     'theme': 'planning'
                 }, {
                     'name': 'Concept Corridors',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/concept_corridors.zip',
                     'type': 'shapefile',
                     'symbolField': 'CORRIDOR',
                     'thumb': 'concept_corridors.png',
                     'source': 'RLIS',
                     'theme': 'planning'
                 }, {
                     'name': 'Concept Main Streets',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/concept_main_streets.zip',
                     'type': 'shapefile',
                     'symbolField': 'MAINSTEET',
                     'thumb': 'concept_main_streets.png',
                     'source': 'RLIS',
                     'theme': 'planning'
                 },
                 {
                     'name': 'Concept Station Communities',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/concept_station_communities.zip',
                     'type': 'shapefile',
                     'symbolField': 'STATION',
                     'thumb': 'concept_station_communities.png',
                     'source': 'RLIS',
                     'theme': 'planning'
                 }, {
                     'name': 'Reserves',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/reserves.zip',
                     'type': 'shapefile',
                     'symbolField': 'TYPE',
                     'thumb': 'reserves.png',
                     'source': 'RLIS',
                     'theme': 'planning'
                 }, {
                     'name': 'Title 13 Riparian',
                     'url': '//gis.oregonmetro.gov/services/NatureInNeighborhoods/riparianHabitat/tilejson',
                     'type': 'tilejson',
                     'thumb': 'title13_inventory.png',
                     'source': 'RLIS',
                     'theme': 'planning',
                     'zIndex': 70
                 }, {
                     'name': 'Title 13 Upland',
                     'url': '//gis.oregonmetro.gov/services/NatureInNeighborhoods/uplandHabitat/tilejson',
                     'type': 'tilejson',
                     'thumb': 'title13_inventory.png',
                     'source': 'RLIS',
                     'theme': 'planning',
                     'zIndex': 71
                 }, {
                     'name': 'Title 3 - Water Quality and Flood Mgt',
                     'url': '//gis.oregonmetro.gov/services/Planning/title3/tilejson',
                     'type': 'tilejson',
                     'thumb': 'title3.png',
                     'source': 'RLIS',
                     'theme': 'planning',
                     'zIndex': 71
                 }, {
                     'name': 'Title 4 - Industrial and Employment Areas',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/title4.zip',
                     'type': 'shapefile',
                     'symbolField': 'PLAN',
                     'thumb': 'title4.png',
                     'source': 'RLIS',
                     'theme': 'planning'
                 }, {
                     'name': 'UGB History',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/ugb_history.zip',
                     'type': 'shapefile',
                     'symbolField': 'YEAR',
                     'thumb': 'ugb_history.png',
                     'source': 'RLIS',
                     'theme': 'planning'
                 },
                 {
                     'name': 'Arterial',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/arterial.zip',
                     'type': 'shapefile',
                     'symbolField': 'TYPE',
                     'thumb': 'arterial.png',
                     'source': 'RLIS',
                     'theme': 'streets'
                 },
                 {
                     'name': 'Major Arterial',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/maj_art.zip',
                     'type': 'shapefile',
                     'symbolField': 'TYPE',
                     'thumb': 'maj_art.png',
                     'source': 'RLIS',
                     'theme': 'streets'
                 },
                 {
                     'name': 'Freeway',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/fwy.zip',
                     'type': 'shapefile',
                     'symbolField': 'FTYPE',
                     'thumb': 'fwy.png',
                     'source': 'RLIS',
                     'theme': 'streets'
                 },
                 {
                     'name': 'Taxlots',
                     'url': '//gis.oregonmetro.gov/services/Taxlots/Taxlots/tilejson',
                     'type': 'tilejson',
                     'thumb': 'taxlots.png',
                     'source': 'RLIS',
                     'theme': 'taxlots',
                     'zIndex': 71,
                     'requireToken': true
                 }, {
                     'name': 'Townships',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/township.zip',
                     'type': 'shapefile',
                     'thumb': 'section.gif',
                     'source': 'RLIS',
                     'theme': 'taxlots'
                 },
                 {
                     'name': 'Sections',
                     'url': '//gis.oregonmetro.gov/services/Taxlots/Sectionlines/tilejson',
                     'type': 'tilejson',
                     'thumb': 'section.gif',
                     'source': 'RLIS',
                     'theme': 'taxlots',
                     'zIndex': 72
                 }, {
                     'name': 'Light Rail',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/lrt_line.zip',
                     'type': 'shapefile',
                     'symbolField': 'TYPE',
                     'thumb': 'lrt_line.png',
                     'source': 'RLIS',
                     'theme': 'transit'
                 }, {
                     'name': 'Light Rail Lines and Stops Tiles',
                     'url': '//gis.oregonmetro.gov/services/Transit/LRT/tilejson',
                     'type': 'tilejson',
                     'thumb': 'lrt_line.png',
                     'source': 'RLIS',
                     'theme': 'transit',
                     'zIndex': 85
                 }, {
                     'name': 'Light Rail Stops',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/lrt_stop.zip',
                     'type': 'shapefile',
                     'symbolField': 'TYPE',
                     'thumb': 'lrt_stop.png',
                     'source': 'RLIS',
                     'theme': 'transit'
                 }, {
                     'name': 'Park and Rides',
                     'url': '//library.oregonmetro.gov/rlisdiscovery/parkride.zip',
                     'type': 'shapefile',
                     'symbolField': 'STATUS',
                     'thumb': 'parkride.png',
                     'source': 'RLIS',
                     'theme': 'transit'
                 },
                  {
                      'name': 'Railroad',
                      'url': '//library.oregonmetro.gov/rlisdiscovery/railroad.zip',
                      'type': 'shapefile',
                      'symbolField': 'OWNER',
                      'thumb': 'railroad.png',
                      'source': 'RLIS',
                      'theme': 'transit'
                  },
                  {
                      'name': 'Railyards',
                      'url': '//library.oregonmetro.gov/rlisdiscovery/railyards.zip',
                      'type': 'shapefile',
                      'symbolField': 'OWNER',
                      'thumb': 'railyards.png',
                      'source': 'RLIS',
                      'theme': 'transit'
                  },
                  {
                      'name': 'Trails - Existing',
                      'url': '//gis.oregonmetro.gov/services/Transit/trailsExisting/tilejson',
                      'type': 'tilejson',
                      'thumb': 'trails.png',
                      'source': 'RLIS',
                      'theme': 'transit',
                      'zIndex': 85
                  },
                  {
                      'name': 'Transit Centers',
                      'url': '//library.oregonmetro.gov/rlisdiscovery/tran_cen.zip',
                      'type': 'shapefile',
                      'symbolField': 'NAME',
                      'thumb': 'tran_cen.png',
                      'source': 'RLIS',
                      'theme': 'transit'
                  },
                   {
                       'name': '100 Yr Flood Plain',
                       'url': '//gis.oregonmetro.gov/services/water/floodPlain/tilejson',
                       'type': 'tilejson',
                       'thumb': 'flood96metro.png',
                       'source': 'RLIS',
                       'theme': 'water',
                       'zIndex': 75
                   },
                   {
                       'name': 'Wetlands',
                       'url': '//gis.oregonmetro.gov/services/water/wetlands/tilejson',
                       'type': 'tilejson',
                       'thumb': 'wetland.png',
                       'source': 'RLIS',
                       'theme': 'water',
                       'zIndex': 75
                   },
                    {
                        'name': 'RISE Points',
                        'url':'./data/points.json',
                        'type':'geojson',
                        'source': 'RISE',
                        'icon': './img/metro_logo.png',
                        'thumb': 'zoning.png',
                        'symbolField': 'type',
                        'theme':'General'
                    },
                    {
                        'name': 'TOD Revitalization Projects',
                        'url': 'data/TOD_revitalization_projects.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'TOD'
                    },
                    {
                        'name': 'Local Share',
                        'url': 'data/parks_and_natural_areas_local_share.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'Parks and Natural Areas'
                    },
                    {
                        'name': 'Sites and Bond Acquisitions',
                        'url': 'data/parks_and_natural_areas_sites_bond_acquisitions.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'Parks and Natural Areas'
                    },
                    {
                         'name': 'Planned Trails',
                         'url': '//gis.oregonmetro.gov/services/transit/trailsPlanned/tilejson',
                         'type': 'tilejson',
                         'thumb': 'trails.png',
                         'source': 'RISE',
                         'theme': 'Transportation',
                         'zIndex': 75
                    },
                    {
                        'name': 'Existing Trails on Land',
                        'url': '//gis.oregonmetro.gov/services/transit/trailsExisting/tilejson',
                        'type': 'tilejson',
                        'thumb': 'trails.png',
                        'source': 'RISE',
                        'theme': 'Transportation',
                        'zIndex': 75
                    },
                    {
                        'name': 'Conceptual Trails',
                        'url': '//gis.oregonmetro.gov/services/transit/trailsConceptual/tilejson',
                        'type': 'tilejson',
                        'thumb': 'trails.png',
                        'source': 'RISE',
                        'theme': 'Transportation',
                        'zIndex': 75
                    },
                    {
                        'name': 'Bond Identified Trails',
                        'url': '//gis.oregonmetro.gov/services/transit/bondIdentified/tilejson',
                        'type': 'tilejson',
                        'thumb': 'trails.png',
                        'source': 'RISE',
                        'theme': 'Transportation',
                        'zIndex': 75
                    },
                    {
                        'name': 'MTIP Feb 2005 Buffer',
                        'url': 'data/mtip_buffer_02_05.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'Transportation'
                    },
                    {
                        'name': 'MTIP Apr 2007 Buffer',
                        'url': 'data/mtip_buffer_04_07.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'Transportation'
                    },
                    {
                        'name': 'MTIP Jun 2009 Buffer',
                        'url': 'data/mtip_buffer_06_09.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'Transportation'
                    },
                    {
                        'name': 'MTIP Aug 2011 Buffer',
                        'url': 'data/mtip_buffer_08_11.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'Transportation'
                    },
                    {
                        'name': 'RFFA',
                        'url': 'data/rffa.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'Transportation'
                    },
                    {
                        'name': 'RFFA Buffer',
                        'url': 'data/rffa_buffer.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'Transportation'
                    },
                    {
                        'name': 'Commmunity Development Grants',
                        'url': 'data/community_development_grants.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'General'
                    },
                    {
                        'name': 'Commmunity Enhancement Grants',
                        'url': 'data/community_enhancement_grants.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'General'
                    },
                    {
                        'name': 'Industrial Lands Study',
                        'url': 'data/industrial_lands_study.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'Major Studies'
                    },
                    {
                        'name': 'SW Corridor Data Collection',
                        'url': 'data/SW_Corridor_data_collection.zip',
                        'type': 'shapefile',
                        'thumb': 'placeholder.png',
                        'source': 'RISE',
                        'theme': 'Major Studies'
                    },
                   {
                       'name': 'Trimet Boundary',
                       'url': '//developer.trimet.org/gis/data/tm_boundary.zip',
                       'type': 'shapefile',
                       'metadataUrl':'http://developer.trimet.org/gis/meta_tm_boundary.shtml',
                       'thumb': 'placeholder.png',
                       'source': 'TriMet',
                       'icon':'img/trimet_logo.png',
                       'theme': '',
                       'zIndex': 75
                   },
                   {
                       'name': 'Trimet Park and Rides',
                       'url': '//developer.trimet.org/gis/data/tm_parkride.zip',
                       'type': 'shapefile',
                       'thumb': 'placeholder.png',
                       'source': 'TriMet',
                       'theme': '',
                       'zIndex': 75
                   },
                   {
                       'name': 'Trimet Rail Lines',
                       'url': '//developer.trimet.org/gis/data/tm_rail_lines.zip',
                       'type': 'shapefile',
                       'thumb': 'placeholder.png',
                       'source': 'TriMet',
                       'theme': '',
                       'zIndex': 75
                   },
                   {
                       'name': 'Trimet Rail Stops',
                       'url': '//developer.trimet.org/gis/data/tm_rail_stops.zip',
                       'type': 'shapefile',
                       'thumb': 'placeholder.png',
                       'source': 'TriMet',
                       'theme': '',
                       'zIndex': 75
                   },
                   {
                       'name': 'Trimet Transit Centers',
                       'url': '//developer.trimet.org/gis/data/tm_tran_cen.zip',
                       'type': 'shapefile',
                       'thumb': 'placeholder.png',
                       'source': 'TriMet',
                       'theme': '',
                       'zIndex': 75
                   }

    ],
}