
L.mapbox.accessToken = 'pk.eyJ1IjoiYmRrYXVmZiIsImEiOiJZQWdTQzJ3In0.moRkdSXmD_TBq0axmrs1VQ';
var southWest = L.latLng(40.70256978037793, -73.99472236633301),
    northEast = L.latLng(40.748492426449104, -73.88520240783691),
    bounds = L.latLngBounds(southWest, northEast);
    
var map = L.mapbox.map('map', 'bdkauff.3dc6a933',{maxBounds: bounds})
    .setView([40.72755146730012, -73.95103454589844], 14);

var landfills, exports;

// for debugging: get lat lon by clicking map
map.on('click', function(e) {
console.log(map.getBounds());
alert("Lat, Lon : " + e.latlng.lat + ", " + e.latlng.lng)
});

exports = L.mapbox.featureLayer()
	.loadURL('data/test_500.json')
	.addTo(map);


landfills = L.mapbox.featureLayer()
	.loadURL('/instagram')
	.on('ready', markers)
	.addTo(map);

  landfills.on('mouseover', function(e){
    sidebarInfo(e);
  });

  function markers() {
    landfills.eachLayer(function(marker){
      marker.bindPopup(marker.feature.properties.time);
      if (marker.feature.properties.time) {
          marker.setIcon(L.icon(marker.feature.properties.icon));
      } else {
          marker.setIcon(L.icon(marker.feature.properties.icon));
       }      
    })
  }

function sidebarInfo(e) {
    $('#filters h3').text(e.layer.feature.properties['time']);
    $('#filters img').attr('src', e.layer.feature.properties['img_hi_res']);
} ;
