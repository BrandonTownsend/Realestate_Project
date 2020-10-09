var data = fetch("../Atlanta_restaurants_geojson/restaurant_point.geojson")
.then(function(response) {
return response.json();
})

console.log(data);

