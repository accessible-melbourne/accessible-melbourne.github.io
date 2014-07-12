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
	
	L.tileLayer('http://{s}.tiles.mapbox.com/v3/kathyreid.iohfhi83/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
    maxZoom: 18
}).addTo(map);


	var youAreHere = L.latLng(currentLat, currentLong);
	
	var markYouAreHere = L.marker([currentLat, currentLong]).addTo(map);
	markYouAreHere.bindPopup("<h3>You are here</h3>").openPopup();
	
	


} 

function fail (){
	alert ("Failed to get geolocation");
}
