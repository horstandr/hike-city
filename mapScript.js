var map = L.map('map').setView([52.378659,4.899288], 12);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | &copy; <a href="https://horstandr.github.io/portfolio">HorstAndr</a>'
}).addTo(map);

// Get location from user
map.locate({setView: true, maxZoom: 12});

// Happens on location success.
function onLocationFound(e) {
    
    L.marker(e.latlng).addTo(map);
    
}
map.on('locationfound', onLocationFound);

// Happens on location error.
function onLocationError(e) {
    alert('Please allow this site to use your location, to make your experience seamless.')
    alert.apply(e.message);
}
map.on('locationerror',onLocationError);