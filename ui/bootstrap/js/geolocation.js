var result, article, map;

window.onload = function() {
	article = document.querySelector('article');
	
	map = document.createElement('div');
	map.id = 'map';
  	map.style.height = '400px';
  	map.style.width = '500px';
  	
  	if (navigator.geolocation) {
	  navigator.geolocation.getCurrentPosition(success, error);
	} else {
	  alert('navigator.geolocation not supported on your browser.');
	}
}


function success(position) {
	article.innerHTML = "Latitude is: <strong>" + position.coords.latitude + "</strong> and longitude is <strong>" + position.coords.longitude + "</strong>.";
}

function error(msg) {
	article.innerHTML = "We could not find you, sorry.";
}

