
var map;

document.addEventListener('DOMContentLoaded', () => {

    document.querySelector('.form__btn').addEventListener('click', searchIp);
    document.querySelector('.contenedor__form').addEventListener('submit', searchIp);

    
    map = L.map('map', {
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
    
})

const searchIp = async (e) => {
    e.preventDefault();
    const textInput = document.querySelector('.form__input');
    const ragexIp = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
    const ragexDomain =  /^[a-zA-Z0-9][a-zA-Z0-9-_]{0,61}[a-zA-Z0-9]{0,1}\.([a-zA-Z]{1,6}|[a-zA-Z0-9-]{1,30}\.[a-zA-Z]{2,3})$/;
    let api;

    console.log(textInput.value);
    
    const esIp = ragexIp.test(textInput.value);
    const esDominio = ragexDomain.test(textInput.value);
    

    if (esIp) api = "https://geo.ipify.org/api/v2/country,city?apiKey=at_UGV5rjxxlfuEM5s68t3tMs6XZhGz5&ipAddress=";
    if (esDominio) api = "https://geo.ipify.org/api/v2/country,city?apiKey=at_UGV5rjxxlfuEM5s68t3tMs6XZhGz5&domain=";

    if ((!textInput.value.length > 0) || !(esIp || esDominio)) return alert( "IP no válida");
    console.log((!textInput.value.length > 0) && !(esIp || esDominio));
    
    const request = await fetch(`${api}${textInput.value}`);
    const data = await request.json();

    const labelIp = document.querySelector('#ip');
    labelIp.textContent = data.ip;
    
    const labelLocation = document.querySelector('#location');
    labelLocation.textContent = `${data.location.city}, ${data.location.country} ${data.location.postalCode}`;    
    
    const labelTimezone = document.querySelector('#timezone');
    labelTimezone.textContent = data.location.timezone;    
    
    const labelIsp = document.querySelector('#isp');
    labelIsp.textContent = data.isp;

    map.setView([data.location.lat, data.location.lng])

    L.marker([data.location.lat, data.location.lng]).addTo(map)
        .openPopup();
}
