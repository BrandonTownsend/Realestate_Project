// Creating our initial map object
// We set the longitude, latitude, and the starting zoom level
// This gets inserted into the div with an id of 'map'var myMap = L.map("map", {
    var myMap = L.map("map", {  
        center: [33.7756, -84.3963],
        zoom: 11 
      });
      
      // Adding a tile layer (the background map image) to our map
      // We use the addTo method to add objects to our map
      L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/streets-v11",
        accessToken: API_KEY
      }).addTo(myMap);
      
      var for_sale = [{
        location: [33.773, -84.352],
        name: "House 01: Virgina Highlands",
        price: "$4M"
      },
      {
        location: [33.779, -84.380],
        name: "House 02: Midtown",
        price: "$4M"
      },
      {
        location: [33.8402, -84.232],
        name: "House 03: Tucker",
        price: "2,296,224"
      },
      {
        location: [33.765, -84.354],
        name: "House 04: Inman Park",
        price: "3,971,883"
      }]
      
      for (var i = 0; i < for_sale.length; i++) {
        var house = for_sale[i];
        L.marker(house.location)
          .bindPopup("<h1>" + house.name + "</h1> <hr> <h3>Price " + house.price + "</h3>").addTo(myMap);}
      
          const url = "https://api.spacexdata.com/v2/launchpads";
      
          // next step - read the same info as geojason 
          // update the function to iterate over the lat long 
          // create new layers for each type shop 
          // htlm 
          // flask 
          
          // refrence 
          d3.json(url).then(function(data) {
            console.log(data);
          });
          
          // Promise Pending
          const dataPromise = d3.json(url);
          console.log("Data Promise: ", dataPromise);
          
      
      
      // Binding a pop-up to our marker
      
      