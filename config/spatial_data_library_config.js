config.layers.push({
  'name': 'Metropolitan Planning Organizations',
  'url': 'http://oe.oregonexplorer.info/ExternalContent/SpatialDataforDownload/mpo_2013.zip',
  'type': 'shapefile',
  'metadataUrl': 'http://developer.trimet.org/gis/meta_tm_boundary.shtml',
  'source': 'OSU',
  'icon': 'img/oe_Logo.png',
  'thumb': 'http://spatialdata.oregonexplorer.info/Metadata/Thumbnails/mpo_2013.GIF',
  'theme': 'Administrative',
  'proxy': true,
  'symbolField': 'NAME'
},
{
  'name': 'Oregon Watershed Councils 2014',
  'url': 'http://oe.oregonexplorer.info/ExternalContent/SpatialDataforDownload/Oregon_Watershed_Councils_2014.zip',
  'type': 'shapefile',
  'metadataUrl': 'http://spatialdata.oregonexplorer.info/geoportal/rest/document?id=%7B8091C70C-2E73-47D4-BA0F-8D8D0C5647C0%7D',
  'source': 'OSU',
  'simplify':true,
  'theme': 'Administrative',
  'thumb': 'http://spatialdata.oregonexplorer.info/Metadata/Thumbnails/WatershedCouncils2014.GIF',
  'proxy': true
},
{
  'name': 'Rural Fire Protection Districts',
  'url': 'http://oregonexplorer.info/ExternalContent/SpatialDataForDownload/ORE_CAR_rfpd.zip',
  'type': 'shapefile',
  'metadataUrl': 'http://spatialdata.oregonexplorer.info/geoportal/rest/document?id=%7B0BFDF060-1F8C-40BF-9F56-1E18D0F9011D%7D',
  'source': 'OSU',
  'thumb': 'http://spatialdata.oregonexplorer.info/Metadata/Thumbnails/ORE_RuralFireProtectionDist.gif',
  'theme': 'Administrative',
  'proxy': true
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "State Boundary, 1:2,000,000",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/m2/state_boundary.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "County Boundaries - Oregon - 1990",
  'thumb': 'http://spatialdata.oregonexplorer.info/Metadata/Thumbnails/orcounty24.gif',
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/county.zip",
  'type': "shapefile",
  'symbolField':'NAME',
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "County Boundaries - Washington",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/wacnty24.zip",
  'type': "shapefile",
  "source": "OSU",
  "symbolField": 'COUNTY_NAM'
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "Public Safety Answering Point Boundaries",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/TGS_PSAPBoundary.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "Township and Range 1:100,000",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/township_range.zip",
  'type': "shapefile",
  "source": "OSU",
  "simplify":true
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "Township and Range, 1:2,000,000",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/m2/townships.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "Quad Index 30",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/quadindex30.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "Land Ownership, BLM, 1:100,000",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/blmlands.zip",
  'type': "shapefile",
  "source": "OSU",
  "simplify":true
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "Urban Growth Boundaries (UGBs - 2012)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/UGB_2012.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "Urban Growth Boundaries (UGBs - 2011)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/UGB_2011.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "Urban Growth Boundaries (UGBs - 2010)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/UGB_2010.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "Urban Growth Boundaries (UGBs - 2009)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/UGB_2009.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "Urban Growth Boundaries (UGBs - 2007)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/UGB_2007.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "Oregon Water Resources Department (OWRD) Admin Basins",
  'symbolField': 'BASIN_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_owrd_admin_basins.png',
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/owrd_admin_basins.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Administrative',
  'name': "State Parks (2010)",
  'ramp': 'Spectral',
  'symbolField': 'DESIGNATIO',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_stateparks.png',
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/ORStateParks.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "State Government Buildings",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/TGS_StateBuilding.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Heads of tide",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/tide.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Emergency Operation Centers (EOCs)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/TGS_EOC.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Public Health Departments",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/HSIP_PublicHealth.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Hospitals",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/HSIP_Hospitals.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Correctional Institutions",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/HSIP_Correctional.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'thumb': 'http://spatialdata.oregonexplorer.info/Metadata/Thumbnails/ORCountySeats.gif',
  'name': "County Seats",
  'symbolField': 'NAME',
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/cntyseat.zip",
  'type': "shapefile",
  "source": "OSU",
  "popupTemplate": "<h5>County Seats</h5><b>Name: </b>{{NAME}}<br/><b>County: </b>{{COUNTY}}"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Law Enforcement Locations",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/HSIP_LawEnforcement.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Cities (points)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/m2/cities.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Nursing Homes",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/HSIP_NursingHomes.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Waterbodies",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/m2/waterbodies.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'metadataUrl': 'http://www.oregon.gov/DAS/CIO/GEO/docs/metadata/beach.htm',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_beach.png',
  'name': "Beach access points and boat ramps",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/beach.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Fire Stations",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/HSIP_Firestations.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Oregon Dams",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/oregon_dams_shp.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Points of Interest',
  'name': "Populated Place Names",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/populated_place_names.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Ecology',
  'name': "Classified Forestland",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/sb360_2004.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Ecology',
  'name': "Eco regions",
  'ramp': 'Spectral',
  'symbolField': 'NAME',
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k250/ecoregion.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'ramp': "RdYlGn",
  'theme': 'Ecology',
  'symbolField': 'TYPE',
  'name': "Forest Types (1914)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k250/timber.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Transportation',
  'name': "Highways",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/m2/highways.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Transportation',
  'name': "Highway Mileposts",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/mileposts_2011.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Transportation',
  'name': "Scenic Byways",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/oregon_scenic_byways.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Transportation',
  'name': "Railroads (2012) ",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/railroads_2012.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Transportation',
  'name': "Railroads (2009) ",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/railroads_2009.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Transportation',
  'name': "Routes, Signed",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/signed_rtes_2011.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Government',
  'thumb': 'http://spatialdata.oregonexplorer.info/Metadata/Thumbnails/OR_USCongressionalDist1990.gif',
  'name': "US Congressional Districts, Statewide (2010)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/2010congress_districts.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Government',
  'thumb': 'http://spatialdata.oregonexplorer.info/Metadata/Thumbnails/OR_USCongressionalDist1990.gif',
  'name': "US Congressional Districts, Statewide (2000)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/2000congress_districts.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Government',
  'thumb': 'http://spatialdata.oregonexplorer.info/Metadata/Thumbnails/OR_USCongressionalDist1990.gif',
  'name': "US Congressional Districts, Statewide (1990)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/1990congress_districts.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Government',
  'name': "Oregon Legislative Districts, House (2000)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/2000house_districts.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Government',
  'name': "Oregon Legislative Districts, Statewide (1990) ",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/legis_districts.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Government',
  'name': "Oregon Legislative Districts, Senate (2010)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/2010senate_districts.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Government',
  'name': "Oregon Legislative Districts, Senate (2000)",
  'symbolField': 'DISTRICT',
  'thumb': 'http://spatialdata.oregonexplorer.info/Metadata/Thumbnails/OregonLegislatureSenate2000.gif',
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/2000senate_districts.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://spatialdata.oregonexplorer.info/Metadata/Thumbnails/CityLimits2007.gif',
  'name': "City Limits (2013)",
  'url': "http://oe.oregonexplorer.info/ExternalContent/SpatialDataforDownload/citylim_2013.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_city_limits.png',
  'name': "City Limits (2012)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/citylim_2012.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_city_limits.png',
  'name': "City Limits (2011)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/citylim_2011.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_city_limits.png',
  'name': "City Limits (2010)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/citylim_2010.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_city_limits.png',
  'name': "City Limits (2009)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/citylim_2009.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_city_limits.png',
  'name': "City Limits (2008)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/citylim_2008.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_city_limits.png',
  'name': "City Limits (2007)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/citylim_2007.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_city_limits.png',
  'name': "City Limits (1996)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/citylim.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_city_limits.png',
  'name': "City Limits (2005)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/citylim_2005.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_city_limits.png',
  'name': "City Limits (2006)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/citylim_2006.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_city_limits.png',
  'name': "City Limits (2003)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/citylim_2003.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Cities',
  'symbolField': 'CITY_NAME',
  'thumb': 'http://www.oregon.gov/DAS/CIO/GEO/data/maps/thumb_city_limits.png',
  'name': "City Limits (1999)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k24/citylimits.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Hydrology',
  'name': "Water Quality, 303d Streams (2002)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/streams303d_02.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Hydrology',
  'name': "Water Quality, 303d Streams (1994-1996)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/or303str.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Hydrology',
  'name': "Water Quality, 303d Lakes (1998)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/lak98303.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Hydrology',
  'name': "Water Quality, 303d Lakes (1994-1996)",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/or303lks.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Hydrology',
  'name': "Water Quality, 303d Lakes (2002) ",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k100/lakes303d_02.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Hydrology',
  'name': "Rivers, 1:250,000",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/k250/orrivers.zip",
  'type': "shapefile",
  "source": "OSU"
},
{
  'proxy': true,
  'theme': 'Hydrology',
  'name': "Streams",
  'url': "http://navigator.state.or.us/sdl/data/shapefile/m2/streams.zip",
  'type': "shapefile",
  "source": "OSU"
});