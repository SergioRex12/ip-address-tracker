const api = "https://geo.ipify.org/api/v2/country,city?apiKey=at_UGV5rjxxlfuEM5s68t3tMs6XZhGz5&ipAddress="

var map = L.map('map', {
    center: [51.5, -0.09],
    zoom: 16,
    dragging: false,
    boxZoom: false,
    doubleClickZoom: false,
    zoomControl: false,
    scrollWheelZoom: false
});

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
}).addTo(map);

L.marker([51.5, -0.09]).addTo(map)
    .openPopup();