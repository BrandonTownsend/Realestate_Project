function createMap(dinning) {
  // Create the tile layer that will be the background of our map
  var lightmap = L.tileLayer(
    "https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
      maxZoom: 18,
      id: "light-v10",
      accessToken: API_KEY
    });

  // Create a baseMaps object to hold the lightmap layer
  var baseMaps = {
    "Light Map": lightmap,
  };

  // Create an overlayMaps object to hold the dinning layer
  var overlayMaps = {
    "Restaurants": dinning
  };

  // Create the map object with options
  var map = L.map("map-id", {
    center: [33.7756, -84.3963],
    zoom: 12,
    layers: [lightmap, dinning]
  });

  // Adding a tile layer (the background map image) to our map
  // We use the addTo method to add objects to our map
  L.tileLayer(
    "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
    {
      attribution:
        "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
      tileSize: 512,
      maxZoom: 18,
      zoomOffset: -1,
      id: "mapbox/streets-v11",
      accessToken: API_KEY,
    }
  ).addTo(map);

  // Create a layer control, pass in the baseMaps and overlayMaps. Add the layer control to the map
  L.control
    .layers(baseMaps, overlayMaps, {
      collapsed: false
    }).addTo(map);
}

function createMarkers(response) {
  // Pull the "stations" property off of response.data

  var restaurants = response.features;

  // Initialize an array to hold restaurant markers
  var restMarkers = [];

  // Loop through the stations array
  for (var index = 0; index < restaurants.length; index++) {
    var res = restaurants[index];

    //  For each station, create a marker and bind a popup with the station's name
    var restMarker = L.marker([res.geometry.coordinates[1],res.geometry.coordinates[0]])
    .bindPopup("<h3>" + res.properties.name + "<h3><h3>Capacity: " + res.properties.cuisine + "</h3>");

    // Add the marker to the bikeMarkers array
    restMarkers.push(restMarker);
  }
  console.log(restMarkers);


// Create a layer group made from the bike markers array, pass it into the createMap function
createMap(L.layerGroup(restMarkers));
}

// Perform an API call to the Citi Bike API to get station information. Call createMarkers when complete
d3.json(
  "../Atlanta_restaurants_geojson/restaurant_point.geojson", createMarkers);

// var url = "../Atlanta_restaurants_geojson/restaurant_point.geojson"
// var data = fetch(url)
// .then(function(response) {
// return response.json();
// };