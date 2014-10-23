config.layers.push({
    'name': 'RISE Points',
    'url': './data/RISE/points.json',
    'type': 'geojson',
    'source': 'RISE',
    'icon': './img/metro_logo.png',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/zoning.png',
    'symbolField': 'type',
    'theme': 'General'
},
{
    'name': 'TOD Revitalization Projects',
    'url': 'data/RISE/TOD_revitalization_projects.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'TOD'
},
{
    'name': 'Local Share',
    'url': 'data/RISE/parks_and_natural_areas_local_share.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'Parks and Natural Areas'
},
{
    'name': 'Sites and Bond Acquisitions',
    'url': 'data/RISE/parks_and_natural_areas_sites_bond_acquisitions.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'Parks and Natural Areas'
},
{
    'name': 'Planned Trails',
    'url': '//gis.oregonmetro.gov/services/transit/trailsPlanned/tilejson',
    'type': 'tilejson',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/trails.png',
    'source': 'RISE',
    'theme': 'Transportation',
    'zIndex': 75
},
{
    'name': 'Existing Trails on Land',
    'url': '//gis.oregonmetro.gov/services/transit/trailsExisting/tilejson',
    'type': 'tilejson',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/trails.png',
    'source': 'RISE',
    'theme': 'Transportation',
    'zIndex': 75
},
{
    'name': 'Conceptual Trails',
    'url': '//gis.oregonmetro.gov/services/transit/trailsConceptual/tilejson',
    'type': 'tilejson',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/trails.png',
    'source': 'RISE',
    'theme': 'Transportation',
    'zIndex': 75
},
{
    'name': 'Bond Identified Trails',
    'url': '//gis.oregonmetro.gov/services/transit/bondIdentified/tilejson',
    'type': 'tilejson',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/trails.png',
    'source': 'RISE',
    'theme': 'Transportation',
    'zIndex': 75
},
{
    'name': 'MTIP Feb 2005 Buffer',
    'url': 'data/RISE/mtip_buffer_02_05.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'Transportation'
},
{
    'name': 'MTIP Apr 2007 Buffer',
    'url': 'data/RISE/mtip_buffer_04_07.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'Transportation'
},
{
    'name': 'MTIP Jun 2009 Buffer',
    'url': 'data/RISE/mtip_buffer_06_09.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'Transportation'
},
{
    'name': 'MTIP Aug 2011 Buffer',
    'url': 'data/RISE/mtip_buffer_08_11.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'Transportation'
},
{
    'name': 'RFFA',
    'url': 'data/RISE/rffa.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'Transportation'
},
{
    'name': 'RFFA Buffer',
    'url': 'data/RISE/rffa_buffer.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'Transportation'
},
{
    'name': 'Community Development Grants',
    'url': 'data/RISE/community_development_grants.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'General'
},
{ type: 'heatmap', theme: 'General', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: './data/rise/cdg.png', source: 'RISE', name: 'Community Development Grants heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'General', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/ceg.png', source: 'RISE', name: 'Community Enhancement Grants heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Major Studies', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/ils.png', source: 'RISE', name: 'Industrial Lands Study heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Transportation', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/mtb02_05.png', source: 'RISE', name: 'MTIP February 2005 heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Transportation', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/mtb04_07.png', source: 'RISE', name: 'MTIP April 2007 heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Transportation', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/mtb06_09.png', source: 'RISE', name: 'MTIP June 2009 heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Transportation', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/mtb08_11.png', source: 'RISE', name: 'MTIP August 2011 heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Parks and Natural Areas', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/local.png', source: 'RISE', name: 'Local Share Investments heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Parks and Natural Areas', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/sites.png', source: 'RISE', name: 'Sites and Bond Acquisitions heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Transportation', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/rffa_buffer.png', source: 'RISE', name: 'Regional Flexible Fund Allocation heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'Major Studies', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/sw_corr.png', source: 'RISE', name: 'Southwest Corridor Study heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'TOD', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.1787600372, 45.6955761882], step: 0.0008000000, file: 'data/rise/tod.png', source: 'RISE', name: 'TOD Revitalization Projects heatmap', width: 1330, height: 708 },
{ type: 'heatmap', theme: 'General', thumb: 'img/heatmap.jpg', nodata: 0, ul: [-123.51819289449999, 46.0676384925], step: 0.000885099, file: 'data/rise/points.png', source: 'RISE', name: 'Direct Assets heatmap', width: 1330, height: 708 },
{
    'name': 'Community Enhancement Grants',
    'url': 'data/RISE/community_enhancement_grants.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'General'
},
{
    'name': 'Industrial Lands Study',
    'url': 'data/RISE/industrial_lands_study.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'Major Studies'
},
{
    'name': 'SW Corridor Data Collection',
    'url': 'data/RISE/SW_Corridor_data_collection.zip',
    'type': 'shapefile',
    'thumb': '//library.oregonmetro.gov/rlisdiscovery/browse_graphic/placeholder.png',
    'source': 'RISE',
    'theme': 'Major Studies'
}
 
);