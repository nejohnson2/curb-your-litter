
L.mapbox.accessToken = 'pk.eyJ1IjoiYmRrYXVmZiIsImEiOiJZQWdTQzJ3In0.moRkdSXmD_TBq0axmrs1VQ';
var map = L.mapbox.map('map', 'bdkauff.3dc6a933')
    .setView([40.7114, -73.9470], 14);

var landfills, exports;

// for debugging: get lat lon by clicking map
// map.on('click', function(e) {
// alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
// });

exports = L.mapbox.featureLayer()
	.loadURL('data/test_500.json')
	.addTo(map);


landfills = L.mapbox.featureLayer()
	.loadURL('data/new_york_landfills.geojson')
	.on('ready', markers)
	.addTo(map);

  landfills.on('click', function(e){
    sidebarInfo();
  });

  function markers() {
    landfills.eachLayer(function(marker){
      marker.bindPopup(marker.feature.properties.fac_state);
      if (marker.feature.properties.fac_state ==='OH') {
          marker.setIcon(L.icon(marker.feature.properties.icon));
      } else {
          marker.setIcon(L.icon(marker.feature.properties.icon));
       }      
    })
  }

  function sidebarInfo() {
    console.log('clicked')

  };