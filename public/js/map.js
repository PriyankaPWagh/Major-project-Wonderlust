
	{/* /* // TO MAKE THE MAP APPEAR YOU MUST
	// ADD YOUR ACCESS TOKEN FROM
	// https://account.mapbox.com */ }
 
	mapboxgl.accessToken = mapToken;
    const map = new mapboxgl.Map({
        container: 'map', // container ID
        style:"mapbox://styles/mapbox/streets-v12",
        center: listing.geometry.coordinates, // starting position [lng, lat]
        zoom: 9 // starting zoom
    });




// // Create a custom marker element
customMarker = document.createElement('div');
customMarker.className = 'custom-marker';
customMarker.style.backgroundImage = 'url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWJRtRzvfF4kP9vVqSxM24bVvZyLAgUNItZA&s)'; // path to your custom icon
customMarker.style.width = '50px'; // set the width of your icon
customMarker.style.height = '50px'; // set the height of your icon
customMarker.style.backgroundSize = "100%";
// customMarker.style.backgroundColor = 'pink';


     

  

    


