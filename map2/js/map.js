mapboxgl.accessToken = 'pk.eyJ1IjoibWF0dGNlbiIsImEiOiJtQk5qQ3FrIn0.KXjMKddh4Gb0zqLqKlPo9g';
var map = new mapboxgl.Map({
  container: 'map', // container id
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-96, 37.8], // starting position
  zoom: 3 // starting zoom
});

// Add geolocate control to the map.
map.addControl(
  new mapboxgl.GeolocateControl({
    positionOptions: {
      enableHighAccuracy: true
    },
    trackUserLocation: true
  })
);
