/* Accessible Melbourne Leaflet overlays

*/

	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(success, fail);
	} else {
	  alert('navigator.geolocation not supported on your browser.');
	}




function success(position) {

	var currentLat = position.coords.latitude;
	var currentLong = position.coords.longitude;

	var map = L.map('map').setView([currentLat,currentLong], 17);
	L.tileLayer('https://api.mapbox.com/v4/cjbayliss.01238090/{z}/{x}/{y}@2x.png?access_token=pk.eyJ1IjoiY2piYXlsaXNzIiwiYSI6ImNpamliYXEyNzAydnp0dG01cXhnbHVyOHIifQ.OMisxdsBEpQZPxx_c_hZsQ' {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);


	var youAreHere = L.latLng(currentLat, currentLong);

	var markYouAreHere = L.marker([currentLat, currentLong]).addTo(map);
	markYouAreHere.bindPopup("<h3>You are here</h3>").openPopup();

	$.getJSON('http://data.melbourne.vic.gov.au/resource/pmhb-s6pn.json?$where=suburb=%27MELBOURNE%27', function(data) {

        var row;
        for (row in data) {

        	if (data[row].building_name.length < 1) {
        		var buildingName = data[row].building_name
        	}
        	else {
        		var buildingName = 'Unnamed Building';
        	}



          L.marker(
          [
          data[row].latitude,
          data[row].longitude
          ]).addTo(map).bindPopup(
          "<h4>" + buildingName + "</h4>" +
          "<p>" + data[row].street_address + "</p>").openPopup();
        }});



}

function fail (){
	alert ("Failed to get geolocation");
}


function measure(lat1, lon1, lat2, lon2){  // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = (lat2 - lat1) * Math.PI / 180;
    var dLon = (lon2 - lon1) * Math.PI / 180;
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d * 1000; // meters
}


/*

distanceTo( <LatLng> otherLatlng ) 	Number 	Returns the distance (in meters) to the given LatLng calculated using the Haversine formula. See description on wikipedia


*/
