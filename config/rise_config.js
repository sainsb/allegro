config.layers.push({
    'name': 'Metro Direct Assets',
    'url': './data/RISE/points.json',
    'type': 'geojson',
    'source': 'Metro Grants',
    'icon': './img/metro_logo.png',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/zoning.png',
    'symbolField': 'type',
    'theme': 'General',
    'defQuery':'type != "Nature in neighborhood grants"',
    'legend':{"type":"uniqueValue","symbols":[{"value":"Solid waste facilities","fillColor":"#CEEC3B","color":"#666"},{"value":"Portland 5","fillColor":"#41973A","color":"#666"},{"value":"TOD Acquisitions","fillColor":"#FFC526","color":"#666"},{"value":"TOD Investments","fillColor":"#FC8C58","color":"#666"},{"value":"Special Projects","fillColor":"#D63E50","color":"#666"},{"value":"Recycling grants","fillColor":"#276A95","color":"#666"}],"title":"Metro Direct Assets"},
    'popupTemplate':"<h5>Metro Direct Assets</h5><b>Type: </b>{{type}}<br/><b>Investment No.: </b>{{investment}}"
},
{
    'name': 'Legacy Metro Grants',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/Grants_Data.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'General',
    'symbolField':'TYPE',
    'ramp':'RdYlGn',
     "popupTemplate": "<h5>Legacy Metro Grants</h5><b>Name: </b>{{PROJ_NAME}}<br/><b>Type: </b>{{TYPE}}<br/><b>Year: </b>{{YEAR}}"
},
{
    'name': 'Nature in Neighborhoods Grants',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/NIN_POLYGON.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'General',
    'symbolField':'GRANT_TYPE',
     "popupTemplate": "<h5>Nature in Neighborhood Grants</h5><b>Name: </b>{{PRJ_NAME}}<br/><b>Year: </b>{{GRANT_YEAR}}<br/><b>Contract #:</b> {{CONTRACT}}<br/><b>Program: </b>{{PROGRAM}}<br/><b>Grantee: </b>{{GRANTEE_1}}<br/><b>Grant Type: </b>{{GRANT_TYPE}}<br/><b>Organization Type: </b>{{ORG_TYPE}}<br/><b>Metro Grant Amount: </b>${{METROAWARD}}<br/><b>Project Cost: </b>${{PROJ_COST}}<br/><b>Grant Status: </b>{{STATUS}}<br/><b>City: </b>{{CITY}}<br/><b>County: </b>{{COUNTY}}",
     'legend':{"symbols":[{"value":"Acquisition","opacity":1,"fillOpacity":1,"fillColor":"#ea5839","color":"#444","weight":1},{"value":"Conservation Education","opacity":1,"fillOpacity":1,"fillColor":"#fdbe70","color":"#444","weight":1},{"value":"Habitat Restoration","opacity":1,"fillOpacity":1,"fillColor":"#ffffbf","color":"#444","weight":1},{"value":"Neighborhood Livability","opacity":1,"fillOpacity":1,"fillColor":"#bce1ee","color":"#444","weight":1},{"value":"Restoration and Community Stewardship","opacity":1,"fillOpacity":1,"fillColor":"#649ac7","color":"#444","weight":1},{"value":"Urban Transformation","opacity":1,"fillOpacity":1,"fillColor":"#313695","color":"#444","weight":1}],"title":"Nature in Neighborhoods Grants","type":"uniqueValue"}
},
{
    'name': 'TOD Revitalization Projects',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/TOD_revitalization_projects.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'TOD',
    'symbolField':'Funding',
    'legend':{"symbols":[{"value":5000,"opacity":1,"fillOpacity":1,"fillColor":"#f7f4f9","color":"rgb(180,180,180)","weight":1},{"value":9325,"opacity":1,"fillOpacity":1,"fillColor":"#e4dbec","color":"rgb(180,180,180)","weight":1},{"value":16125,"opacity":1,"fillOpacity":1,"fillColor":"#d0aed4","color":"rgb(180,180,180)","weight":1},{"value":36000,"opacity":1,"fillOpacity":1,"fillColor":"#d27fbd","color":"rgb(180,180,180)","weight":1},{"value":75979,"opacity":1,"fillOpacity":1,"fillColor":"#e3429a","color":"rgb(180,180,180)","weight":1},{"value":77250,"opacity":1,"fillOpacity":1,"fillColor":"#d51864","color":"rgb(180,180,180)","weight":1},{"value":226109,"opacity":1,"fillOpacity":1,"fillColor":"#9f0245","color":"rgb(180,180,180)","weight":1},{"value":244927,"opacity":1,"fillOpacity":1,"fillColor":"#67001f","color":"rgb(180,180,180)","weight":1}],"title":"TOD Revitalization Projects","type":"uniqueValue"},
    "popupTemplate":'<h5>TOD Revitalization Projects</h5><b>City: </b>{{CITYNAME}}<br/><b>Funding: </b>${{Funding}}'
},
{
    'name': 'Local Share',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/parks_and_natural_areas_local_share.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'Parks and Natural Areas'
},
{
    'name': 'Sites and Bond Acquisitions',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/parks_and_natural_areas_sites_bond_acquisitions.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'Parks and Natural Areas'
},
{
    'name': 'Planned Trails',
    'url': '//gis.oregonmetro.gov/services/transit/trailsPlanned/tilejson',
    'type': 'tilejson',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/trails.png',
    'source': 'Metro Grants',
    'theme': 'Transportation',
    'zIndex': 75
},
{
    'name': 'Existing Trails on Land',
    'url': '//gis.oregonmetro.gov/services/transit/trailsExisting/tilejson',
    'type': 'tilejson',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/trails.png',
    'source': 'Metro Grants',
    'theme': 'Transportation',
    'zIndex': 75
},
{
    'name': 'Conceptual Trails',
    'url': '//gis.oregonmetro.gov/services/transit/trailsConceptual/tilejson',
    'type': 'tilejson',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/trails.png',
    'source': 'Metro Grants',
    'theme': 'Transportation',
    'zIndex': 75
},
{
    'name': 'Bond Identified Trails',
    'url': '//gis.oregonmetro.gov/services/transit/bondIdentified/tilejson',
    'type': 'tilejson',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/trails.png',
    'source': 'Metro Grants',
    'theme': 'Transportation',
    'zIndex': 75
},
{
    'name': 'MTIP Feb 2005 Buffer',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/mtip_buffer_02_05.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'Transportation'
},

{
    'name': 'MTIP Apr 2007 Buffer',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/mtip_buffer_04_07.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'Transportation'
},
{
    'name': 'MTIP Jun 2009 Buffer',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/mtip_buffer_06_09.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'Transportation'
},
{
    'name': 'MTIP Aug 2011 Buffer',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/mtip_buffer_08_11.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'Transportation'
},
{
    'name': 'RFFA',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/rffa.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'Transportation'
},
{
    'name': 'RFFA Buffer',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/rffa_buffer.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'Transportation'
},
{
    'name': 'Community Development Grants',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/community_development_grants.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'General',
    'symbolField':'JURISDICTI',
     "popupTemplate": "<h5>Community Development Grants</h5><b>Name: </b>{{NAME}}<br/><b>Grant Number: </b>{{Grant_num}}<br/><b>Jurisdiction: </b>{{JURISDICTI}}<br/><b>Grant Amount: </b>${{Grant_Amt}}",
    'legend':{"symbols":[{"value":"Beaverton","opacity":1,"fillOpacity":1,"fillColor":"#a50026","color":"rgb(180,180,180)","weight":1},{"value":"Clackamas County","opacity":1,"fillOpacity":1,"fillColor":"#ba1426","color":"rgb(180,180,180)","weight":1},{"value":"Cornelius","opacity":1,"fillOpacity":1,"fillColor":"#d02926","color":"rgb(180,180,180)","weight":1},{"value":"Damascus","opacity":1,"fillOpacity":1,"fillColor":"#df422f","color":"rgb(180,180,180)","weight":1},{"value":"Forest Grove","opacity":1,"fillOpacity":1,"fillColor":"#ec5d3b","color":"rgb(180,180,180)","weight":1},{"value":"Gresham","opacity":1,"fillOpacity":1,"fillColor":"#f57848","color":"rgb(180,180,180)","weight":1},{"value":"Gresham, Portland","opacity":1,"fillOpacity":1,"fillColor":"#f99455","color":"rgb(180,180,180)","weight":1},{"value":"Happy Valley","opacity":1,"fillOpacity":1,"fillColor":"#fdb063","color":"rgb(180,180,180)","weight":1},{"value":"Hillsboro","opacity":1,"fillOpacity":1,"fillColor":"#fdc577","color":"rgb(180,180,180)","weight":1},{"value":"King City","opacity":1,"fillOpacity":1,"fillColor":"#fddb8b","color":"rgb(180,180,180)","weight":1},{"value":"Lake Oswego","opacity":1,"fillOpacity":1,"fillColor":"#feeaa0","color":"rgb(180,180,180)","weight":1},{"value":"Milwaukie","opacity":1,"fillOpacity":1,"fillColor":"#fef8b4","color":"rgb(180,180,180)","weight":1},{"value":"Multnomah County","opacity":1,"fillOpacity":1,"fillColor":"#f8fccb","color":"rgb(180,180,180)","weight":1},{"value":"Oregon City","opacity":1,"fillOpacity":1,"fillColor":"#eaf7e4","color":"rgb(180,180,180)","weight":1},{"value":"Portland","opacity":1,"fillOpacity":1,"fillColor":"#dbf0f6","color":"rgb(180,180,180)","weight":1},{"value":"Sherwood","opacity":1,"fillOpacity":1,"fillColor":"#c4e5f0","color":"rgb(180,180,180)","weight":1},{"value":"Tigard","opacity":1,"fillOpacity":1,"fillColor":"#addae9","color":"rgb(180,180,180)","weight":1},{"value":"Tualatin","opacity":1,"fillOpacity":1,"fillColor":"#95c7df","color":"rgb(180,180,180)","weight":1},{"value":"Tualatin, Wilsonville","opacity":1,"fillOpacity":1,"fillColor":"#7db4d5","color":"rgb(180,180,180)","weight":1},{"value":"Washington County","opacity":1,"fillOpacity":1,"fillColor":"#679ec9","color":"rgb(180,180,180)","weight":1},{"value":"Washington County, Tigard","opacity":1,"fillOpacity":1,"fillColor":"#5386bc","color":"rgb(180,180,180)","weight":1},{"value":"West Linn","opacity":1,"fillOpacity":1,"fillColor":"#426caf","color":"rgb(180,180,180)","weight":1},{"value":"West LinnWashington County","opacity":1,"fillOpacity":1,"fillColor":"#3951a2","color":"rgb(180,180,180)","weight":1},{"value":"Wilsonville","opacity":1,"fillOpacity":1,"fillColor":"#313695","color":"rgb(180,180,180)","weight":1}],"title":"Community Development Grants","type":"uniqueValue"} 
},
{ type: 'heatmap', theme: 'General', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: './data/rise/cdg.png', 'source': 'Metro Grants', name: 'Community Development Grants heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'General', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/ceg.png', 'source': 'Metro Grants', name: 'Community Enhancement Grants heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Major Studies', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/ils.png', 'source': 'Metro Grants', name: 'Industrial Lands Study heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Transportation', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/mtb02_05.png', 'source': 'Metro Grants', name: 'MTIP February 2005 heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Transportation', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/mtb04_07.png', 'source': 'Metro Grants', name: 'MTIP April 2007 heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Transportation', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/mtb06_09.png', 'source': 'Metro Grants', name: 'MTIP June 2009 heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Transportation', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/mtb08_11.png', 'source': 'Metro Grants', name: 'MTIP August 2011 heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Parks and Natural Areas', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/local.png', 'source': 'Metro Grants', name: 'Local Share Investments heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Parks and Natural Areas', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/sites.png', 'source': 'Metro Grants', name: 'Sites and Bond Acquisitions heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Transportation', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/rffa_buffer.png', 'source': 'Metro Grants', name: 'Regional Flexible Fund Allocation heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Major Studies', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/sw_corr.png', 'source': 'Metro Grants', name: 'Southwest Corridor Study heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'TOD', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/tod.png', 'source': 'Metro Grants', name: 'TOD Revitalization Projects heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'General', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.51819289449999, 46.0676384925], step: 0.000885099, file: 'data/rise/points.png', 'source': 'Metro Grants', name: 'Direct Assets heatmap', width: 1330, height: 708 },
{
    'name': 'Community Enhancement Grants',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/community_enhancement_grants.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'symbolField':'NAME',
    'theme': 'General',
    'legend':{"symbols":[{"value":"Forest Grove","opacity":1,"fillOpacity":1,"fillColor":"#a50026","color":"rgb(180,180,180)","weight":1},{"value":"Metro South","opacity":1,"fillOpacity":1,"fillColor":"#ffffbf","color":"rgb(180,180,180)","weight":1},{"value":"North Portland","opacity":1,"fillOpacity":1,"fillColor":"#313695","color":"rgb(180,180,180)","weight":1}],"title":"Community Enhancement Grants","type":"uniqueValue"},
    'popupTemplate':'<h5>Community Enhancement Grants</h5><b>Name: </b>{{NAME}}'
},
{
    'name': 'Industrial Lands Study',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/industrial_lands_study.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'Major Studies'
},
{
    'name': 'SW Corridor Data Collection',
    'url':'//gis.oregonmetro.gov/dev/allegro/data/RISE/SW_Corridor_data_collection.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'Metro Grants',
    'theme': 'Major Studies'
}
 
);