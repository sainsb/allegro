config.layers.push(
{
    'name': 'Trimet Boundary',
    'url': '//developer.trimet.org/gis/data/tm_boundary.zip',
    'type': 'shapefile',
    'metadataUrl': 'http://developer.trimet.org/gis/meta_tm_boundary.shtml',
    'source': 'TriMet',
    'icon': 'img/trimet_logo.png',
    'theme': ''
},
{
    'name': 'Trimet Park and Rides',
    'url': '//developer.trimet.org/gis/data/tm_parkride.zip',
    'type': 'shapefile',
    'source': 'TriMet',
    'metadataUrl': 'http://developer.trimet.org/gis/meta_tm_parkride.shtml',
    'theme': ''
},
{
    'name': 'Trimet Rail Lines',
    'url': '//developer.trimet.org/gis/data/tm_rail_lines.zip',
    'type': 'shapefile',
    'source': 'TriMet',
    'theme': '',
    'metadataUrl': 'http://developer.trimet.org/gis/meta_tm_rail_lines.shtml',
    'level': 2
},
{
    'name': 'Trimet Rail Stops',
    'url': '//developer.trimet.org/gis/data/tm_rail_stops.zip',
    'type': 'shapefile',
    'source': 'TriMet',
    'theme': '',
    'level': 2,
    'metadataUrl': 'http://developer.trimet.org/gis/meta_tm_rail_stops.shtml'
},
{
    'name': 'Trimet Buslines',
    'url': '//developer.trimet.org/gis/data/tm_routes.zip',
    'type': 'shapefile',
    'source': 'TriMet',
    'theme': '',
    'defQuery': "type=='BUS'",
    'level': 2,
    'metadataUrl': 'http://developer.trimet.org/gis/meta_tm_routes.shtml'
},
{
    'name': 'Trimet Bus Stops',
    'url': '//developer.trimet.org/gis/data/tm_stops.zip',
    'type': 'shapefile',
    'source': 'TriMet',
    'theme': '',
    'defQuery': "type=='BUS'",
    'metadataUrl': 'http://developer.trimet.org/gis/meta_tm_stops.shtml'
},
{
    'name': 'Trimet Transit Centers',
    'url': '//developer.trimet.org/gis/data/tm_tran_cen.zip',
    'type': 'shapefile',
    'source': 'TriMet',
    'metadataUrl':'http://developer.trimet.org/gis/meta_tm_tran_cen.shtml',
    'theme': ''
}
);