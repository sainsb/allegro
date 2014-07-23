var config = {
    'basemaps':[
        {
            'name': 'Metro Basemap',
            'url': '//gis.oregonmetro.gov/',
            'type': 'composite',
            'thumb': 'cty_fill.png',
            'source': 'Metro',
            'theme': 'Roads and Landscape'
        },
        {
            'name': '2013 Air Photos',
            'url': '//gis.oregonmetro.gov/',
            'type': 'photo',
            'thumb': 'cty_fill.png',
            'source': 'Metro',
            'theme':'Air Photo'
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
                            "color": "#CEEC3B"
                        },
                        {
                            "value": 2,
                            "color": "#41973A"
                        },
                        {
                            "value": 3,
                            "color": "#276A95"
                        },
                        {
                            "value": 4,
                            "color": "#FFC526"
                        },
                        {
                            "value": 5,
                            "color": "#FC8C58"
                        },
                        {
                            "value": 6,
                            "color": "#D63E50"
                        },
                        {
                            "value": 7,
                            "color": "#61A19A"
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
                'name': 'Fire District Alt',
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
            'name': 'RISE Points',
            'url':'./data/points.json',
            'type':'geojson',
            'source': 'RISE',
            'thumb': 'zoning.png',
            'symbolField':'type'
        }

    ],
}