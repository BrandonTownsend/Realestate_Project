var myMap = L.map("map", {
  center: [33.7756, -84.3963],
  zoom: 11
});

// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
  tileSize: 512,
  maxZoom: 18,
  zoomOffset: -1,
  id: "mapbox/streets-v11",
  accessToken: API_KEY
}).addTo(myMap);

L.marker([33.773, -84.352]).bindPopup("House 01: Virgina Highlands").addTo(myMap);
L.marker([33.779, -84.380]).bindPopup("House 02: Midtown").addTo(myMap);
L.marker([33.8402, -84.232]).bindPopup("House 03: Tucker").addTo(myMap);
L.marker([33.765, -84.354]).bindPopup("House 04: Inman Park").addTo(myMap);

// Load in geojson data
var geoData = "static/data/AtlantaHousePrices.geojson";

var geojson;

// Grab data with d3
d3.json(geoData, function(data) {

  // Create a new choropleth layer
  geojson = L.choropleth(data, {

    // Define what  property in the features to use
    valueProperty: "HmSalePerSF_2018",

    // Set color scale
    scale: ["#ffffb2", "#b10026"],

    // Number of breaks in step range
    steps: 10,

    // q for quartile, e for equidistant, k for k-means
    mode: "q",
    style: {
      // Border color
      color: "#fff",
      weight: 1,
      fillOpacity: 0.7
    },

    // Binding a pop-up to each layer
    onEachFeature: function(feature, layer) {
      layer.bindPopup("Neighborhood: " + feature.properties.Neighbhorhoods + "<br>Median Household Income:<br>" +
        "$" + feature.properties.HmSalePerSF_2018);
    }
  }).addTo(myMap);

  // Set up the legend
  var legend = L.control({ position: "bottomright" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var limits = geojson.options.limits;
    var colors = geojson.options.colors;
    var labels = [];

    // Add min & max
    var legendInfo = "<h1>Median Income</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">" + limits[0] + "</div>" +
        "<div class=\"max\">" + limits[limits.length - 1] + "</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };

  // Adding legend to the map
  legend.addTo(myMap);

});
// // add house markers

// // Create a baseMaps object to hold the lightmap layer
// var baseMaps = {
//   "My map": myMap,
//   "street map": streetmap,
// };

// // Create an overlayMaps object to hold the dining layer
// var overlayMaps = {
//   "houses": houseMarkers
// };

// var layers = {
//   baseMaps: new L.LayerGroup(),
//   overlayMaps: new L.LayerGroup()
// };

// createMap(L.layerGroup(houseMarkers));

// L.control
//     .layers(baseMaps, overlayMaps, {
//       collapsed: false
//     }).addTo(map);

   
    
      



