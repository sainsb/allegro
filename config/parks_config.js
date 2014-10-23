// data copied from ftp02.portlandoregon.gov/civicApps

config.layers.push({
    'name': 'Stewardship Types',
    'url': './data/parks/habitats.zip',
    'type': 'shapefile',
    'source': 'Parks',
    'theme': 'General',
    'symbolField':'STEWARDSHI',
    'legend': {
    'symbols':[
        {
        'value':'Ag',
        'fillColor': 'rgb(232,190,255)',
        'label': 'Agricultural'
        },
        {
        'value':'BBM',
        'fillColor': 'rgb(227,224,195)',
        'label' : 'Beaches, bars and mudflats'
        },
        {
        'value':'D',
        'fillColor': 'rgb(130,130,130)',
            'label': 'Developed'
        },                               
        {                                
        'value':'P',                     
        'fillColor': 'rgb(255,255,190)',
        'label': 'Prairie'
        },                               
        {                                
        'value':'RF',                    
        'fillColor': 'rgb(68,137,112)',
        'label': 'Riparian Forest'
        },                               
        {                                
        'value':'S',                     
        'fillColor': 'rgb(209,255,115)',
        'label': 'Savanna'
        },                               
        {                                
        'value':'UF',                    
        'fillColor': '#7C745D',
        'label': 'Upland Forest'
        },
        {
        'value':'H20',
        'fillColor': 'rgb(0,76,115)',
        'label': 'Water'
        },
        {
        'value':'Wet',
        'fillColor': 'rgb(0,197,255)',
        'label': 'Wetland'
        },
        {
        'value':'W',
        'fillColor': 'rgb(215,194,160)',
        'label': 'Woodland'
        },
        {
        'value':'und',
        'fillColor': 'rgb(200,200,200)',
        'fillOpacity': .3,
            'opacity':.2,
        'label': 'Unknown'
        }
    ]
    }
    
},
{
    'name': 'Research Conservation Strategy Land Cover',
    'url': '//gis.oregonmetro.gov/services/NatureInNeighborhoods/RCSLandCover/tilejson/',
    'type': 'tilejson',
    'thumb': 'img/rcs_land_cover.jpg',
    'source': 'Parks',
    'theme': 'General'
},
{
    'name': 'Conservation Targets',
    'url': './data/parks/habitats.zip',
    'type': 'shapefile',
    'source': 'Parks',
    'theme': 'General',
    'symbolField':'CONSRVETAR',
    'legend': {
        "symbols": [{
            "value": "",
            "fillColor": "#999",
            "color": "rgb(180,180,180)",
            "weight": 0,
            'fillOpacity':.5,
            'label':'Unspecified'
        },
        {
            "value": "BHW",
            "fillColor": "#79577c",
            "color": "rgb(180,180,180)",
            "weight": 0,
            'label':'Bottomland hardwood wetland'
        },
        {
            "value": "NT",
            "fillColor": "#3c899e",
            "color": "rgb(180,180,180)",
            "weight": 0,
            'label': "No Targets"
        },
        {
            "value": "OakS",
            "fillColor": "#49a75a",
            "color": "rgb(180,180,180)",
            "weight": 0,
            'label': 'Oak Savanna'
        },
        {
            "value": "OakW",
            "fillColor": "#6f8273",
            "color": "rgb(180,180,180)",
            "weight": 0,
            'label': 'Oak woodland'
        },
        {
            "value": "P",
            "fillColor": "#9f5196",
            "color": "rgb(180,180,180)",
            "weight": 0,
            'label': 'Prairie - wet or dry'
        },
        {
            "value": "RF",
            "fillColor": "#df6f32",
            "color": "rgb(180,180,180)",
            "weight": 0,
            'label':'Riparian Forest'
        },
        {
            "value": "S",
            "fillColor": "#ffa60f",
            "color": "rgb(180,180,180)",
            "weight": 0,
            'label': 'Other Savanna'
        },
        {
            "value": "UF",
            "fillColor": "#fff52f",
            "color": "rgb(180,180,180)",
            "weight": 0,
            "label" : "Upland Forest"
        },
        {
            "value": "UF Sh",
            "fillColor": "#cfa42d",
            "color": "rgb(180,180,180)",
            "weight": 0,
            "label": "Upland forest - shrub (early successional)"
        },
        {
            "value": "W",
            "fillColor": "#b25c3f",
            "color": "rgb(180,180,180)",
            "weight": 0,
            "label" : 'Other Woodland'
        },
        {
            "value": "WetE",
            "fillColor": "#e4779c",
            "color": "rgb(180,180,180)",
            "weight": 0,
            "label" : 'Emergent wetland'
        },
        {
            "value": "WetF",
            "fillColor": "#d28ab0",
            "color": "rgb(180,180,180)",
            "weight": 0,
            'label': 'Forested wetland'
        },
        {
            "value": "WetS",
            "fillColor": "#999999",
            "color": "rgb(180,180,180)",
            "weight": 0,
            'label' : 'Shrub dominated wetland'
        }],
        "type": "uniqueValue"
    }
}

);

