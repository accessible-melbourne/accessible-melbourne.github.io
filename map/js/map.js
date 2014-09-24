// Mapbox attribution for corner of page
var mbAttr = 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
'Imagery © <a href="http://mapbox.com">Mapbox</a>',
// Mapbox map tile template
mbUrl = 'https://{s}.tiles.mapbox.com/v3/{id}/{z}/{x}/{y}.png';
steveUrl = 'http://en5.cycletour.org/tile/{id}/{z}/{x}/{y}.png';
// Tile layers 
var grayscale   = L.tileLayer(mbUrl, {id: 'examples.map-20v6611k', attribution: mbAttr}),
    streets  = L.tileLayer(mbUrl, {id: 'examples.map-i875mjb7',   attribution: mbAttr}),
    footpathgradients = L.tileLayer(steveUrl, {id: 'gradients',   attribution: 'City of Melbourne, Steve Bennett'});



// Map initialization, with 'streets' as the default tile layer.
var map = L.map('map', {layers: [streets, footpathgradients]});

// Popup initialization
var popup = L.popup();

// Initialise points arrays

// Types of base maps available in UI
var baseMaps = {
  "Greyscale": grayscale,
  "Streets": streets
};

function onLocationFound(e) {
  var radius = e.accuracy / 2;
  L.marker(e.latlng).addTo(map).bindPopup("You are within " + radius + " meters from this point").openPopup();
  L.circle(e.latlng, radius).addTo(map);
}
function onLocationError(e) {
  alert(e.message);
}

map.on('locationfound', onLocationFound);
map.on('locationerror', onLocationError);

map.locate({setView: true, maxZoom: 16});

function onMapClick(e) {
  popup
    .setLatLng(e.latlng)
    .setContent("You clicked the map at " + e.latlng.toString())
    .openOn(map);
}

map.on('click', onMapClick);

// Retrieve building data from API
$.getJSON('https://data.melbourne.vic.gov.au/resource/pmhb-s6pn.json?$where=accessibility_rating>0+AND+suburb=%27MELBOURNE%27', function(data)
    {
      var buildings= { low: [], medium: [], high: [] };

      var LeafIcon = L.Icon.extend(
        {
          options:
      {
        iconAnchor:   [0, 0],
          popupAnchor:  [0, 0]
      }
        });

      // Different coloured icons
      var greenIcon = new LeafIcon({iconUrl: 'map/img/marker-colour-green-triangle-number.png'}),
  redIcon = new LeafIcon({iconUrl: 'map/img/marker-colour-red-oval-number.png'}),
  yellowIcon = new LeafIcon({iconUrl: 'map/img/marker-colour-blue-rectangle-number.png'}),
  blueIcon = new LeafIcon({iconUrl: 'map/img/marker-icon.png'});

var icon, row;

data.forEach(function(row)
    {
      var metadata = "";
      // If this building has a name, prepend it to the description
      if (row.building_name)
{ metadata += "Building name: " + row.building_name + "<br>"; }
// Other building fields
metadata += "<br>" + "Street address: " + row.street_address + "</br>";
metadata += "<br>" + "Accessibility type: " + row.accessibility_type + "</br>";
metadata += "<br>" + "Accessibility rating: " + row.accessibility_rating + "</br>";

// Based on building's accessibility, choose suitable icon colour
if (row.accessibility_rating == 3)
{
  icon=greenIcon;
  buildings.high.push(L.marker ([row.latitude, row.longitude], {icon: icon}).bindPopup("<b>" + metadata + "</b>"));
}
else if (row.accessibility_rating == 2)
{
  icon=yellowIcon;
  buildings.medium.push(L.marker ([row.latitude, row.longitude], {icon: icon}).bindPopup("<b>" + metadata + "</b>"));
}
else if (row.accessibility_rating == 1)
{
  icon=redIcon;
  buildings.low.push(L.marker ([row.latitude, row.longitude], {icon: icon}).bindPopup("<b>" + metadata + "</b>"));
}
});

// Retrieve toilet data from API
$.getJSON('https://data.melbourne.vic.gov.au/resource/twe5-xv8t.json?disabled=Y', function(data)
    {
      var toilets=[];
      data.forEach(function(row)
        {
          toilets.push(L.marker(
              [
              row.geom.latitude,
              row.geom.longitude
              ], {icon: blueIcon}).bindPopup(
                "<b>" + row.featurenam + "</b>"));
        });

      overlayMaps = {
        "Toilets": L.layerGroup(toilets),
  "Buildings (Low Accessibility": L.layerGroup(buildings.low),
  "Buildings (Medium Accessibility)": L.layerGroup(buildings.medium),
  "Buildings (High Accessibility)": L.layerGroup(buildings.high),
        "Footpath gradients": footpathgradients
      }
      L.control.layers(baseMaps, overlayMaps, { collapsed: false }).addTo(map);
    });
});

new L.Control.GeoSearch({
  provider: new L.GeoSearch.Provider.OpenStreetMap(),
    position: 'topcenter',
    showMarker: true
}).addTo(map);
